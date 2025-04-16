"use client";
import Image from "next/image";
import { Button } from "./ui/button";

import cart from "@/public/assets/images/icon-add-to-cart.svg";

import { useCartStore } from "@/providers/cart-store-provider";
import { Product } from "@/lib/types";

export const AddToCart = ({ product }: { product: Product }) => {
  const { addToCart, items, handleQuantityChange, removeFromCart } =
    useCartStore((state) => state);

  const currentProduct = items.find((item) => item.name === product.name)!;

  const isAdded = currentProduct !== undefined;

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  const handleIncreaseQty = () => {
    handleQuantityChange(product.name, currentProduct.quantity + 1);
  };

  const handleDecreaseQty = () => {
    if (currentProduct.quantity > 1) {
      handleQuantityChange(product.name, currentProduct.quantity - 1);
    } else {
      removeFromCart(product.name);
    }
  };

  if (!product) return null;

  return (
    <>
      {isAdded ? (
        <div className="bg-red flex h-[44px] w-[160px] items-center justify-between overflow-hidden rounded-full border border-rose-400 text-sm font-semibold text-white">
          <Button onClick={handleDecreaseQty} variant="ghost" className="">
            -
          </Button>
          <p>{currentProduct.quantity}</p>
          <Button onClick={handleIncreaseQty} variant="ghost" className="">
            +
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className="h-[44px] w-[160px] rounded-full border border-rose-400 bg-white px-7 text-sm font-semibold text-rose-900 hover:text-white"
        >
          <Image src={cart} alt="" />
          Add to Cart
        </Button>
      )}
    </>
  );
};
