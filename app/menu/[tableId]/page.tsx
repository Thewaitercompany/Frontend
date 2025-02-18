"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import MenuItem from "@/components/MenuItem";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/FilterMenu";
import Cookies from "js-cookie";

interface MenuItemType {
  _id: string;
  name: string;
  price: number;
  description: string;
  longDescription?: string;
  image?: string;
  rating: number;
  isVeg: boolean;
  quantity?: number;
}

export default function MenuPage() {
  const router = useRouter();
  const params = useParams();
  const tableId = params.tableId as string;
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [cartItems, setCartItems] = useState<
    Array<{ _id: string; quantity: number }>
  >([]);
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phonenumber, setPhonenumber] = useState<string>("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://qr-customer-sj9m.onrender.com/menu-customer");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from Cookies or LocalStorage
        const userDataString = Cookies.get("userData");
        let storedPhoneNumber = null;
  
        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            storedPhoneNumber = userData.phonenumber;
          } catch (error) {
            console.error("Error parsing userData from cookies:", error);
          }
        }
  
        // Fallback to localStorage if not found in Cookies
        if (!storedPhoneNumber) {
          storedPhoneNumber = localStorage.getItem("phonenumber");
        }
  
        if (!storedPhoneNumber) {
          console.warn("Phone number not found in cookies or localStorage");
          return;
        }
  
        const response = await fetch(`https://qr-customer-sj9m.onrender.com/user?phonenumber=${storedPhoneNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setPhonenumber(data.phonenumber);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
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

  const updateCart = async (_id: string, quantity: number) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find((i) => i._id === _id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCartItems.push({ _id, quantity });
    }

    setCartItems(updatedCartItems);

    try {
      const payload = {
        cart: {
          tableNumber: parseInt(tableId, 10),
          items: updatedCartItems.map((cartItem) => ({
            productId: cartItem._id,
            quantity: cartItem.quantity,
          })),
          phonenumber,
          status: "active",
        },
      };

      const response = await fetch("https://qr-customer-sj9m.onrender.com/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart.");
      }

      const updatedCart = await response.json();
      console.log("Updated cart:", updatedCart);
    } catch (err) {
      console.error("Error updating cart:", err);
      setError(err instanceof Error ? err.message : "Failed to update cart.");
    }
  };

  const toggleFilterMenu = (isVisible: boolean) => {
    setIsFilterMenuVisible(isVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={tableId} />
      <SearchBar tableId={tableId} onFilterChange={handleFilterChange} onSearch={handleSearch} />
      <main className="flex-1 p-4 space-y-4">
        {filteredItems.map((item) => (
          <MenuItem
            key={item._id}
            {...item}
            image={item.image || "/default.png"}
            onAddToCart={(_id, quantity) => updateCart(String(_id), quantity)}
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
          View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
        </button>
      </div>
    </div>
  );
}
