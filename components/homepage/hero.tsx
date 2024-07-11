export const Hero =()=>{
    return(
        <div className="h-[600px] bg-center bg-cover flex items-center  flex-col gap-y-4 justify-center opacity-90" style={{ backgroundImage: 'url("/hero1.jpg")' }}>
        <h1 className="text-4xl md:text-7xl text-center capitalize font-bold">
            Welcome to Success Cosmetics
        </h1>
        <h2 className="text-2xl md:text-5xl font-medium text-center">Any Item Not Currently On The Site Is Out Of Stock And Undergoing Restock</h2>
    </div>
    )
}