'use client';
import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';

interface SearchBarProps {
  tableId: string;
  onFilterChange: (isVeg: boolean) => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVeg, setIsVeg] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleFilter = () => {
    const newIsVeg = !isVeg;
    setIsVeg(newIsVeg);
    onFilterChange(newIsVeg);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[#f5f1eb]">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search dishes"
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white text-gray-700 placeholder:text-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-gray-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center cursor-pointer gap-2">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isVeg}
              onChange={toggleFilter}
            />
            <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors">
              {isVeg && (
              <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            Veg Only
          </span>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;