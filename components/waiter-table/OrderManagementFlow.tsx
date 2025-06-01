"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface MenuNewOrderFlowProps {
  restaurantId: string;
  tableId: string;
  onClose: () => void;
  onOrderConfirm: (items: CartItem[]) => void;
}

// Mock menu items that match the images
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Crispy fries",
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
    name: "Crispy fries",
    price: 60,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: "4",
    name: "Crispy fries",
    price: 60,
    image: "/placeholder.svg",
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt and Read More",
    rating: 4.1,
    isVeg: true,
  },
];

const MenuNewOrderFlow: React.FC<MenuNewOrderFlowProps> = ({
  restaurantId,
  tableId,
  onClose,
  onOrderConfirm,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesVeg = vegOnly ? item.isVeg : true;
    return matchesSearch && matchesVeg;
  });

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
            special: "without mayonnaise",
          },
        ];
      }
    });
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (showCart) {
    return (
      <div className="fixed inset-0 bg-[#F5F1EB] z-50">
        {/* Cart Header */}
        <div className="bg-white p-4 shadow-sm flex items-center border-b">
          <button onClick={() => setShowCart(false)} className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-medium">View Cart</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-auto">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            ₹{item.price}
                          </div>
                          {item.special && (
                            <div className="text-xs italic text-gray-500">
                              *{item.special}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-md">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
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

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setShowCart(false)}
                variant="outline"
                className="py-6"
              >
                Back to Menu
              </Button>
              <Button
                onClick={() => onOrderConfirm(cartItems)}
                className="bg-[#B39793] text-white py-6"
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#F5F1EB] z-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center border-b">
        <button onClick={onClose} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes"
            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B39793]"
          />
        </div>
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`ml-3 px-3 py-1 rounded-full text-xs border ${
            vegOnly
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-gray-100 text-gray-700 border-gray-200"
          }`}
        >
          Veg Only
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg mb-3 flex p-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[15px] font-medium text-gray-900">
                    {item.name}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-black stroke-none" />
                    <span className="text-xs text-gray-500 ml-0.5">
                      {item.rating}
                    </span>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-[13px] text-gray-900">
                    ₹ {item.price}
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 mt-1 leading-snug">
                  {item.description}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 px-4 py-1 bg-[#B29792] text-[13px] text-black rounded-md hover:bg-[#a08884] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="w-[135px] h-[125px] relative self-center ml-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="135px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t p-4">
        <Button
          onClick={() => setShowCart(true)}
          className="w-full py-3 bg-[#B39793] text-white rounded-lg"
        >
          View Cart ({totalItems} items)
        </Button>
      </div>
    </div>
  );
};

export default MenuNewOrderFlow;
