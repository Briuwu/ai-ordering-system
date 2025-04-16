import data from "./data.json";

export const DATA = data.map((item) => ({
  ...item,
  slug: item.name.toLowerCase().replace(/\s+/g, "-"),
}));
