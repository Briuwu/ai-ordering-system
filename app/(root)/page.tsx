import { Cart } from "@/components/cart";
import { Products } from "@/components/products";
import { DATA } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto grid max-w-7xl items-start gap-8 p-6 md:p-10 lg:grid-cols-[1fr_384px] lg:p-20">
      <Products data={DATA} name="Desserts" />
      <Cart />
    </main>
  );
}
