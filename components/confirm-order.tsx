import Image from "next/image";
import { useCartStore } from "@/providers/cart-store-provider";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

import checkIcon from "@/public/assets/images/icon-order-confirmed.svg";
import { CartItems } from "./cart-items";

export const ConfirmOrder = () => {
  const { clearCart } = useCartStore((state) => state);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red mt-6 h-[53px] w-full rounded-full font-semibold text-white">
          Confirm Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Image src={checkIcon} alt="" />
          <AlertDialogTitle className="text-4xl font-bold text-rose-900">
            Order Confirmed
          </AlertDialogTitle>
          <AlertDialogDescription className="text-rose-500">
            We hope you enjoy your food!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[300px] overflow-auto">
          <CartItems />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={clearCart}
            className="bg-red mt-6 h-[53px] w-full rounded-full font-semibold text-white"
          >
            Start New Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
