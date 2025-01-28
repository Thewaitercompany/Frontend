"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Order {
  id: number;
  image: string;
  name: string;
  quantity: string;
  waiterDetails: string;
  customerDetails: string;
  status: "Pending" | "Preparing" | "Cooking" | "Ready";
}

const orders: Order[] = [
  {
    id: 1,
    image: "/fries.png",
    name: "Crispy Fries",
    quantity: "01",
    waiterDetails: "Mr Ram",
    customerDetails: "Mr Patel",
    status: "Preparing",
  },
  {
    id: 2,
    image: "/nugg.png",
    name: "Chicken Nuggets",
    quantity: "01",
    waiterDetails: "Mr Ram",
    customerDetails: "Mr Patel",
    status: "Pending",
  },
];

const statuses = ["Pending", "Preparing", "Cooking", "Ready"];

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
      {/* Today's Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg">Today&apos;s Overview</h2>
          <div className="flex gap-4">
            <Link
              href="/dashboard/tables"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              List of Tables
            </Link>
            <Link
              href="/dashboard/menu"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              Restaurant&apos;s Menu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            href="/dashboard/total-orders"
            className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors"
          >
            <h3 className="text-sm text-gray-600 mb-2">Total Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">200</p>
          </Link>
          <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h3 className="text-sm text-black mb-1">Completed Orders</h3>
            <p className="text-2xl font-normal text-[#C99E5A]">170</p>
          </div>
          <Link
            href="/dashboard/pending-orders"
            className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors"
          >
            <h3 className="text-sm text-gray-600 mb-2">Pending Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">30</p>
          </Link>
          <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h3 className="text-sm text-black mb-1">Total Sales</h3>
            <p className="text-2xl font-normal text-[#C99E5A]">50,000</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h3 className="text-sm text-black mb-1">Total Profit</h3>
            <p className="text-2xl font-normal text-[#C99E5A]">22,000</p>
          </div>
        </div>
      </div>
      {/* Pending Orders Section */}
      <div className="bg-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Pending Orders</h2>
          <p className="text-sm text-gray-600">Prepared by: Mr Cook</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">Image</th>
                <th className="text-left py-4 px-4 font-medium">Name</th>
                <th className="text-left py-4 px-4 font-medium">Quantity</th>
                <th className="text-left py-4 px-4 font-medium">
                  Waiter Details
                </th>
                <th className="text-left py-4 px-4 font-medium">
                  Customer Details
                </th>
                <th className="text-left py-4 px-4 font-medium">Order Time</th>
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
      </div>
    </div>
  );
}
