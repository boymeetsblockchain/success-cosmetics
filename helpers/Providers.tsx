"use client"

import ContextProvider from "@/features/CartContext"
import React from "react"

export function Provider ({children}:{children : React.ReactNode}){
    return(
        <ContextProvider>
            {children}
        </ContextProvider>
    )
}