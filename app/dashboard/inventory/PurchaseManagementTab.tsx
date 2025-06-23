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

// Dummy data
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
    image: "/potatoes.png", // Assuming you have this image
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
    image: "/onion.png", // Corrected path
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
  {
    image: "/ladyfinger.png", // Assuming you have this image
    name: "Ladyfinger",
    price: "₹70/kg",
    delivery: "Sat, 15 Mar",
  },
];

const relatedProducts = [
  { image: "/Tomato.png", name: "Tomatoes", price: "120/kg" },
  { image: "/onion.png", name: "Onion", price: "170/kg" },
  { image: "/bellpepper.png", name: "Bell Pepper", price: "90/kg" },
  { image: "/cabbage.png", name: "Cabbage", price: "100/kg" },
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

const ActionButton = ({ icon: Icon, children, ...props }: any) => (
  <Button
    variant="outline"
    className="h-9 gap-2 border-[#C8B5A6] text-[#4E3E3B]"
    {...props}
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </Button>
);

export default function PurchaseManagementTab() {
  const [view, setView] = useState<
    | "table"
    | "add"
    | "edit"
    | "chart"
    | "product"
    | "product-detail"
    | "cart"
    | "delivery"
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
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search"
                    className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </span>
              </div>
              <ActionButton>Today</ActionButton>
              <ActionButton icon={BarChart2} onClick={() => setView("chart")} />
              <ActionButton icon={Plus} onClick={() => setView("add")} />
              <ActionButton icon={RefreshCw} />
            </div>
            <div className="overflow-x-auto rounded-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-[#F0EAE4]">
                    <TableHead className="text-[#4E3E3B]">Ingredient</TableHead>
                    <TableHead className="text-[#4E3E3B]">Cost/unit</TableHead>
                    <TableHead className="text-[#4E3E3B]">Category</TableHead>
                    <TableHead className="text-[#4E3E3B]">
                      Unit Purchased
                    </TableHead>
                    <TableHead className="text-[#4E3E3B]">Total Cost</TableHead>
                    <TableHead className="text-[#4E3E3B]">
                      Invoice Details
                    </TableHead>
                    <TableHead className="text-[#4E3E3B]">
                      Supplier Name
                    </TableHead>
                    <TableHead className="text-[#4E3E3B]">Status</TableHead>
                    <TableHead className="text-[#4E3E3B]">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseData.map((item) => (
                    <TableRow key={item.id} className="border-b-[#F0EAE4]">
                      <TableCell className="font-medium text-gray-700">
                        {item.ingredient}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.cost}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.category}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.unit}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.total}
                      </TableCell>
                      <TableCell>
                        <div className="border border-[#C8B5A6] rounded-md px-4 py-1 text-center text-gray-700 bg-[#FDFBF9]">
                          {item.invoice}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.supplier}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setView("edit")}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4 text-sm text-gray-500">
              4 of 120 items
            </div>
          </>
        );
      case "chart":
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("table")}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                <ActionButton>Today</ActionButton>
                <ActionButton icon={RefreshCw} />
              </div>
            </div>
            <div className="w-full h-[450px] bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-[#4E3E3B]">
                Total Purchases: ₹25,560
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={purchaseChartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F2A287" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#F2A287"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E0D8"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#8A7A78" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#8A7A78" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      borderColor: "#F0EAE4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#D97757"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    name="Total Purchases"
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    align="center"
                    wrapperStyle={{ color: "#4E3E3B" }}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("table")}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value) {
                      setView("product-detail");
                    }
                  }}
                />
              </span>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
                  <SelectValue placeholder="Type of Ingredient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
                  <SelectValue placeholder="List of Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raghu">Mr Raghu</SelectItem>
                  <SelectItem value="anmol">Mr Anmol</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <ActionButton
                icon={ShoppingCart}
                onClick={() => setView("cart")}
              />
              <ActionButton icon={RefreshCw} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {productCards.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex flex-col items-center border border-[#F0EAE4] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-2 object-contain"
                  />
                  <div className="font-semibold text-base mb-1 text-[#4E3E3B]">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Delivery by {item.delivery}
                  </div>
                  <Button
                    className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black w-full rounded-full"
                    onClick={() => setView("delivery")}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </>
        );
      case "product-detail":
        return (
          <>
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearch("");
                  setView("product");
                }}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Potatoes"
                  className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
                />
              </span>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
                  <SelectValue placeholder="Type of Ingredient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
                  <SelectValue placeholder="List of Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raghu">Mr Raghu</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <ActionButton
                icon={ShoppingCart}
                onClick={() => setView("cart")}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-[#F0EAE4] flex gap-6">
                <img
                  src="/potatoes.png"
                  alt="Potatoes"
                  className="w-48 h-48 object-contain rounded-lg"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-[#4E3E3B]">
                    Potatoes
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">₹140/kg</p>
                  <p className="text-sm text-gray-500">
                    Category: <span className="text-green-600">Vegetable</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Sold By: <span className="text-blue-600">Mr Vinod</span>
                  </p>
                  <div className="flex items-center gap-2 mb-4 text-green-700">
                    <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-700"></div>
                    </div>
                    This is a vegetarian product
                  </div>
                  <div className="flex items-center gap-4 border rounded-full p-1 w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <span className="text-lg font-bold">1</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="mt-auto bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black w-40 rounded-full"
                    onClick={() => setView("delivery")}
                  >
                    Add to Cart
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Delivery by Sat, 15 Mar
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-[#4E3E3B]">
                  Related to your search
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {relatedProducts.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-2 flex flex-col items-center border border-[#F0EAE4] text-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 mb-2 object-contain"
                      />
                      <div className="font-semibold text-sm text-[#4E3E3B]">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-[#4E3E3B] mt-8 mb-4">
              Items like this
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {productCards.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex flex-col items-center border border-[#F0EAE4] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-2 object-contain"
                  />
                  <div className="font-semibold text-base mb-1 text-[#4E3E3B]">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "add":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("table")}
                  className="text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-semibold text-[#4E3E3B]">
                  Add new purchase
                </h2>
              </div>
              <ActionButton icon={Plus} />
            </div>
            <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div className="text-[#4E3E3B] font-medium">Ingredient</div>
                <div className="text-[#4E3E3B] font-medium">Category</div>
                <div className="text-[#4E3E3B] font-medium">Unit Purchased</div>
                <div className="text-[#4E3E3B] font-medium">Total Cost</div>

                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Add ingredient name"
                />
                <Select>
                  <SelectTrigger className="bg-[#FDFBF9] border-[#C8B5A6]">
                    <SelectValue placeholder="Type of Ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Add total purchased unit"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Enter total cost"
                />

                <div className="text-[#4E3E3B] font-medium">Invoice no.</div>
                <div className="text-[#4E3E3B] font-medium">Date/Time</div>
                <div className="text-[#4E3E3B] font-medium">Supplier Name</div>
                <div className="text-[#4E3E3B] font-medium">Upload Invoice</div>

                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Enter invoice number"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Enter date and time"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  placeholder="Enter supplier name"
                />
                <Button
                  variant="outline"
                  className="bg-[#FDFBF9] border-[#C8B5A6] text-[#4E3E3B]"
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6">
                Add Purchase
              </Button>
            </div>
          </div>
        );
      case "edit":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("table")}
                  className="text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-semibold text-[#4E3E3B]">
                  Edit Purchases
                </h2>
              </div>
              <ActionButton icon={Edit} />
            </div>
            <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div className="text-[#4E3E3B] font-medium">Ingredient</div>
                <div className="text-[#4E3E3B] font-medium">Category</div>
                <div className="text-[#4E3E3B] font-medium">Unit Purchased</div>
                <div className="text-[#4E3E3B] font-medium">Total Cost</div>

                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="Potatoes"
                />
                <Select defaultValue="vegetable">
                  <SelectTrigger className="bg-[#FDFBF9] border-[#C8B5A6]">
                    <SelectValue placeholder="Type of Ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="10kg"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="₹1,400"
                />

                <div className="text-[#4E3E3B] font-medium">Invoice no.</div>
                <div className="text-[#4E3E3B] font-medium">Date/Time</div>
                <div className="text-[#4E3E3B] font-medium">Supplier Name</div>
                <div className="text-[#4E3E3B] font-medium">Upload Invoice</div>

                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="00001"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="13/03 5:00pm"
                />
                <Input
                  className="bg-[#FDFBF9] border-[#C8B5A6]"
                  defaultValue="Mr Raghu"
                />
                <Button
                  variant="outline"
                  className="bg-[#FDFBF9] border-[#C8B5A6] text-[#4E3E3B]"
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6">
                Save Changes
              </Button>
            </div>
          </div>
        );
      case "delivery":
        return (
          <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("product-detail")}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-4 text-[#4E3E3B]">
                  Delivery Details
                </h3>
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-[#4E3E3B]">
                    Select a delivery day
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {deliveryDays.map((day, i) => (
                      <Button
                        key={day}
                        variant="outline"
                        onClick={() => setActiveDay(i)}
                        className={`rounded-lg border-[#C8B5A6] ${
                          activeDay === i
                            ? "bg-[#D4C2B4] text-black"
                            : "bg-[#FDFBF9] text-gray-700"
                        }`}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-[#4E3E3B]">
                    Select a delivery time
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {deliveryTimes.map((time, i) => (
                      <Button
                        key={time}
                        variant="outline"
                        onClick={() => setActiveTime(i)}
                        className={`rounded-lg border-[#C8B5A6] ${
                          activeTime === i
                            ? "bg-[#D4C2B4] text-black"
                            : "bg-[#FDFBF9] text-gray-700"
                        }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-4 text-[#4E3E3B]">
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 rounded-lg border-[#C8B5A6] bg-[#FDFBF9] text-gray-700"
                  >
                    UPI
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 rounded-lg border-[#C8B5A6] bg-[#FDFBF9] text-gray-700"
                  >
                    Credit/Debit Card
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start p-4 rounded-lg border-[#C8B5A6] bg-[#FDFBF9] text-gray-700"
                  >
                    Cash on Delivery
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#F0EAE4] flex flex-col items-center">
                <img
                  src="/potatoes.png"
                  alt="Potatoes"
                  className="w-48 h-48 object-contain mb-4"
                />
                <h3 className="font-bold text-2xl mb-1 text-[#4E3E3B]">
                  Potatoes
                </h3>
                <p className="text-lg mb-2 text-gray-700">₹140/kg</p>
                <p className="text-sm text-gray-500">
                  Category: <span className="text-green-600">Vegetable</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Sold By: <span className="text-blue-600">Mr Vinod</span>
                </p>
                <div className="flex items-center gap-2 mb-4 text-green-700">
                  <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-700"></div>
                  </div>
                  This is a vegetarian product
                </div>
                <div className="flex items-center gap-4 border rounded-full p-1 w-fit mb-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    -
                  </Button>
                  <span className="text-xl font-bold">10</span>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    +
                  </Button>
                </div>
                <p className="text-lg font-bold mb-4 text-gray-700">
                  Total amount <span className="text-2xl">₹1,400</span>
                </p>
                <Button className="w-full bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg">
                  Place your order
                </Button>
              </div>
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("product-detail")}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-2xl font-semibold text-[#4E3E3B] ml-4">
                Shopping Cart
              </h2>
            </div>
            <div className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-gray-300 text-[#D4C2B4] focus:ring-[#D4C2B4]"
                    aria-label="Select item"
                  />
                  <img
                    src="/potatoes.png"
                    alt="Potatoes"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-[#4E3E3B]">
                      Potatoes
                    </h3>
                    <p className="text-gray-700">₹140/kg</p>
                    <p className="text-sm text-gray-500">Category: Vegetable</p>
                    <p className="text-sm text-gray-500">Sold By: Mr Vinod</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 border rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <span className="text-lg font-bold">10</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-bold text-xl text-[#4E3E3B]">₹1,400</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6 border-t border-[#F0EAE4] pt-4">
              <p className="text-xl font-bold text-[#4E3E3B]">
                Subtotal (1) <span className="text-2xl">₹1,400</span>
              </p>
              <Button className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8">
                Buy Now
              </Button>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#4E3E3B]">
              Shop for more
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {productCards.slice(1).map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex flex-col items-center border border-[#F0EAE4] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mb-2 object-contain"
                  />
                  <div className="font-semibold text-base mb-1 text-[#4E3E3B]">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{item.price}</div>
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
    <div className="bg-[#FDFBF9] rounded-lg shadow-sm p-6">
      {renderContent()}
    </div>
  );
}
