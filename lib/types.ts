import { DATA } from "./content";

export type Product = (typeof DATA)[number];

export type Chat = {
  message: string;
  orders: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    slug: string;
  }[];
};
