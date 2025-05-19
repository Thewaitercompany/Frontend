"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, ClipboardList, Bell } from "lucide-react";
import TableGrid from "@/components/waiter-table/TableGrid";
import { Button } from "@/components/ui/button";

// Mock data for tables (similar to what we saw in the screenshots)
const mockTables = [
  {
    id: "01",
    number: "01",
    status: "occupied",
    capacity: "2/4",
    runningBill: 250,
  },
  { id: "02", number: "02", status: "available", capacity: "0/4" },
  {
    id: "03",
    number: "03",
    status: "booked",
    capacity: "4/4",
    runningBill: 550,
  },
  {
    id: "04",
    number: "04",
    status: "occupied",
    capacity: "2/4",
    runningBill: 170,
  },
  {
    id: "05",
    number: "05",
    status: "booked",
    capacity: "6/6",
    runningBill: 1250,
  },
  { id: "06", number: "06", status: "available", capacity: "0/6" },
  { id: "07", number: "07", status: "available", capacity: "0/4" },
  {
    id: "08",
    number: "08",
    status: "booked",
    capacity: "6/6",
    runningBill: 750,
  },
  {
    id: "09",
    number: "09",
    status: "booked",
    capacity: "4/6",
    runningBill: 150,
  },
  {
    id: "10",
    number: "10",
    status: "occupied",
    capacity: "2/4",
    runningBill: 280,
  },
  { id: "11", number: "11", status: "available", capacity: "0/4" },
  {
    id: "12",
    number: "12",
    status: "booked",
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

  useEffect(() => {
    // In a real application, you would fetch tables data from an API
    // Example:
    // const fetchTables = async () => {
    //   try {
    //     const response = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/tables`);
    //     const data = await response.json();
    //     setTables(data);
    //     setFilteredTables(data);
    //   } catch (error) {
    //     console.error("Error fetching tables:", error);
    //   }
    // };
    // fetchTables();

    // For now, we'll use mock data
    setTables(mockTables);
    setFilteredTables(mockTables);
  }, [restaurantId]);

  useEffect(() => {
    // Apply filtering based on search query and status filter
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = (status: string) => {
    setFilterStatus(status === filterStatus ? null : status);
    setIsFilterMenuOpen(false);
  };

  return (
    <div>
      <div className="mb-6 space-y-4">
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
            className="p-2.5 bg-white rounded-full flex items-center justify-center relative"
          >
            <Filter className="h-5 w-5 text-gray-600" />
            {filterStatus && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B39793] rounded-full"></span>
            )}
          </button>
        </div>

        {isFilterMenuOpen && (
          <div className="bg-white rounded-lg shadow-md p-3 space-y-1 animate-in slide-in-from-top duration-200">
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

      <div className="mb-3 flex justify-between items-center">
        <div className="text-[#4E3E3B] font-medium">
          Tables ({filteredTables.length})
        </div>
        <div className="flex items-center text-sm space-x-2">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-[#ffcc80] rounded-full inline-block mr-1"></span>
            <span className="text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-[#a5d6a7] rounded-full inline-block mr-1"></span>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-[#ef9a9a] rounded-full inline-block mr-1"></span>
            <span className="text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      <TableGrid tables={filteredTables} restaurantId={restaurantId} />

      {/* Floating buttons for quick actions */}
      <div className="fixed bottom-24 right-4 space-y-3">
        <Button
          onClick={() =>
            router.push(`/waiter-table/${restaurantId}/pending-orders`)
          }
          className="rounded-full h-12 w-12 bg-[#B39793] hover:bg-[#a08884] flex items-center justify-center shadow-md p-0"
        >
          <ClipboardList className="h-5 w-5" />
        </Button>
        <Button
          onClick={() =>
            router.push(`/waiter-table/${restaurantId}/receive-order/123456`)
          }
          className="rounded-full h-12 w-12 bg-[#B39793] hover:bg-[#a08884] flex items-center justify-center shadow-md p-0"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
