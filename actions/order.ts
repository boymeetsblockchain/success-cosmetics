"use server"
import { db } from "@/lib/db"

interface CreateOrderParams {
  userId: string;
  totalAmount: number;
  description:string
}

const createOrder = async ({ userId, totalAmount, description }: CreateOrderParams) => {
  console.log("orderdetails",userId,totalAmount,description)
  try {
    const newOrder = await db.order.create({
      data: {
        userId,
        totalAmount,
        description
      },
    });
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

const getSingleOrderById = async (id: string) => {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
    });
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to get order");
  }
}

const getAllOrders = async () => {
  try {
    const orders = await db.order.findMany({});
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to get orders");
  }
}

const deleteOrder = async (id: string) => {
  try {
    const deletedOrder = await db.order.delete({
      where: {
        id,
      },
    });
    return deletedOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

const updateOrderToCompleted = async (id: string) => {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id,
      },
      data: {
        completed: true,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}

const getOrdersByUserId = async (userId: string) => {
  try {
    const userOrders = await db.order.findMany({
      where: {
        userId,
      },
    });
    return userOrders;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw new Error("Failed to get orders by user ID");
  }
}



const searchOrder = async (searchTerm: string) => {
  try {
    const order = await db.order.findUnique({
      where: {
        id: searchTerm,
      },
    });

    return order;
  } catch (error) {
    console.error('Failed to search order:', error);
    throw new Error('Failed to search order');
  }
}


const deleteAllOrders = async()=>{
  try {
    const deleteAll = await db.order.deleteMany({})
    return true
  } catch (error) {
    console.log("failed to delete order",error)
    throw new Error("Failed to delete orders")
  }
}

export {
  createOrder,
  getSingleOrderById,
  getAllOrders,
  deleteOrder,
  updateOrderToCompleted,
  getOrdersByUserId,
  searchOrder,
  deleteAllOrders
}
