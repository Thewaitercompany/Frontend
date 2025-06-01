"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TableDetail from "@/components/waiter-table/TableDetail";
import NewOrderFlow from "@/components/waiter-table/NewOrderFlow";
import { Loader2 } from "lucide-react";

// Mock data for tables (same as in the dashboard page)
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

// Mock customer data
const mockCustomers = {
  "01": { name: "Walk-in Customer", phone: "" },
  "03": { name: "Mohan Pyare", phone: "9219531234" },
  "04": { name: "", phone: "" },
  "05": { name: "Ram Singh", phone: "9249331234" },
  "08": { name: "Aman Verma", phone: "9876543210" },
  "09": { name: "Priya Sharma", phone: "9765432109" },
  "10": { name: "", phone: "" },
  "12": { name: "Raj Kumar", phone: "9087654321" },
};

// Mock order items
const mockOrderItems = {
  "01": [
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
  "03": [
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
    {
      id: "2",
      name: "Chicken Nuggets",
      price: 80,
      quantity: 1,
      image: "/placeholder.svg",
      special: "without mayonnaise",
    },
  ],
  "05": [
    {
      id: "4",
      name: "Butter Naan",
      price: 25,
      quantity: 8,
      image: "/placeholder.svg",
    },
    {
      id: "5",
      name: "Paneer Butter Masala",
      price: 180,
      quantity: 2,
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
};

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface Table {
  id: string;
  number: string;
  status: "available" | "occupied" | "reserved";
  capacity: number;
  currentOrder?: {
    items: any[];
    total: number;
  };
}

interface Customer {
  id: string;
  name: string;
  mobileNumber: string;
  numberOfPeople: number;
}

const TableDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = params.restaurantId as string;
  const tableId = params.tableId as string;

  const [table, setTable] = useState<Table | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewOrder, setShowNewOrder] = useState(false);

  useEffect(() => {
    // In a real app, fetch table details from an API
    // For now, we'll use mock data
    const mockTable: Table = {
      id: tableId,
      number: tableId,
      status: "available",
      capacity: 4,
    };

    setTable(mockTable);
    setLoading(false);
  }, [tableId]);

  useEffect(() => {
    // Check for order data in URL
    const orderData = searchParams.get("order");
    if (orderData) {
      try {
        const items = JSON.parse(decodeURIComponent(orderData));
        if (table) {
          const total = items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
          );
          setTable({
            ...table,
            status: "occupied",
            currentOrder: {
              items,
              total,
            },
          });
        }
        // Clean up URL
        router.replace(
          `/waiter-table/${restaurantId}/table-details/${tableId}`
        );
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [searchParams, table, restaurantId, tableId, router]);

  const handleStatusChange = (
    newStatus: "available" | "occupied" | "reserved"
  ) => {
    if (table) {
      setTable({
        ...table,
        status: newStatus,
      });
    }
  };

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  const handleNewOrder = () => {
    setShowNewOrder(true);
  };

  const handleOrderConfirm = (items: any[]) => {
    const orderData = encodeURIComponent(JSON.stringify(items));
    router.push(
      `/waiter-table/${restaurantId}/table-details/${tableId}?order=${orderData}`
    );
    setShowNewOrder(false);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!table) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {showNewOrder ? (
        <NewOrderFlow
          restaurantId={restaurantId}
          tableId={tableId}
          onClose={() => setShowNewOrder(false)}
          onOrderConfirm={handleOrderConfirm}
        />
      ) : (
        <TableDetail
          table={table}
          customer={customer}
          onStatusChange={handleStatusChange}
          onCustomerUpdate={handleCustomerUpdate}
          onNewOrder={handleNewOrder}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default TableDetailPage;
