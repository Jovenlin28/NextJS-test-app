import { Product } from "../models/product.model";
import ProductListing from "../components/ProductList";


const fetchProducts = async () => {
  const resp = await fetch("https://dummyjson.com/products?limit=10");
  return await resp.json() as {products: Product[]};
}
export default async function Home() {
  const products = (await fetchProducts()).products;
  return (
    <main className="flex min-h-screen flex-col p-12 md:p-12">
      <ProductListing initialProducts={products} />
    </main>
  );
}
