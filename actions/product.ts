"use server";

import cloudinary from "@/config/cloudinary";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const addNewProduct = async (formData: FormData) => {
    const image = formData.get('image') as File;
    const name = formData.get("name") as string | null;
    const category = formData.get("category") as string | null;
    const priceString = formData.get("price") as string | null;
    const description = formData.get("description") as string | null;

    if (!name || !description || !priceString || !category || !image) {
        return {
            error: "Missing required fields"
        };
    }

    if (image.name === "undefined") {
        return {
            error: "Image file not selected"
        };
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageData = Buffer.from(buffer);

    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64');

    // Make request to upload to Cloudinary
    const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
            folder: 'success',
        }
    );

    const imageUrl = result.secure_url;

    const price = parseFloat(priceString);

    if (isNaN(price)) {
        throw new Error("Invalid price format");
    }

    const newProduct = await db.product.create({
        data: {
            name,
            price,
            description,
            quantity: 1,
            imageUrl,
            category
        }
    });

    if (newProduct) {
        redirect('/admin/products');
    }

    return newProduct;
};

const getAllProducts = async () => {
    try {
        const products = await db.product.findMany({});
        return products;

    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Failed to fetch products");
    }
};

const getSingleProductById = async (productId: string) => {
    try {
        const product = await db.product.findUnique({
            where: {
                id: productId,
            },
        });
        return product;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw new Error('Failed to fetch product');
    }
};

const updateProduct = async (productId: string, formData: FormData) => {
    const image = formData.get('image') as File | null;
    const name = formData.get("name") as string | null;
    const category = formData.get("category") as string | null;
    const priceString = formData.get("price") as string | null;
    const quantityString = formData.get("quantity") as string | null;
    const description = formData.get("description") as string | null;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (priceString) {
        const price = parseFloat(priceString);
        if (isNaN(price)) {
            throw new Error("Invalid price format");
        }
        updateData.price = price;
    }
    if (quantityString) {
        const quantity = parseFloat(quantityString);
        if (isNaN(quantity)) {
            throw new Error("Invalid quantity format");
        }
        updateData.quantity = quantity;
    }
    if (description) updateData.description = description;

    if (image && image.name !== "undefined") {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const imageData = Buffer.from(buffer);
        const imageBase64 = imageData.toString('base64');

        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
                folder: 'success',
            }
        );

        updateData.imageUrl = result.secure_url;
    }

    try {
        const updatedProduct = await db.product.update({
            where: { id: productId },
            data: updateData
        });

        return updatedProduct;
    } catch (error) {
        console.error('Failed to update product:', error);
        throw new Error('Failed to update product');
    }
};

const deleteSingleProduct = async (productId: string) => {
    try {
        await db.product.delete({
            where: {
                id: productId
            }
        });

        return true;
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw new Error('Failed to delete product');
    }
};

const searchProduct = async (searchTerm: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        category: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });
        return products;
    } catch (error) {
        console.error('Failed to search products:', error);
        throw new Error('Failed to search products');
    }
};

export { addNewProduct, getAllProducts, getSingleProductById, deleteSingleProduct, searchProduct, updateProduct };
