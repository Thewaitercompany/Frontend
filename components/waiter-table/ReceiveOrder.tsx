"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface ReceiveOrderProps {
  orderId: string;
  tableNumber: string;
  items: OrderItem[];
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

const ReceiveOrder: React.FC<ReceiveOrderProps> = ({
  orderId,
  tableNumber,
  items,
  onAccept,
  onReject,
  onClose,
}) => {
  const [isConfirmingReject, setIsConfirmingReject] = useState(false);
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <div className="font-medium">Order No: {orderId}</div>
            <div className="text-sm text-gray-600">Table no. {tableNumber}</div>
          </div>
          <button onClick={onClose} className="text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isConfirmingReject ? (
          <div className="p-6">
            <h2 className="text-center font-medium mb-4">Cancel order?</h2>

            {items.map((item) => (
              <div key={item.id} className="flex items-center mb-3">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="ml-3">
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
            {items.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="ml-3">
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
                onClick={handleAccept}
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

export default ReceiveOrder;
