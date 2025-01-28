"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

interface Table {
  id: string;
  totalSeats: number;
  occupiedSeats: number;
  status: "available" | "booked" | "partially-occupied";
}

const initialTables: Table[] = [
  { id: "01", totalSeats: 4, occupiedSeats: 2, status: "partially-occupied" },
  { id: "02", totalSeats: 4, occupiedSeats: 0, status: "available" },
  { id: "03", totalSeats: 4, occupiedSeats: 4, status: "booked" },
  { id: "04", totalSeats: 6, occupiedSeats: 2, status: "partially-occupied" },
];

export default function TableDetails() {
  const [searchQuery, setSearchQuery] = useState("");
  const tables = initialTables;

  const filteredTables = tables.filter((table) =>
    table.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTableStyles = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "border-[#C99E5A] border-solid";
      case "booked":
        return "border-red-500 border-solid";
      case "partially-occupied":
        return "border-[#C99E5A] border-dashed";
      default:
        return "border-gray-300 border-solid";
    }
  };

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
      {/* Table Section */}
      <div className="bg-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {/* Search and Legend */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xs pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#C99E5A] rounded" />
              <span className="text-sm">Table Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-red-500 rounded" />
              <span className="text-sm">Table Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#C99E5A] border-dashed rounded" />
              <span className="text-sm">Selected seat Occupied</span>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className={`p-4 rounded-lg border-2 ${getTableStyles(
                table.status
              )}`}
            >
              <div className="text-2xl font-medium mb-4">{table.id}</div>
              <div className="space-y-1 text-sm">
                <p>
                  Total Seats = {table.totalSeats.toString().padStart(2, "0")}
                </p>
                <p>
                  Occupied Seats ={" "}
                  {table.occupiedSeats.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
