import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// --- Custom Icon Components for Figma Look ---
const IconCircle = ({
  children,
  ...props
}) => (
  <div
    {...props}
    style={{
      border: "2px solid #fff",
      borderRadius: "50%",
      width: 48,
      height: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      ...props.style,
    }}
  >
    {children}
  </div>
);

const FigmaRefreshIcon = ({ onClick }) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {/* Outer circle */}
    <circle cx="14" cy="14" r="13" stroke="#b39793" strokeWidth="1.5" />
    {/* Placeholder for the refresh icon, centered within the SVG */}
    <image
      href="/VectorRefresh.png"
      x="7"
      y="7"
      width="14"
      height="14"
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>
);

const FigmaBarChartIcon = ({ onClick }) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {/* Outer circle - this will be the only circle */}
    <circle cx="14" cy="14" r="12" stroke="#b39793" strokeWidth="1.5" />
    {/* XY Axis for the graph */}
    <path
      d="M7 20L7 8M7 20L21 20"
      stroke="#b39793"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Increasing zig-zag line */}
    <polyline
      points="8 18 12 14 16 16 20 12"
      stroke="#b39793"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- DATA ---
const chartData = [
  { time: "10-11am", sold: 2, purchased: 6 },
  { time: "11-12pm", sold: 1, purchased: 4 },
  { time: "12-1pm", sold: 5, purchased: 3 },
  { time: "1-2pm", sold: 9, purchased: 2 },
  { time: "2-3pm", sold: 6, purchased: 3 },
  { time: "3-4pm", sold: 5, purchased: 6 },
];
const minPurchaseLimit = 6;

const inventoryCards = [
  {
    image: "/potatoes.jpg",
    name: "Potatoes",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/image2_tomato.jpg",
    name: "Tomato",
    qty: "4kg",
    category: "Vegetable",
    consumption: "5kg/day",
  },
  {
    image: "/image4_ladyfinger.jpg",
    name: "Ladyfinger",
    qty: "3kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
    qty: "1kg",
    category: "Vegetable",
    consumption: "1kg/day",
  },
  {
    image: "/onion.jpg",
    name: "Onion",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/cabbage.jpg",
    name: "Cabbage",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
    qty: "1kg",
    category: "Vegetable",
    consumption: "1kg/day",
  },
  {
    image: "/onion.jpg",
    name: "Onion",
    qty: "2kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/cabbage.jpg",
    name: "Cabbage",
    qty: "2kg",
    category: "Vegetable",
    consumption: "4kg/day",
  },
  {
    image: "/image4_ladyfinger.jpg",
    name: "Ladyfinger",
    qty: "3kg",
    category: "Vegetable",
    consumption: "3kg/day",
  },
  {
    image: "/potatoes.jpg",
    name: "Potatoes",
    qty: "2kg",
    category: "Vegetable",
    consumption: "2kg/day",
  },
  {
    image: "/image2_tomato.jpg",
    name: "Tomato",
    qty: "4kg",
    category: "Vegetable",
    consumption: "5kg/day",
  },
];

const inventoryHistoryData = [
  {
    image: "/potatoes.jpg", // Black border placeholder
    name: "Potatoes",
    dishName: "Crispy Fries",
    costPerUnit: "₹140/kg",
    qtyUsed: "500g",
    category: "Vegetable",
    spent: "₹70",
    dateTime: "13/03 5:00pm",
    qtyLeft: "9.5kg",
    expiryDate: "20/03/25",
  },
];

// Define new colors from Figma design
const figmaBrownishColor = '#C99E5A';
const figmaLightBrownBackground = '#F1EEE6';

export default function StockManagementTab() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [showHistoryView, setShowHistoryView] = useState(false);
  const [autoStockEnabled, setAutoStockEnabled] = useState(false); // State for the new checkbox

  // Handles navigation for the refresh icon
  const handleRefreshClick = () => {
    if (showHistoryView) {
      setShowHistoryView(false);
    } else {
      setShowHistoryView(true);
      setShowChart(false);
    }
    setSearch("");
    setType("");
    console.log("Refresh icon clicked!");
  };

  // Handles navigation for the bar chart icon
  const handleBarChartClick = () => {
    if (showChart) {
      setShowChart(false);
    } else {
      setShowChart(true);
      setShowHistoryView(false);
    }
    setSearch("");
    setType("");
    console.log("Bar Chart icon clicked!");
  };

  const handleTodayClick = () => {
    console.log("Today button clicked!");
    // Implement logic to filter history data for 'today'
  };
// --- CHART VIEW ---
if (showChart) {
  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1246,
        height: 610,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col">
        {/* Top search bar and buttons */}
        <div className="flex items-center mb-1">
          <button
            className="mr-2 px-2 py-1 text-black"
            onClick={() => setShowChart(false)}
            style={{ background: "none", border: "none" }}
          >
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#b39793"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex-1 flex items-center gap-2">
            <span className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793] h-6 w-6" />
              <Input
                placeholder="Search Ingredient"
                className="pl-10 w-64 border border-[#B39793] bg-[#fff] text-black placeholder:text-[#B39793] h-[32px] rounded-[10px]"
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  fontSize: 16,
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
            <Button
              variant="outline"
              className="bg-[#B39793] hover:bg-[#B39793] text-white border border-[#B39793] rounded-[10px] font-normal h-[32px] px-4"
              style={{
                borderColor: "#B39793",
                background: "#B39793",
                fontSize: 16,
              }}
            >
              Search
            </Button>
          </div>

          <div className="flex items-center ml-auto gap-2">
            <Button
              variant="outline"
              className="bg-white hover:bg-white text-[#B39793] border border-[#B39793] rounded-[10px] font-normal h-[32px] px-4"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                fontSize: 16,
              }}
              onClick={handleTodayClick}
            >
              Today
            </Button>
            <IconCircle className="ml-2">
              <FigmaRefreshIcon onClick={handleRefreshClick} />
            </IconCircle>
            <IconCircle
              className="ml-2 cursor-pointer"
              onClick={handleBarChartClick}
            >
              <FigmaBarChartIcon onClick={handleBarChartClick} />
            </IconCircle>
          </div>
        </div>

        {/* Soft separation line */}
        <div
          className="relative"
          style={{
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "10px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
            marginTop: 2,
            marginBottom: 14,
          }}
        />

        {/* Chart Title - moved a bit to the right */}
        <div className="text-[18px] font-[500] mb-1 text-black pl-3">
          Potatoes
        </div>

        {/* Graph */}
        <div className="w-full flex-grow bg-white rounded-lg px-4 pt-2 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 35 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#2B303466", fontSize: 12 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 12]}
                tickFormatter={(v) => `${v}kg`}
                tick={{ fill: "#2B303466", fontSize: 12 }}
                dx={-5}
              />
              <Tooltip />

              {/* Solid Minimum Purchase Line */}
              <ReferenceLine
                y={minPurchaseLimit}
                stroke="#B39793"
                strokeWidth={1.5}
              />

              {/* Purchased Area */}
              <Area
                type="monotone"
                dataKey="purchased"
                stroke="#DBA5FF"
                fill="rgba(219, 165, 255, 0.8)"
                strokeWidth={2}
                name="Purchased"
              />

              {/* Sold Area */}
              <Area
                type="monotone"
                dataKey="sold"
                stroke="#FF8F6D"
                fill="rgba(255, 143, 109, 0.8)"
                strokeWidth={2}
                name="Sold"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex gap-8 mt-2 text-sm font-medium justify-center text-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF8F6D]"></span>
            <span>Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#DBA5FF]"></span>
            <span>Purchased</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded bg-[#b39793]"
              style={{ width: 16, height: 2 }}
            ></span>
            <span>Minimum Purchase Limit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HISTORY VIEW ---
if (showHistoryView) {
  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1246,
        height: 610,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col relative">
        <div className="flex items-center mb-2">
          {/* Back button for History View */}
          <button
            className="mr-2 px-2 py-1 text-black"
            onClick={() => setShowHistoryView(false)}
            style={{ background: "none", border: "none" }}
          >
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#b39793"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1">
            <span className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793] h-6 w-6" />
              <Input
                placeholder="Search"
                className="pl-10 w-[314px] h-[32px] rounded-[10px] text-black bg-[#fff] border border-[#B39793] placeholder:text-[#B39793] font-normal"
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  fontSize: 16,
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
          {/* Type select and Today button */}
          <div className="flex items-center ml-auto gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                className="w-[220px] h-[32px] rounded-[10px] bg-[#fff] border border-[#B39793] font-normal justify-between pr-3"
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  fontSize: 16,
                  minWidth: 220,
                  minHeight: 32,
                  color: "#B39793",
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SelectValue placeholder="Type of Ingredient" />
              </SelectTrigger>
              <SelectContent className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0">
                {/* Select items unchanged */}
                {[
                  { value: "fruits", label: "Fruits" },
                  { value: "vegetables", label: "Vegetables" },
                  { value: "dairy", label: "Dairy" },
                  { value: "grains-seeds", label: "Grains & Seeds" },
                  { value: "poultry", label: "Poultry" },
                  { value: "raw-meat", label: "Raw meat" },
                  { value: "in-house-ingredient", label: "In-house Ingredient" },
                  { value: "nuts", label: "Nuts" },
                  { value: "fungi", label: "Fungi" },
                  { value: "kitchen-utilities", label: "Kitchen utilities" },
                ].map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="bg-white hover:bg-white text-[#B39793] border border-[#B39793] rounded-[10px] font-semibold h-[32px] px-4"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                fontSize: 16,
              }}
              onClick={handleTodayClick}
            >
              Today
            </Button>
            <IconCircle className="ml-2">
              <FigmaRefreshIcon onClick={handleRefreshClick} />
            </IconCircle>
            <IconCircle className="ml-2 cursor-pointer" onClick={handleBarChartClick}>
              <FigmaBarChartIcon onClick={handleBarChartClick} />
            </IconCircle>
          </div>
        </div>

        {/* 🔻 Separation Line Below Filter Section */}
        <div
          style={{
            position: "relative",
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "10px",
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
            marginTop: 2,
            marginBottom: 14,
          }}
        />

        {/* History Data Table */}
<div className="relative" style={{ top: "-10px" }}>
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-white sticky top-0 z-10">
      <tr className="pb-2">
        {[
          "Image",
          "Name",
          "Dish<br />Name",
          "Cost/<br />unit",
          "Unit<br />Used",
          "Category",
          "Spent",
          "Date/<br />Time",
          "Unit<br />Left",
          "Expiry",
        ].map((col, i) => (
          <th
            key={i}
            className="px-2 pb-2 pt-1 text-left font-[Aleo] font-semibold text-[23px] leading-[23px] text-[#202224]"
            dangerouslySetInnerHTML={{ __html: col }}
          />
        ))}
      </tr>
      <tr>
        <td colSpan={10}>
          <div
            className="w-full h-[2px]"
            style={{ backgroundColor: "#EBCDB5" }}
          />
        </td>
      </tr>
    </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryHistoryData.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover border-2 border-black"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/48x48/000000/ffffff?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </td>
                  {[
                    item.name,
                    item.dishName,
                    item.costPerUnit,
                    item.qtyUsed,
                    item.category,
                    item.spent,
                    item.dateTime,
                    item.qtyLeft,
                    item.expiryDate,
                  ].map((val, idx) => (
                    <td
                      key={idx}
                      className="px-2 py-2 whitespace-nowrap font-[Aleo] text-[18px] leading-[20px] font-normal text-[#202224]"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📌 Bottom Right: '1 of 300 items' */}
          <div
            className="text-[16px] text-[#202224]"
            style={{
              position: "absolute",
              bottom: -430,
              right: -150,
              fontFamily: "Aleo",
            }}
          >
            1 of 300 items
          </div>
        </div>
      </div>
    </div>
  );
}


  // --- MAIN BLOCK ---
  return (
    // Main container for the stock management tab
    <div className="bg-white rounded-lg shadow p-2" style={{
      width: 1246,
      height: 610,
      position: 'absolute',
      top: 145, // <------ increased from 30 to 80 to drag the whole center block lower on screen
      left: 104,
      borderRadius: 14,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top section: Search, Type Select, and Icons */}
      <div className="flex flex-wrap gap-2 mb-2 items-center">
        <span className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#B39793' }} />
          <Input
            placeholder="Search"
            className="pl-10 w-[314px] h-[32px] rounded-[10px] bg-[#fff] border border-[#b39793] font-normal placeholder:text-[#B39793]"
            style={{
              borderColor: "#B39793",
              background: "#fff",
              fontSize: 16,
              color: figmaBrownishColor,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
        <div className="flex gap-2 ml-auto items-center">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger
              className="w-[220px] h-[32px] rounded-[10px] bg-[#fff] border border-[#B39793] font-normal justify-between pr-3"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                fontSize: 16,
                minWidth: 220,
                minHeight: 32,
                color: "#B39793",
                lineHeight: 'normal',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
            <SelectContent
              className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              style={{
                borderColor: "#B39793",
                background: "#fff",
              }}
            >
              <SelectItem value="fruits" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Fruits</SelectItem>
              <SelectItem value="vegetables" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Vegetables</SelectItem>
              <SelectItem value="dairy" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Dairy</SelectItem>
              <SelectItem value="grains-seeds" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Grains & Seeds</SelectItem>
              <SelectItem value="poultry" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Poultry</SelectItem>
              <SelectItem value="raw-meat" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Raw meat</SelectItem>
              <SelectItem value="in-house-ingredient" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">In-house Ingredient</SelectItem>
              <SelectItem value="nuts" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Nuts</SelectItem>
              <SelectItem value="fungi" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Fungi</SelectItem>
              <SelectItem value="kitchen-utilities" className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]">Kitchen utilities</SelectItem>
            </SelectContent>
          </Select>
          <IconCircle>
            <FigmaRefreshIcon onClick={handleRefreshClick} />
          </IconCircle>
          <IconCircle
            className="cursor-pointer"
            onClick={handleBarChartClick}
          >
            <FigmaBarChartIcon onClick={handleBarChartClick} />
          </IconCircle>
        </div>
      </div>

      {/* --- SEPARATION LINE BELOW THE SEARCH BAR --- */}
      <div
        style={{
  position: "relative",
  left: "-8px", // negative padding value
  width: "calc(100% + 16px)", // double the left/right padding
  height: "10px",
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
  marginTop: 2,
  marginBottom: 14
        }}
      ></div>
      {/* --- END SEPARATION LINE --- */}

      <div className="flex-grow flex flex-col overflow-hidden px-2 pt-0">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-black">
            Items in Inventory
          </h2>
          {/* Auto-Stock Items checkbox - moved here and to the right */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-7 h-6 rounded-[4px] flex items-center justify-center"
                onClick={() => setAutoStockEnabled(!autoStockEnabled)}
                style={{
                  cursor: 'pointer',
                  border: `1.2px solid ${figmaBrownishColor}`,
                  overflow: 'visible',
                  padding: '0',
                }}
              >
                {autoStockEnabled && (
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: 'translate(1px, 4px)' }} // slight extra downward nudge
                  >
                    <path
                      d="M4 12C5.5 14.5 9 20 12.5 13C14 10.5 18.5 4 24 2.5"
                      stroke="#0BA52A"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-base text-black">Auto-Stock Items</span>
            </label>
          </div>
        </div>

        {/* increased gap-y to 6 (from 4) to give more vertical space between the two rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 overflow-y-auto" style={{ paddingRight: '0.2rem'}}>
          {inventoryCards.map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-0 flex flex-col items-center shadow-sm relative overflow-hidden"
              style={{
                background: '#fff',
                width: 160,
                height: 220,
                boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)`
              }}
            >
              {/* Content within the card, excluding the bottom section */}
              <div className="p-1.5 flex flex-col items-center w-full">
                <div className="relative mb-1.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover border"
                    style={{ border: `1px solid ${figmaBrownishColor}` }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/64x64/${figmaBrownishColor.substring(1)}/ffffff?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
                  <div
                    className="absolute -top-1 -right-1 flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: figmaBrownishColor,
                      border: `1px solid ${figmaBrownishColor}`,
                      color: '#fff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {item.qty}
                  </div>
                </div>
                <div className="font-medium text-sm mb-1 text-black">
                  {item.name}
                </div>
                <div className="text-xs mb-1 text-black">
                  <span>Category: </span>
                  <span style={{ color: figmaBrownishColor }}>{item.category}</span>
                </div>
                <div className="text-xs mb-1.5 text-black">
                  <span>Consumption:{" "}</span>
                  <span style={{ color: figmaBrownishColor }}>{item.consumption}</span>
                </div>
              </div>

              {/* Combined "Set Re-stock Limit" and "Kg" input as a massive blocky thing */}
              <div
                className="w-full flex flex-col items-center justify-center pt-1.5 pb-1.5 px-3"
                style={{
                  background: figmaLightBrownBackground,
                  fontSize: 14,
                  color: 'black',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <Button
                  variant="outline"
                  className="w-full font-semibold flex items-center justify-center h-8"
                  style={{
                    background: 'transparent',
                    color: 'black',
                    borderColor: 'transparent',
                    fontSize: 14,
                    minHeight: 32,
                    boxShadow: 'none',
                  }}
                >
                  Set Re-stock Limit{" "}
                </Button>
                <div
                  className="mt-1.5 flex items-center justify-between px-1 py-1 rounded-[6px] cursor-pointer"
                  style={{
                    background: figmaLightBrownBackground,
                    border: `1px solid ${figmaBrownishColor}`,
                    color: figmaBrownishColor,
                    fontSize: 14,
                    minHeight: -9,
                    width: "62%", // reduced width a bit from both sides
                    margin: "0 auto"
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Kg dropdown"
                  onClick={() => {}} // clickable, but no action
                >
                  <span style={{ borderBottom: `1px solid ${figmaBrownishColor}`, flexGrow: 1, marginRight: '8px' }}>&nbsp;</span>
                  <span>Kg</span>
                  <svg
                    className="w-[20px] h-[20px] ml-[8px] shrink-0"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5 8L10 13L15 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: -150,
          bottom: -40,
          width: "114px",
          height: "20px",
          fontFamily: "'Aleo', serif",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: 0,
          color: "#202224",
          background: "transparent",
          textAlign: "right",
          paddingRight: "8px",
          zIndex: 10
        }}
      >
        12 of 200 items
      </div>
      {/* ---- END BOTTOM-RIGHT ---- */}
    </div>
  );
}
