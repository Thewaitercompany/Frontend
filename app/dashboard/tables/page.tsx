"use client";

import React, { useState } from "react";
import Link from "next/link";
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
        return "border-[#C99E5A] border-2 border-solid";
      case "booked":
        return "border-red-500 border-2 border-solid";
      case "partially-occupied":
        return "border-[#C99E5A] border-2 border-dashed";
      default:
        return "border-gray-300 border-2 border-solid";
    }
  };

  // Dummy: always show same orders for demo
  const handleTableClick = (table: (typeof TABLES)[0]) => {
    setSelectedTable(table);
    setShowSummary(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-0 font-serif">
      {/* Header */}
      <header className="flex justify-between items-center px-10 pt-6 pb-2 bg-[#f5f1eb]">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="The Waiter Company Logo"
            width={90}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-2xl text-gray-700 font-medium ml-2">
            Smart Cafe
          </span>
        </div>
        <div className="text-right">
          <div className="text-base text-gray-700 font-medium">
            Thu 13 Mar 04:20PM
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Table Details</h2>
        {/* Legend */}
        <div className="flex items-center gap-8 mb-4 bg-white rounded-xl px-6 py-3 border border-[#e5c99a]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-[#C99E5A] w-5 h-5 rounded border-[#e5c99a]"
              readOnly
              title="Table Available"
              placeholder="Table Available"
            />
            <span className="text-base font-serif">Table Available</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-red-500 w-5 h-5 rounded border-red-500"
              readOnly
              title="Table Booked"
              placeholder="Table Booked"
            />
            <span className="text-base font-serif">Table Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-[#C99E5A] w-5 h-5 rounded border-[#C99E5A] border-dashed"
              readOnly
              title="Selected seat Occupied"
              placeholder="Selected seat Occupied"
            />
            <span className="text-base font-serif">Selected seat Occupied</span>
          </div>
        </div>
        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-lg cursor-pointer bg-white ${getTableStyles(
                table.status
              )}`}
              onClick={() => handleTableClick(table)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-medium">{table.id}</span>
                <span className="flex items-center gap-1 text-lg">
                  <FaChair className="inline-block" /> {table.occupiedSeats}/
                  {table.totalSeats}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaUtensils className="text-[#C99E5A]" />
                <span className="text-base font-serif">₹{table.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Summary Modal */}
        {showSummary && selectedTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[700px] max-w-full font-serif relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setShowSummary(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Table Summary</span>
                <span className="flex items-center gap-4 text-lg">
                  <FaChair /> {selectedTable.id}
                  <FaChair /> {selectedTable.occupiedSeats}/
                  {selectedTable.totalSeats}
                </span>
              </div>
              {/* Modal variant: Served-to only for booked tables */}
              {selectedTable.status === "booked" ? (
                <div>
                  {SERVED_TO_LIST.map((entry, idx) => (
                    <div
                      key={entry.orderId}
                      className="border border-[#e5c99a] rounded-xl mb-4 p-4 flex justify-between items-center"
                    >
                      <div>
                        <div className="mb-2 text-base font-semibold">
                          Order Id.: {entry.orderId}
                        </div>
                        <div className="text-base font-semibold">
                          Served To:
                        </div>
                        <div className="text-base">{entry.servedTo}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="flex items-center gap-1 text-lg">
                          <FaChair /> {entry.seats}
                        </span>
                        <span className="flex items-center gap-1 text-lg">
                          <FaUtensils className="text-[#C99E5A]" /> ₹
                          {entry.price}
                        </span>
                        <span className="flex items-center gap-1 text-lg">
                          🕒 {entry.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Orders */}
                  {DUMMY_ORDERS.map((order, idx) => (
                    <div
                      key={order.orderNo}
                      className="border border-[#e5c99a] rounded-xl mb-4 p-4"
                    >
                      <div className="mb-2 text-base font-semibold">
                        Order No.: {order.orderNo}
                      </div>
                      {order.items.map((item, iidx) => (
                        <div
                          key={iidx}
                          className="flex items-center gap-4 mb-2"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#e5c99a] bg-gray-50">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg">
                              {item.name}
                            </div>
                            <div className="text-base">
                              ₹{item.price}{" "}
                              <span className="ml-2">x{item.qty}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              *{item.note}
                            </div>
                          </div>
                          {/* Progress bar and status */}
                          <div className="flex-1 flex flex-col gap-1">
                            <div
                              className={`h-3 rounded-full ${
                                item.status === "served"
                                  ? "bg-green-200"
                                  : item.status === "cancelled"
                                  ? "bg-red-200"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="flex items-center gap-1">
                                Received{" "}
                                <span className="ml-1">🕒 {item.received}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                Prepared{" "}
                                <span className="ml-1">👨‍🍳 {item.prepared}</span>
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
                  {/* Bill summary */}
                  <div className="flex justify-between items-start mt-4 gap-8">
                    <div>
                      <div className="flex justify-between w-40 text-base mb-1">
                        <span>Total</span>
                        <span>₹{BILL_SUMMARY.total}</span>
                      </div>
                      <div className="flex justify-between w-40 text-base mb-1">
                        <span>GST 10%</span>
                        <span>₹{BILL_SUMMARY.gst}</span>
                      </div>
                      <div className="flex justify-between w-40 text-lg font-semibold">
                        <span>Total Bill</span>
                        <span>₹{BILL_SUMMARY.totalBill}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-base">
                        Order Method:{" "}
                        <span className="font-semibold">
                          {BILL_SUMMARY.orderMethod}
                        </span>
                      </div>
                      <div className="mb-1 text-base">
                        Payment Method:{" "}
                        <span className="font-semibold">
                          {BILL_SUMMARY.paymentMethod}
                        </span>
                      </div>
                      <div className="mb-1 text-base">
                        Served By:{" "}
                        <span className="font-semibold">
                          {BILL_SUMMARY.servedBy}
                        </span>
                      </div>
                      <div className="mb-1 text-base">
                        Served To:{" "}
                        <span className="font-semibold">
                          {BILL_SUMMARY.servedTo}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="px-4 py-1 bg-[#e5c99a] text-white rounded font-semibold text-base"
                          onClick={() => alert("Finish Billing")}
                        >
                          Finish Billing
                        </button>
                        <button
                          className="px-4 py-1 bg-[#e5c99a] text-white rounded font-semibold text-base"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[400px] max-w-full font-serif relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setShowBill(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">Bill</span>
                <span className="flex items-center gap-2">
                  <button className="text-[#C99E5A]" title="Print Bill">
                    <FaPrint />
                  </button>
                  <button className="text-[#C99E5A]" title="Download Bill">
                    <FaDownload />
                  </button>
                </span>
              </div>
              <div className="mb-2 font-semibold text-base">Order Summary</div>
              {DUMMY_ORDERS.map((order) => (
                <div key={order.orderNo} className="mb-2">
                  <div className="font-semibold">
                    Order Number: {order.orderNo}
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-base">
                      <span>
                        {item.name}
                        {item.status === "cancelled" && (
                          <span className="text-red-500 ml-1">(cancelled)</span>
                        )}
                      </span>
                      <span>0{item.qty}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-between w-full text-base mb-1 mt-2">
                <span>Total</span>
                <span>₹{BILL_SUMMARY.total}</span>
              </div>
              <div className="flex justify-between w-full text-base mb-1">
                <span>GST</span>
                <span>₹{BILL_SUMMARY.gst}</span>
              </div>
              <div className="flex justify-between w-full text-lg font-semibold">
                <span>Total Bill</span>
                <span>₹{BILL_SUMMARY.totalBill}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
