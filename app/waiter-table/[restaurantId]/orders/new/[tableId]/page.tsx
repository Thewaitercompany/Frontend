"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrderNew from "@/components/waiter-table/OrderNew";

export default function NewOrderPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const tableId = params.tableId as string;

  const handleClose = () => {
    router.back();
  };

  const handleSubmitOrder = (items: any[]) => {
    // In a real application, you would handle the order submission
    // For now, just log the items and navigate back
    console.log("Order submitted:", items);
    router.push(`/waiter-table/${restaurantId}/table-details/${tableId}`);
  };

  return (
    <OrderNew
      restaurantId={restaurantId}
      tableId={tableId}
      onClose={handleClose}
      onSubmitOrder={handleSubmitOrder}
    />
  );
}
