"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<
    {
      _id: string;
      name: string;
      description: string;
      category: string;
      price: number;
      cost?: number;
      image: string;
      isVeg?: boolean;
      ingredients?: string;
    }[]
  >([]);
  const [categories, setCategories] = useState<string[]>([
    "Starters",
    "Main Course",
    "Desserts",
    "Drinks",
  ]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<null | (typeof items)[0]>(
    null
  );

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch(
          "https://qr-server-tabb.onrender.com/menu-all"
        );
        if (!response.ok) throw new Error("Failed to fetch menu items");
        const data = await response.json();
        setItems(data);
        // Extract unique categories
        const cats: string[] = Array.from(
          new Set(data.map((item: any) => item.category))
        );
        setCategories(["All", ...cats]);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    fetchMenuItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  const openDeleteModal = (item: (typeof items)[0]) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      const response = await fetch(
        `https://qr-server-tabb.onrender.com/delete-menu/${itemToDelete._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete item");
      setItems((prev) => prev.filter((item) => item._id !== itemToDelete._id));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6 font-serif">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Restaurant&apos;s Menu
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={() => setVegOnly((v) => !v)}
              className="accent-[#C99E5A] w-5 h-5 rounded border-gray-300"
            />
            <span className="text-base">Veg Only</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#e5c99a] rounded px-3 py-2 text-base bg-white focus:outline-none min-w-[160px] font-serif"
            title="Category Filter"
            style={{ boxShadow: "none" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="font-serif">
                {cat === "All" ? "Category (All)" : cat}
              </option>
            ))}
          </select>
          <Link href="/dashboard/menu/add">
            <button
              className="ml-4 bg-white border border-[#e5c99a] hover:bg-[#f5f1eb] text-gray-600 rounded-md p-2 flex items-center justify-center"
              aria-label="Add new dish"
            >
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      <main>
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-[#e5c99a] rounded-md text-base focus:outline-none font-serif bg-white"
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-0 overflow-x-auto border border-[#e5c99a]">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 font-serif">
            <thead>
              <tr className="border-b border-[#e5c99a]">
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Image
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Name
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Description
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Category
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Veg/Non-Veg
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Cost
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Price
                </th>
                <th className="py-4 px-4 text-left font-semibold border-b border-[#e5c99a] bg-white">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 text-gray-400 border-b border-[#e5c99a]"
                  >
                    No items found.
                  </td>
                </tr>
              )}
              {filteredItems.map((item, idx) => (
                <tr
                  key={item._id}
                  className="transition"
                  style={{ borderBottom: "1px solid #e5c99a" }}
                >
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-[#e5c99a] bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] font-medium align-middle">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] max-w-xs align-middle">
                    <span className="block truncate text-gray-700">
                      {item.description}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.isVeg
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    ₹{item.cost ?? "-"}
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    ₹{item.price}
                  </td>
                  <td className="py-3 px-4 border-b border-[#e5c99a] align-middle">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/menu/edit/${item._id}`}>
                        <button
                          className="p-2 hover:bg-[#f5f1eb] rounded-full transition-colors"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right text-gray-500 text-sm mt-4 font-serif pr-2">
          {filteredItems.length} of {items.length} items
        </div>
        {/* Delete Confirmation Modal */}
        {deleteModalOpen && itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px] max-w-full flex flex-col items-center relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                onClick={closeDeleteModal}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-4 text-lg font-semibold text-center font-serif">
                You want to delete this dish?
              </div>
              <div className="w-32 h-24 rounded-lg overflow-hidden mb-3 border border-gray-200 bg-gray-50 flex items-center justify-center">
                {itemToDelete.image ? (
                  <Image
                    src={itemToDelete.image}
                    alt={itemToDelete.name}
                    width={128}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 font-serif">No Image</span>
                )}
              </div>
              <div className="text-center font-medium text-lg mb-1 font-serif">
                {itemToDelete.name}
              </div>
              <div className="text-center text-[#C99E5A] text-lg font-semibold mb-6 font-serif">
                ₹{itemToDelete.price}
              </div>
              <button
                className="w-full py-2 bg-[#C99E5A] hover:bg-[#b88d49] text-white rounded-lg text-base font-semibold font-serif"
                onClick={confirmDeleteItem}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
