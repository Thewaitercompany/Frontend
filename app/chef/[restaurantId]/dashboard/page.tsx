"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Bell } from "lucide-react";
import OrderCard from "@/components/chef/OrderCard";

// Mock orders data
const mockPendingOrders = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:41am",
    items: [
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
  },
];

export default function ChefDashboardPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  const [pendingOrders, setPendingOrders] = useState(mockPendingOrders);

  useEffect(() => {
    // In a real application, you would fetch orders from an API
    // For now, we'll use mock data
    setPendingOrders(mockPendingOrders);

    // You might also set up a websocket or polling for real-time updates
    // const interval = setInterval(() => {
    //   fetchOrders();
    // }, 10000);
    //
    // return () => clearInterval(interval);
  }, [restaurantId]);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}/accept`, {
      //   method: "POST",
      // });

      // For now, just remove the order from the pending list
      setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));

      // Show a success notification or something similar
      console.log("Order accepted:", orderId);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}/reject`, {
      //   method: "POST",
      // });

      // For now, just remove the order from the pending list
      setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));

      // Show a success notification or something similar
      console.log("Order rejected:", orderId);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleMarkPrepared = async (orderId: string, itemId: string) => {
    // This is for individual item preparation in the pending orders list
    // In this dashboard, we don't need this functionality
    console.log("Mark prepared:", orderId, itemId);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-[#4E3E3B] mb-2">
          Welcome, Chef!
        </h1>
        <p className="text-gray-600">
          Here are the new orders that need your attention.
        </p>
      </div>

      {pendingOrders.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-medium text-[#4E3E3B]">
            <Bell className="h-5 w-5 text-[#B39793]" />
            <span>New Orders ({pendingOrders.length})</span>
          </div>

          {pendingOrders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={order.id}
              tableNumber={order.tableNumber}
              time={order.time}
              items={order.items}
              onAccept={() => handleAcceptOrder(order.id)}
              onReject={() => handleRejectOrder(order.id)}
              onMarkPrepared={(itemId) => handleMarkPrepared(order.id, itemId)}
              showActions={true}
              isPrepared={false}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            No New Orders
          </h2>
          <p className="text-gray-500">All orders have been processed.</p>
        </div>
      )}
    </div>
  );
}
