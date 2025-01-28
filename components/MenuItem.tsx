"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import Image, { type StaticImageData } from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | StaticImageData;
  rating: number;
  isVeg: boolean;
  onAddToCart: (id: number, quantity: number) => void;
  toggleFilterMenu: (show: boolean) => void;
  cartItems: Array<{ id: number; quantity: number }>;
  longDescription?: string;
  tableId?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  price,
  description,
  image,
  rating,
  onAddToCart,
  toggleFilterMenu,
  cartItems,
  longDescription,
  tableId,
}) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (cartItem?.quantity !== quantity) {
      setQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [cartItems, id, quantity]);

  const totalCartItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(true);
    toggleFilterMenu(false);
  };

  const handleAdd = () => {
    setAnimate(true);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(id, newQuantity);
    setTimeout(() => setAnimate(false), 300);
  };

  const handleIncrement = () => {
    setAnimate(true);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(id, newQuantity);
    if (newQuantity === 1) setTimeout(() => setAnimate(false), 300);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setAnimate(true);
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(id, newQuantity);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-3 relative flex">
        <div className="flex-1 p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[15px] font-medium text-gray-900">
              {name}
            </span>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-black stroke-none" />
              <span className="text-xs text-gray-500 ml-0.5">{rating}</span>
            </div>
          </div>
          <div className="mb-1">
            <span className="text-[13px] text-gray-900">₹ {price}</span>
          </div>
          <p className="text-[13px] text-gray-500 mt-1 leading-snug">
            {description}{" "}
            <button
              onClick={handleReadMoreClick}
              className="text-[#8b5c4a] hover:underline inline-block"
            >
              Read More
            </button>
          </p>
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`mt-2 px-4 py-1 bg-[#B29792] text-[13px] text-black rounded-md hover:bg-[#B29792] transition-colors ${
                animate ? "animate-bounce" : ""
              }`}
            >
              Add
            </button>
          ) : (
            <div className="inline-flex items-center bg-[#B29792] rounded-md mt-2">
              <button
                title="Remove"
                onClick={handleDecrement}
                className="p-1 hover:bg-[#a08884] rounded-l transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span
                className={`px-3 text-sm ${animate ? "animate-bounce" : ""}`}
              >
                {quantity}
              </span>
              <button
                title="Add"
                onClick={handleIncrement}
                className="p-1 hover:bg-[#a08884] rounded-r transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="w-[135px] h-[125px] relative self-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="rounded-lg"
            sizes="150px"
          />
        </div>
      </div>

      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => {
            setShowDetails(false);
            toggleFilterMenu(true);
          }}
        >
          <div className="absolute inset-x-0 bottom-0 bg-[#F1EEE6] rounded-t-xl animate-slide-up">
            <div className="p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium mb-1">{name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 stroke-none" />
                        <span className="text-sm text-gray-600 ml-1">
                          {rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg">₹ {price}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {longDescription || description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="w-full py-1 px-4 bg-[#ffffff] text-black rounded-md mt-2 text-sm hover:bg-[#C0B2B0] transition-colors border "
                    >
                      Add
                    </button>
                  ) : (
                    <div className="inline-flex items-center justify-center bg-[#ffffff] rounded-md mt-2 border w-full">
                      <button
                        title="Remove"
                        onClick={handleDecrement}
                        className="p-1 hover:bg-[#a08884] rounded-l transition-colors flex items-center justify-center"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span
                        className={`px-3 text-sm ${
                          animate ? "animate-bounce" : ""
                        } flex items-center justify-center`}
                      >
                        {quantity}
                      </span>
                      <button
                        title="Add"
                        onClick={handleIncrement}
                        className="p-1 hover:bg-[#a08884] rounded-r transition-colors flex items-center justify-center"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* View Cart Button */}
            <div className="bg-white px-4 py-3 border-t">
              <button
                className="w-full py-3 bg-[#9D8480] text-white rounded-lg font-medium hover:bg-[#8A716D] transition-colors"
                onClick={() => tableId && router.push(`/menu/${tableId}/cart`)}
              >
                View Cart ({totalCartItems} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;
