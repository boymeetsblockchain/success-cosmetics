"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleProductById } from "@/actions/product";
import { ProductTypes } from "@/types";
import { Loader } from "@/components/loader";

const AdminSingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === "string") {
          const fetchedProduct = await getSingleProductById(id);
          setProduct(fetchedProduct);
        } else {
          throw new Error("Invalid product ID");
        }
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return  <Loader loading={loading}/>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <h1>Admin Single Product Page</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default AdminSingleProduct;
