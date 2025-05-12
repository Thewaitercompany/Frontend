"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import NewOrderFlow from "@/components/waiter-table/NewOrderFlow";

export default function NewOrderPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const tableId = params.tableId as string;

  const handleClose = () => {
    router.back();
  };

  const handleOrderConfirm = (items: any[]) => {
    // In a real application, you would handle the order submission
    // For now, just navigate back to the table details
    console.log("Order confirmed with items:", items);
    router.push(`/waiter-table/${restaurantId}/table-details/${tableId}`);
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
