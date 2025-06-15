"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  time: string;
  status: "pending" | "served" | "completed";
  items: OrderItem[];
}

interface OrderListProps {
  orders: Order[];
  restaurantId: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders, restaurantId }) => {
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

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
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

          <div className="p-4 space-y-3">
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
                        ₹ {item.price} x{item.quantity}
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
        </div>
      ))}
    </div>
  );
};

export default OrderList;
