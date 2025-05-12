"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PreparedItemProps {
  id: string;
  orderId: string;
  name: string;
  tableNumber: string;
  time: string;
  image: string;
  special?: string;
  onMarkServed: () => void;
}

const PreparedItem: React.FC<PreparedItemProps> = ({
  id,
  orderId,
  name,
  tableNumber,
  time,
  image,
  special,
  onMarkServed,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">
            Order: {orderId} • Table: {tableNumber} • {time}
          </div>
          {special && (
            <div className="text-sm text-amber-600 italic">*{special}</div>
          )}
        </div>
      </div>

      <button
        onClick={onMarkServed}
        className="bg-[#9D8480] text-white px-3 py-1.5 rounded-md text-sm"
      >
        Served
      </button>
    </div>
  );
};

export default PreparedItem;
