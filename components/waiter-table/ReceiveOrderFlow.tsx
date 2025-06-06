"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);

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
      setShowConfirmReject(false);
    }
  };

  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-[#F5F1EB] z-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center border-b">
        <button onClick={onClose} className="mr-3" aria-label="Close">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="font-medium">Incoming Order</h2>
        </div>
        <button onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Order Details */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Order Header */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">Order No: {order.id}</div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm text-gray-500">Just now</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Table no. {order.tableNumber}
            </div>
          </div>

          {/* Order Items */}
          <div className="p-4 space-y-3">
            <h3 className="font-medium">Order Items</h3>
            {order.items.map((item) => (
              <div
                key={`${order.id}-${item.id}`}
                className="flex items-center gap-3"
              >
                <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        ₹ {item.price} x{item.quantity} = ₹{" "}
                        {item.price * item.quantity}
                      </div>
                      {item.special && (
                        <div className="text-sm text-amber-600 italic">
                          *{item.special}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center font-medium">
              <span>Total Amount</span>
              <span>₹ {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Reject Modal */}
      {showConfirmReject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
            <h3 className="font-medium mb-4">Reject Order?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to reject this order? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmReject(false)}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white border-t p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowConfirmReject(true)}
            variant="outline"
            className="py-6 border-red-200 text-red-600 hover:bg-red-50"
            disabled={loading}
          >
            Reject Order
          </Button>
          <Button
            onClick={handleAccept}
            className="py-6 bg-[#B39793] hover:bg-[#a08884]"
            disabled={loading}
          >
            {loading ? "Accepting..." : "Accept Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveOrderFlow;
