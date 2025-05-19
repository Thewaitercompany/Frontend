"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  isVeg: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface NewOrderFlowProps {
  restaurantId: string;
  tableId: string;
  onClose: () => void;
  onOrderConfirm: (items: CartItem[]) => void;
}

// Mock menu items for demo
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Crispy Fries",
    price: 60,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 80,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.2,
    isVeg: false,
  },
  {
    id: "3",
    name: "Crispy Fries",
    price: 60,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: "4",
    name: "Crispy Fries",
    price: 60,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.1,
    isVeg: true,
  },
];

const NewOrderFlow: React.FC<NewOrderFlowProps> = ({
  restaurantId,
  tableId,
  onClose,
  onOrderConfirm,
}) => {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(mockMenuItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    mobileNumber: "",
    name: "",
    numberOfPeople: "",
  });
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, fetch menu items from an API
    // For now, we'll use mock data
    setMenuItems(mockMenuItems);

    // Apply filters
    let filtered = mockMenuItems;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (vegOnly) {
      filtered = filtered.filter((item) => item.isVeg);
    }

    setFilteredItems(filtered);
  }, [searchQuery, vegOnly]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleVegFilter = () => {
    setVegOnly(!vegOnly);
  };

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            special: "without mayonnaise", // Default special instruction for demo
          },
        ];
      }
    });
  };

  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would validate and save customer info
    // For now, we just hide the form and move to the menu
    setShowCustomerForm(false);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, you would send the order to the backend
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/waiter/${restaurantId}/tables/${tableId}/orders`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     items: cartItems,
      //     customerInfo
      //   }),
      // });

      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the onOrderConfirm callback
      onOrderConfirm(cartItems);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F1EB]">
      {showCustomerForm ? (
        /* Customer Information Form */
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center">
              <button
                onClick={() => setShowCustomerForm(false)}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="font-medium">Enter Customer's Mobile Number</h2>
            </div>

            <form onSubmit={handleCustomerFormSubmit} className="p-4 space-y-4">
              <div>
                <Input
                  value={customerInfo.mobileNumber}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="+91"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Name</label>
                <Input
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  placeholder="Enter Customer's Name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Number of people</label>
                <Input
                  value={customerInfo.numberOfPeople}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      numberOfPeople: e.target.value,
                    })
                  }
                  placeholder="Enter Number of people"
                  className="w-full"
                  type="number"
                />
              </div>

              <Button type="submit" className="w-full bg-[#B39793] text-white">
                Receive Order
              </Button>
            </form>
          </div>
        </div>
      ) : showCart ? (
        /* Cart View */
        <div className="flex flex-col h-full">
          <div className="bg-white p-4 shadow-sm flex items-center">
            <button onClick={() => setShowCart(false)} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="font-medium">View Cart</h2>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-sm flex items-center"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm">₹{item.price}</div>
                          {item.special && (
                            <div className="text-xs italic text-gray-500">
                              *{item.special}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              setCartItems((prev) =>
                                prev
                                  .map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: Math.max(
                                            0,
                                            cartItem.quantity - 1
                                          ),
                                        }
                                      : cartItem
                                  )
                                  .filter((item) => item.quantity > 0)
                              );
                            }}
                            className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => {
                              setCartItems((prev) =>
                                prev.map((cartItem) =>
                                  cartItem.id === item.id
                                    ? {
                                        ...cartItem,
                                        quantity: cartItem.quantity + 1,
                                      }
                                    : cartItem
                                )
                              );
                            }}
                            className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span>
                  ₹
                  {cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => setShowCart(false)} variant="outline">
                  Back to Menu
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  className="bg-[#B39793] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Menu View */
        <div className="flex flex-col h-full">
          <div className="bg-white p-4 shadow-sm flex items-center">
            <button onClick={onClose} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search dishes"
                className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm"
              />
            </div>
            <button
              onClick={handleVegFilter}
              className={`ml-3 px-3 py-1 rounded-full text-xs ${
                vegOnly
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              Veg Only
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-white">
            <div className="p-4 space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium mb-1">{item.name}</div>
                      <div className="text-sm mb-1">₹ {item.price}</div>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <span className="text-xs">★</span>
                          <span className="text-xs ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden mb-2">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#B39793] text-white rounded px-3 py-1 text-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <Button
              onClick={() =>
                cartItems.length > 0
                  ? setShowCart(true)
                  : setShowCustomerForm(true)
              }
              className="w-full bg-[#B39793] text-white"
            >
              View Cart (
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrderFlow;
