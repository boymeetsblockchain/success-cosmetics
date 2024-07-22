import { db } from "@/lib/db";

export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany({});
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
