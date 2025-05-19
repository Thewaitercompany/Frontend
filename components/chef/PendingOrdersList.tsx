"use client";

import React, { useState } from "react";
import { ChefHat } from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
  prepared?: boolean;
}

interface PendingOrder {
  id: string;
  tableNumber: string;
  time: string;
  items: OrderItem[];
}

interface PendingOrdersListProps {
  orders: PendingOrder[];
  onMarkPrepared: (orderId: string, itemId: string) => void;
}

const PendingOrdersList: React.FC<PendingOrdersListProps> = ({
  orders,
  onMarkPrepared,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleMarkPrepared = (orderId: string, itemId: string) => {
    onMarkPrepared(orderId, itemId);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <ChefHat className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No pending orders at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div
            className="p-4 border-b flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpandOrder(order.id)}
          >
            <div>
              <div className="font-medium">Order No: {order.id}</div>
              <div className="text-sm text-gray-600">
                Table no. {order.tableNumber} • {order.time}
              </div>
            </div>
            <div className="text-sm font-medium bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              {order.items.filter((item) => !item.prepared).length} items
            </div>
          </div>

          {expandedOrderId === order.id && (
            <div className="p-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${order.id}-${item.id}`}
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
                        <div className="text-sm text-gray-500">
                          x{item.quantity}
                        </div>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkPrepared(order.id, item.id);
                          }}
                          className="px-3 py-1.5 bg-[#9D8480] text-white rounded-md text-sm"
                        >
                          Prepared
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PendingOrdersList;
