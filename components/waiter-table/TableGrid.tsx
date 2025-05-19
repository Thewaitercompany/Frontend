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
}

const TableGrid: React.FC<TableGridProps> = ({ tables, restaurantId }) => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "border-[#ffcc80]"; // Orange
      case "available":
        return "border-[#a5d6a7]"; // Green
      case "booked":
        return "border-[#ef9a9a]"; // Red
      default:
        return "border-gray-300";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-[#fff3e0]"; // Light orange
      case "available":
        return "bg-[#e8f5e9]"; // Light green
      case "booked":
        return "bg-[#ffebee]"; // Light red
      default:
        return "bg-white";
    }
  };

  const handleTableClick = (tableId: string) => {
    router.push(`/waiter-table/${restaurantId}/table-details/${tableId}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {tables.map((table) => (
        <div
          key={table.id}
          onClick={() => handleTableClick(table.id)}
          className={`${getStatusBg(table.status)} ${getStatusColor(
            table.status
          )} p-3 rounded-lg border-2 shadow-sm flex flex-col items-center cursor-pointer transition-transform active:scale-95`}
        >
          <div className="text-center mb-1 font-semibold text-[#4E3E3B]">
            {table.number}
          </div>
          {table.runningBill ? (
            <div className="text-sm mb-1 font-semibold">
              Running Bill
              <div className="text-base text-[#B39793]">
                ₹ {table.runningBill}
              </div>
            </div>
          ) : (
            <div className="text-sm mb-1 opacity-75">No active order</div>
          )}
          <div className="flex items-center gap-1 mt-auto text-xs">
            <div className="flex gap-1 items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              {table.capacity}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableGrid;
