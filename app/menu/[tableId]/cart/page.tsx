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
  _id: string;
  productId: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`https://qr-customer-sj9m.onrender.com/cart/${tableId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }

        const data = await response.json();

        // Using the product data directly from the response
        const updatedItems = data.items.map((item: any) => {
          const product = item.productId;
          return {
            _id: item._id,
            productId: product._id, // Map productId here
            name: product.name || 'Unknown Product',
            price: product.price || 0,
            image: product.image || '/placeholder.svg',
            quantity: item.quantity,
          };
        })

        setCartItems(updatedItems);
        setPreviousOrder(data.previousOrder || []);  // Assuming previousOrder is part of the response
      } catch (error) {
        setError('Error fetching cart data');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [tableId]);

  const updateQuantity = async (productId: string, change: number) => {
    try {
      // Optimistically update the cart state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
      );

      const response = await fetch('https://qr-customer-sj9m.onrender.com/cart/update-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNumber: tableId,
          productId: productId,
          changeQuantityBy: change,
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok && data.cart && data.cart.items) {
        const updatedItems = data.cart.items.map((item: any) => {
          const product = item.productId || {};
          return {
            _id: item._id,
            productId: product._id || '',
            name: product.name || 'Unknown Product',
            price: product.price || 0,
            image: product.image || '/placeholder.svg',
            quantity: item.quantity,
          };
        });

        setCartItems(updatedItems); // Replace the cart state with backend data
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  const refreshCart = async () => {
    try {
      const response = await fetch(`https://qr-customer-sj9m.onrender.com/cart/${tableId}`);
      const data = await response.json();

      if (response.ok) {
        const updatedItems = data.items.map((item: any) => {
          const product = item.productId || {};
          return {
            _id: item._id,
            productId: product._id || '',
            name: product.name || 'Unknown Product',
            price: product.price || 0,
            image: product.image || '/placeholder.svg',
            quantity: item.quantity,
          };
        });

        setCartItems(updatedItems);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  

  const getCurrentTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [previousTotal, setPreviousTotal] = useState(0);

  useEffect(() => {
    const fetchPreviousTotal = async () => {
      try {
        const response = await fetch(`https://qr-customer-sj9m.onrender.com/order/${tableId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch previous order total');
        }

        const data = await response.json();

        // Check if there is a previous order
        if (data && data.totalAmount > 0) {
          setPreviousTotal(data.totalAmount); // Update the total if there is a previous order
        }
      } catch (error) {
        console.error('Error fetching previous total:', error);
      }
    };

    fetchPreviousTotal();
  }, [tableId]);

  const getPreviousTotal = () => previousTotal;


  const getTotalBill = () => {
    return getCurrentTotal() + getPreviousTotal();
  };

  const handlePlaceOrder = async () => {
    try {
      // Send a POST request to place the order
      const response = await fetch('https://qr-customer-sj9m.onrender.com/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableNumber: tableId }), // Use tableId from resolvedParams
      });

      if (!response.ok) {
        throw new Error('Failed to place the order');
      }

      const data = await response.json();

      // Handle the success case (e.g., redirect to the order tracking page)
      console.log('Order placed successfully:', data);
      router.push(`/menu/${tableId}/order-tracking`);
    } catch (error) {
      // Handle the error case
      console.error('Error placing the order:', error);
      setError('Failed to place the order. Please try again.');
    }
  };

  const handleBackToMenu = () => {
    router.push(`/menu/${tableId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={Number(tableId)} />

      <main className="flex-1 p-4 space-y-4">
        {/* Current Order */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-medium">Current Order</h2>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
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
                    onClick={() => {refreshCart();updateQuantity(item.productId, -1);refreshCart()}} // Use productId here
                    className="w-6 h-6 flex items-center justify-center text-gray-600 border border-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {refreshCart();updateQuantity(item.productId, 1);refreshCart()}} // Use productId here
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
              <div key={item._id} className="flex items-center gap-3">
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
