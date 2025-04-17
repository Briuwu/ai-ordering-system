"use client";
import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";

import { CartItems } from "./cart-items";

import emptyCart from "@/public/assets/images/illustration-empty-cart.svg";
import treeIcon from "@/public/assets/images/icon-carbon-neutral.svg";
import { ConfirmOrder } from "./confirm-order";

export const Cart = () => {
  const { items } = useCartStore((state) => state);

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

          <div className="flex items-center justify-center gap-2 rounded-md bg-rose-50 py-4">
            <Image src={treeIcon} alt="" />
            <p className="text-sm text-rose-900">
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>

          <ConfirmOrder />
        </div>
      )}
    </aside>
  );
};
