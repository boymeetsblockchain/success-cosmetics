import { ProductCard } from "@/components/products/ProductCard";
import { work } from "@/font";
import { cn } from "@/lib/utils";

const ProductsPage = () => {
    return (
        <div className="my-10 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center">
            <h1 className={cn("mb-10 text-4xl font-medium ",work.className)}>Here A List of Our Available Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                <ProductCard src="cerave.jpg" name="CeraVe Foaming 473ml Cleanser(Uk Version)" price={18500} id={1}/>
                <ProductCard src="lize.jpg" name="Cosrx The Vitamin C 23 Serum" price={18500} id={2}/>
                <ProductCard src="lotion.jpg" name="Dr Teals Body Lotion-Vitamin C —532ml (18oz)" price={11000} id={3} />
                <ProductCard src="serum.jpg" name="Beauty Formulas Illuminating Serum 10% Niacinamide -30ml" price={6500} id={4}/>
                <ProductCard src="sugar.jpg" name="Dr Teals Shea Sugar Scrub with Citrus,Vitamin C & Essential Oils 538g (19oz)" price={13500} id={5} />
                <ProductCard src="wash.jpg" name="Dr Teals Body Wash -prebiotic lemon balm - 710ml" price={18500} id={6} />
                <ProductCard src="simple.jpg" name="Simple replenishing rich moisturizer-125m" price={11000} id={7} />
                <ProductCard src="garnier.jpg" name="Garnier Bright Complete Extra Body Lotion -400ml" price={12000} id={8} />
                <ProductCard src="cerave.jpg" name="CeraVe Foaming 473ml Cleanser(Uk Version)" price={18500} id={1}/>
                <ProductCard src="lize.jpg" name="Cosrx The Vitamin C 23 Serum" price={18500} id={2}/>
                <ProductCard src="lotion.jpg" name="Dr Teals Body Lotion-Vitamin C —532ml (18oz)" price={11000} id={3} />
                <ProductCard src="serum.jpg" name="Beauty Formulas Illuminating Serum 10% Niacinamide -30ml" price={6500} id={4}/>
                <ProductCard src="sugar.jpg" name="Dr Teals Shea Sugar Scrub with Citrus,Vitamin C & Essential Oils 538g (19oz)" price={13500} id={5} />
                <ProductCard src="wash.jpg" name="Dr Teals Body Wash -prebiotic lemon balm - 710ml" price={18500} id={6} />
                <ProductCard src="simple.jpg" name="Simple replenishing rich moisturizer-125m" price={11000} id={7} />
                <ProductCard src="garnier.jpg" name="Garnier Bright Complete Extra Body Lotion -400ml" price={12000} id={8} />
                
            </div>
        </div>
    )
}
 
export default ProductsPage;