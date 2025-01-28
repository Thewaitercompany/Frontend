"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingAnimations from "@/components/LoadingAnimations";
import Navbar from "@/components/Navbar";
import MenuItem from "@/components/MenuItem";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/FilterMenu";
import Cookies from "js-cookie";

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: "Crispy fries",
    price: 60,
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt.",
    longDescription:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt. A classic side dish that pairs perfectly with burgers, sandwiches, or as a snack on its own.",
    image: "/fries.png",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: 2,
    name: "Chicken nuggets",
    price: 80,
    description:
      "Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried.",
    longDescription:
      "Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried. They are a popular fast food item, often served with french fries and dipping sauces like ketchup, mustard, or BBQ sauce.",
    image: "/nugg.png",
    rating: 4.3,
    isVeg: false,
  },
  {
    id: 3,
    name: "Crispy fries",
    price: 60,
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt.",
    longDescription:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt. A classic side dish that pairs perfectly with burgers, sandwiches, or as a snack on its own.",
    image: "/fries.png",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: 4,
    name: "Chicken nuggets",
    price: 80,
    description:
      "Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried.",
    longDescription:
      "Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried. They are a popular fast food item, often served with french fries and dipping sauces like ketchup, mustard, or BBQ sauce.",
    image: "/nugg.png",
    rating: 4.3,
    isVeg: false,
  },
];

interface MenuItemType {
  id: number;
  name: string;
  price: number;
  description: string;
  longDescription?: string;
  image: string;
  rating: number;
  isVeg: boolean;
  quantity?: number;
}

interface MenuContentProps {
  tableId: string;
}

export default function MenuContent({ tableId }: MenuContentProps) {
  const router = useRouter();
  const [showAnimations, setShowAnimations] = useState(true);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(menuItems);
  const [cartItems, setCartItems] = useState<
    Array<{ id: number; quantity: number }>
  >([]);
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(true);

  useEffect(() => {
    const auth = Cookies.get("auth");
    if (!auth) {
      router.replace(`/menu/login?tableId=${tableId}`);
    }
  }, [router, tableId]);

  useEffect(() => {
    // This effect will run after the LoadingAnimations component unmounts
    const timer = setTimeout(() => {
      setShowAnimations(false);
    }, 5000); // Adjust this time based on the total duration of your animations

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

  const updateCart = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        if (quantity === 0) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex].quantity = quantity;
        }
        return updatedItems;
      } else if (quantity > 0) {
        return [...prevItems, { id, quantity }];
      }
      return prevItems;
    });
  };

  const toggleFilterMenu = (isVisible: boolean) => {
    setIsFilterMenuVisible(isVisible);
  };

  if (showAnimations) {
    return <LoadingAnimations />;
  }

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
            key={item.id}
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
          className="w-full bg-[#9D8480] text-white py-3 rounded-lg text-[15px]"
        >
          View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items)
        </button>
      </div>
    </div>
  );
}
