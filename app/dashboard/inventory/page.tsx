"use client";
import React, { useState } from "react";
import StockStatusTab from "./StockStatusTab";
import StockManagementTab from "./StockManagementTab";

const TABS = [
  "Stock Status",
  "Stock Management",
  "Purchase Management",
  "Inhouse Operations",
  "Wastage",
];

const stockStatusData = [
  {
    status: "low",
    image: "/beetroot.png",
    name: "Potatoes",
    cost: "₹140/kg",
    totalUnit: "10 Kg",
    totalCost: "₹1,400",
    perDay: "6 Kg",
    expiry: "20/3/25",
  },
  {
    status: "low",
    image: "/tomatoes.png",
    name: "Tomatoes",
    cost: "₹120/kg",
    totalUnit: "15 Kg",
    totalCost: "₹1,800",
    perDay: "10 Kg",
    expiry: "23/3/25",
  },
  {
    status: "order",
    image: "/freedhaniya.png",
    name: "Ladyfinger",
    cost: "₹70/kg",
    totalUnit: "8 Kg",
    totalCost: "₹560",
    perDay: "4 Kg",
    expiry: "19/3/25",
  },
  {
    status: "sufficient",
    image: "/bellpepper.png",
    name: "Bell Pepper",
    cost: "₹90/kg",
    totalUnit: "10 Kg",
    totalCost: "₹900",
    perDay: "2 Kg",
    expiry: "20/3/25",
  },
];

const stockManagementData = [
  {
    image: "/beetroot.png",
    name: "Potatoes",
    dish: "Crispy Fries",
    cost: "₹140/kg",
    used: "500g",
    category: "Vegetable",
    spent: "₹70",
    datetime: "13/03 5:00pm",
    left: "9.5kg",
    expiry: "20/03/25",
  },
];

const inventoryCards = [
  {
    image: "/beetroot.png",
    name: "Potatoes",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/tomatoes.png",
    name: "Tomato",
    qty: "4kg",
    category: "Vegetable",
    consumption: "5kg/day",
  },
  {
    image: "/freedhaniya.png",
    name: "Ladyfinger",
    qty: "3kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/bellpepper.png",
    name: "Bell Pepper",
    qty: "1kg",
    category: "Vegetable",
    consumption: "1kg/day",
  },
  {
    image: "/onion.png",
    name: "Onion",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/cabbage.png",
    name: "Cabbage",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/bellpepper.png",
    name: "Bell Pepper",
    qty: "1kg",
    category: "Vegetable",
    consumption: "1kg/day",
  },
  {
    image: "/onion.png",
    name: "Onion",
    qty: "2kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/cabbage.png",
    name: "Cabbage",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/freedhaniya.png",
    name: "Ladyfinger",
    qty: "3kg",
    category: "Vegetable",
    consumption: "3kg/day",
  },
  {
    image: "/beetroot.png",
    name: "Potatoes",
    qty: "2kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/tomatoes.png",
    name: "Tomato",
    qty: "4kg",
    category: "Vegetable",
    consumption: "5kg/day",
  },
];

const chartData = [
  { time: "10-11am", sold: 2, purchased: 6 },
  { time: "11-12pm", sold: 1, purchased: 4 },
  { time: "12-1pm", sold: 5, purchased: 3 },
  { time: "1-2pm", sold: 9, purchased: 2 },
  { time: "2-3pm", sold: 6, purchased: 3 },
  { time: "3-4pm", sold: 5, purchased: 6 },
];
const minPurchaseLimit = 6;

// Dummy data for purchase management
const purchaseData = [
  {
    ingredient: "Potatoes",
    cost: "₹140/kg",
    category: "Vegetable",
    unit: "10kg",
    total: "₹1,400",
    invoice: "00001",
    supplier: "Mr Raghu",
    status: "Delivered on: 13/03 5:00pm",
  },
  {
    ingredient: "Tomatoes",
    cost: "₹120/kg",
    category: "Vegetable",
    unit: "15kg",
    total: "₹1,800",
    invoice: "00002",
    supplier: "Mr Raghu",
    status: "Delivered on: 11/03 4:00pm",
  },
  {
    ingredient: "Ladyfinger",
    cost: "₹70/kg",
    category: "Vegetable",
    unit: "5kg",
    total: "₹450",
    invoice: "00003",
    supplier: "Mr Anmol",
    status: "Delivered on: 14/03 1:00pm",
  },
  {
    ingredient: "Onions",
    cost: "₹170/kg",
    category: "Vegetable",
    unit: "10kg",
    total: "₹1700",
    invoice: "00004",
    supplier: "Mr Anmol",
    status: "Delivered on: 09/03 4:00pm",
  },
];

const purchaseChartData = [
  { day: "Saturday", total: 1000 },
  { day: "Sunday", total: 1200 },
  { day: "Monday", total: 3000 },
  { day: "Tuesday", total: 6000 },
  { day: "Wednesday", total: 4000 },
  { day: "Today", total: 3000 },
];

const productCards = [
  {
    image: "/beetroot.png",
    name: "Potatoes",
    price: "₹140/kg",
    delivery: "Sat, 15 Mar",
  },
  {
    image: "/tomatoes.png",
    name: "Tomatoes",
    price: "₹120/kg",
    delivery: "Sat, 14 Mar",
  },
  {
    image: "/onion.png",
    name: "Onions",
    price: "₹170/kg",
    delivery: "Sat, 15 Mar",
  },
  {
    image: "/bellpepper.png",
    name: "Bell Pepper",
    price: "₹90/kg",
    delivery: "Sat, 15 Mar",
  },
  {
    image: "/cabbage.png",
    name: "Cabbage",
    price: "₹100/kg",
    delivery: "Sat, 15 Mar",
  },
];

const relatedItems = [
  { image: "/tomatoes.png", name: "Tomatoes", price: "120/kg" },
  { image: "/onion.png", name: "Onion", price: "170/kg" },
  { image: "/bellpepper.png", name: "Bell Pepper", price: "90/kg" },
  { image: "/cabbage.png", name: "Cabbage", price: "100/kg" },
];

const likeItems = [
  { image: "/tomatoes.png", name: "Tomato" },
  { image: "/freedhaniya.png", name: "Ladyfinger" },
  { image: "/bellpepper.png", name: "Bell Pepper" },
  { image: "/cabbage.png", name: "Cabbage" },
  { image: "/onion.png", name: "Onion" },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [purchaseView, setPurchaseView] = useState<
    "table" | "add" | "edit" | "chart" | "product" | "cart" | "delivery"
  >("table");
  const [searchPurchase, setSearchPurchase] = useState("");
  const [cartQty, setCartQty] = useState(10);

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#e5e0d8] mb-4">
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium transition-colors ${
              activeTab === idx
                ? "border-b-2 border-[#b39793] text-[#4e3e3b]"
                : "text-[#4e3e3b]/70"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && <StockStatusTab />}
      {activeTab === 1 && <StockManagementTab />}
      {activeTab === 2 && (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400 text-lg">
           (Coming soon)
        </div>
      )}
      {activeTab === 3 && (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400 text-lg">
          Inhouse Operations (Coming soon)
        </div>
      )}
      {activeTab === 4 && (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400 text-lg">
          Wastage (Coming soon)
        </div>
      )}
    </div>
  );
}
