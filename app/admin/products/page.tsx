import { getAllProducts } from "@/helpers/product";

const AdminProducts = async() => {
    const  products = await getAllProducts()
    return ( 
        <div className=" max-w-6xl mx-auto px-4 h-screen py-8">
        <div className="w-full bg-white px-4 py-3 rounded-lg">
          <h1 className="mb-10 text-3xl font-bold text-center">Products</h1>
          {products.length > 0 ? (
            <table className="min-w-full bg-white ">
              <thead>
                <tr>
                  <th className="py-2 text-center">No</th>
                  <th className="py-2 text-center">Name</th>
                  <th className="py-2 text-center">Price</th>
                  <th className="py-2 text-center">Quantity left</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product,index) => (
                  <tr key={product.id}>
                    <td className="py-2 text-center">{index +1 }</td>
                    <td className="py-2 text-center">{product.name}</td>
                    <td className="py-2 text-center">{product.price}</td>
                    <td className="py-2 text-center">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
     );
}
 
export default AdminProducts;