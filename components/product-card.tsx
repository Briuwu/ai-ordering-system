import Image from "next/image";

import { Product } from "@/lib/types";
import { AddToCart } from "./add-to-cart";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="mx-auto space-y-9">
      <div className="relative">
        <Image
          src={product.image.desktop.replace(".", "")}
          alt=""
          width={250}
          height={240}
          className="hidden rounded-md lg:block"
        />
        <Image
          src={product.image.tablet.replace(".", "")}
          alt=""
          width={213}
          height={212}
          className="hidden rounded-md md:block lg:hidden"
        />
        <Image
          src={product.image.mobile.replace(".", "")}
          alt=""
          width={327}
          height={212}
          className="block rounded-md md:hidden"
        />
        <div className="absolute right-0 -bottom-6 left-0 grid place-content-center">
          <AddToCart product={product} />
        </div>
      </div>
      <div>
        <p className="text-sm text-rose-500">{product.category}</p>
        <p className="font-semibold text-rose-900">{product.name}</p>
        <p className="text-red font-semibold">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};
