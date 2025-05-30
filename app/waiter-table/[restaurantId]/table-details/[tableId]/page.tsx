"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TableDetail from "@/components/waiter-table/TableDetail";

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

export default function TableDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;
  const tableId = params.tableId as string;

  const [table, setTable] = useState<any | null>(null);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the table data from an API
    // Example:
    // const fetchTable = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/tables/${tableId}`);
    //     if (!response.ok) {
    //       throw new Error("Table not found");
    //     }
    //     const data = await response.json();
    //     setTable(data);
    //
    //     // Fetch customer info
    //     const customerResponse = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/tables/${tableId}/customer`);
    //     if (customerResponse.ok) {
    //       const customerData = await customerResponse.json();
    //       setCustomer({
    //         name: customerData.name || "",
    //         phone: customerData.phone || ""
    //       });
    //     }
    //
    //     // Fetch order items
    //     const orderResponse = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/tables/${tableId}/orders/current`);
    //     if (orderResponse.ok) {
    //       const orderData = await orderResponse.json();
    //       setOrderItems(orderData.items || []);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching table:", error);
    //     setError(error.message || "Failed to load table");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchTable();

    // For now, we'll use mock data
    const mockTable = mockTables.find((t) => t.id === tableId);
    if (mockTable) {
      setTable(mockTable);
      setCustomer(
        mockCustomers[tableId as keyof typeof mockCustomers] || {
          name: "",
          phone: "",
        }
      );
      setOrderItems(
        mockOrderItems[tableId as keyof typeof mockOrderItems] || []
      );
    } else {
      setError("Table not found");
    }
    setLoading(false);
  }, [restaurantId, tableId]);

  // Handle order data from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderData = searchParams.get("order");

    if (orderData) {
      try {
        const items = JSON.parse(decodeURIComponent(orderData)) as OrderItem[];
        setOrderItems(items);

        // Calculate the running bill
        const totalBill = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        // Update the table with new status and running bill
        if (table) {
          setTable({
            ...table,
            status: "occupied",
            runningBill: totalBill,
          });
        }

        // Remove the order parameter from the URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [table]);

  const handleStatusChange = (
    newStatus: "occupied" | "available" | "booked"
  ) => {
    if (table) {
      setTable({ ...table, status: newStatus });
    }
  };

  const handleCustomerUpdate = (customerData: {
    name: string;
    phone: string;
  }) => {
    setCustomer(customerData);
  };

  const handleNewOrder = () => {
    router.push(
      `/waiter-table/${restaurantId}/table-details/${tableId}/new-order`
    );
  };

  const handleOrderConfirm = (items: OrderItem[]) => {
    // Update the table's order items
    setOrderItems(items);

    // Calculate the running bill
    const totalBill = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Update the table with new status and running bill
    if (table) {
      setTable({
        ...table,
        status: "occupied",
        runningBill: totalBill,
      });
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-t-[#B39793] border-r-[#B39793] border-b-[#B39793] border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !table) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error || "Table not found"}</div>
        <button
          onClick={handleBackClick}
          className="text-[#4E3E3B] font-medium flex items-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleBackClick}
        className="flex items-center text-[#4E3E3B] mb-4"
      >
        <ArrowLeft className="h-5 w-5 mr-1" /> Back to Tables
      </button>

      <TableDetail
        id={table.id}
        number={table.number}
        status={table.status}
        capacity={table.capacity}
        runningBill={table.runningBill}
        customer={customer}
        orderItems={orderItems}
        onStatusChange={handleStatusChange}
        onCustomerUpdate={handleCustomerUpdate}
        onNewOrder={handleNewOrder}
        restaurantId={restaurantId}
      />
    </div>
  );
}
