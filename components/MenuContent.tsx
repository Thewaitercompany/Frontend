"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MenuItem from "@/components/MenuItem";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/FilterMenu";
import Cookies from "js-cookie";

// ✅ Fixed: Changed `id` to `_id` and used strings
interface MenuItemType {
  _id: string; // Changed from `id: number` to `_id: string`
  name: string;
  price: number;
  description: string;
  longDescription?: string;
  image: string;
  rating: number;
  isVeg: boolean;
  quantity?: number;
}

// ✅ Sample menu data updated with `_id: string`
const menuItems: MenuItemType[] = [
  {
    _id: "1",
    name: "Crispy fries",
    price: 60,
    description: "Crispy, golden-brown fries served piping hot with a sprinkle of salt.",
    longDescription: "A classic side dish that pairs perfectly with burgers, sandwiches, or as a snack on its own.",
    image: "/fries.png",
    rating: 4.1,
    isVeg: true,
  },
  {
    _id: "2",
    name: "Chicken nuggets",
    price: 80,
    description: "Bite-sized pieces of chicken meat that are typically breaded and deep-fried.",
    longDescription: "Often served with fries and dipping sauces like ketchup, mustard, or BBQ sauce.",
    image: "/nugg.png",
    rating: 4.3,
    isVeg: false,
  },
];

interface MenuContentProps {
  tableId: string;
}

export default function MenuContent({ tableId }: MenuContentProps) {
  const router = useRouter();
  const [showAnimations, setShowAnimations] = useState(true);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(menuItems);
  
  // ✅ Fixed: Used `_id: string` instead of `id: number`
  const [cartItems, setCartItems] = useState<Array<{ _id: string; quantity: number }>>([]);
  
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(true);

  useEffect(() => {
    const auth = Cookies.get("auth");
    if (!auth) {
      router.replace(`/menu/login?tableId=${tableId}`);
    }
  }, [router, tableId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimations(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (isVeg: boolean) => {
    if (isVeg) {
      setFilteredItems(menuItems.filter((item) => item.isVeg));
    } else {
      setFilteredItems(menuItems);
    }
  };

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredItems(
      menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercaseQuery) ||
          item.description.toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  // ✅ Fixed: `updateCart` now expects `_id: string`
  const updateCart = (_id: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item._id === _id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (quantity === 0) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex].quantity = quantity;
        }
        return updatedItems;
      } else if (quantity > 0) {
        return [...prevItems, { _id, quantity }];
      }
      return prevItems;
    });
  };

  const toggleFilterMenu = (isVisible: boolean) => {
    setIsFilterMenuVisible(isVisible);
  };
  // if (showAnimations) {
  //   return <LoadingAnimations />;
  // }

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={tableId} />

      <SearchBar
        tableId={tableId}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <main className="flex-1 p-4 space-y-4">
        {filteredItems.map((item) => (
          <MenuItem
            key={item._id} // Ensure unique key
            {...item}
            onAddToCart={updateCart}
            toggleFilterMenu={toggleFilterMenu}
            cartItems={cartItems}
            tableId={tableId}
          />
        ))}
      </main>

      {isFilterMenuVisible && (
        <div className="fixed bottom-[88px] right-4 z-50">
          <FilterMenu onFilterChange={handleFilterChange} isVisible={true} />
        </div>
      )}

      <div className="sticky bottom-0 p-4 bg-[#F1EEE6]">
        <button
          type="button"
          aria-label="View Cart"
          onClick={() => router.push(`/menu/${tableId}/cart`)}
          className="w-full bg-[#B39793] text-white py-3 rounded-lg text-[15px]"
        >
          View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items)
        </button>
      </div>
    </div>
  );
}
