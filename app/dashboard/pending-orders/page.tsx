"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  name: string;
  quantity: number;
}

interface APIOrder {
  items: OrderItem[];
  status: "pending" | "preparing" | "cooking" | "ready";
  waiterDetails?: string;
  customerDetails?: string;
  image?: string;
}

interface Order {
  id: number;
  name: string;
  quantity: number;
  status: "pending" | "preparing" | "cooking" | "ready";
  waiterDetails: string;
  customerDetails: string;
  image: string;
}

const statuses: Order["status"][] = ["pending", "preparing", "cooking", "ready"];

function OrderProgressBar({ status }: { status: Order["status"] }) {
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="flex items-center gap-1">
      {statuses.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div
              className={`h-2 w-16 rounded ${
                index <= currentIndex ? "bg-[#C99E5A]" : "bg-gray-200"
              }`}
            />
            <span className="text-xs ml-1">{step}</span>
          </div>
          {index < statuses.length - 1 && <div className="h-2 w-2" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function PendingOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("https://qr-customer-sj9m.onrender.com/orders"); // Adjust URL if needed
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: APIOrder[] = await response.json();

        const formattedOrders: Order[] = data.map((order, index) => ({
          id: index + 1,
          name: order.items?.[0]?.name || "Unknown Item",
          quantity: order.items?.[0]?.quantity || 0,
          status: order.status,
          waiterDetails: order.waiterDetails || "To be updated",
          customerDetails: order.customerDetails || "To be updated",
          image: order.image || "/default-food.png",
        }));

        setOrders(formattedOrders);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6 font-serif">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={150}
              height={50}
              className="h-8 lg:h-10 w-auto"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl">Badshah&apos;s Kitchen</span>
        </div>
        <div className="text-right">
          <Link href="/dashboard">
            <h2 className="text-xl font-medium">Dashboard</h2>
          </Link>
          <p className="text-sm text-gray-600">Saturday, November, 2024</p>
        </div>
      </header>

      {/* Pending Orders Section */}
      <div className="bg-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Pending Orders</h2>
          <p className="text-sm text-gray-600">Prepared by: Mr. Cook</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No pending orders.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Image</th>
                  <th className="text-left py-4 px-4 font-medium">Name</th>
                  <th className="text-left py-4 px-4 font-medium">Quantity</th>
                  <th className="text-left py-4 px-4 font-medium">Waiter Details</th>
                  <th className="text-left py-4 px-4 font-medium">Customer Details</th>
                  <th className="text-left py-4 px-4 font-medium">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-4 px-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={order.image}
                          alt={order.name}
                          fill
                          className="object-cover rounded-lg"
                          style={{
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">{order.name}</td>
                    <td className="py-4 px-4">{order.quantity}</td>
                    <td className="py-4 px-4">{order.waiterDetails}</td>
                    <td className="py-4 px-4">{order.customerDetails}</td>
                    <td className="py-4 px-4">
                      <OrderProgressBar status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
