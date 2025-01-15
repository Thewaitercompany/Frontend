import React, { useState } from 'react';
import Image, { StaticImageData } from "next/image";
import { Star } from 'lucide-react';

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | StaticImageData;
  rating: number;
  longDescription?: string;
  onAddToCart: () => void;
  toggleFilterMenu: () => void;
  cartItems: MenuItemType[];
  isVeg: boolean;
}

interface MenuItemType {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  isVeg: boolean;
  quantity?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  price,
  description,
  image,
  rating,
  onAddToCart,
  longDescription,
  toggleFilterMenu,
  cartItems,
  isVeg
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleReadMoreClick = () => {
    setShowDetails(true);
    toggleFilterMenu();
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const quantity = cartItems.find(item => item.id === id)?.quantity || 0;

  return (
    <>
      {/* Menu Item Card */}
      <div className="bg-[#FAF7F5] p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-base font-medium text-gray-900">{name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 stroke-none" />
                <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-base font-medium mb-1">₹ {price}</p>
            <p className="text-sm text-gray-600 mb-2">{isVeg ? '🟢 Veg' : '🔴 Non-veg'}</p>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={handleReadMoreClick}
                className="text-[#8b5c4a] text-sm hover:text-[#6d4837]"
              >
                Read More
              </button>
              <button
                onClick={onAddToCart}
                className="px-3 py-1 bg-[#9D8480] text-white text-sm rounded-full hover:bg-[#6d4837] transition-colors"
              >
                Add {quantity > 0 && `(${quantity})`}
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 self-center">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Drawer with View Cart */}
      {showDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowDetails(false)}>
          <div className="absolute inset-x-0 bottom-0 flex flex-col">
            {/* Popup Content */}
            <div 
              className="bg-white py-4 px-4 rounded-t-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-none" />
                    <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-base">₹ {price}</p>
              </div>
              <div className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-600 flex-1">
                  {longDescription || description}
                </p>
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
                  <button
                    onClick={onAddToCart}
                    className="mt-2 w-full py-1 px-4 bg-white text-black text-sm rounded border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* View Cart Button */}
            <div className="bg-white px-4 py-3 border-t">
              <button 
                className="w-full py-3 bg-[#9D8480] text-white rounded-lg font-medium"
                onClick={() => console.log('View cart clicked')}
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

