import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TotalPriceState {
    total:number,
     setTotalPrice:(price:number) => void
}


const useTotalPrice = create(
    persist<TotalPriceState>(
        (set)=>({
            total:0,
            setTotalPrice: (price) => set({ total: price }),
        }),
        {
            name:"total-price"
        }
    )
)



export default useTotalPrice