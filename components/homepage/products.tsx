import { ProductCard } from "../products/ProductCard"
import { Product } from "@/types"
import products from '@/data/products.json'

export const Products = () => {
    return (
        <div className="my-10 px-4 md:px-6 lg:px-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
            {products.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        src={product.src}
                        name={product.name}
                        price={product.price}
                        id={product.id}
                        // description={product.description}
                    />
                ))}
            </div> 
        </div>
    )
}
