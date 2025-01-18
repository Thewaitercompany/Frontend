'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import OrderStatus from '@/components/OrderStatus';
import Navbar from '@/components/Navbar';

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
    // Update time every minute
    const timer = setInterval(() => {
      setEstimatedTime(new Date(Date.now() + 20 * 60000));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-[#F1EEE6]">
        <Navbar tableId={resolvedParams.tableId} />

        <main className="p-4 space-y-4">
          {/* Order Status Card */}
          <div className="bg-white rounded-xl p-6">
            <h1 className="text-xl mb-8 text-center italic font-serif">
              Thank you for your order!
            </h1>

            {/* Estimated Time */}
            <div className="bg-[#4E3E3B] text-white rounded-lg p-3 mb-8">
              <div className="text-center">
                <p className="text-sm mb-1">Estimated order time</p>
                <p className="text-lg">
                  {estimatedTime.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  }).toLowerCase()}
                </p>
              </div>
            </div>

            <OrderStatus
              orderId="123"
              cookName="Mr Cook"
              currentStatus="preparing"
            />
          </div>

          {/* Bill Details */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg">Total Bill</span>
              <span className="text-lg">₹ {totalBill}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push(`/checkout/${resolvedParams.tableId}`)}
                className="w-full bg-[#9D8480] text-white py-2.5 rounded-md text-[15px]"
              >
                Check Out
              </button>
              <button
                onClick={() => router.push(`/menu/${resolvedParams.tableId}`)}
                className="w-full bg-[#9D8480] text-white py-2.5 rounded-md text-[15px]"
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

