"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

interface OrderItem {
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
  const router = useRouter();

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

  const handleOrderClick = (orderId: string) => {
    router.push(`/waiter-table/${restaurantId}/orders/${orderId}`);
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order.id)}
          className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform active:scale-99"
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">Order No: {order.id}</div>
              <div
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {order.time}
              </div>
              <div>Table no. {order.tableNumber}</div>
            </div>
          </div>

          <div className="p-4">
            {order.items.slice(0, 2).map((item) => (
              <div
                key={`${order.id}-${item.id}`}
                className="flex items-center gap-3 mb-3 last:mb-0"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="ml-2 flex-shrink-0">x{item.quantity}</div>
                  </div>
                  {item.special && (
                    <div className="text-sm text-gray-500 italic">
                      *{item.special}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {order.items.length > 2 && (
              <div className="text-sm text-gray-500 mt-2">
                +{order.items.length - 2} more items
              </div>
            )}
          </div>
        </div>
      ))}
      
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderList;   