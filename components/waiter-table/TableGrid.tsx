"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface TableType {
  id: string;
  number: string;
  status: "occupied" | "available" | "booked";
  capacity: string;
  runningBill?: number;
}

interface TableGridProps {
  tables: TableType[];
  restaurantId: string;
  onTableClick?: (table: TableType) => void;
}

const TableGrid: React.FC<TableGridProps> = ({
  tables,
  restaurantId,
  onTableClick,
}) => {
  const router = useRouter();

  const getStatusColor = (status: string, capacity?: string) => {
    const isPartiallyOccupied =
      capacity &&
      capacity.includes("/") &&
      parseInt(capacity.split("/")[0]) > 0 &&
      parseInt(capacity.split("/")[0]) < parseInt(capacity.split("/")[1]);

    switch (status) {
      case "occupied":
        return isPartiallyOccupied
          ? "border-[#ffd54f] border-2 border-dashed" // Dashed yellow for partial
          : "border-[#ffcc80] border-2"; // Orange for full
      case "available":
        return "border-[#ffd54f] border-2"; // Yellow for available
      case "booked":
        return "border-[#ef9a9a] border-2"; // Red for booked
      default:
        return "border-gray-300 border-2";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-white"; // White background
      case "available":
        return "bg-white"; // White background
      case "booked":
        return "bg-white"; // White background
      default:
        return "bg-white";
    }
  };

  const handleTableClick = (table: TableType) => {
    if (onTableClick) {
      onTableClick(table);
    } else {
      router.push(`/waiter-table/${restaurantId}/table-details/${table.id}`);
    }
  };

  // Table 01 has pending orders (show exclamation)
  const hasPendingOrder = (tableId: string) => tableId === "01";

  return (
    <div className="bg-white rounded-lg p-3 mx-4 shadow-sm">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={`relative ${getStatusBg(table.status)} ${getStatusColor(
              table.status,
              table.capacity
            )} p-2 rounded-lg shadow-sm flex flex-col items-center cursor-pointer transition-transform active:scale-95 min-h-[100px] w-full`}
            style={{ aspectRatio: "3/4" }}
          >
            {/* Exclamation badge for pending order */}
            {hasPendingOrder(table.id) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold border border-white z-10">
                !
              </span>
            )}

            {/* Table Number */}
            <div className="text-center mb-1 font-bold text-black text-base">
              {table.number}
            </div>

            {/* Running Bill or No Active Order */}
            {table.runningBill ? (
              <div className="text-center mb-1 flex-1 flex flex-col justify-center px-1">
                <div className="text-[10px] text-gray-600 mb-1 leading-tight">
                  Running Bill
                </div>
                <div className="text-xs font-bold text-black">
                  ₹ {table.runningBill}
                </div>
              </div>
            ) : (
              <div className="text-[10px] text-gray-500 mb-1 text-center flex-1 flex items-center justify-center px-1">
                <span className="leading-tight">No active order</span>
              </div>
            )}

            {/* Capacity with icon */}
            <div className="flex items-center gap-1 mt-auto text-[10px] text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{table.capacity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs px-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-white border-2 border-[#ffcc80] rounded-sm inline-block"></span>
          <span className="text-gray-600 text-xs">Occupied</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-white border-2 border-[#ffd54f] rounded-sm inline-block"></span>
          <span className="text-gray-600 text-xs">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-white border-2 border-[#ef9a9a] rounded-sm inline-block"></span>
          <span className="text-gray-600 text-xs">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
