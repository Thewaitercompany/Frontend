'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface CartPageProps {
  params: Promise<{ tableId: string }>;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage({ params }: CartPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { tableId } = resolvedParams;
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [previousOrder, setPreviousOrder] = useState<CartItem[]>([]);
  
  // Initialize cart items and previous order
  useEffect(() => {
    setCartItems([
      { id: 1, name: 'Crispy fries', price: 60, image: '/fries.png', quantity: 2 },
      { id: 2, name: 'Chicken Nugget', price: 80, image: '/nugg.png', quantity: 1 },
    ]);
    setPreviousOrder([
      { id: 1, name: 'Crispy fries', price: 60, image: '/fries.png', quantity: 1 },
    ]);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getCurrentTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getPreviousTotal = () => {
    return previousOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalBill = () => {
    return getCurrentTotal() + getPreviousTotal();
  };

  const handlePlaceOrder = () => {
    router.push(`/menu/${tableId}/order-tracking`);
  };

  const handleBackToMenu = () => {
    router.push(`/menu/${tableId}`);
  };

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={tableId} />
      
      <main className="flex-1 p-4 space-y-4">
        {/* Current Order */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-medium">Current Order</h2>
          </div>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-24 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium">{item.name}</h3>
                  <p className="text-[15px]">₹ {item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 border border-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="text-base font-medium">Total</span>
            <span className="text-base">₹ {getCurrentTotal()}</span>
          </div>
        </div>

        {/* Previous Order */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-medium">Previous Order</h2>
          </div>
          
          <div className="space-y-4">
            {previousOrder.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium">{item.name}</h3>
                  <p className="text-[15px]">₹ {item.price}</p>
                </div>
                <span className="text-[15px]">{item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="text-base font-medium">Total</span>
            <span className="text-base">₹ {getPreviousTotal()}</span>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 p-4 bg-[#F1EEE6]">
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-medium">Current Order</span>
            <span className="text-base">₹ {getCurrentTotal()}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-medium">Total Bill</span>
            <span className="text-base">₹ {getTotalBill()}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePlaceOrder}
              className="flex-1 py-3 bg-[#9D8480] text-white rounded-md text-base font-medium"
            >
              Place Order
            </button>
            <button
              onClick={handleBackToMenu}
              className="flex-1 py-3 bg-[#9D8480] text-white rounded-md text-base font-medium"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

