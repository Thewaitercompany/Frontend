import React, { useState } from "react";
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

export default function StockStatusTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="flex-1 flex items-center gap-2">
          <span className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 h-5 w-5" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 text-black placeholder:text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40 text-gray-800">
            <SelectValue placeholder="Search by Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="order">Order Placed</SelectItem>
            <SelectItem value="sufficient">Sufficient Stock</SelectItem>
          </SelectContent>
        </Select>
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
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Status</TableHead>
              <TableHead className="text-gray-800">Image</TableHead>
              <TableHead className="text-gray-800">Name</TableHead>
              <TableHead className="text-gray-800">Cost</TableHead>
              <TableHead className="text-gray-800">Total Unit</TableHead>
              <TableHead className="text-gray-800">Total Cost</TableHead>
              <TableHead className="text-gray-800">
                Per Day Consumption
              </TableHead>
              <TableHead className="text-gray-800">Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockStatusData.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  {item.status === "low" && (
                    <span
                      title="Low stock"
                      className="inline-block w-6 h-6 rounded-full border border-red-300 flex items-center justify-center text-red-500 text-xl"
                    >
                      !
                    </span>
                  )}
                  {item.status === "order" && (
                    <span
                      title="Order placed"
                      className="inline-block w-6 h-6 rounded-full border border-yellow-300 flex items-center justify-center text-yellow-500 text-xl"
                    >
                      !
                    </span>
                  )}
                  {item.status === "sufficient" && (
                    <span
                      title="Sufficient stock"
                      className="inline-block w-6 h-6 rounded-full border border-green-300 flex items-center justify-center text-green-500 text-xl"
                    >
                      ✓
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-800">{item.cost}</TableCell>
                <TableCell className="text-gray-800">
                  {item.totalUnit}
                </TableCell>
                <TableCell className="text-gray-800">
                  {item.totalCost}
                </TableCell>
                <TableCell className="text-gray-800">{item.perDay}</TableCell>
                <TableCell className="text-gray-800">{item.expiry}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-6 mt-4 text-sm text-gray-800">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded-full border border-red-300 text-red-500 flex items-center justify-center text-xs">
            !
          </span>{" "}
          Low stock
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded-full border border-yellow-300 text-yellow-500 flex items-center justify-center text-xs">
            !
          </span>{" "}
          Order Placed
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded-full border border-green-300 text-green-500 flex items-center justify-center text-xs">
            ✓
          </span>{" "}
          Sufficient stock
        </div>
        <div className="ml-auto text-xs text-gray-800">4 of 300 items</div>
      </div>
    </div>
  );
}
