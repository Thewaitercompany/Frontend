'use client';

import { useState, useEffect, use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import OrderStatus from '@/components/OrderStatus';
import Navbar from '@/components/Navbar';

interface OrderTrackingPageProps {
  params: Promise<{ tableId: string }>;
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [currentStatus, setCurrentStatus] = useState<'preparing' | 'delivering' | 'delivered'>('preparing');
  
  // Dummy data
  const orderData = {
    cookName: "Mr Cook",
    estimatedTime: "9:55pm",
    totalBill: 200
  };

  // Simulate order progress
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStatus('delivering');
    }, 5000);

    const timer2 = setTimeout(() => {
      setCurrentStatus('delivered');
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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
                <p className="text-sm mb-1 font-serif">Estimated order time</p>
                <p className="text-lg font-serif">{orderData.estimatedTime}</p>
              </div>
            </div>

            <OrderStatus
              orderId="123"
              cookName={orderData.cookName}
              currentStatus={currentStatus}
            />
          </div>

          {/* Bill Details */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-serif">Total Bill</span>
              <span className="text-lg font-serif">₹ {orderData.totalBill}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push(`/checkout/${resolvedParams.tableId}`)}
                className="w-full bg-[#9D8480] text-white py-2.5 rounded-md text-[15px] font-serif"
              >
                Check Out
              </button>
              <button
                onClick={() => router.push(`/menu/${resolvedParams.tableId}`)}
                className="w-full bg-[#9D8480] text-white py-2.5 rounded-md text-[15px] font-serif"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

