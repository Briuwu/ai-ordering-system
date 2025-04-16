"use client";
import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { CartItems } from "./cart-items";

import emptyCart from "@/public/assets/images/illustration-empty-cart.svg";
import treeIcon from "@/public/assets/images/icon-carbon-neutral.svg";

export const Cart = () => {
  const { items } = useCartStore((state) => state);

  const orderTotal = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <aside className="rounded-xl bg-white p-6">
      <h2 className="text-red text-2xl font-bold">
        Your Cart ({items.length})
      </h2>
      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center">
          <Image src={emptyCart} alt="" />
          <p className="text-sm font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          <CartItems />
          <div className="flex items-center justify-between border-t border-rose-100 py-6 text-rose-900">
            <p className="text-sm">Order Total</p>
            <p className="text-2xl font-bold">{formatPrice(orderTotal)}</p>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-md bg-rose-50 py-4">
            <Image src={treeIcon} alt="" />
            <p className="text-sm text-rose-900">
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>

          <Button className="bg-red mt-6 h-[53px] w-full rounded-full font-semibold text-white">
            Confirm Order
          </Button>
        </div>
      )}
    </aside>
  );
};
