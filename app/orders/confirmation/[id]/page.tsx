"use client";
import { getSingleOrderById } from "@/actions/order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { OrderProps } from "@/types";



const ConfirmOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderProps | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (typeof id === "string") {
                    const orderData = await getSingleOrderById(id);
                    setOrder(orderData);
                } else {
                    toast.error("Invalid order ID format");
                }
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch order details");
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!order) {
        return <p>Order not found</p>;
    }

    return (
        <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col w-full max-w-7xl  min-h-screen items-center mx-auto">
            <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
            <div className="shadow-md p-6 space-y-4 rounded-md w-full max-w-4xl" >
                <h2 className="text-lg font-semibold">Order Details:</h2>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Order Description:</strong> {order.description}</p>
                <p><strong>Total Amount:</strong> {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NGN",
                }).format(order.totalAmount)}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.completed ? "Completed" : "Pending"}</p>
                <p><strong>Status:</strong> {order.isDelivered? "Delivered" : "not Delivered"}</p>
            </div>
            <button
                onClick={() => router.push("/")}
                className="text-sm md:text-lg font-bold hover:text-barbie-pink hover:bg-white text-white bg-barbie-pink transition-colors duration-300 rounded-lg px-8 py-3 mt-4"
            >
                Back to Home
            </button>
        </div>
    );
};

export default ConfirmOrder;
