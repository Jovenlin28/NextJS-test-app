"use client";
import { Product } from "../models/product.model";
import ProductItem from "./ProductItem";
import ProductFilters from "./ProductFiltering";
import { useSelector } from "react-redux";
import { selectFilters } from "../store/filters";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useInView } from "react-intersection-observer";
import ProductsLoadingPlaceholder from "./ProductsLoadingPlaceholder";

interface ProductListingProps {
  initialProducts: Product[];
}

const productsLimit = 10;
export default function ProductListing({
  initialProducts,
}: ProductListingProps) {
  const currentFilters = useSelector(selectFilters);
  const [accumulatedProducts, setAccumulatedProducts] =
    useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(productsLimit);
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollReachedEnd, setScrollReachedEnd] = useState(false);

  const loadMoreProducts = async () => {
    const resp = await fetch(
      `https://dummyjson.com/products?limit=${productsLimit}&skip=${offset}`
    );
    const partialProducts =
      ((await resp.json()) as { products: Product[] })?.products || [];
    setAccumulatedProducts((currentProducts) => {
      return [...currentProducts, ...partialProducts];
    });
    setOffset(offset + productsLimit);
    if (partialProducts.length > 0) {
      window.scrollTo({ top: (scrollRef.current?.offsetHeight || 150) - 150 });
    } else {
      setScrollReachedEnd(true);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  useEffect(() => {
    let currentProducts = [...accumulatedProducts];
    if (currentFilters.search) {
      currentProducts = currentProducts.filter((item) =>
        item.title.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }
    if (currentFilters.startDate) {
      if (currentFilters.endDate) {
        currentProducts = currentProducts.filter((item) => {
          return (
            dayjs(item.meta.createdAt).isAfter(
              dayjs(currentFilters.startDate)
            ) &&
            dayjs(item.meta.createdAt).isBefore(dayjs(currentFilters.endDate))
          );
        });
      } else {
        currentProducts = currentProducts.filter((item) => {
          return dayjs(item.meta.createdAt).isAfter(
            dayjs(currentFilters.startDate)
          );
        });
      }
    }
    setFilteredProducts(currentProducts);
  }, [currentFilters, accumulatedProducts]);
  return (
    <>
      <div className="md:flex justify-between mb-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span>Product List </span>
          <span className="text-gray-600">({filteredProducts.length})</span>
        </h5>
        <div className="md:mr-5 mb-4 md:flex">
          <ProductFilters />
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="flex flex-col gap-3">
          <div
            ref={scrollRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          {!scrollReachedEnd && (
            <div
              ref={ref}
              role="status"
              className="grid grid-cols-3 gap-2"
            >
              <ProductsLoadingPlaceholder />
              <ProductsLoadingPlaceholder />
              <ProductsLoadingPlaceholder />
            </div>
          )}
        </div>
      ) : (
        <>
          {currentFilters.search && (
            <p className="text-center mt-10 font-weight-800 tracking-tight text-gray-900 dark:text-white">
              No products found for
              <span className="font-bold"> {currentFilters.search}</span>
            </p>
          )}
        </>
      )}
    </>
  );
}
