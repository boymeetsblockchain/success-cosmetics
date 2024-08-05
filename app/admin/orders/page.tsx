"use client";
import { deleteOrder, getAllOrders, searchOrder } from "@/actions/order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input";
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
import { SearchIcon } from "lucide-react";
  

const AdminOrderPage = () => {
  const [orders, setOrders] = useState<OrderProps[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const allOrders = await getAllOrders();
        setOrders(allOrders);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);


  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
        const allOrders = await getAllOrders();
        setOrders(allOrders);
    } else {
    
        const results = await searchOrder(term);
        setOrders(results);
    }
};


const deleteOrderById = async(id:string)=>{
  await deleteOrder(id)
 router.refresh()
}

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col w-full max-w-7xl min-h-screen  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Order Page</h1>
      <div className="flex relative items-center w-[400px] my-4 self-center px-4">
                <Input
                    className="pl-10 pr-4 py-2 border  rounded-lg"
                    placeholder="Search Order... by Order Id"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="absolute left-6">
                    <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
            </div>
      {orders ? (
        <Table className="min-w-full bg-white border border-gray-300">
          <TableHeader>
            <TableRow>
                
              <TableHead className="px-4 py-2 border-b text-center">Order ID</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Total Amount</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Created At</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Status</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Delivery Status</TableHead>
              <TableHead className="px-4 py-2 border-b text-center">Actions</TableHead>
            </TableRow>
            
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-2 border-b text-center">{order.id}</TableCell>
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
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </TableCell>
                <TableCell className="px-4 py-2 border-b flex items-center gap-x-4 text-center">
                  <Button
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="text-sm  text-barbie-pink hover:bg-barbie-pink hover:text-white bg-white transition-colors duration-300 rounded-lg px-4 py-2"
                  >
                    View
                  </Button>
                  <Button 
                  className="text-sm bg-red-500 text-white  hover:text-red-500 hover:bg-white border-2 " variant={"destructive"}>
                 <AlertDialog >
  <AlertDialogTrigger >Delete Order</AlertDialogTrigger>
  <AlertDialogContent className="bg-white">
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the order
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="bg-green-400 text-white border-white">Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500 text-white border-destructive hover:text-red-500"
         onClick={()=>deleteOrderById(order.id)}
      >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

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

export default AdminOrderPage;
