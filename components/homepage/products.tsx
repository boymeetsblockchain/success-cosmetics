import { ProductCard } from "../products/ProductCard"
import { ProductTypes } from "@/types"
import { getAllProducts } from "@/actions/product"

export const Products = async() => {
    const products = await getAllProducts()
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
                        // description={product.description}
                    />
                ))}
            </div> 
        </div>
    )
}
