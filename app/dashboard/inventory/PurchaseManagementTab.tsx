import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Edit,
  BarChart2,
  Plus,
  RefreshCw,
  ChevronLeft,
  ShoppingCart,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Dummy data from page.tsx
const purchaseData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    image: "/Tomato.png",
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

const deliveryDays = [
  "Saturday 15 March",
  "Sunday 16 March",
  "Monday 17 March",
  "Tuesday 18 March",
  "Wednesday 19 March",
];
const deliveryTimes = [
  "10:00am to 12:00pm",
  "1:00pm to 3:00pm",
  "4:00pm to 6:00pm",
  "7:00pm to 9:00pm",
  "10:00pm to 12:00am",
];

export default function PurchaseManagementTab() {
  const [view, setView] = useState<
    "table" | "add" | "edit" | "chart" | "product" | "cart" | "delivery"
  >("table");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [activeTime, setActiveTime] = useState(0);

  const renderContent = () => {
    switch (view) {
      case "table":
        return (
          <>
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              <div className="flex-1 flex items-center gap-2">
                <span className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 h-5 w-5" />
                  <Input
                    placeholder="Search by ingredient, supplier..."
                    className="pl-10 w-64 text-black placeholder:text-gray-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </span>
              </div>
              <Button variant="outline" className="text-black">
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView("chart")}
                className="text-gray-800"
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView("add")}
                className="text-gray-800"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-gray-800">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-800">Ingredient</TableHead>
                    <TableHead className="text-gray-800">Cost/unit</TableHead>
                    <TableHead className="text-gray-800">Category</TableHead>
                    <TableHead className="text-gray-800">
                      Unit Purchased
                    </TableHead>
                    <TableHead className="text-gray-800">Total Cost</TableHead>
                    <TableHead className="text-gray-800">
                      Invoice Details
                    </TableHead>
                    <TableHead className="text-gray-800">
                      Supplier Name
                    </TableHead>
                    <TableHead className="text-gray-800">Status</TableHead>
                    <TableHead className="text-gray-800">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-gray-800">
                        {item.ingredient}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.cost}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.category}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.unit}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.total}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        <Input defaultValue={item.invoice} className="w-24" />
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.supplier}
                      </TableCell>
                      <TableCell className="text-gray-800">
                        {item.status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setView("edit")}
                          className="text-gray-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        );
      case "chart":
        return (
          <>
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" className="text-black">
                Today
              </Button>
              <Button variant="outline" size="icon" className="text-gray-800">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full h-[400px] bg-white rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                Total Purchases: ₹25,560
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={purchaseChartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b39793" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#b39793" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#1f2937" }} />
                  <YAxis tick={{ fill: "#1f2937" }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#b39793"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    name="Total Purchases"
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    align="center"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "product":
        return (
          <>
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
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-48 text-black placeholder:text-gray-800">
                  <SelectValue placeholder="Type of Ingredient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="grain">Grain</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 text-black placeholder:text-gray-800">
                  <SelectValue placeholder="List of Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raghu">Mr Raghu</SelectItem>
                  <SelectItem value="anmol">Mr Anmol</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView("cart")}
                className="text-gray-800"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-gray-800">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {productCards.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex flex-col items-center shadow-sm border border-[#e5e0d8] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-2 object-contain"
                  />
                  <div className="font-semibold text-base mb-1 text-gray-800">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-800 mb-1">{item.price}</div>
                  <div className="text-xs text-gray-800 mb-2">
                    Delivery by {item.delivery}
                  </div>
                  <Button
                    className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black w-full"
                    onClick={() => setView("delivery")}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </>
        );
      case "add":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("table")}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-xl font-semibold text-gray-800">
                  Add new purchase
                </h2>
              </div>
              <Button variant="outline" size="icon" className="text-gray-800">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6 bg-white p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit Purchased</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Invoice no.</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Upload Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Add ingredient name"
                      />
                    </TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="border-gray-300 text-black placeholder:text-gray-800">
                          <SelectValue placeholder="Type of Ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetable">Vegetable</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Add total purchased unit"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Enter total cost"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Enter invoice number"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Enter date and time"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        placeholder="Enter supplier name"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" className="text-black">
                        Upload Image
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-[#4E3E3B]">
                Add Purchase
              </Button>
            </div>
          </div>
        );
      case "edit":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("table")}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Purchases
                </h2>
              </div>
              <Button variant="outline" size="icon" className="text-gray-800">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6 bg-white p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit Purchased</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Invoice no.</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Upload Image</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="Potatoes"
                      />
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="vegetable">
                        <SelectTrigger className="border-gray-300 text-black placeholder:text-gray-800">
                          <SelectValue placeholder="Type of Ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetable">Vegetable</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="10kg"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="₹1,400"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="00001"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="13/03 5:00pm"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="border-gray-300 text-black placeholder:text-gray-800"
                        defaultValue="Mr Raghu"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" className="text-black">
                        Upload Image
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-[#4E3E3B]">
                Save Changes
              </Button>
            </div>
          </div>
        );
      case "delivery":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("product")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-4 text-gray-800">
                  Delivery Details
                </h3>
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-800">
                    Select a delivery day
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {deliveryDays.map((day, i) => (
                      <Button
                        key={day}
                        variant={activeDay === i ? "default" : "outline"}
                        onClick={() => setActiveDay(i)}
                        className={`${
                          activeDay === i ? "bg-[#D4C2B4] text-black" : ""
                        }`}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-800">
                    Select a delivery time
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {deliveryTimes.map((time, i) => (
                      <Button
                        key={time}
                        variant={activeTime === i ? "default" : "outline"}
                        onClick={() => setActiveTime(i)}
                        className={`${
                          activeTime === i ? "bg-[#D4C2B4] text-black" : ""
                        }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-4 text-gray-800">
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 text-black"
                  >
                    UPI
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 text-black"
                  >
                    Credit/Debit Card
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 text-black"
                  >
                    Cash on Delivery
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border flex flex-col items-center">
                <img
                  src="/beetroot.png"
                  alt="Potatoes"
                  className="w-48 h-48 object-contain mb-4"
                />
                <h3 className="font-bold text-2xl mb-1 text-gray-800">
                  Potatoes
                </h3>
                <p className="text-lg mb-2 text-gray-800">₹140/kg</p>
                <p className="text-sm text-gray-800">
                  Category: <span className="text-green-600">Vegetable</span>
                </p>
                <p className="text-sm text-gray-800 mb-4">
                  Sold By: <span className="text-blue-600">Mr Vinod</span>
                </p>
                <div className="flex items-center gap-2 mb-4 text-green-700">
                  <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-700"></div>
                  </div>
                  This is a vegetarian product
                </div>
                <div className="flex items-center gap-4 border rounded-lg p-2 mb-4">
                  <Button variant="ghost" size="icon" className="text-gray-800">
                    -
                  </Button>
                  <span className="text-xl font-bold">10</span>
                  <Button variant="ghost" size="icon" className="text-gray-800">
                    +
                  </Button>
                </div>
                <p className="text-lg font-bold mb-4 text-gray-800">
                  Total amount <span className="text-2xl">₹1,400</span>
                </p>
                <Button className="w-full bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black">
                  Place your order
                </Button>
              </div>
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("product")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Shopping Cart
            </h2>
            <div className="border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-[#D4C2B4]"
                    aria-label="Select all items in cart"
                  />
                  <img
                    src="/beetroot.png"
                    alt="Potatoes"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Potatoes
                    </h3>
                    <p className="text-gray-800">₹140/kg</p>
                    <p className="text-sm text-gray-800">Sold By: Mr Vinod</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 border rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-800"
                    >
                      -
                    </Button>
                    <span className="text-lg font-bold">10</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-800"
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-bold text-xl text-gray-800">₹1,400</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl font-bold text-gray-800">
                Subtotal (1) <span className="text-2xl">₹1,400</span>
              </p>
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black">
                Buy Now
              </Button>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Shop for more
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {productCards.slice(1).map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex flex-col items-center shadow-sm border border-[#e5e0d8] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-2 object-contain"
                  />
                  <div className="font-semibold text-base mb-1 text-gray-800">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-800 mb-1">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center p-8">
            <p className="text-gray-600">{view} (Coming soon)</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">{renderContent()}</div>
  );
}
