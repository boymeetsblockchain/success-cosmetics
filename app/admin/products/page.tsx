"use client";
import { getAllProducts } from "@/actions/product";
import { ProductTypes } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromApi = await getAllProducts();
      setProducts(productsFromApi);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 h-auto py-8">
      <div className="w-full bg-white px-4 py-3 rounded-lg shadow-lg">
        <h1 className="mb-10 text-3xl font-bold text-center">Products</h1>
        {products.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">No</th>
                <th className="py-2 text-left ">Name</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left hidden md:block">Category</th>
                <th className="py-2 text-left">Quantity Left</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-t sapce-y-2">
                  <td className="py-2 text-left">{index + 1}</td>
                  <td className="py-2 text-left text-c">{product.name}</td>
                  <td className="py-2 text-left">{product.price}</td>
                  <td className="py-2 text-left hidden md:block">{product.category}</td>
                  <td className="py-2 text-left">{product.quantity}</td>
                  <td className="py-2 text-left">
                    <Link
                      className="bg-barbie-pink text-white py-2 px-3 rounded hover:bg-white hover:text-barbie-pink transition"
                      href={`/admin/products/${product.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center flex-col space-y-4">
            <h1 className="text-3xl font-bold">No Products Yet</h1>
            <Link
              href="/admin/addproduct"
              className="bg-barbie-pink text-white hover:bg-white hover:text-barbie-pink shadow-md py-2 px-3 rounded transition"
            >
              Add New Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
