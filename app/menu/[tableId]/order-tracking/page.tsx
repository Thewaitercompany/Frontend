'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import OrderStatus from '@/components/OrderStatus';
import Navbar from '@/components/Navbar';

interface OrderTrackingPageProps {
  params: Promise<{ tableId: number }>;
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ params }) => {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ tableId: number } | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(new Date(Date.now() + 20 * 60000));
  const [totalBill, setTotalBill] = useState<number | null>(null); // State for the total bill
  const [loading, setLoading] = useState(false); // Loading state for checkout
  const [error, setError] = useState<string | null>(null); // Error state
  const [orderSummary, setOrderSummary] = useState<any>(null); // Order summary after checkout
  useEffect(() => {
    // Resolve the tableId promise
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved); // Set resolvedParams with the tableId
    };

    resolveParams();

    // Update estimated time every minute
    const timer = setInterval(() => {
      setEstimatedTime(new Date(Date.now() + 20 * 60000));
    }, 60000);

    return () => clearInterval(timer);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      // Fetch the order details from the backend using POST
      const fetchOrderDetails = async () => {
        try {
          // Fetch the total amount for the given tableId using a GET request
          const response = await fetch(`https://qr-customer-sj9m.onrender.com/order/${resolvedParams.tableId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch order details');
          }

          const data = await response.json();

          if (data.totalAmount !== undefined) {
            setTotalBill(data.totalAmount); // Set the total bill from the response
          } else {
            console.warn('No total amount found in the response');
          }
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };

      // Call the function
      fetchOrderDetails();

    }
  }, [resolvedParams]); // Only run this effect when resolvedParams changes

  const handleCheckout = async () => {
    if (!resolvedParams) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://qr-customer-sj9m.onrender.com/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableNumber: resolvedParams.tableId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }

      const data = await response.json();
      setOrderSummary(data.orderSummary); // Set the order summary

    } catch (err: any) {
        setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-[#F1EEE6]">
        {resolvedParams && <Navbar tableId={resolvedParams.tableId} />}

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
              <span className="text-lg">₹ {totalBill !== null ? totalBill : 'Loading...'}</span> {/* Display total bill */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Checkout Button */}
              <button
                onClick={() => {
                  handleCheckout();
                  router.push(`/checkout/${resolvedParams.tableId}`);
                }}
                className="w-full bg-[#9D8480] text-white py-2.5 rounded-md text-[15px]"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Check Out'}
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
