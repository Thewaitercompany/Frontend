"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface TableDetailProps {
  table: Table;
  customer: Customer | null;
  onStatusChange: (newStatus: "available" | "occupied" | "reserved") => void;
  onCustomerUpdate: (customer: Customer) => void;
  onNewOrder: () => void;
  onBackClick: () => void;
}

const TableDetail: React.FC<TableDetailProps> = ({
  table,
  customer,
  onStatusChange,
  onCustomerUpdate,
  onNewOrder,
  onBackClick,
}) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [customerData, setCustomerData] = useState<Customer>({
    id: "",
    name: "",
    mobileNumber: "",
    numberOfPeople: 0,
  });
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "available":
        return "bg-green-100 text-green-700 border-green-300";
      case "reserved":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "occupied":
        return "Occupied";
      case "available":
        return "Available";
      case "reserved":
        return "Reserved";
      default:
        return status;
    }
  };

  const handleStatusUpdate = async (
    newStatus: "available" | "occupied" | "reserved"
  ) => {
    if (table.status === newStatus) return;

    setIsUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onStatusChange(newStatus);
    } catch (error) {
      console.error("Error updating table status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomerUpdate(customerData);
    setShowCustomerForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <button
          onClick={onBackClick}
          className="flex items-center text-[#4E3E3B]"
          aria-label="Go back to tables"
        >
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to Tables
        </button>
      </div>

      {/* Table Info */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">Table {table.number}</h2>
              <p className="text-sm text-gray-500">
                Capacity: {table.capacity} people
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={table.status}
                onChange={(e) =>
                  handleStatusUpdate(
                    e.target.value as "available" | "occupied" | "reserved"
                  )
                }
                className="border rounded-md px-3 py-1 text-sm"
                aria-label="Table status"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Customer Info */}
          {customer ? (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Customer Information</h3>
              <div className="space-y-2">
                <p>Name: {customer.name}</p>
                <p>Mobile: {customer.mobileNumber}</p>
                <p>People: {customer.numberOfPeople}</p>
              </div>
            </div>
          ) : (
            <div className="border-t pt-4">
              <Button
                onClick={() => setShowCustomerForm(true)}
                className="w-full bg-[#B39793] text-white"
                aria-label="Add customer information"
              >
                Add Customer Information
              </Button>
            </div>
          )}

          {/* Current Order */}
          {table.currentOrder && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">Current Order</h3>
              <div className="space-y-2">
                {table.currentOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>₹{table.currentOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Order Button */}
          {table.status === "available" && (
            <div className="border-t pt-4 mt-4">
              <Button
                onClick={onNewOrder}
                className="w-full bg-[#B39793] text-white"
                aria-label="Create new order and occupy table"
              >
                Create New Order & Occupy Table
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">Add Customer Information</h2>
              <button
                onClick={() => setShowCustomerForm(false)}
                aria-label="Close customer form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCustomerFormSubmit} className="p-4 space-y-4">
              <div>
                <label className="block mb-1 text-sm">Mobile Number</label>
                <Input
                  value={customerData.mobileNumber}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="+91"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <Input
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  placeholder="Enter Customer's Name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Number of People</label>
                <Input
                  value={customerData.numberOfPeople}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      numberOfPeople: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter Number of people"
                  className="w-full"
                  type="number"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#B39793] text-white"
                aria-label="Save customer information"
              >
                Save Customer Info
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableDetail;
