"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/components/waiter-table/OrderList";

interface OrderDetailProps {
  order: Order;
  customerName?: string;
  customerPhone?: string;
  onStatusChange: (newStatus: "pending" | "served" | "completed") => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  customerName = "Guest",
  customerPhone = "",
  onStatusChange,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "served":
        return "bg-green-100 text-green-700 border-green-300";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "served":
        return "Served";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const handleStatusUpdate = async (
    newStatus: "pending" | "served" | "completed"
  ) => {
    if (order.status === newStatus) return;

    setIsUpdating(true);
    try {
      // In a real application, you would make an API call to update the order
      // Example:
      // const response = await fetch(`https://backend-axu7.onrender.com/orders/${order.id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onStatusChange(newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculate total price
  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <div className="font-medium">Order No: {order.id}</div>
          <div
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusText(order.status)}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {order.time}
          </div>
          <div>Table no. {order.tableNumber}</div>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <User className="h-3.5 w-3.5 mr-1" />
          {customerName}
        </div>
        {customerPhone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-3.5 w-3.5 mr-1" />
            {customerPhone}
          </div>
        )}
      </div>

      <div className="p-4 border-b">
        <h3 className="font-medium mb-3">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={`${order.id}-${item.id}`}
              className="flex items-center gap-3"
            >
              <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div className="font-medium">{item.name}</div>
                  <div className="ml-2 flex-shrink-0">x{item.quantity}</div>
                </div>
                <div className="text-[#B39793]">₹ {item.price}</div>
                {item.special && (
                  <div className="text-sm text-gray-500 italic">
                    *{item.special}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹ {totalPrice}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-3">Update Status</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => handleStatusUpdate("pending")}
            disabled={order.status === "pending" || isUpdating}
            className={`${
              order.status === "pending"
                ? "bg-amber-100 text-amber-700 border-amber-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-amber-50"
            }`}
            variant="outline"
          >
            Pending
          </Button>
          <Button
            onClick={() => handleStatusUpdate("served")}
            disabled={order.status === "served" || isUpdating}
            className={`${
              order.status === "served"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
            }`}
            variant="outline"
          >
            Served
          </Button>
          <Button
            onClick={() => handleStatusUpdate("completed")}
            disabled={order.status === "completed" || isUpdating}
            className={`${
              order.status === "completed"
                ? "bg-gray-100 text-gray-700 border-gray-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            variant="outline"
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
