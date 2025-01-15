"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MenuItem from '@/components/MenuItem';
import SearchBar from '@/components/SearchBar';
import FilterMenu from '@/components/FilterMenu';

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: 'Crispy fries',
    price: 60,
    description: 'Crispy, golden-brown fries served piping hot with a sprinkle of salt.',
    longDescription: 'Crispy, golden-brown fries served piping hot with a sprinkle of salt. A classic side dish that pairs perfectly with burgers, sandwiches, or as a snack on its own.',
    image: '/fries.png',
    rating: 4.1,
    isVeg: true
  },
  {
    id: 2,
    name: 'Chicken nuggets',
    price: 80,
    description: 'Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried.',
    longDescription: 'Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried. They are a popular fast food item, often served with french fries and dipping sauces like ketchup, mustard, or BBQ sauce.',
    image: '/nugg.png',
    rating: 4.3,
    isVeg: false
  },
  {
    id: 3,
    name: 'Crispy fries',
    price: 60,
    description: 'Crispy, golden-brown fries served piping hot with a sprinkle of salt.',
    longDescription: 'Crispy, golden-brown fries served piping hot with a sprinkle of salt. A classic side dish that pairs perfectly with burgers, sandwiches, or as a snack on its own.',
    image: '/fries.png',
    rating: 4.1,
    isVeg: true
  },
  {
    id: 4,
    name: 'Chicken nuggets',
    price: 80,
    description: 'Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried.',
    longDescription: 'Chicken nuggets are bite-sized pieces of chicken meat that are typically breaded and deep-fried. They are a popular fast food item, often served with french fries and dipping sauces like ketchup, mustard, or BBQ sauce.',
    image: '/nugg.png',
    rating: 4.3,
    isVeg: false
  },
]

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

export default function MenuPage() {
  const router = useRouter();
  const params = useParams();
  const tableId = params.tableId as string;
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(menuItems);
  const [cartItems, setCartItems] = useState<MenuItemType[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(true);

  const handleFilterChange = (isVeg: boolean) => {
    if (isVeg) {
      setFilteredItems(menuItems.filter(item => item.isVeg));
    } else {
      setFilteredItems(menuItems);
    }
  };

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredItems(menuItems.filter(item =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
    ));
  };

  const addToCart = (item: MenuItemType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => i.id === item.id
          ? { ...i, quantity: (i.quantity || 0) + 1 }
          : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(prev => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE6]">
      <Navbar tableId={tableId} />

      <SearchBar
        tableId={tableId}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <main className="flex-1 p-6 space-y-2">
        {filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            onAddToCart={() => addToCart(item)}
            toggleFilterMenu={toggleFilterMenu}
            cartItems={cartItems}
          />
        ))}
      </main>

      {showFilterMenu && (
        <div className="fixed bottom-[88px] right-4 z-50">
          <FilterMenu onFilterChange={handleFilterChange} />
        </div>
      )}

      <div className="sticky bottom-0 p-2 bg-white z-40">
        <button
          type="button"
          aria-label="View Cart"
          onClick={() => router.push(`/menu/${tableId}/cart`)}
          className="w-full bg-[#9D8480] text-white py-3 rounded-md hover:bg-[#3a2e2c] transition-colors"
        >
          View Cart ({cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)} items)
        </button>
      </div>
    </div>
  );
}

