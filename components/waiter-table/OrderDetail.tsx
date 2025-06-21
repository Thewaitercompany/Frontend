"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface Order {
  id: string;
  tableNumber: string;
  time: string;
  status: "pending" | "served" | "completed";
  items: OrderItem[];
}

interface OrderDetailProps {
  order: Order;
  customerName: string;
  customerPhone: string;
  onStatusChange: (newStatus: "pending" | "served" | "completed") => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  customerName,
  customerPhone,
  onStatusChange,
}) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (
    newStatus: "pending" | "served" | "completed"
  ) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      onStatusChange(newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "served":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Order Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">Order No: {order.id}</div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-sm text-gray-500">{order.time}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Table no. {order.tableNumber}
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-medium mb-2">Customer Information</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span>{customerName || "Walk-in Customer"}</span>
          </div>
          {customerPhone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{customerPhone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium">Order Items</h3>
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
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    ₹ {item.price} x{item.quantity} = ₹{" "}
                    {item.price * item.quantity}
                  </div>
                  {item.special && (
                    <div className="text-sm text-amber-600 italic">
                      *{item.special}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Total */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between items-center font-medium">
          <span>Total Amount</span>
          <span>₹ {totalAmount}</span>
        </div>
      </div>

      {/* Status Actions */}
      <div className="p-4 border-t space-y-2">
        <h4 className="font-medium">Update Status</h4>
        <div className="flex gap-2">
          <Button
            onClick={() => handleStatusChange("pending")}
            variant={order.status === "pending" ? "default" : "outline"}
            className="flex-1"
            disabled={loading}
          >
            Pending
          </Button>
          <Button
            onClick={() => handleStatusChange("served")}
            variant={order.status === "served" ? "default" : "outline"}
            className="flex-1"
            disabled={loading}
          >
            Served
          </Button>
          <Button
            onClick={() => handleStatusChange("completed")}
            variant={order.status === "completed" ? "default" : "outline"}
            className="flex-1"
            disabled={loading}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
