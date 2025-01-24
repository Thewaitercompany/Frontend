"use client";

import { useState } from "react";
import Image from "next/image";

interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: "Starters", count: 15 },
  { name: "Main course", count: 12 },
  { name: "Beverages", count: 6 },
  { name: "Desserts", count: 9 },
  { name: "Alcohol", count: 22 },
];

interface FilterMenuProps {
  onFilterChange: (isVeg: boolean) => void;
  isVisible: boolean;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  onFilterChange,
  isVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (isVeg: boolean) => {
    onFilterChange(isVeg);
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full transition-all duration-300 ease-in-out hover:scale-110"
        aria-label="Filter Menu"
      >
        <div className="relative w-14 h-14">
          <Image
            src="/utensils.png"
            alt="Open filter menu"
            width={56}
            height={56}
            className="rounded-full absolute top-0 left-0 transition-all duration-300 ease-in-out"
            style={{
              opacity: isOpen ? 0 : 1,
              transform: `scale(${isOpen ? 0.8 : 1})`,
            }}
          />
          <Image
            src="/crossutensils.png"
            alt="Close filter menu"
            width={56}
            height={56}
            className="rounded-full absolute top-0 left-0 transition-all duration-300 ease-in-out"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: `scale(${isOpen ? 1 : 0.8})`,
            }}
          />
        </div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-[#4E3E3B] rounded-xl shadow-lg overflow-hidden z-50">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  handleFilterChange(category.name === "Vegetarian")
                }
                className="flex justify-between items-center w-full px-6 py-3 text-white hover:bg-[#5d4c49] transition-colors"
              >
                <span className="text-[15px]">{category.name}</span>
                <span className="text-[15px]">
                  {category.count.toString().padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterMenu;
