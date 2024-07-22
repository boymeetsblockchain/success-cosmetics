import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { addNewProduct } from "@/actions/product";

const AdminAddProductPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen max-w-4xl mx-auto px-4 py-8">
            <div className="shadow-lg w-full bg-white p-8 rounded-lg">
                <h1 className="mb-10 text-3xl font-bold text-center">Add New Product</h1>
                <form className="space-y-6" action={addNewProduct}>
                    <div>
                        <Label htmlFor="name" className="block text-sm mb-2 font-medium text-gray-700">Product Name</Label>
                        <Input 
                            id="name" 
                            type="text" 
                            name="name"
                            className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
                            placeholder="Enter Product Name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">Product Description</Label>
                        <Textarea 
                            id="description"
                            name="description"
                            className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
                            placeholder="Enter Product Description"
                        />
                    </div>
                    <div>
                        <Label htmlFor="price" className="block text-sm mb-2 font-medium text-gray-700">Price</Label>
                        <Input 
                            id="price" 
                            type="number" 
                            name="price"
                            className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
                            placeholder="Enter Price"
                        />
                    </div>
                    <div>
                        <Label htmlFor="image" className="block text-sm mb-2 font-medium text-gray-700">Product Image</Label>
                        <Input 
                            id="image" 
                            type="file" 
                            name="image"
                            className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            type="submit"
                            className="bg-barbie-pink text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Add Product
                        </Button>
                    </div>
                </form>
            </div> 
        </div>
    );
}

export default AdminAddProductPage;
