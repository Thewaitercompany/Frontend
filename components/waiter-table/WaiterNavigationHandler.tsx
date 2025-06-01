"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface WaiterNavigationHandlerProps {
  restaurantId: string;
}

const WaiterNavigationHandler: React.FC<WaiterNavigationHandlerProps> = ({
  restaurantId,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Handle navigation based on pathname
    const handleNavigation = () => {
      // If we're at the root waiter path, redirect to dashboard
      if (pathname === `/waiter-table/${restaurantId}`) {
        router.push(`/waiter-table/${restaurantId}/dashboard`);
      }
    };

    handleNavigation();
  }, [pathname, restaurantId, router]);

  // This component doesn't render anything
  return null;
};

export default WaiterNavigationHandler;
