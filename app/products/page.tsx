import { ProductCard } from "@/components/products/ProductCard";
import { work } from "@/font";
import { cn } from "@/lib/utils";
import product from '@/data/products.json'
import { Product } from "@/types";
const ProductsPage = () => {
    return (
        <div className="my-10 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center">
            <h1 className={cn("mb-10 text-4xl font-medium ",work.className)}>Here A List of Our Available Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
            {product.map((item: Product) => (
                    <ProductCard
                        key={item.id}
                        src={item.src}
                        name={item.name}
                        price={item.price}
                        id={item.id}
                        // description={product.description}
                    />
                ))}
            </div>
        </div>
    )
}
 
export default ProductsPage;