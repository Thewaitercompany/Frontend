"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
}

interface ReceiveOrderFlowProps {
  order: Order;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

const ReceiveOrderFlow: React.FC<ReceiveOrderFlowProps> = ({
  order,
  onAccept,
  onReject,
  onClose,
}) => {
  const [isConfirmingReject, setIsConfirmingReject] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    mobileNumber: "",
    name: "",
    numberOfPeople: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await onAccept();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await onReject();
    } finally {
      setLoading(false);
      setIsConfirmingReject(false);
    }
  };

  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would validate and save customer info
    // For now, we just hide the form and proceed with order acceptance
    setShowCustomerForm(false);
    handleAccept();
  };

  if (showCustomerForm) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
          <div className="p-4 border-b flex items-center">
            <button onClick={() => setShowCustomerForm(false)} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="font-medium">Enter Customer's Mobile Number</h2>
          </div>

          <form onSubmit={handleCustomerFormSubmit} className="p-4 space-y-4">
            <div>
              <Input
                value={customerInfo.mobileNumber}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
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
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                placeholder="Enter Customer's Name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Number of people</label>
              <Input
                value={customerInfo.numberOfPeople}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    numberOfPeople: e.target.value,
                  })
                }
                placeholder="Enter Number of people"
                className="w-full"
                type="number"
              />
            </div>

            <Button type="submit" className="w-full bg-[#B39793] text-white">
              Receive Order
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <div className="font-medium">Order No: {order.id}</div>
            <div className="text-sm text-gray-600">
              Table no. {order.tableNumber}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isConfirmingReject ? (
          <div className="p-4">
            <h2 className="text-center font-medium mb-4">Cancel order?</h2>

            {order.items.map((item) => (
              <div key={item.id} className="flex items-center mb-3">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    ₹ {item.price} x{item.quantity}
                  </div>
                  {item.special && (
                    <div className="text-xs italic text-gray-500">
                      *{item.special}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              onClick={handleReject}
              className="w-full mt-4 bg-[#9D8480] text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </Button>
          </div>
        ) : (
          <>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    ₹ {item.price} x{item.quantity}
                  </div>
                  {item.special && (
                    <div className="text-xs italic text-gray-500">
                      *{item.special}
                    </div>
                  )}
                </div>
                <X
                  className="ml-auto h-5 w-5 text-red-500 cursor-pointer"
                  onClick={() => setIsConfirmingReject(true)}
                />
              </div>
            ))}

            <div className="p-4">
              <Button
                onClick={() => setShowCustomerForm(true)}
                className="w-full bg-[#9D8480] text-white"
                disabled={loading}
              >
                {loading ? "Processing..." : "Accept Order"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiveOrderFlow;
