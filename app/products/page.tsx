import { ProductCard } from "@/components/products/ProductCard";
import { work } from "@/font";
import { cn } from "@/lib/utils";
import { getAllProducts } from "@/actions/product"
import { ProductCardProps, ProductTypes } from "@/types";
const ProductsPage = async() => {
    const products = await getAllProducts()
    return (
        <div className="my-20 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center">
            <h1 className={cn("mb-10 text-4xl font-medium ",work.className)}>Here A List of Our Available Products</h1>
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
    )
}
 
export default ProductsPage;