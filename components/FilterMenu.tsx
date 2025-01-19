'use client';

import { useState } from 'react';
import { Utensils } from 'lucide-react';

interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: 'Starters', count: 15 },
  { name: 'Main course', count: 12 },
  { name: 'Beverages', count: 6 },
  { name: 'Desserts', count: 9 },
  { name: 'Alcohol', count: 22 },
];

interface FilterMenuProps {
  onFilterChange: (isVeg: boolean) => void;
  isVisible: boolean;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange, isVisible }) => {
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
        className="p-3 rounded-full bg-[#9D8480] hover:bg-[#8b7471] transition-colors"
        aria-label="Filter Menu"
      >
        <Utensils className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#4E3E3B] rounded-xl shadow-lg overflow-hidden z-50">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleFilterChange(category.name === 'Vegetarian')}
                className="flex justify-between items-center w-full px-6 py-3 text-white hover:bg-[#5d4c49] transition-colors"
              >
                <span className="text-[15px]">{category.name}</span>
                <span className="text-[15px]">
                  {category.count.toString().padStart(2, '0')}
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

