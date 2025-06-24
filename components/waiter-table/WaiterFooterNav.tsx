"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ClipboardList, LogOut } from "lucide-react";

interface WaiterFooterNavProps {
  restaurantId: string;
}

const WaiterFooterNav: React.FC<WaiterFooterNavProps> = ({ restaurantId }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const handleLogout = () => {
    // In real implementation, we would clear cookies and redirect
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name =
          eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      window.location.href = "/waiter-table/login";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
      <div className="flex items-center justify-around py-2">
        <Link href={`/waiter-table/${restaurantId}/dashboard`}>
          <div
            className={`flex flex-col items-center gap-1 p-2 ${
              isActive("/dashboard") ? "text-[#B39793]" : "text-gray-500"
            }`}
          >
            <LayoutGrid className="h-6 w-6" />
            <span className="text-xs">Tables</span>
          </div>
        </Link>
        <Link href={`/waiter-table/${restaurantId}/orders`}>
          <div
            className={`flex flex-col items-center gap-1 p-2 ${
              isActive("/orders") ? "text-[#B39793]" : "text-gray-500"
            }`}
          >
            <ClipboardList className="h-6 w-6" />
            <span className="text-xs">Orders</span>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 text-gray-500"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default WaiterFooterNav;
