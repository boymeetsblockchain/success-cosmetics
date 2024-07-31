"use client"
import { getSingleProductById, updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductTypes } from "@/types";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const router = useRouter()
    const [product, setProduct] = useState<ProductTypes | null>(null);
    const { id } = useParams();
    const [formData, setFormData] = useState<FormData>(new FormData());

    useEffect(() => {
        const getProduct = async () => {
            const singleProduct = await getSingleProductById(id as string);
            setProduct(singleProduct);
            const initialFormData = new FormData();
            if (singleProduct) {
                initialFormData.set("name", singleProduct.name ?? "");
                initialFormData.set("quantity", singleProduct.quantity?.toString() ?? "");
                initialFormData.set("price", singleProduct.price?.toString() ?? "");
                initialFormData.set("description", singleProduct.description ?? "");
                setFormData(initialFormData);
            }
        };
        getProduct()
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        formData.set(name, value);
        setFormData(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            formData.set("image", e.target.files[0]);
            setFormData(formData);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProduct(id as string, formData);
       toast.success("Product Updated successesfully")
       router.push("/admin/products")
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="shadow-lg w-full bg-white p-8 rounded-lg">
        <h1 className="mb-10 text-3xl font-bold text-center">Update Product</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" className="block text-sm mb-2 font-medium text-gray-700">
              Product Name
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              defaultValue={product.name ?? ""}
              className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
              placeholder="Enter Product Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">
              Product Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description ?? ""}
              className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
              placeholder="Enter Product Description"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="price" className="block text-sm mb-2 font-medium text-gray-700">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              name="price"
              defaultValue={product.price?.toString() ?? ""}
              className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
              placeholder="Enter Price"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="price" className="block text-sm mb-2 font-medium text-gray-700">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              defaultValue={product.quantity?.toString() ?? ""}
              className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
              placeholder="Enter Price"
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <Label htmlFor="image" className="block text-sm mb-2 font-medium text-gray-700">
              Product Image
            </Label>
            <Input
              id="image"
              type="file"
              name="image"
              className="focus:outline-none w-full py-2 px-4 border rounded-md border-gray-300"
              onChange={handleImageChange}
            />
          </div> */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-barbie-pink text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update Product
            </Button>
          </div>
        </form>
        </div>
        </div>
    );
};

export default UpdateProduct;
