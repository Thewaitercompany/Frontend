"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrderDetails from "@/components/chef/OrderDetails";

// Mock data for a specific order
const getMockOrder = (orderId: string) => {
  const mockOrders = {
    "123456": {
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
    "123455": {
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
  };

  return mockOrders[orderId as keyof typeof mockOrders] || null;
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the order data from an API
    // Example:
    // const fetchOrder = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}`);
    //     if (!response.ok) {
    //       throw new Error("Order not found");
    //     }
    //     const data = await response.json();
    //     setOrder(data);
    //   } catch (error) {
    //     console.error("Error fetching order:", error);
    //     setError(error.message || "Failed to load order");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrder();

    // For now, use mock data
    const mockOrder = getMockOrder(orderId);
    if (mockOrder) {
      setOrder(mockOrder);
    } else {
      setError("Order not found");
    }
    setLoading(false);
  }, [restaurantId, orderId]);

  const handleMarkPrepared = async (itemId: string) => {
    if (order) {
      // Update the local state
      setOrder({
        ...order,
        items: order.items.map((item: any) =>
          item.id === itemId ? { ...item, prepared: true } : item
        ),
      });

      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}/items/${itemId}/prepare`, {
      //   method: "POST",
      // });

      console.log(`Marked item ${itemId} in order ${orderId} as prepared`);
    }
  };

  const handleMarkAllPrepared = async () => {
    if (order) {
      // Update the local state
      setOrder({
        ...order,
        items: order.items.map((item: any) => ({ ...item, prepared: true })),
      });

      // In a real application, you would make an API call
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/chef/${restaurantId}/orders/${orderId}/prepare-all`, {
      //   method: "POST",
      // });

      console.log(`Marked all items in order ${orderId} as prepared`);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-t-[#B39793] border-r-[#B39793] border-b-[#B39793] border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error || "Order not found"}</div>
        <button
          onClick={handleBackClick}
          className="text-[#4E3E3B] font-medium flex items-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleBackClick}
        className="flex items-center text-[#4E3E3B] mb-4"
      >
        <ArrowLeft className="h-5 w-5 mr-1" /> Back to Orders
      </button>

      <OrderDetails
        orderId={order.id}
        tableNumber={order.tableNumber}
        time={order.time}
        items={order.items}
        onMarkPrepared={handleMarkPrepared}
        onMarkAllPrepared={handleMarkAllPrepared}
      />
    </div>
  );
}
