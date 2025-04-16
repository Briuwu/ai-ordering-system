import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

type Props = {
  data: Product[];
  name: string;
};

export const Products = ({ data, name }: Props) => {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold text-rose-900">{name}</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};
