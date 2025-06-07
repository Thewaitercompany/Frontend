"use client";

import React, { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import MenuNewOrderFlow from "./MenuNewOrderFlow";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface OrderNewProps {
  restaurantId: string;
  tableId: string;
  onClose: () => void;
  onSubmitOrder: (items: OrderItem[]) => void;
}

const OrderNew: React.FC<OrderNewProps> = ({
  restaurantId,
  tableId,
  onClose,
  onSubmitOrder,
}) => {
  const [, setSelectedItems] = useState<OrderItem[]>([]);

  const handleOrderConfirm = (items: OrderItem[]) => {
    setSelectedItems(items);
    onSubmitOrder(items);
  };

  return (
    <div className="fixed inset-0 bg-[#F5F1EB] z-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center border-b">
        <button onClick={onClose} className="mr-3" aria-label="Close new order">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="font-medium">New Order - Table {tableId}</h2>
        </div>
        <button onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Menu Selection */}
      <MenuNewOrderFlow
        restaurantId={restaurantId}
        tableId={tableId}
        onClose={onClose}
        onOrderConfirm={handleOrderConfirm}
      />
    </div>
  );
};

export default OrderNew;
