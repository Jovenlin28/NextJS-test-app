import Image from "next/image";
import { Product } from "../models/product.model";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}
export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link className="flex justify-center py-2" href={`products/${product.id}`}>
        <Image
          className="rounded-t-lg"
          src={product.thumbnail}
          width={250}
          height={250}
          alt={product.title}
        />
      </Link>
      <div className="p-5">
        <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
          {product.description}
        </p>
        <a
          cy-id="product-image"
          href={`products/${product.id}`}
          className="flex justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 mt-0.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <a
          href="#"
          className="flex justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
        >
          Add to Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="file: h-5 w-6 ms-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
