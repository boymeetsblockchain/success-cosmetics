"use client";
import { deleteAllOrders, getOrdersByUserId } from "@/actions/order";
import { OrderProps } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Loader } from "@/components/loader";
import { useSession } from "next-auth/react";  

const OrderListPage = () => {
  const [orders, setOrders] = useState<OrderProps[] | null>(null);
  const router = useRouter();
  const {data:session}= useSession()

  const userId = session?.user.id
  useEffect(() => {
    const getOrders = async () => {
      try {
        const allOrders = await getOrdersByUserId(userId as string);
        setOrders(allOrders);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [userId]);

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col w-full max-w-7xl min-h-screen  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Lists </h1>
      {orders ? (
        <Table className="min-w-full bg-white border border-gray-300">
          <TableHeader>
            <TableRow>
                
              <TableHead className="px-4 py-2 border-b text-center">Order ID</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">User ID</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Total Amount</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Created At</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Status</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Actions</TableHead>
            </TableRow>
            
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-2 border-b text-center">{order.id}</TableCell>
                <TableCell className="px-4 py-2 border-b text-center">{order.userId}</TableCell>
                <TableCell className="px-4 py-2 border-b text-center">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NGN",
                  }).format(order.totalAmount)}
                </TableCell>
                <TableCell className="px-4 py-2 border-b text-center">
                  {new Date(order.createdAt).toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})
}
                </TableCell>
                <TableCell className="px-4 py-2 border-b text-center">
                  {order.completed ? "Completed" : "Pending"}
                </TableCell>
                <TableCell className="px-4 py-2 border-b text-center">
                  <Button
                    onClick={() => router.push(`/orders/confirmation/${order.id}`)}
                    className="text-sm md:text-lg font-bold text-barbie-pink hover:bg-barbie-pink hover:text-white bg-white transition-colors duration-300 rounded-lg px-4 py-2"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
     <Loader loading/>
      )}
    </div>
  );
};

export default OrderListPage
