import { Product } from "@/models/product.model";
import Image from "next/image";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const fetchProductDetail = async (id: string) => {
  const resp = await fetch(`https://dummyjson.com/products/${id}`);
  return (await resp.json()) as Product;
};
export default async function ProductDetail(props: ProductDetailProps) {
  const id = props.params.id;
  const product = await fetchProductDetail(id);
  console.log(product, "productDetail");
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Image
            className="rounded-lg shadow-xl dark:shadow-gray-800"
            src={product.thumbnail}
            width={500}
            height={400}
            alt={product.title}
          />
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base">
            {product.description}
          </p>
          <div className="flex flex-row">
            <span>
              <svg
                className="w-4 h-4 text-yellow-300 mx-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </span>
            <span className="font-normal text-gray-900 dark:text-gray-800 text-base text-sm">{product.rating}</span>
            <span className="font-bold text-gray-900 dark:text-gray-400 text-base text-sm ms-2">Review</span>
          </div>
          <hr/>
          <div className="flex flex-row mt-4">
            <span className="mb-3 font-bold text-gray-700 dark:text-gray-400 text-base">Price: </span>
            <span className="mx-2">{product.price}</span>
          </div>
          <div className="flex flex-row mt-4">
            <button className="flex justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2">ADD TO CART</button>
          </div>
          <div className="flex flex-row mt-4">
            <button className="flex justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2">BUY NOW</button>
          </div>
        </div>
      </div>
    </main>
  );
}
