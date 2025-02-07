'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  name: string;
  description: string;
  ingredients: string;
  cost: string;
  price: string;
  category: string;
  isVeg: boolean;
}

export default function AddMenuItem() {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    image: null,
    name: '',
    description: '',
    ingredients: '',
    cost: '',
    price: '',
    category: 'Starters',
    isVeg: false,
    rating: 1,  // Default rating
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setMenuItem(prev => ({
      ...prev,
      [name]: name === "rating" ? Number(value) || 1 : value,  // Default to 1 if invalid
    }));
  };
  

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !menuItem.name.trim() ||
      !menuItem.description.trim() ||
      !menuItem.ingredients.trim() ||
      !menuItem.cost.trim() ||
      !menuItem.price.trim() ||
      !menuItem.category.trim()
    ) {
      alert("All required fields must be provided.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("https://qr-server-tabb.onrender.com/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuItem),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save menu item.");
      }
  
      alert("Menu item added successfully!");
  
      // Reset form after successful submission
      setMenuItem({
        name: "",
        description: "",
        ingredients: "",
        cost: "",
        price: "",
        category: "Starters",
        isVeg: false,
      });
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/menu" className="flex items-center">
            <ArrowLeft className="w-4 h-4" />
            <span>Add Menu Items</span>
          </Link>
        </div>
      </header>

      <div className="bg-white rounded-3xl p-8">
        <div className="grid grid-cols-7 gap-4 mb-4 border-b pb-2">
          <div>Name</div>
          <div>Description</div>
          <div>Ingredients</div>
          <div>Cost</div>
          <div>Price</div>
          <div>Category</div>
          <div>Toggle</div>
        </div>

        <div className="grid grid-cols-7 gap-4 items-start mb-6">
          <input
            type="text"
            name="name"
            placeholder="Add the name of the dish"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Add a brief description"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            rows={3}
            onChange={handleInputChange}
          />
          <textarea
            name="ingredients"
            placeholder="Add ingredients"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            rows={3}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cost"
            placeholder="Add the total cost"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Add the selling price"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            onChange={handleInputChange}
          />
          <Select
            value={menuItem.category}
            onValueChange={(value) => setMenuItem(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-full border-gray-200">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Starters">Starters</SelectItem>
              <SelectItem value="Main Course">Main Course</SelectItem>
              <SelectItem value="Desserts">Desserts</SelectItem>
              <SelectItem value="Drinks">Beverages</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            aria-label="Toggle vegetarian option"
            className={`relative w-10 h-5 rounded-full ${!menuItem.isVeg ? 'bg-red-500' : 'bg-gray-200'}`}
            onClick={() => setMenuItem(prev => ({ ...prev, isVeg: !prev.isVeg }))}
          >
            <span
              className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${!menuItem.isVeg ? 'right-0.5' : 'left-0.5'} top-0.5`}
            />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            className={`px-6 py-2 text-white rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#C99E5A] hover:bg-[#b88d49]'}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
