"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Order {
  id: number;
  image: string;
  name: string;
  price: number;
  date: string;
  time: string;
  tableNo: number;
  contactDetails: string;
  category: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    image: "/fries.png",
    name: "Crispy Fries",
    price: 60,
    date: "02/11/24",
    time: "9:15pm",
    tableNo: 10,
    contactDetails: "Mr Patel/9897xxxxxx",
    category: "Starters",
  },
  {
    id: 2,
    image: "/nugg.png",
    name: "Chicken Nuggets",
    price: 80,
    date: "02/11/24",
    time: "8:35pm",
    tableNo: 10,
    contactDetails: "Mr Patel/9897xxxxxx",
    category: "Starters",
  },
];

export default function TotalOrders() {
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const categories = [
    "Starters",
    "Drinks",
    "Desserts",
    "Main Course",
    "All Items",
  ];

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("https://qr-customer-sj9m.onrender.com/orders");
        const data = await response.json();
        
        // Flattening orders: Display each item as a separate row
        const formattedOrders: OrderItem[] = data.flatMap((order: any) =>
          order.items.map((item: any) => ({
            id: item._id,
            image: item.image || "/default.png",
            name: item.name,
            price: item.price,
            orderId: order._id, // Unique order reference
            date: new Date(order.createdAt).toLocaleDateString(),
            time: new Date(order.createdAt).toLocaleTimeString(),
            tableNo: order.tableNumber,
            contactDetails: order.contactDetails || "Unknown",
            category: item.category || "Uncategorized",
          }))
        );

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders =
    selectedCategory === "All Items"
      ? orders
      : orders.filter((order) => order.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-8 font-serif">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={150}
              height={50}
              className="h-8 w-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl">Badshah&apos;s Kitchen</span>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-medium">Dashboard</h2>
          <p className="text-sm text-gray-600">Saturday, November, 2024</p>
        </div>
      </header>

      {/* Overview Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium">Today&apos;s Overview</h2>
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

        <div className="grid grid-cols-5 gap-6">
          <Link
            href="/dashboard/total-orders"
            className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors"
          >
            <h3 className="text-sm text-gray-600 mb-2">Total Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">200</p>
          </Link>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Completed Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">170</p>
          </div>
          <Link
            href="/dashboard/pending-orders"
            className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors"
          >
            <h3 className="text-sm text-gray-600 mb-2">Pending Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">30</p>
          </Link>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Total Sales</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">50,000</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Total Profit</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">22,000</p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  category === selectedCategory
                    ? "bg-[#C99E5A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">Image</th>
                <th className="text-left py-4 px-4 font-medium">Name</th>
                <th className="text-left py-4 px-4 font-medium">Price</th>
                <th className="text-left py-4 px-4 font-medium">Date</th>
                <th className="text-left py-4 px-4 font-medium">Time</th>
                <th className="text-left py-4 px-4 font-medium">Table No.</th>
                <th className="text-left py-4 px-4 font-medium">
                  Contact Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-4 px-4">
                    <Image
                      src={order.image}
                      alt={order.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-4 px-4">{order.name}</td>
                  <td className="py-4 px-4">₹ {order.price}</td>
                  <td className="py-4 px-4">{order.date}</td>
                  <td className="py-4 px-4">{order.time}</td>
                  <td className="py-4 px-4">{order.tableNo}</td>
                  <td className="py-4 px-4">{order.contactDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
