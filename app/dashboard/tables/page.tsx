"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { FaChair, FaUtensils, FaPrint, FaDownload } from "react-icons/fa";

interface Table {
  id: string;
  totalSeats: number;
  occupiedSeats: number;
  status: "available" | "booked" | "partially-occupied";
  price: number;
}

const TABLES = [
  {
    id: "01",
    totalSeats: 4,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 250,
  },
  { id: "02", totalSeats: 4, occupiedSeats: 0, status: "available", price: 0 },
  { id: "03", totalSeats: 4, occupiedSeats: 4, status: "booked", price: 1250 },
  {
    id: "04",
    totalSeats: 6,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 350,
  },
  {
    id: "05",
    totalSeats: 4,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 250,
  },
  { id: "06", totalSeats: 6, occupiedSeats: 0, status: "available", price: 0 },
  { id: "07", totalSeats: 6, occupiedSeats: 6, status: "booked", price: 1050 },
  {
    id: "08",
    totalSeats: 4,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 150,
  },
  {
    id: "09",
    totalSeats: 4,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 350,
  },
  {
    id: "10",
    totalSeats: 4,
    occupiedSeats: 2,
    status: "partially-occupied",
    price: 0,
  },
  { id: "11", totalSeats: 6, occupiedSeats: 6, status: "booked", price: 1050 },
  { id: "12", totalSeats: 6, occupiedSeats: 6, status: "booked", price: 1050 },
];

const DUMMY_ORDERS = [
  {
    orderNo: "421420",
    items: [
      {
        name: "Crispy fries",
        price: 60,
        qty: 1,
        note: "Extra mayonnaise and less spicy",
        image: "/fries.png",
        status: "served",
        received: "11:45am",
        prepared: "Cook",
        preparedTime: "12:05pm",
      },
      {
        name: "Chicken nuggets",
        price: 80,
        qty: 1,
        note: "Extra mayonnaise and less spicy",
        image: "/nugg.png",
        status: "served",
        received: "11:45am",
        prepared: "Cook",
        preparedTime: "12:05pm",
      },
    ],
    status: "served",
  },
  {
    orderNo: "421421",
    items: [
      {
        name: "Crispy fries",
        price: 60,
        qty: 1,
        note: "Extra mayonnaise and less spicy",
        image: "/fries.png",
        status: "cancelled",
        received: "11:45am",
        prepared: "Cook",
        preparedTime: "12:05pm",
      },
    ],
    status: "cancelled",
  },
];

const BILL_SUMMARY = {
  total: 140,
  gst: 14,
  totalBill: 154,
  orderMethod: "Dine-in",
  paymentMethod: "Google Pay",
  servedBy: "Mr Waiter",
  servedTo: "Mr Shyam Singh (9897xxxxxxx)",
};

// Dummy served-to data for booked tables
const SERVED_TO_LIST = [
  {
    orderId: "1234567890",
    servedTo: "Mr Shyam Singh (9897xxxxxxx)",
    seats: "2/4",
    price: 650,
    time: "03:45pm",
  },
  {
    orderId: "1234567891",
    servedTo: "Mr Rahul Singh (9897xxxxxxx)",
    seats: "2/4",
    price: 550,
    time: "04:05pm",
  },
];

export default function TableDetails() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState<(typeof TABLES)[0] | null>(
    null
  );
  const [showSummary, setShowSummary] = useState(false);
  const [showBill, setShowBill] = useState(false);

  const filteredTables = TABLES.filter((table) =>
    table.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTableStyles = (status: string) => {
    switch (status) {
      case "available":
        return "border-[#C99E5A] border-2 border-solid bg-white";
      case "booked":
        return "border-red-500 border-2 border-solid bg-white";
      case "partially-occupied":
        return "border-[#C99E5A] border-2 border-dashed bg-white";
      default:
        return "border-gray-300 border-2 border-solid bg-white";
    }
  };

  // Dummy: always show same orders for demo
  const handleTableClick = (table: (typeof TABLES)[0]) => {
    setSelectedTable(table);
    setShowSummary(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-4 font-serif">
      <main className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Table Details
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C99E5A] focus:border-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-6 bg-white rounded-xl px-6 py-4 border border-[#e5c99a] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#C99E5A] bg-white rounded"></div>
            <span className="text-base font-medium text-gray-700">
              Table Available
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-red-500 bg-white rounded"></div>
            <span className="text-base font-medium text-gray-700">
              Table Booked
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#C99E5A] border-dashed bg-white rounded"></div>
            <span className="text-base font-medium text-gray-700">
              Partially Occupied
            </span>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${getTableStyles(
                table.status
              )}`}
              onClick={() => handleTableClick(table)}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-gray-800">
                  {table.id}
                </span>
                <span className="flex items-center gap-1 text-lg text-gray-600">
                  <FaChair className="text-[#C99E5A]" /> {table.occupiedSeats}/
                  {table.totalSeats}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUtensils className="text-[#C99E5A] text-lg" />
                <span className="text-base font-semibold text-gray-700">
                  ₹{table.price}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    table.status === "available"
                      ? "bg-green-100 text-green-800"
                      : table.status === "booked"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {table.status.replace("-", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Summary Modal */}
        {showSummary && selectedTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowSummary(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Table Summary
                </h3>
                <div className="flex items-center gap-4 text-lg text-gray-600">
                  <FaChair className="text-[#C99E5A]" /> Table{" "}
                  {selectedTable.id}
                  <FaChair className="text-[#C99E5A]" />{" "}
                  {selectedTable.occupiedSeats}/{selectedTable.totalSeats}
                </div>
              </div>

              {/* Modal variant: Served-to only for booked tables */}
              {selectedTable.status === "booked" ? (
                <div className="space-y-4">
                  {SERVED_TO_LIST.map((entry, idx) => (
                    <div
                      key={entry.orderId}
                      className="border border-[#e5c99a] rounded-xl p-4 flex justify-between items-center bg-gray-50"
                    >
                      <div>
                        <div className="mb-2 text-base font-semibold text-gray-800">
                          Order Id.: {entry.orderId}
                        </div>
                        <div className="text-base font-semibold text-gray-700">
                          Served To:
                        </div>
                        <div className="text-base text-gray-600">
                          {entry.servedTo}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="flex items-center gap-1 text-lg text-gray-600">
                          <FaChair className="text-[#C99E5A]" /> {entry.seats}
                        </span>
                        <span className="flex items-center gap-1 text-lg text-gray-600">
                          <FaUtensils className="text-[#C99E5A]" /> ₹
                          {entry.price}
                        </span>
                        <span className="flex items-center gap-1 text-lg text-gray-600">
                          🕒 {entry.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Orders */}
                  <div className="space-y-4 mb-6">
                    {DUMMY_ORDERS.map((order, _idx) => (
                      <div
                        key={order.orderNo}
                        className="border border-[#e5c99a] rounded-xl p-4 bg-gray-50"
                      >
                        <div className="mb-3 text-lg font-semibold text-gray-800">
                          Order No.: {order.orderNo}
                        </div>
                        {order.items.map((item, iidx) => (
                          <div
                            key={iidx}
                            className="flex items-center gap-4 mb-3 p-3 bg-white rounded-lg"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#e5c99a] bg-gray-50 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-lg text-gray-800">
                                {item.name}
                              </div>
                              <div className="text-base text-gray-600">
                                ₹{item.price}{" "}
                                <span className="ml-2">x{item.qty}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                *{item.note}
                              </div>
                            </div>
                            {/* Progress bar and status */}
                            <div className="flex-1 flex flex-col gap-2 min-w-0">
                              <div
                                className={`h-3 rounded-full ${
                                  item.status === "served"
                                    ? "bg-green-500"
                                    : item.status === "cancelled"
                                    ? "bg-red-500"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="flex justify-between text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  Received{" "}
                                  <span className="ml-1">
                                    🕒 {item.received}
                                  </span>
                                </span>
                                <span className="flex items-center gap-1">
                                  Prepared{" "}
                                  <span className="ml-1">
                                    👨‍🍳 {item.prepared}
                                  </span>
                                </span>
                                <span className="flex items-center gap-1">
                                  {item.status === "served"
                                    ? "Served"
                                    : item.status === "cancelled"
                                    ? "Cancelled"
                                    : "--"}{" "}
                                  <span className="ml-1">
                                    🕒 {item.preparedTime}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Bill summary */}
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6 p-4 bg-gray-50 rounded-xl">
                    <div className="space-y-2">
                      <div className="flex justify-between w-40 text-base">
                        <span className="text-gray-600">Total</span>
                        <span className="font-semibold text-gray-800">
                          ₹{BILL_SUMMARY.total}
                        </span>
                      </div>
                      <div className="flex justify-between w-40 text-base">
                        <span className="text-gray-600">GST 10%</span>
                        <span className="font-semibold text-gray-800">
                          ₹{BILL_SUMMARY.gst}
                        </span>
                      </div>
                      <div className="flex justify-between w-40 text-lg font-bold text-gray-800 border-t pt-2">
                        <span>Total Bill</span>
                        <span>₹{BILL_SUMMARY.totalBill}</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-base">
                        <span className="text-gray-600">Order Method: </span>
                        <span className="font-semibold text-gray-800">
                          {BILL_SUMMARY.orderMethod}
                        </span>
                      </div>
                      <div className="text-base">
                        <span className="text-gray-600">Payment Method: </span>
                        <span className="font-semibold text-gray-800">
                          {BILL_SUMMARY.paymentMethod}
                        </span>
                      </div>
                      <div className="text-base">
                        <span className="text-gray-600">Served By: </span>
                        <span className="font-semibold text-gray-800">
                          {BILL_SUMMARY.servedBy}
                        </span>
                      </div>
                      <div className="text-base">
                        <span className="text-gray-600">Served To: </span>
                        <span className="font-semibold text-gray-800">
                          {BILL_SUMMARY.servedTo}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button
                          className="px-6 py-2 bg-[#C99E5A] text-white rounded-lg font-semibold text-base hover:bg-[#b88d4a] transition-colors"
                          onClick={() => alert("Finish Billing")}
                        >
                          Finish Billing
                        </button>
                        <button
                          className="px-6 py-2 bg-[#C99E5A] text-white rounded-lg font-semibold text-base hover:bg-[#b88d4a] transition-colors"
                          onClick={() => setShowBill(true)}
                        >
                          View Bill
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Bill Modal */}
        {showBill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowBill(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Bill</h3>
                <div className="flex items-center gap-3">
                  <button
                    className="text-[#C99E5A] hover:text-[#b88d4a] p-2"
                    title="Print Bill"
                  >
                    <FaPrint className="w-5 h-5" />
                  </button>
                  <button
                    className="text-[#C99E5A] hover:text-[#b88d4a] p-2"
                    title="Download Bill"
                  >
                    <FaDownload className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4 font-semibold text-base text-gray-800">
                Order Summary
              </div>
              <div className="space-y-3 mb-4">
                {DUMMY_ORDERS.map((order, _idx) => (
                  <div key={order.orderNo} className="border-b pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      Order Number: {order.orderNo}
                    </div>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-base text-gray-600 mb-1"
                      >
                        <span className="flex-1">
                          {item.name}
                          {item.status === "cancelled" && (
                            <span className="text-red-500 ml-1">
                              (cancelled)
                            </span>
                          )}
                        </span>
                        <span className="mx-4">{item.qty}</span>
                        <span className="font-semibold">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold text-gray-800">
                    ₹{BILL_SUMMARY.total}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">GST</span>
                  <span className="font-semibold text-gray-800">
                    ₹{BILL_SUMMARY.gst}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-2">
                  <span>Total Bill</span>
                  <span>₹{BILL_SUMMARY.totalBill}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
