"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PendingOrdersList from "@/components/chef/PendingOrdersList";

// Mock data for pending orders
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
        prepared: true,
      },
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
        prepared: false,
      },
    ],
  },
  {
    id: "123455",
    tableNumber: "03",
    time: "09:35am",
    items: [
      {
        id: "3",
        name: "Rajma Chawal",
        price: 130,
        quantity: 1,
        image: "/placeholder.svg",
        special: "Extra spices, don't add dhania",
        prepared: false,
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg",
        special: "without mayonnaise",
        prepared: true,
      },
    ],
  },
];

export default function PendingOrdersPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  const [pendingOrders, setPendingOrders] = useState(mockPendingOrders);

  useEffect(() => {
    // In a real application, you would fetch orders from an API
    // For now, we'll use mock data
    setPendingOrders(mockPendingOrders);

    // You might also set up a websocket or polling for real-time updates
  }, [restaurantId]);

  const handleMarkPrepared = (orderId: string, itemId: string) => {
    setPendingOrders((orders) =>
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) =>
              item.id === itemId ? { ...item, prepared: true } : item
            ),
          };
        }
        return order;
      })
    );

    // In a real application, you would make an API call
    // Example:
    // fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}/items/${itemId}/prepare`, {
    //   method: "POST",
    // });

    console.log(`Marked item ${itemId} in order ${orderId} as prepared`);
  };

  const handleCancelItem = (orderId: string, itemId: string) => {
    setPendingOrders((orders) =>
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.filter((item) => item.id !== itemId),
          };
        }
        return order;
      })
    );

    // In a real application, you would make an API call
    console.log(`Cancelled item ${itemId} in order ${orderId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-[#4E3E3B] mb-2">
          Pending Orders
        </h1>
        <p className="text-gray-600">
          Track and manage orders that are being prepared.
        </p>
      </div>

      <PendingOrdersList
        orders={pendingOrders}
        onMarkPrepared={handleMarkPrepared}
        onCancelItem={handleCancelItem}
      />
    </div>
  );
}
