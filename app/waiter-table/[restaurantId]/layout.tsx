"use client";

import React from "react";
import { useParams } from "next/navigation";
import WaiterNav from "@/components/waiter-table/WaiterNav";
import WaiterFooterNav from "@/components/waiter-table/WaiterFooterNav";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  // In a real application, you would fetch restaurant data here
  // For now, we'll use a mock restaurant name
  const restaurantName = "Smart cafe";

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <WaiterNav restaurantId={restaurantId} restaurantName={restaurantName} />
      <main className="flex-1 p-4 pb-20">{children}</main>
    </div>
  );
}
