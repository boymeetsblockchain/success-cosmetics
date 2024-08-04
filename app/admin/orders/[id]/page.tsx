"use client";
import { getSingleOrderById, updateOrderToCompleted } from "@/actions/order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OrderProps {
  id: string;
  userId: string;
  totalAmount: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GetSingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if(typeof id ==="string"){
            const orderData = await getSingleOrderById(id);
            setOrder(orderData);
        }else{
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

  const handleMarkAsCompleted = async () => {
    if (!order) return;

    try {
      await updateOrderToCompleted(order.id);
      toast.success("Order marked as completed");
      router.refresh(); 
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col space-y-3  w-full max-w-7xl items-center justify-center mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="shadow-md p-6 rounded-md w-full  max-w-4xl">
        <h2 className="text-lg font-semibold">Order Details:</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Amount:</strong> {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(order.totalAmount)}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.completed ? "Completed" : "Pending"}</p>
      </div>
      {!order.completed && (
        <button
          onClick={handleMarkAsCompleted}
          className="text-sm md:text-lg font-bold hover:text-barbie-pink hover:bg-white text-white bg-barbie-pink transition-colors duration-300 rounded-lg px-8 py-3 mt-4"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default GetSingleOrder;
