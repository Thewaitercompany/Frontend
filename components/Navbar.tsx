"use client";

import React from "react";
import Image from "next/image";

interface NavbarProps {
  tableId: string;
}

const Navbar: React.FC<NavbarProps> = ({ tableId }) => {
  return (
    <div className="bg-[#ffffff] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-6 w-20 relative">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain object-left"
              sizes="80px"
            />
          </div>
          <span className="text-gray-900 text-base flex items-center italic gap-1">
            <Image src="/x.png" alt="x" className="w-2 h-2" />
            Smart cafe
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/table.png"
            alt="table"
            className="w-4 h-4"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <span className="text-gray-900 text-sm">Table no. {tableId}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
