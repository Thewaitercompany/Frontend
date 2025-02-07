"use client";

import type React from "react";
import { useState, useEffect, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Circle } from "lucide-react";

interface OrderTrackingPageProps {
  params: Promise<{ tableId: string }>;
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [estimatedTime, setEstimatedTime] = useState(
    new Date(Date.now() + 20 * 60000)
  );

  const totalBill = 200;

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(new Date(Date.now() + 20 * 60000));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-[#F1EEE6]">
        <Navbar tableId={resolvedParams.tableId} />

        <main className="p-6 max-w-md mx-auto space-y-8">
          {/* Order Status Card */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-center text-lg mb-6">
              Thank you for your order!
            </h2>

            {/* Estimated Time */}
            <div className="bg-[#4D3E3B] text-white rounded-md p-3 mb-8">
              <p className="text-center text-sm mb-1">Estimated order time</p>
              <p className="text-center">
                {estimatedTime
                  .toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toLowerCase()}
              </p>
            </div>

            {/* Order Status Timeline */}
            <div className="space-y-8 relative">
              <div className="relative pl-8 mb-2">
                <div className="absolute left-0 top-1.5">
                  <Circle className="h-3 w-3 fill-[#6C5B58]" />
                </div>
                <div className="absolute left-1.5 top-8 h-full w-[1px] bg-[#36251B]" />
                <p className="text-sm">
                  Your order is being prepared by{" "}
                  <span className="text-black">Mr Cook</span>
                </p>
              </div>

              <div className="relative pl-8 mb-2">
                <div className="absolute left-0 top-1.5">
                  <Circle className="h-3 w-3 stroke-[#6C5B58]" />
                </div>
                <div className="absolute left-1.5 top-8 h-full w-[1px] bg-[#6C5B58]" />
                <p className="text-sm text-black">On its way to your table!</p>
              </div>

              <div className="relative pl-8 mb-2">
                <div className="absolute left-0 top-1.5">
                  <Circle className="h-3 w-3 stroke-[#36251B]" />
                </div>
                <p className="text-sm text-black">Delivered</p>
              </div>
            </div>
          </div>

          {/* Bill Details */}
          <div className="bg-white rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <span>Total Bill</span>
              <span>₹ {totalBill}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  router.push(`/checkout/${resolvedParams.tableId}`)
                }
                className="flex-1 py-3 bg-[#B39793] text-white rounded-md text-base font-medium"
              >
                Check Out
              </button>
              <button
                onClick={() => router.push(`/menu/${resolvedParams.tableId}`)}
                className="flex-1 py-3 bg-[#B39793] text-white rounded-md text-base font-medium"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default OrderTrackingPage;
