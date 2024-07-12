import { ProductCard } from "../products/ProductCard"

export const Products = () => {
    return (
        <div className="my-10 px-4 md:px-6 lg:px-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
                <ProductCard src="cerave.jpg" name="CeraVe Foaming 473ml Cleanser(Uk Version)" price={18500} />
                <ProductCard src="lize.jpg" name="Cosrx The Vitamin C 23 Serum" price={18500} />
                <ProductCard src="lotion.jpg" name="Dr Teals Body Lotion-Vitamin C —532ml (18oz)" price={11000} />
                <ProductCard src="serum.jpg" name="Beauty Formulas Illuminating Serum 10% Niacinamide -30ml" price={6500} />
                <ProductCard src="sugar.jpg" name="Dr Teals Shea Sugar Scrub with Citrus,Vitamin C & Essential Oils 538g (19oz)" price={13500} />
                <ProductCard src="wash.jpg" name="Dr Teals Body Wash -prebiotic lemon balm - 710ml" price={18500} />
                <ProductCard src="simple.jpg" name="Simple replenishing rich moisturizer-125m" price={11000} />
                <ProductCard src="garnier.jpg" name="Garnier Bright Complete Extra Body Lotion -400ml" price={12000} />
                <ProductCard src="cerave.jpg" name="CeraVe Foaming 473ml Cleanser(Uk Version)" price={18500} />
                <ProductCard src="lize.jpg" name="Cosrx The Vitamin C 23 Serum" price={18500} />
                <ProductCard src="lotion.jpg" name="Dr Teals Body Lotion-Vitamin C —532ml (18oz)" price={11000} />
                <ProductCard src="serum.jpg" name="Beauty Formulas Illuminating Serum 10% Niacinamide -30ml" price={6500} />
                <ProductCard src="sugar.jpg" name="Dr Teals Shea Sugar Scrub with Citrus,Vitamin C & Essential Oils 538g (19oz)" price={13500} />
                <ProductCard src="wash.jpg" name="Dr Teals Body Wash -prebiotic lemon balm - 710ml" price={18500} />
                <ProductCard src="simple.jpg" name="Simple replenishing rich moisturizer-125m" price={11000} />
                <ProductCard src="garnier.jpg" name="Garnier Bright Complete Extra Body Lotion -400ml" price={12000} />
            </div>
        </div>
    )
}
