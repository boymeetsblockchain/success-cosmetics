"use client"
import { ProductCard } from "../products/ProductCard"
import { ProductCardProps, ProductTypes } from "@/types"
import { getAllProducts } from "@/actions/product"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Loader } from "../loader"

export const Products = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading,setLoading]= useState(false)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const allProducts = await getAllProducts();
                setProducts(allProducts);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch products:", error);
                toast.error("Failed to load products");
            }finally{
                setLoading(false)
            }
        };

        fetchProducts();
    }, []);
   

    if(loading) {
        return (
            <Loader loading/>
        )
    }
    return (
        <div className="my-10 px-4 md:px-6 lg:px-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
            {products.map((product: ProductTypes) => (
                    <ProductCard
                        key={product.id}
                        src={product.imageUrl as string}
                        name={product.name}
                        price={product.price}
                        id={product.id}
                        quantity={product.quantity}
                    />
                ))}
            </div> 
        </div>
    )
}
