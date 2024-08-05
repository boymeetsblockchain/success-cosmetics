"use client";
import { getSingleOrderById, updateOrderToCompleted,updateOrderToDelivered } from "@/actions/order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";
import { OrderProps } from "@/types";

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
  const handleMarkAsDelivered = async () => {
    if (!order) return;

    try {
      await updateOrderToDelivered(order.id);
      toast.success("Order marked as completed");
      router.refresh(); 
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return <Loader loading/>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col space-y-3  w-full min-h-screen max-w-7xl items-center  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="shadow-md p-6 rounded-md w-full  max-w-4xl">
        <h2 className="text-lg font-semibold">Order Details:</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Amount:</strong> {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(order.totalAmount)}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})
}</p>
<p><strong> {order.description}</strong></p>
        <p><strong>Status:</strong> {order.completed ? "Completed" : "Pending"}</p>
        <p><strong>Delivery Status:</strong> {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
      </div>
     <div className="flex items-center gap-x-3 ">
     {!order.completed && (
        <button
          onClick={handleMarkAsCompleted}
          className="text-sm md:text-lg font-bold hover:text-barbie-pink border-2  hover:bg-white text-white bg-barbie-pink transition-colors duration-300 rounded-lg px-8 py-3 mt-4"
        >
          Mark as Completed
        </button>
      )}
      {!order.isDelivered && (
        <button
          onClick={handleMarkAsDelivered}
          className="text-sm md:text-lg font-bold hover:text-white border-2  hover:bg-barbie-pink text-barbie-pink bg-white  transition-colors duration-300 rounded-lg px-8 py-3 mt-4"
        >
          Mark as Delivered
        </button>
      )}
     </div>
    </div>
  );
};

export default GetSingleOrder;
