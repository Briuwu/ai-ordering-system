import { Cart } from "@/components/cart";
import { Products } from "./components/products";

export default function Home() {
  return (
    <main className="mx-auto my-20 grid max-w-7xl gap-8 lg:grid-cols-[1fr_384px]">
      <Products />
      <Cart />
    </main>
  );
}
