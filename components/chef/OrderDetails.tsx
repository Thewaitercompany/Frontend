"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
  prepared?: boolean;
}

interface OrderDetailsProps {
  orderId: string;
  tableNumber: string;
  time: string;
  items: OrderItem[];
  onMarkPrepared: (itemId: string) => void;
  onMarkAllPrepared: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  tableNumber,
  time,
  items,
  onMarkPrepared,
  onMarkAllPrepared,
}) => {
  const [loading, setLoading] = useState(false);

  const handleMarkPrepared = async (itemId: string) => {
    setLoading(true);
    try {
      await onMarkPrepared(itemId);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllPrepared = async () => {
    setLoading(true);
    try {
      await onMarkAllPrepared();
    } finally {
      setLoading(false);
    }
  };

  const allPrepared = items.every((item) => item.prepared);
  const anyPrepared = items.some((item) => item.prepared);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">Order No: {orderId}</div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">{time}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">Table no. {tableNumber}</div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="font-medium">Order Items</h3>

        {items.map((item) => (
          <div
            key={`${orderId}-${item.id}`}
            className="flex items-center gap-3"
          >
            <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">x{item.quantity}</div>
                  {item.special && (
                    <div className="text-sm text-amber-600 italic">
                      *{item.special}
                    </div>
                  )}
                </div>
                {item.prepared ? (
                  <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm">
                    Prepared
                  </div>
                ) : (
                  <button
                    onClick={() => handleMarkPrepared(item.id)}
                    className="px-3 py-1.5 bg-[#9D8480] text-white rounded-md text-sm"
                    disabled={loading}
                  >
                    Prepared
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!allPrepared && (
        <div className="p-4 bg-gray-50 border-t">
          <Button
            onClick={handleMarkAllPrepared}
            className="w-full bg-[#9D8480] text-white py-2.5 rounded-md"
            disabled={loading}
          >
            {anyPrepared ? "Mark All as Prepared" : "Start Preparing"}
          </Button>
        </div>
      )}

      {allPrepared && (
        <div className="p-4 bg-green-50 border-t flex items-center justify-center">
          <ChefHat className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">All Items Prepared</span>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
