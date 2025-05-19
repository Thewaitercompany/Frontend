"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ReceiveOrder from "@/components/waiter-table/ReceiveOrder";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

// Mock orders data
const mockOrders: Record<
  string,
  {
    id: string;
    tableNumber: string;
    items: OrderItem[];
  }
> = {
  "123456": {
    id: "123456",
    tableNumber: "01",
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
};

export default function ReceiveOrderPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const restaurantId = params.restaurantId as string;
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the order data from an API
    // For now, use mock data
    if (orderId && mockOrders[orderId]) {
      setOrder(mockOrders[orderId]);
    } else {
      setError("Order not found");
    }
    setLoading(false);
  }, [orderId]);

  const handleAccept = async () => {
    try {
      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/waiter/${restaurantId}/orders/${orderId}/accept`, {
      //   method: "POST",
      // });

      // Navigate back to dashboard
      router.push(`/waiter-table/${restaurantId}/dashboard`);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async () => {
    try {
      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/waiter/${restaurantId}/orders/${orderId}/reject`, {
      //   method: "POST",
      // });

      // Navigate back to dashboard
      router.push(`/waiter-table/${restaurantId}/dashboard`);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return null; // Loading state is handled by the parent layout
  }

  if (error || !order) {
    // Handle error state
    return null; // Could show an error message, but for now just let user navigate back
  }

  return (
    <ReceiveOrder
      orderId={order.id}
      tableNumber={order.tableNumber}
      items={order.items}
      onAccept={handleAccept}
      onReject={handleReject}
      onClose={handleClose}
    />
  );
}
