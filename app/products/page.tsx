"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { work } from "@/font";
import { cn } from "@/lib/utils";
import { getAllProducts, searchProduct } from "@/actions/product";
import { ProductCardProps} from "@/types";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import toast from "react-hot-toast";

const ProductsPage = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                toast.error("Failed to load products");
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === "") {
            // If search term is empty, fetch all products
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } else {
            // Otherwise, search products by the term
            const results = await searchProduct(term);
            setProducts(results);
        }
    };

    return (
        <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center">
            <h1 className={cn(" md:text-4xl text-lg font-medium text-center", work.className)}>
                Available Products
            </h1>
            <div className="flex relative items-center w-[400px] my-4 self-center px-4">
                <Input
                    className="pl-10 pr-4 py-2 border rounded-lg"
                    placeholder="Search Product..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="absolute left-6">
                    <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                {products.map((product: ProductCardProps) => (
                    <ProductCard
                        key={product.id}
                        src={product.imageUrl as string}
                        name={product.name}
                        price={product.price}
                        id={product.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
