import { Cart } from "@/components/cart";
import { Products } from "./components/products";

export default function Home() {
  return (
    <main className="grid grid-cols-[1fr_384px] gap-9">
      <Products />
      <Cart />
    </main>
  );
}
