"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  image: string;
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
    image: "",
    name: "",
    description: "",
    ingredients: "",
    cost: "",
    price: "",
    category: "starters",
    isVeg: false,
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [isVeg, setIsVeg] = useState<boolean>(false);
  const [isVegExample, setIsVegExample] = useState<boolean>(false); // Separate state for example item

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const updatedMenuItem = { ...menuItem, isVeg };
    console.log(updatedMenuItem);
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={150}
              height={50}
              className="h-8 w-auto"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl">Badshah&apos;s Kitchen</span>
        </div>
        <div className="text-right">
          <Link href="/dashboard">
            <h2 className="text-xl font-medium">Dashboard</h2>
          </Link>
          <p className="text-sm text-gray-600">Saturday, November, 2024</p>
        </div>
      </header>
      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/dashboard/menu"
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Add Menu Items</span>
          </Link>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-8 gap-4 mb-4 border-b pb-2">
          <div>Image</div>
          <div>Name</div>
          <div>Description</div>
          <div>Ingredients</div>
          <div>Cost</div>
          <div>Price</div>
          <div>Category</div>
          <div>Toggle</div>
        </div>

        {/* Example Item */}
        <div className="grid grid-cols-8 gap-4 items-center mb-6">
          <div>
            <Image
              src="/chickennoodels.png"
              alt="Chicken Noodles"
              width={80}
              height={80}
              className="rounded-xl"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <div>Chicken Noodles</div>
          <div>
            These Fire Chicken Noodles are hot & spicy, but only have a handful
            of ingredients.
          </div>
          <div>Chicken, noodles, vegetables, garlic tossed with sauces.</div>
          <div>₹ 50</div>
          <div>₹ 70</div>
          <div>
            <Select defaultValue="starters">
              <SelectTrigger className="w-full bg-white">
                <SelectValue>Starters</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starters">Starters</SelectItem>
                <SelectItem value="main-course">Main Course</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/Non-veg.png"
              alt="Non Vegetarian"
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <button
              type="button"
              aria-label="Toggle vegetarian option"
              className={`relative w-10 h-5 rounded-full ${
                !isVegExample ? "bg-red-500" : "bg-gray-200"
              }`}
              onClick={() => setIsVegExample(!isVegExample)} // Toggle example item state
            >
              <span
                className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                  !isVegExample ? "right-0.5" : "left-0.5"
                } top-0.5`}
              />
            </button>
            <Image
              src="/veg.png"
              alt="Vegetarian"
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* Add New Item Form */}
        <div className="grid grid-cols-8 gap-4 items-start mb-6">
          <div>
            {previewImage && (
              <Image
                src={previewImage}
                alt="Preview"
                width={80}
                height={80}
                className="rounded-xl mb-2"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            )}
            <label className="block w-20 h-20 border border-dashed border-gray-300 rounded-lg cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                Add Image
              </div>
            </label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Add the name of the dish"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Add a brief description about the dish"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              rows={3}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              name="ingredients"
              placeholder="Add ingredients"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              rows={3}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="cost"
              placeholder="Add the total cost of the dish"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              placeholder="Add the price at which dish will be sold"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Select
              value={menuItem.category}
              onValueChange={(value) =>
                setMenuItem((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starters">Starters</SelectItem>
                <SelectItem value="main-course">Main Course</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/Non-veg.png"
              alt="Non Vegetarian"
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <button
              type="button"
              aria-label="Toggle vegetarian option"
              className={`relative w-10 h-5 rounded-full ${
                !isVeg ? "bg-red-500" : "bg-gray-200"
              }`}
              onClick={() => setIsVeg(!isVeg)} // Toggle state for new item form
            >
              <span
                className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                  !isVeg ? "right-0.5" : "left-0.5"
                } top-0.5`}
              />
            </button>
            <Image
              src="/veg.png"
              alt="Vegetarian"
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-[#C99E5A] text-white rounded-lg hover:bg-[#b88d49] transition-colors"
            onClick={handleSubmit}
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}
