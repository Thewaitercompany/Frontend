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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Search, BarChart2, RefreshCw, ChevronLeft } from "lucide-react";
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

const chartData = [
  { time: "10-11am", sold: 2, purchased: 6 },
  { time: "11-12pm", sold: 1, purchased: 4 },
  { time: "12-1pm", sold: 5, purchased: 3 },
  { time: "1-2pm", sold: 9, purchased: 2 },
  { time: "2-3pm", sold: 6, purchased: 3 },
  { time: "3-4pm", sold: 5, purchased: 6 },
];
const minPurchaseLimit = 6;

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
    image: "/Tomato.png",
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
    image: "/Tomato.png",
    name: "Tomato",
    qty: "4kg",
    category: "Vegetable",
    consumption: "5kg/day",
  },
];

export default function StockManagementTab() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showChart, setShowChart] = useState(false);

  if (showChart) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-[#fcfaf7] rounded-xl shadow p-6 mb-8">
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              className="mr-2 px-2 py-1 text-gray-800"
              onClick={() => setShowChart(false)}
            >
              <ChevronLeft />
            </Button>
            <div className="flex-1">
              <span className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 h-5 w-5" />
                <Input
                  placeholder="Search Ingredient"
                  className="pl-10 w-64 border border-[#b39793] bg-[#f5f1eb] text-black placeholder:text-gray-800"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            <Button variant="outline" className="ml-2 text-gray-800">
              Today
            </Button>
            <Button
              variant="outline"
              className="ml-2 text-gray-800"
              size="icon"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="ml-2 text-gray-800"
              size="icon"
              onClick={() => setShowChart(false)}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-lg font-medium mb-2 mt-4 text-gray-800">
            Potatoes
          </div>
          <div className="w-full h-[320px] bg-white rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7F6B" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#FF7F6B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorPurchased"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#B196FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B196FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1f2937" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 12]}
                  tickFormatter={(v) => `${v}kg`}
                  tick={{ fill: "#1f2937" }}
                />
                <Tooltip />
                <ReferenceLine
                  y={minPurchaseLimit}
                  stroke="#b39793"
                  strokeDasharray="3 3"
                  label={{
                    value: "Minimum Purchase Limit",
                    position: "insideTopRight",
                    fill: "#4e3e3b",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="purchased"
                  stroke="#B196FF"
                  fill="url(#colorPurchased)"
                  strokeWidth={2}
                  name="Purchased"
                />
                <Area
                  type="monotone"
                  dataKey="sold"
                  stroke="#FF7F6B"
                  fill="url(#colorSold)"
                  strokeWidth={2}
                  name="Sold"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-8 mt-4 text-sm font-medium justify-center text-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF7F6B]"></span>
              <span>Sold</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B196FF]"></span>
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="flex-1 flex items-center gap-2">
          <span className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 h-5 w-5" />
            <Input
              placeholder="Search Ingredient"
              className="pl-10 w-64 text-black placeholder:text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          <Button className="ml-2 bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded">
            Search
          </Button>
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-40 text-gray-800">
            <SelectValue placeholder="Type of Ingredient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetable">Vegetable</SelectItem>
            <SelectItem value="dairy">Dairy</SelectItem>
            <SelectItem value="grain">Grain</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="text-gray-800">
          Today
        </Button>
        <Button variant="outline" size="icon" className="text-gray-800">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowChart(true)}
          className="text-gray-800"
        >
          <BarChart2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Image</TableHead>
              <TableHead className="text-gray-800">Name</TableHead>
              <TableHead className="text-gray-800">Dish Name</TableHead>
              <TableHead className="text-gray-800">Cost/unit</TableHead>
              <TableHead className="text-gray-800">Unit Used</TableHead>
              <TableHead className="text-gray-800">Category</TableHead>
              <TableHead className="text-gray-800">Spent</TableHead>
              <TableHead className="text-gray-800">Date/Time</TableHead>
              <TableHead className="text-gray-800">Unit Left</TableHead>
              <TableHead className="text-gray-800">Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockManagementData.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-800">{item.dish}</TableCell>
                <TableCell className="text-gray-800">{item.cost}</TableCell>
                <TableCell className="text-gray-800">{item.used}</TableCell>
                <TableCell className="text-gray-800">{item.category}</TableCell>
                <TableCell className="text-gray-800">{item.spent}</TableCell>
                <TableCell className="text-gray-800">{item.datetime}</TableCell>
                <TableCell className="text-gray-800">{item.left}</TableCell>
                <TableCell className="text-gray-800">{item.expiry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Items in Inventory
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {inventoryCards.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow-sm border border-[#e5e0d8] relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded mb-2 object-cover"
              />
              <div className="absolute top-2 right-2 bg-[#e5e0d8] text-xs rounded-full px-2 py-0.5 text-gray-800">
                {item.qty}
              </div>
              <div className="font-medium text-base mb-1 text-gray-800">
                {item.name}
              </div>
              <div className="text-xs text-gray-800 mb-1">
                Category: <span className="text-gray-800">{item.category}</span>
              </div>
              <div className="text-xs text-gray-800 mb-2">
                Consumption:{" "}
                <span className="text-gray-800">{item.consumption}</span>
              </div>
              <Button
                variant="outline"
                className="w-full mb-2 bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
              >
                Set Re-stock Limit <span className="ml-2">Kg▼</span>
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#b39793] w-4 h-4" />
            <span className="text-sm text-gray-800">Auto-Stock Items</span>
          </label>
          <div className="ml-auto text-xs text-gray-800">12 of 200 items</div>
        </div>
      </div>
    </div>
  );
}
