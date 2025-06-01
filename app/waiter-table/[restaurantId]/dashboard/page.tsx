"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, ClipboardList, Bell, X } from "lucide-react";
import TableGrid from "@/components/waiter-table/TableGrid";
import { Button } from "@/components/ui/button";

// Dummy pending orders data
const dummyPendingOrders = [
  {
    orderNo: "123456",
    time: "09:50am",
    tableNo: "01",
    items: [
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
    status: "pending",
  },
];

// Mock data for tables (same as before)
const mockTables = [
  {
    id: "01",
    number: "01",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 250,
  },
  { id: "02", number: "02", status: "available" as const, capacity: "0/4" },
  {
    id: "03",
    number: "03",
    status: "booked" as const,
    capacity: "4/4",
    runningBill: 550,
  },
  {
    id: "04",
    number: "04",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 170,
  },
  {
    id: "05",
    number: "05",
    status: "booked" as const,
    capacity: "6/6",
    runningBill: 1250,
  },
  { id: "06", number: "06", status: "available" as const, capacity: "0/6" },
  { id: "07", number: "07", status: "available" as const, capacity: "0/4" },
  {
    id: "08",
    number: "08",
    status: "booked" as const,
    capacity: "6/6",
    runningBill: 750,
  },
  {
    id: "09",
    number: "09",
    status: "booked" as const,
    capacity: "4/6",
    runningBill: 150,
  },
  {
    id: "10",
    number: "10",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 280,
  },
  { id: "11", number: "11", status: "available" as const, capacity: "0/4" },
  {
    id: "12",
    number: "12",
    status: "booked" as const,
    capacity: "4/4",
    runningBill: 450,
  },
];

export default function WaiterDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;

  const [tables, setTables] = useState(mockTables);
  const [filteredTables, setFilteredTables] = useState(mockTables);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"receive" | "pending">("receive");
  const [showReceiveOrderModal, setShowReceiveOrderModal] = useState(false);
  const [showPendingOrdersModal, setShowPendingOrdersModal] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(dummyPendingOrders);
  const [customerForm, setCustomerForm] = useState({
    mobile: "",
    name: "",
    people: "",
  });

  // Filtering logic
  React.useEffect(() => {
    let filtered = tables;
    if (searchQuery) {
      filtered = filtered.filter((table) =>
        table.number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((table) => table.status === filterStatus);
    }
    setFilteredTables(filtered);
  }, [tables, searchQuery, filterStatus]);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleFilterClick = (status: string) => {
    setFilterStatus(status === filterStatus ? null : status);
    setIsFilterMenuOpen(false);
  };

  // Dummy: open receive order modal when clicking Receive Order
  const handleReceiveOrder = () => {
    setShowReceiveOrderModal(true);
  };
  // Dummy: open pending orders modal when clicking Pending Orders
  const handlePendingOrders = () => {
    setShowPendingOrdersModal(true);
  };

  // Dummy: handle customer form submit
  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReceiveOrderModal(false);
    setCustomerForm({ mobile: "", name: "", people: "" });
    // Optionally, add logic to update table state
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] pb-24">
      {/* Top Navigation Tabs */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-[#F5F1EB] sticky top-0 z-20">
        <div className="flex gap-2 w-full">
          <button
            className={`flex-1 py-2 rounded-t-lg border-b-2 text-sm font-medium transition-colors ${
              activeTab === "receive"
                ? "border-[#B39793] bg-white text-[#B39793]"
                : "border-transparent bg-[#F5F1EB] text-gray-700"
            }`}
            onClick={() => setActiveTab("receive")}
          >
            Receive order
          </button>
          <button
            className={`flex-1 py-2 rounded-t-lg border-b-2 text-sm font-medium transition-colors relative ${
              activeTab === "pending"
                ? "border-[#B39793] bg-white text-[#B39793]"
                : "border-transparent bg-[#F5F1EB] text-gray-700"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending orders
            {pendingOrders.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-[#B39793] text-white rounded-full text-xs absolute -top-2 right-2">
                {pendingOrders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search tables"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white text-gray-700 placeholder:text-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#B39793]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="p-2.5 bg-white rounded-full flex items-center justify-center relative ml-2"
          >
            <Filter className="h-5 w-5 text-gray-600" />
            {filterStatus && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B39793] rounded-full"></span>
            )}
          </button>
        </div>
        {isFilterMenuOpen && (
          <div className="bg-white rounded-lg shadow-md p-3 space-y-1 mt-2 animate-in slide-in-from-top duration-200">
            <button
              onClick={() => handleFilterClick("occupied")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                filterStatus === "occupied"
                  ? "bg-[#fff3e0] text-[#f57c00]"
                  : "hover:bg-gray-100"
              }`}
            >
              Occupied Tables
            </button>
            <button
              onClick={() => handleFilterClick("available")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                filterStatus === "available"
                  ? "bg-[#e8f5e9] text-[#43a047]"
                  : "hover:bg-gray-100"
              }`}
            >
              Available Tables
            </button>
            <button
              onClick={() => handleFilterClick("booked")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                filterStatus === "booked"
                  ? "bg-[#ffebee] text-[#e53935]"
                  : "hover:bg-gray-100"
              }`}
            >
              Booked Tables
            </button>
          </div>
        )}
      </div>

      {/* Table Grid */}
      <div className="px-4">
        <TableGrid tables={filteredTables} restaurantId={restaurantId} />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 space-y-3 z-30">
        <Button
          onClick={handlePendingOrders}
          className="rounded-full h-12 w-12 bg-[#B39793] hover:bg-[#a08884] flex items-center justify-center shadow-md p-0"
        >
          <ClipboardList className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleReceiveOrder}
          className="rounded-full h-12 w-12 bg-[#B39793] hover:bg-[#a08884] flex items-center justify-center shadow-md p-0"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      {/* Receive Order Modal */}
      {showReceiveOrderModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">
                Enter Customer&apos;s Mobile Number
              </h2>
              <button
                onClick={() => setShowReceiveOrderModal(false)}
                aria-label="Close customer form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCustomerFormSubmit} className="p-4 space-y-4">
              <div>
                <input
                  value={customerForm.mobile}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, mobile: e.target.value })
                  }
                  placeholder="+91"
                  className="w-full border rounded-md px-3 py-2 mb-2"
                />
              </div>
              <div>
                <input
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, name: e.target.value })
                  }
                  placeholder="Enter Customer's Name"
                  className="w-full border rounded-md px-3 py-2 mb-2"
                />
              </div>
              <div>
                <input
                  value={customerForm.people}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, people: e.target.value })
                  }
                  placeholder="Enter Number of people"
                  className="w-full border rounded-md px-3 py-2"
                  type="number"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#B39793] text-white"
                aria-label="Receive order"
              >
                Receive Order
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Pending Orders Modal */}
      {showPendingOrdersModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">Pending Orders</h2>
              <button
                onClick={() => setShowPendingOrdersModal(false)}
                aria-label="Close pending orders"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {pendingOrders.length === 0 ? (
                <div className="text-center text-gray-500">
                  No pending orders
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <div
                    key={order.orderNo}
                    className="bg-[#F5F1EB] rounded-lg p-3 mb-2"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">
                        Order No.: {order.orderNo}
                      </div>
                      <div className="text-xs text-gray-500">{order.time}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              ₹ {item.price} x{item.quantity}
                            </div>
                            {item.special && (
                              <div className="text-xs italic text-gray-400">
                                *{item.special}
                              </div>
                            )}
                          </div>
                          <Button
                            className="bg-[#B39793] text-white px-4 py-1 rounded"
                            size="sm"
                          >
                            Served
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
