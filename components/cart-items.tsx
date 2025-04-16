"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";

import deleteIcon from "@/public/assets/images/icon-remove-item.svg";

export const CartItems = () => {
  const { items, removeFromCart } = useCartStore((state) => state);

  return (
    <div className="divide-y divide-rose-100">
      {items.map((item) => {
        const total = item.price * item.quantity;

        return (
          <div
            key={item.slug}
            className="flex items-center justify-between py-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-rose-900">{item.name}</p>
              <p className="flex items-center gap-2">
                <span className="text-red mr-3 font-semibold">
                  {item.quantity}x
                </span>
                <span className="font-normal text-rose-500">
                  @{formatPrice(item.price)}
                </span>
                <span className="font-semibold text-rose-500">
                  {formatPrice(total)}
                </span>
              </p>
            </div>
            <Button onClick={() => removeFromCart(item.slug)} variant="ghost">
              <Image src={deleteIcon} alt="" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
