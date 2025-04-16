"use client";
import Image from "next/image";
import { Button } from "./ui/button";

import cart from "@/public/assets/images/icon-add-to-cart.svg";

import { useCartStore } from "@/providers/cart-store-provider";
import { Product } from "@/lib/types";
import { toast } from "sonner";

export const AddToCart = ({ product }: { product: Product }) => {
  const { addToCart, items, handleQuantityChange, removeFromCart } =
    useCartStore((state) => state);

  const currentProduct = items.find((item) => item.slug === product.slug)!;

  const isAdded = currentProduct !== undefined;

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
    });
    toast.success(`${product.name} added successfully.`);
  };

  const handleIncreaseQty = () => {
    handleQuantityChange(product.slug, currentProduct.quantity + 1);
  };

  const handleDecreaseQty = () => {
    if (currentProduct.quantity > 1) {
      handleQuantityChange(product.slug, currentProduct.quantity - 1);
    } else {
      removeFromCart(product.slug);
      toast.success(`${product.name} removed from cart.`);
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
