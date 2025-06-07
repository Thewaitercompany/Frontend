"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import NewOrderFlow from "@/components/waiter-table/NewOrderFlow";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

export default function NewOrderPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const tableId = params.tableId as string;

  const handleClose = () => {
    router.back();
  };

  const handleOrderConfirm = (items: OrderItem[]) => {
    // In a real application, you would make an API call to save the order
    // For now, we'll use the URL to pass the order data back
    const orderData = encodeURIComponent(JSON.stringify(items));
    router.push(
      `/waiter-table/${restaurantId}/table-details/${tableId}?order=${orderData}`
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1EB]">
      <NewOrderFlow
        restaurantId={restaurantId}
        tableId={tableId}
        onClose={handleClose}
        onOrderConfirm={handleOrderConfirm}
      />
    </div>
  );
}
