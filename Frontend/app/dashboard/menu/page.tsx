'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState('Starters');
  const [items, setItems] = useState<
  { _id: string; name: string; description: string; category: string; price: number; image: string }[]
>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Starters', 'Drinks', 'Desserts', 'Main Course', 'All Items'];

  // Fetch menu items from the backend
  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch('https://qr-server-tabb.onrender.com/menu-all'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  const filteredItems = selectedCategory === 'All Items' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

    const handleDeleteItem = async (_id: string) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this item?");
      
      if (!isConfirmed) return; // Stop execution if user cancels
      
      try {
        const response = await fetch(`https://qr-server-tabb.onrender.com/delete-menu/${_id}`, { method: "DELETE" });
    
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
    
        // Remove item from state only if deletion was successful
        setItems(prevItems => prevItems.filter(item => item._id !== _id));
        console.log("Item deleted successfully");
        alert("Item deleted successfully!");
    
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    };
    
    

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6 font-serif">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={150}
              height={50}
              className="h-8 lg:h-10 w-auto"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl">Badshah&apos;s Kitchen</span>
        </div>
        <div className="text-right">
          <Link href="/dashboard">
            <h2 className="text-xl font-medium">Dashboard</h2>
          </Link>
          <p className="text-sm text-gray-600">
            Saturday, November, 2024
          </p>
        </div>
      </header>
      {/* Overview Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg mb-4">Today&apos;s Overview</h2>
        <div className="flex gap-4">
          <Link 
              href="/dashboard/tables"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              List of Tables
            </Link>
            <Link
              href="/dashboard/menu"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              Restaurant&apos;s Menu
            </Link>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
       <Link href="/dashboard/total-orders" className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors">
            <h3 className="text-sm text-gray-600 mb-2">Total Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">200</p>
       </Link>
        <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm text-black mb-1">Completed Orders</h3>
          <p className="text-2xl font-normal text-[#C99E5A]">170</p>
        </div>
        <Link href="/dashboard/pending-orders" className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors">
            <h3 className="text-sm text-gray-600 mb-2">Pending Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">30</p>
          </Link>
        <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm text-black mb-1">Total Sales</h3>
          <p className="text-2xl font-normal text-[#C99E5A]">50,000</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm text-black mb-1">Total Profit</h3>
          <p className="text-2xl font-normal text-[#C99E5A]">22,000</p>
        </div>
      </div>
      {/* Menu Section */}
      <div className="bg-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Menu</h2>
          <Link
              href="/dashboard/menu/add"
              className="p-2 bg-[#C99E5A] text-white rounded-full hover:bg-[#b88d4f] transition-colors"
            >
               <Plus className="w-5 h-5" />
            </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-[#C99E5A] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">Image</th>
                <th className="text-left py-4 px-4 font-medium">Name</th>
                <th className="text-left py-4 px-4 font-medium">Description</th>
                <th className="text-left py-4 px-4 font-medium">Category</th>
                <th className="text-left py-4 px-4 font-medium">Price</th>
                <th className="text-left py-4 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-4 px-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        style={{
                          maxWidth: "100%",
                        }} />
                    </div>
                  </td>
                  <td className="py-4 px-4">{item.name}</td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="truncate">{item.description}</p>
                  </td>
                  <td className="py-4 px-4">{item.category}</td>
                  <td className="py-4 px-4">₹ {item.price}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil className="w-4 h-4 text-[#C99E5A]" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
