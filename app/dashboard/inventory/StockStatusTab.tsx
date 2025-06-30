import React, { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Search } from "lucide-react";

// --- Data ---
// Use images from /public folder as per your paths
const stockStatusData = [
  {
    status: "low",
    image: "/potatoes.jpg",
    name: "Potatoes",
    cost: 140,
    totalUnit: "10 Kg",
    totalCost: 1400,
    perDay: 6,
    expiry: "20/3/25",
    type: "vegetables",
  },
  {
    status: "low",
    image: "/image2_tomato.jpg",
    name: "Tomatoes",
    cost: 120,
    totalUnit: "15 Kg",
    totalCost: 1800,
    perDay: 10,
    expiry: "23/3/25",
    type: "vegetables",
  },
  {
    status: "order",
    image: "/image4_ladyfinger.jpg",
    name: "Ladyfinger",
    cost: 70,
    totalUnit: "8 Kg",
    totalCost: 560,
    perDay: 4,
    expiry: "19/3/25",
    type: "vegetables",
  },
  {
    status: "sufficient",
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
    cost: 90,
    totalUnit: "10 Kg",
    totalCost: 900,
    perDay: 2,
    expiry: "20/3/25",
    type: "vegetables",
  },
];

const filterOptions = [
  { value: "lowToHighPrice", label: "Low to High (Price)" },
  { value: "highToLowPrice", label: "High to Low (Price)" },
  { value: "lowToHighConsumption", label: "Low to High (Consumption)" },
  { value: "highToLowConsumption", label: "High to Low (Consumption)" },
  { value: "lowOnStocks", label: "Low on Stocks" },
  { value: "pendingStocks", label: "Pending Stocks" },
];

const typeOptions = [
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "dairy", label: "Dairy" },
  { value: "grainsSeeds", label: "Grains & Seeds" },
  { value: "poultry", label: "Poultry" },
  { value: "rawMeat", label: "Raw meat" },
  { value: "inhouse", label: "In-house Ingredient" },
  { value: "nuts", label: "Nuts" },
  { value: "fungi", label: "Fungi" },
  { value: "kitchenUtilities", label: "Kitchen utilities" },
];

// Define the black content color from Figma
const figmaBlack = '#302224';

export default function StockStatusTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");

  // Memoized filtered and sorted data to optimize performance
  const filteredStockData = useMemo(() => {
    let currentData = [...stockStatusData];

    if (search) {
      currentData = currentData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      currentData = currentData.filter((item) => item.type === type);
    }

    switch (filter) {
      case "lowToHighPrice":
        currentData.sort((a, b) => a.cost - b.cost);
        break;
      case "highToLowPrice":
        currentData.sort((a, b) => b.cost - a.cost);
        break;
      case "lowToHighConsumption":
        currentData.sort((a, b) => a.perDay - b.perDay);
        break;
      case "highToLowConsumption":
        currentData.sort((a, b) => b.perDay - a.perDay);
        break;
      case "lowOnStocks":
        currentData = currentData.filter((item) => item.status === "low");
        break;
      case "pendingStocks":
        currentData = currentData.filter((item) => item.status === "order");
        break;
      default:
        break;
    }
    return currentData;
  }, [search, filter, type]);

  return (
    <>
      <style>
        {`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.25; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 2.5s infinite;
        }
        .custom-dropdown-trigger,
        .custom-dropdown-trigger .custom-dropdown-icon,
        .custom-dropdown-trigger .custom-select-value,
        .custom-dropdown-trigger .custom-select-value[data-placeholder-shown="true"] {
          color: #B39793 !important;
        }
        `}
      </style>

      {/* --- Main Centre Block --- */}
      <div
        className="bg-[#FCFDFD] rounded-lg shadow p-2"
        style={{
          width: 1246,
          height: 470,
          position: "absolute",
          top: 145,
          left: 104,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar: Search, Filter, Type */}
        <div className="flex flex-wrap gap-4 mb-2 items-center px-4 pt-4">
          <div className="flex-1 flex items-center">
            <span className="relative w-full max-w-[314px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793] h-5 w-5" />
              <Input
                placeholder="Search"
                className={`pl-10 w-full text-[${figmaBlack}] placeholder:text-[#B39793] h-[32px] rounded-[10px] border border-[#B39793] bg-[#FCFDFD] shadow-none`}
                style={{
                  border: "1px solid #B39793",
                  background: "#FCFDFD",
                  color: figmaBlack,
                  borderRadius: "10px",
                  fontSize: "16px",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>

          <div className="relative w-full sm:w-[192px]">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger
                className="custom-dropdown-trigger flex items-center justify-between !border-[1px] !border-[#B39793] !bg-[#FCFDFD] !text-[16px] !h-[32px] !rounded-[10px] !shadow-none !min-w-[192px] !px-[10px] !leading-[30px] !align-middle
                  [&>svg:not(.custom-dropdown-icon)]:hidden [&>span[data-radix-select-icon]]:hidden"
              >
                <SelectValue
                  placeholder="Search by Filter"
                  className="custom-select-value !text-[#B39793] data-[placeholder-shown=true]:!text-[#B39793]"
                >
                  {filter
                    ? filterOptions.find((opt) => opt.value === filter)?.label
                    : "Search by Filter"}
                </SelectValue>
                <svg
                  className="custom-dropdown-icon !text-[#B39793] !w-[20px] !h-[20px] !ml-[8px] !shrink-0"
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
              </SelectTrigger>
              <SelectContent
                className={`!border-[1px] !border-[#B39793] !bg-white !text-[${figmaBlack}] !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0`}
              >
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                                hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                                data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full sm:w-[192px]">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                className="custom-dropdown-trigger flex items-center justify-between !border-[1px] !border-[#B39793] !bg-[#FCFDFD] !text-[16px] !h-[32px] !rounded-[10px] !shadow-none !min-w-[192px] !px-[10px] !leading-[30px] !align-middle
                  [&>svg:not(.custom-dropdown-icon)]:hidden [&>span[data-radix-select-icon]]:hidden"
              >
                <SelectValue
                  placeholder="Type of Ingredient"
                  className="custom-select-value !text-[#B39793] data-[placeholder-shown=true]:!text-[#B39793]"
                >
                  {type
                    ? typeOptions.find((opt) => opt.value === type)?.label
                    : "Type of Ingredient"}
                </SelectValue>
                <svg
                  className="custom-dropdown-icon !text-[#B39793] !w-[20px] !h-[20px] !ml-[8px] !shrink-0"
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
              </SelectTrigger>
              <SelectContent
                className={`!border-[1px] !border-[#B39793] !bg-white !text-[${figmaBlack}] !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0`}
              >
                {typeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                                hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                                data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Separation Line just like StockManagementTab */}
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
        ></div>

        {/* Table Section */}
        <div
          className="flex-grow flex flex-col overflow-hidden px-2 pt-0"
          style={{ minHeight: 0 }}
        >
          <div className="rounded-b-[14px] border border-[#FCFDFD]"
            style={{
              borderRadius: "0 0 14px 14px",
              background: "#FCFDFD",
              border: "none",
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              paddingBottom: "0px",
            }}
          >
            <div className="relative">
              <Table className="w-full relative z-0">
                <TableHeader>
                  {/* Headings aligned vertically in center and font-semibold */}
                  <TableRow
                    className="[&>th]:!border-b-[2px] [&>th]:!border-[#ebcdb5] [&>th]:!p-[10px_16px] align-middle"
                  >
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-left`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Status</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-left`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Image</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-left`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Name</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-left`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Cost</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-center`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Total <br /> Unit</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-center`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Total <br /> Cost</TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-center`} style={{paddingTop: "12px", paddingBottom: "12px"}}>
                      Per Day <br /> Consumption
                    </TableHead>
                    <TableHead className={`!text-[${figmaBlack}] !font-medium !text-[22px] !leading-[1.1] !tracking-normal !text-center`} style={{paddingTop: "12px", paddingBottom: "12px"}}>Expiry <br /> Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStockData.map((item, i) => (
                    <TableRow
                      key={i}
                      className="[&>td]:!border-b-0 last:[&>td]:!border-b-0 relative"
                    >
                      <TableCell className="text-center !p-[12px_16px]">
                        {item.status === "low" && (
                          <span
                            title="Low stock"
                            className={`inline-flex items-center justify-center !w-[32px] !h-[32px] !rounded-full !border-[2px] !border-[#EBCDB5] !bg-white !shadow-[0px_2px_4px_rgba(0,0,0,0.1),_0px_4px_8px_rgba(0,0,0,0.08)] !text-[#E44F2A]`}
                          >
                            <span className={`!text-[28px] !font-bold !leading-[1] ${item.status === "low" ? 'animate-blink' : ''}`}>!</span>
                          </span>
                        )}
                        {item.status === "order" && (
                          <span
                            title="Order placed"
                            className={`inline-flex items-center justify-center !w-[32px] !h-[32px] !rounded-full !border-[2px] !border-[#EBCDB5] !bg-white !shadow-[0px_2px_4px_rgba(0,0,0,0.1),_0px_4px_8px_rgba(0,0,0,0.08)] !text-[#E2B700]`}
                          >
                            <span className={`!text-[28px] !font-bold !leading-[1] ${item.status === "order" ? 'animate-blink' : ''}`}>!</span>
                          </span>
                        )}
                        {item.status === "sufficient" && (
                          <span
                            title="Sufficient stock"
                            className={`inline-flex items-center justify-center !w-[32px] !h-[32px] !rounded-full !border-[2px] !border-[#EBCDB5] !bg-white !shadow-[0px_2px_4px_rgba(0,0,0,0.1),_0px_4px_8px_rgba(0,0,0,0.08)] !text-[#18C65B]`}
                          >
                            <span className={`!text-[28px] !font-bold !leading-[1]`}>!</span>
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="!p-[12px_16px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover border"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "4px",
                            border: `1px solid ${figmaBlack}`,
                            background: "#fff",
                            objectFit: "cover",
                          }}
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg"; // fallback
                          }}
                        />
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-left !p-[12px_16px]`}>
                        {item.name}
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-left !p-[12px_16px]`}>
                        ₹{item.cost}/kg
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-center !p-[12px_16px]`}>
                        {item.totalUnit}
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-center !p-[12px_16px]`}>
                        ₹{item.totalCost}
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-center !p-[12px_16px]`}>
                        {item.perDay} Kg
                      </TableCell>
                      <TableCell className={`!text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !text-center !p-[12px_16px]`}>
                        {item.expiry}
                      </TableCell>
                      {i < filteredStockData.length - 1 && (
                        <div
                          className="absolute left-0 right-0"
                          style={{
                            bottom: 0,
                            height: "2px",
                            background: "#EBCDB5",
                            zIndex: 1,
                            border: "none",
                          }}
                        />
                      )}
                    </TableRow>
                  ))}
                  {filteredStockData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className={`text-center !text-[${figmaBlack}] !font-normal !text-[16px] !leading-[20px] !tracking-normal !py-8`}>
                        No items found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* ABSOLUTE BORDER LINE FOR BOTTOM OF TABLE (FULL WIDTH) */}
              <div
                className="absolute left-0 right-0"
                style={{
                  bottom: 0,
                  height: "2px",
                  background: "#EBCDB5",
                  zIndex: 2,
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
        {/* --- Absolute bottom right like StockManagementTab --- */}
        <div
          style={{
            position: "absolute",
            right: -150,
            bottom: -77,
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
          {filteredStockData.length} of 300 items
        </div>
      </div>

      {/* --- Legend Section (positioned just below main block, outside) --- */}
      <div className="flex flex-wrap gap-6 items-center px-4"
        style={{
          marginLeft: '-12px',
          marginTop: '635px', // position directly below the main block (610px + margin)
          position: "absolute",
          left: 104,
          top: 35, // 145 + 610
          width: 1246,
        }}
      >
        <div className={`flex items-center gap-1 !text-[${figmaBlack}] !text-[15px]`} style={{ marginLeft: 0 }}>
          <span
            className="inline-flex items-center justify-center !w-[20px] !h-[20px] !rounded-full !border-[1px] !border-[#EBCDB5] !bg-white !text-[14px] !font-bold !leading-[1] !shadow-[0_1px_2px_rgba(0,0,0,0.08),_0_1px_1px_rgba(0,0,0,0.15)] !text-[#E44F2A]"
          >
            !
          </span>
          Low stock
        </div>
        <div className={`flex items-center gap-1 !text-[${figmaBlack}] !text-[15px]`} style={{ marginLeft: 0 }}>
          <span
            className="inline-flex items-center justify-center !w-[20px] !h-[20px] !rounded-full !border-[1px] !border-[#EBCDB5] !bg-white !text-[14px] !font-bold !leading-[1] !shadow-[0_1px_2px_rgba(0,0,0,0.08),_0_1px_1px_rgba(0,0,0,0.15)] !text-[#E2B700]"
          >
            !
          </span>
          Order Placed
        </div>
        <div className={`flex items-center gap-1 !text-[${figmaBlack}] !text-[15px]`} style={{ marginLeft: 0 }}>
          <span
            className="inline-flex items-center justify-center !w-[20px] !h-[20px] !rounded-full !border-[1px] !border-[#EBCDB5] !bg-white !text-[14px] !font-bold !leading-[1] !shadow-[0_1px_2px_rgba(0,0,0,0.08),_0_1px_1px_rgba(0,0,0,0.15)] !text-[#18C65B]"
          >
            !
          </span>
          Sufficient stock
        </div>
      </div>
    </>
  );
}