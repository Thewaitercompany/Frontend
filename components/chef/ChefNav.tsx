"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "/public/logo.png";

interface ChefNavProps {
  restaurantId: string;
  restaurantName?: string;
}

const ChefNav: React.FC<ChefNavProps> = ({ 
  restaurantId, 
  restaurantName = "Smart cafe" 
}) => {
  const pathname = usePathname();
  
  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) {
      return "Dashboard";
    } else if (pathname.includes("/pending-orders")) {
      return "Pending Orders";
    } else {
      return "Kitchen Portal";
    }
  };

  return (
    <div className="bg-[#ffffff] px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-6 w-20 relative">
            <Image
              src={logo}
              alt="The Waiter Company"
              fill
              className="object-contain object-left"
              sizes="80px"
            />
          </div>
          <span className="text-gray-900 text-base flex items-center italic gap-1 ml-1">
            <span className="text-xs">×</span>
            {restaurantName}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-900">
          {getPageTitle()}
        </div>
      </div>
    </div>
  );
};

export default ChefNav;