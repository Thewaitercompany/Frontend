"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrderDetail from "@/components/waiter-table/OrderDetail";
import { Order } from "@/components/waiter-table/OrderList";

// Mock data for orders (same as in the orders page)
const mockOrders: Order[] = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:50am",
    status: "pending",
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
  {
    id: "123455",
    tableNumber: "03",
    time: "09:41am",
    status: "served",
    items: [
      {
        id: "3",
        name: "Rajma Chawal",
        price: 130,
        quantity: 1,
        image: "/placeholder.svg",
        special: "Extra spices, don't add dhania",
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
  },
  {
    id: "123454",
    tableNumber: "05",
    time: "09:35am",
    status: "completed",
    items: [
      {
        id: "4",
        name: "Butter Naan",
        price: 25,
        quantity: 4,
        image: "/placeholder.svg",
      },
      {
        id: "5",
        name: "Paneer Butter Masala",
        price: 180,
        quantity: 1,
        image: "/placeholder.svg",
        special: "extra butter",
      },
      {
        id: "6",
        name: "Jeera Rice",
        price: 90,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
  },
];

// Mock customer data
const mockCustomers = {
  "123456": { name: "Walk-in Customer", phone: "" },
  "123455": { name: "Mohan Pyare", phone: "9219531234" },
  "123454": { name: "Ram Singh", phone: "9249331234" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "" });

  useEffect(() => {
    // In a real application, you would fetch the order data from an API
    // Example:
    // const fetchOrder = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`https://backend-axu7.onrender.com/orders/${orderId}`);
    //     if (!response.ok) {
    //       throw new Error("Order not found");
    //     }
    //     const data = await response.json();
    //     setOrder(data);
    //
    //     // Fetch customer info
    //     const customerResponse = await fetch(`https://backend-axu7.onrender.com/orders/${orderId}/customer`);
    //     if (customerResponse.ok) {
    //       const customerData = await customerResponse.json();
    //       setCustomerInfo({
    //         name: customerData.name || "Walk-in Customer",
    //         phone: customerData.phone || ""
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching order:", error);
    //     setError(error.message || "Failed to load order");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrder();

    // For now, we'll use mock data
    const mockOrder = mockOrders.find((o) => o.id === orderId);
    if (mockOrder) {
      setOrder(mockOrder);
      setCustomerInfo(
        mockCustomers[orderId as keyof typeof mockCustomers] || {
          name: "Walk-in Customer",
          phone: "",
        }
      );
    } else {
      setError("Order not found");
    }
    setLoading(false);
  }, [orderId]);

  const handleStatusChange = (
    newStatus: "pending" | "served" | "completed"
  ) => {
    if (order) {
      setOrder({ ...order, status: newStatus });
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

      <OrderDetail
        order={order}
        customerName={customerInfo.name}
        customerPhone={customerInfo.phone}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
