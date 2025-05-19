"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// Mock data for pending orders
const mockPendingOrders = [
  {
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
];

export default function PendingOrdersPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;

  const [pendingOrders, setPendingOrders] = useState(mockPendingOrders);

  useEffect(() => {
    // In a real application, you would fetch orders from an API
    // For now, we'll use mock data
    setPendingOrders(mockPendingOrders);

    // You might also set up a websocket or polling for real-time updates
  }, [restaurantId]);

  const handleMarkServed = (orderId: string, itemId: string) => {
    setPendingOrders(
      (orders) =>
        orders
          .map((order) => {
            if (order.id === orderId) {
              // Check if all items are now prepared
              const updatedItems = order.items.map((item) =>
                item.id === itemId ? { ...item, prepared: true } : item
              );

              // If all items are prepared, remove the order from pending list
              if (updatedItems.every((item) => item.prepared)) {
                return null;
              }

              return {
                ...order,
                items: updatedItems,
              };
            }
            return order;
          })
          .filter(Boolean) as typeof pendingOrders
    );

    // In a real application, you would make an API call
    // Example:
    // fetch(`https://backend-axu7.onrender.com/waiter/${restaurantId}/orders/${orderId}/items/${itemId}/serve`, {
    //   method: "POST",
    // });

    console.log(`Marked item ${itemId} in order ${orderId} as served`);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5 text-[#4E3E3B]" />
          </button>
          <h1 className="text-xl font-medium text-[#4E3E3B]">Pending Orders</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Orders that need to be served to customers.
        </p>
      </div>

      {pendingOrders.length > 0 ? (
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-3">
                <div className="font-medium">Order No: {order.id}</div>
                <div className="text-sm text-gray-600">
                  Table no. {order.tableNumber} • {order.time}
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
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
                          <div className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-md">
                            Prepared
                          </div>
                        ) : (
                          <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md">
                            Preparing
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  router.push(
                    `/waiter-table/${restaurantId}/table-details/${order.tableNumber}`
                  )
                }
                className="w-full mt-4 py-2 bg-[#9D8480] text-white rounded-md"
              >
                Go to Table
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-5xl mb-3">🍽️</div>
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            No Pending Orders
          </h2>
          <p className="text-gray-500">All orders have been served.</p>
        </div>
      )}
    </div>
  );
}
