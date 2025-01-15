'use client';
import React from 'react';
import Image from "next/image";
import logo from '/public/logo.png';
import table from '/public/table.png';

interface NavbarProps {
  tableId: string;
}

const Navbar: React.FC<NavbarProps> = ({ tableId }) => {
  return (
    (<div className="bg-[#F5F5F5] px-3 py-2">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6">
            <Image
              src={logo}
              alt="logo"
              className="h-full w-auto"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          <span className="text-gray-900 text-base">
            x Badshah&apos;s Kitchen
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={table}
            alt="table"
            className="w-4 h-4"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <span className="text-gray-900 text-sm">
            Table no. {tableId}
          </span>
        </div>
      </div>
    </div>)
  );
};

export default Navbar;