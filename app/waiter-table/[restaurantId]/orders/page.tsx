"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";
import OrderList, { Order } from "@/components/waiter-table/OrderList";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:50am",
    status: "pending",
    items: [
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
  },
  {
    id: "123455",
    tableNumber: "03",
    time: "09:41am",
    status: "served",
    items: [
      {
        id: "3",
        name: "Rajma Chawal",
        price: 130,
        quantity: 1,
        image: "/placeholder.svg",
        special: "Extra spices, don't add dhania",
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
  },
  {
    id: "123454",
    tableNumber: "05",
    time: "09:35am",
    status: "completed",
    items: [
      {
        id: "4",
        name: "Butter Naan",
        price: 25,
        quantity: 4,
        image: "/placeholder.svg",
      },
      {
        id: "5",
        name: "Paneer Butter Masala",
        price: 180,
        quantity: 1,
        image: "/placeholder.svg",
        special: "extra butter",
      },
      {
        id: "6",
        name: "Jeera Rice",
        price: 90,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
  },
];

export default function OrdersPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // In a real application, you would fetch orders data from an API
    // Example:
    // const fetchOrders = async () => {
    //   try {
    //     const response = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/orders`);
    //     const data = await response.json();
    //     setOrders(data);
    //     setFilteredOrders(data);
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   }
    // };
    // fetchOrders();

    // For now, we'll use mock data
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, [restaurantId]);

  useEffect(() => {
    // Filter orders based on search query and active tab
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.includes(searchQuery) ||
          order.tableNumber.includes(searchQuery) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, activeTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search orders, items, or table numbers"
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white text-gray-700 placeholder:text-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#B39793]"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center">
          <div className="flex justify-between bg-white rounded-full p-1 w-full">
            <button
              onClick={() => handleTabChange("all")}
              className={`rounded-full flex-1 py-1.5 text-sm ${
                activeTab === "all"
                  ? "bg-[#B39793] text-white"
                  : "text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("pending")}
              className={`rounded-full flex-1 py-1.5 text-sm ${
                activeTab === "pending"
                  ? "bg-[#B39793] text-white"
                  : "text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleTabChange("served")}
              className={`rounded-full flex-1 py-1.5 text-sm ${
                activeTab === "served"
                  ? "bg-[#B39793] text-white"
                  : "text-gray-700"
              }`}
            >
              Served
            </button>
            <button
              onClick={() => handleTabChange("completed")}
              className={`rounded-full flex-1 py-1.5 text-sm ${
                activeTab === "completed"
                  ? "bg-[#B39793] text-white"
                  : "text-gray-700"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-[#4E3E3B] font-medium">
          Orders ({filteredOrders.length})
        </div>
      </div>

      <OrderList orders={filteredOrders} restaurantId={restaurantId} />
    </div>
  );
}
