"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, XCircle, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  description: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface OrderNewProps {
  restaurantId: string;
  tableId: string;
  onClose: () => void;
  onSubmitOrder: (items: OrderItem[]) => void;
}

// Mock menu items data
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Crispy Fries",
    price: 60,
    image: "/placeholder.svg",
    category: "Starters",
    isVeg: true,
    description:
      "Crispy, golden-brown fries served piping hot with a sprinkle of salt.",
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 80,
    image: "/placeholder.svg",
    category: "Starters",
    isVeg: false,
    description:
      "Bite-sized pieces of chicken meat that are typically breaded and deep-fried.",
  },
  {
    id: "3",
    name: "Rajma Chawal",
    price: 130,
    image: "/placeholder.svg",
    category: "Main Course",
    isVeg: true,
    description:
      "Classic North Indian dish of kidney beans curry served with steamed rice.",
  },
  {
    id: "4",
    name: "Butter Naan",
    price: 25,
    image: "/placeholder.svg",
    category: "Breads",
    isVeg: true,
    description: "Soft and fluffy Indian bread with a rich buttery flavor.",
  },
  {
    id: "5",
    name: "Paneer Butter Masala",
    price: 180,
    image: "/placeholder.svg",
    category: "Main Course",
    isVeg: true,
    description:
      "Soft paneer cubes cooked in a rich and creamy tomato-based gravy.",
  },
  {
    id: "6",
    name: "Jeera Rice",
    price: 90,
    image: "/placeholder.svg",
    category: "Rice",
    isVeg: true,
    description:
      "Fragrant basmati rice cooked with cumin seeds and mild spices.",
  },
  {
    id: "7",
    name: "Cold Coffee",
    price: 70,
    image: "/placeholder.svg",
    category: "Beverages",
    isVeg: true,
    description:
      "Refreshing cold coffee with a hint of sweetness and topped with whipped cream.",
  },
  {
    id: "8",
    name: "Masala Chai",
    price: 30,
    image: "/placeholder.svg",
    category: "Beverages",
    isVeg: true,
    description: "Traditional Indian tea with a blend of aromatic spices.",
  },
];

const OrderNew: React.FC<OrderNewProps> = ({
  restaurantId,
  tableId,
  onClose,
  onSubmitOrder,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(mockMenuItems);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    // In a real application, you would fetch the menu items from an API
    // Example:
    // const fetchMenuItems = async () => {
    //   try {
    //     const response = await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/menu`);
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch menu items");
    //     }
    //     const data = await response.json();
    //     setMenuItems(data);
    //     setFilteredItems(data);
    //   } catch (error) {
    //     console.error("Error fetching menu items:", error);
    //   }
    // };
    // fetchMenuItems();

    // For now, we'll use mock data
    setMenuItems(mockMenuItems);
    setFilteredItems(mockMenuItems);
  }, [restaurantId]);

  useEffect(() => {
    // Apply filtering based on search query, active category, and veg filter
    let filtered = menuItems;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory) {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (vegOnly) {
      filtered = filtered.filter((item) => item.isVeg);
    }

    setFilteredItems(filtered);
  }, [menuItems, searchQuery, activeCategory, vegOnly]);

  const getUniqueCategories = () => {
    const categories = menuItems.map((item) => item.category);
    return Array.from(new Set(categories));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const handleToggleVegOnly = () => {
    setVegOnly(!vegOnly);
  };

  const addItemToOrder = (item: MenuItem, quantity = 1, special = "") => {
    const existingItemIndex = selectedItems.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += quantity;
      if (special) {
        updatedItems[existingItemIndex].special = special;
      }
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
          image: item.image,
          special: special || undefined,
        },
      ]);
    }
  };

  const removeItemFromOrder = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromOrder(itemId);
      return;
    }

    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setSpecialInstructions("");
  };

  const handleAddToOrder = () => {
    if (selectedItem) {
      addItemToOrder(selectedItem, 1, specialInstructions);
      setSelectedItem(null);
      setSpecialInstructions("");
    }
  };

  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0) return;

    setIsSubmitting(true);
    try {
      // In a real application, you would make an API call to create an order
      // Example:
      // await fetch(`https://backend-axu7.onrender.com/restaurant/${restaurantId}/tables/${tableId}/orders`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ items: selectedItems }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmitOrder(selectedItems);
      onClose();
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total price
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="bg-white rounded-t-xl flex-1 mt-16 overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-medium">New Order - Table {tableId}</h2>
          <button
            title="Close"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {selectedItem ? (
            <div className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">
                    {selectedItem.name}
                  </h3>
                  <div className="text-[#B39793] mb-1">
                    ₹ {selectedItem.price}
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., No onions, extra spicy"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B39793]"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedItem(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddToOrder}
                  className="flex-1 bg-[#B39793] hover:bg-[#a08884] text-white"
                >
                  Add to Order
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search menu items"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 text-gray-700 placeholder:text-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#B39793]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-medium">Categories</div>
                  <button
                    onClick={handleToggleVegOnly}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      vegOnly
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    Veg Only
                  </button>
                </div>

                <div className="flex overflow-x-auto py-1 -mx-4 px-4 space-x-2">
                  {getUniqueCategories().map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm ${
                        activeCategory === category
                          ? "bg-[#B39793] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
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
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-[#B39793]">₹ {item.price}</div>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No items found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t">
          {selectedItems.length > 0 && !selectedItem && (
            <div className="p-4 border-b max-h-40 overflow-auto">
              <h3 className="font-medium mb-3">Selected Items</h3>
              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      {item.special && (
                        <div className="text-xs text-gray-500 italic">
                          *{item.special}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        title="Remove item"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="text-gray-500"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        title="Add item"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">₹ {totalPrice}</span>
            </div>
            <Button
              onClick={handleSubmitOrder}
              disabled={selectedItems.length === 0 || isSubmitting}
              className="w-full py-6 bg-[#B39793] hover:bg-[#a08884] text-white"
            >
              {isSubmitting
                ? "Submitting..."
                : `Submit Order (${selectedItems.length} items)`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNew;
