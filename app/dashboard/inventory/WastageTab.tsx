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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Search,
  Trash2,
  ChevronLeft,
  Pencil,
  Shield,
  BarChart2,
  Plus,
  CalendarIcon,
} from "lucide-react";

// Assuming rice.png exists in /public
const wastageData = [
  {
    id: 1,
    image: "/rice.png",
    item: "Rice",
    quantity: "500g",
    category: "Seeds & Grains",
    datetime: "13/03 5:40pm",
    cost: "₹25",
    reason: "Expired",
  },
  {
    id: 2,
    image: "/rice.png",
    item: "Rice",
    quantity: "250g",
    category: "Seeds & Grains",
    datetime: "12/03 4:40pm",
    cost: "₹12.5",
    reason: "Spill",
  },
  {
    id: 3,
    image: "/rice.png",
    item: "Rice",
    quantity: "800g",
    category: "Seeds & Grains",
    datetime: "10/03 5:40pm",
    cost: "₹40",
    reason: "Expired",
  },
  {
    id: 4,
    image: "/rice.png",
    item: "Rice",
    quantity: "500g",
    category: "Seeds & Grains",
    datetime: "08/03 1:40pm",
    cost: "₹25",
    reason: "Missing",
  },
  {
    id: 5,
    image: "/rice.png",
    item: "Rice",
    quantity: "350g",
    category: "Seeds & Grains",
    datetime: "05/03 3:40pm",
    cost: "₹17.5",
    reason: "Spill",
  },
  {
    id: 6,
    image: "/rice.png",
    item: "Rice",
    quantity: "600g",
    category: "Seeds & Grains",
    datetime: "04/03 2:40pm",
    cost: "₹30",
    reason: "Expired",
  },
];

const listWastageData = [
  {
    id: 1,
    image: "/rice.png",
    item: "Rice",
    quantity: "500g",
    category: "Seeds & Grains",
    datetime: "13/03 5:40pm",
    suspiciousLimit: "2kg",
    cost: "₹20",
    reason: "Expired",
  },
  {
    id: 2,
    image: "/Tomato.png",
    item: "Tomato",
    quantity: "200g",
    category: "Vegetables",
    datetime: "13/03 5:20pm",
    suspiciousLimit: "3kg",
    cost: "₹10",
    reason: "Missing",
  },
  {
    id: 3,
    image: "/milk.png", // Assuming milk.png
    item: "Milk",
    quantity: "10g",
    category: "Dairy",
    datetime: "13/03 4:40pm",
    suspiciousLimit: "1l",
    cost: "₹5",
    reason: "Spill",
  },
  {
    id: 4,
    image: "/ladyfinger.png", // Assuming ladyfinger.png
    item: "Lady Finger",
    quantity: "700g",
    category: "Vegetables",
    datetime: "13/03 4:30pm",
    suspiciousLimit: "2kg",
    cost: "₹40",
    reason: "Expired",
  },
];

const wastageChartData = [
  { time: "10-11am", waste: 0 },
  { time: "11-12pm", waste: 0.5 },
  { time: "12-1pm", waste: 1.2 },
  { time: "1-2pm", waste: 3 },
  { time: "2-3pm", waste: 1.8 },
  { time: "3-4pm", waste: 1 },
];

const limitIngredientsData = [
  { name: "Potato" },
  { name: "Tomato" },
  { name: "Onions" },
  { name: "Bell Pepper" },
  { name: "Sugar" },
  { name: "Cloves" },
  { name: "Paprika" },
];

const ingredientsToAdd = [
  { name: "Potato" },
  { name: "Paprika" },
  { name: "Salt" },
  { name: "Garlic powder" },
  { name: "Black pepper" },
  { name: "Mayonnaise" },
];

const ActionButton = ({ icon: Icon, children, ...props }: any) => (
  <Button
    variant="outline"
    className="h-9 gap-2 border-[#C8B5A6] text-[#4E3E3B] bg-white"
    {...props}
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </Button>
);

export default function WastageTab() {
  const [view, setView] = useState("list"); // list, add, edit, limit, suspicious, chart, add-picker
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setView("edit");
  };

  const handleDeleteClick = (item: any) => {
    setEditingItem(item);
    setShowDeleteModal(true);
  };

  const renderListView = () => (
    <>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {}}
          className="text-gray-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1" />
        <Select>
          <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
            <SelectValue placeholder="Type of Ingredient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seeds">Seeds & Grains</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#F0EAE4]">
              <TableHead className="text-[#4E3E3B]">Image</TableHead>
              <TableHead className="text-[#4E3E3B]">Ingredient</TableHead>
              <TableHead className="text-[#4E3E3B]">Quantity</TableHead>
              <TableHead className="text-[#4E3E3B]">Category</TableHead>
              <TableHead className="text-[#4E3E3B]">Date/time</TableHead>
              <TableHead className="text-[#4E3E3B]">Cost</TableHead>
              <TableHead className="text-[#4E3E3B]">Reason</TableHead>
              <TableHead className="text-[#4E3E3B]">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wastageData.map((item) => (
              <TableRow key={item.id} className="border-b-[#F0EAE4]">
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.item}
                    className="w-12 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-700">
                  {item.item}
                </TableCell>
                <TableCell className="text-gray-700">{item.quantity}</TableCell>
                <TableCell className="text-gray-700">{item.category}</TableCell>
                <TableCell className="text-gray-700">{item.datetime}</TableCell>
                <TableCell className="text-gray-700">{item.cost}</TableCell>
                <TableCell className="text-gray-700">{item.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4 text-sm text-gray-500">
        6 of 300 items
      </div>
    </>
  );

  const renderListAltView = () => (
    <>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <span className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
          />
        </span>
        <div className="flex-1" />
        <Select>
          <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
            <SelectValue placeholder="Type of Ingredient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetable">Vegetable</SelectItem>
            <SelectItem value="dairy">Dairy</SelectItem>
          </SelectContent>
        </Select>
        <ActionButton icon={Shield} onClick={() => setView("suspicious")} />
        <ActionButton icon={BarChart2} onClick={() => setView("chart")} />
        <ActionButton icon={Plus} onClick={() => setView("add")} />
      </div>
      <div className="overflow-x-auto rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#F0EAE4]">
              <TableHead className="text-[#4E3E3B]">Item</TableHead>
              <TableHead className="text-[#4E3E3B]">Quantity</TableHead>
              <TableHead className="text-[#4E3E3B]">Category</TableHead>
              <TableHead className="text-[#4E3E3B]">Date/time</TableHead>
              <TableHead className="text-[#4E3E3B]">
                Suspicious Wastage Limit
              </TableHead>
              <TableHead className="text-[#4E3E3B]">Cost</TableHead>
              <TableHead className="text-[#4E3E3B]">Reason</TableHead>
              <TableHead className="text-[#4E3E3B]">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listWastageData.map((item) => (
              <TableRow key={item.id} className="border-b-transparent">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.item}
                      className="w-12 h-10 rounded-md object-cover"
                    />
                    <span className="font-medium text-gray-700">
                      {item.item}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">{item.quantity}</TableCell>
                <TableCell className="text-gray-700">{item.category}</TableCell>
                <TableCell className="text-gray-700">{item.datetime}</TableCell>
                <TableCell className="text-gray-700">
                  {item.suspiciousLimit}
                </TableCell>
                <TableCell className="text-gray-700">{item.cost}</TableCell>
                <TableCell className="text-gray-700">{item.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4 text-sm text-gray-500">
        4 of 300 items
      </div>
    </>
  );

  const renderEditView = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("list")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#4E3E3B]">Edit wastage</h2>
        </div>
        <ActionButton
          icon={Trash2}
          onClick={() => handleDeleteClick(editingItem)}
        />
      </div>
      <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
        <div className="grid grid-cols-7 gap-4 items-end text-sm">
          <div className="text-[#4E3E3B] font-medium">Item</div>
          <div className="text-[#4E3E3B] font-medium">Quantity</div>
          <div className="text-[#4E3E3B] font-medium">Category</div>
          <div className="text-[#4E3E3B] font-medium">Date/time</div>
          <div className="text-[#4E3E3B] font-medium">
            Suspicious Wastage Limit
          </div>
          <div className="text-[#4E3E3B] font-medium">Cost</div>
          <div className="text-[#4E3E3B] font-medium">Reason</div>

          <div className="flex items-center gap-2 p-2 rounded-md border bg-[#FDFBF9] border-[#C8B5A6]">
            <img
              src={editingItem.image}
              alt={editingItem.item}
              className="w-10 h-8 rounded-md object-cover"
            />
            <span className="text-gray-700">{editingItem.item}</span>
          </div>

          <Input
            defaultValue={editingItem.quantity.replace("g", "")}
            className="bg-[#FDFBF9] border-[#C8B5A6]"
          />

          <Select defaultValue={editingItem.category}>
            <SelectTrigger className="bg-[#FDFBF9] border-[#C8B5A6]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Seeds & Grains">Seeds & Grains</SelectItem>
            </SelectContent>
          </Select>

          <Input
            defaultValue={editingItem.datetime}
            className="bg-[#FDFBF9] border-[#C8B5A6]"
          />
          <div className="flex">
            <Input
              defaultValue={editingItem.suspiciousLimit?.replace("kg", "")}
              className="bg-[#FDFBF9] border-r-0 rounded-r-none border-[#C8B5A6]"
            />
            <Select defaultValue="kg">
              <SelectTrigger className="bg-[#FDFBF9] w-20 rounded-l-none border-[#C8B5A6]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="g">g</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            defaultValue={editingItem.cost}
            className="bg-[#FDFBF9] border-[#C8B5A6]"
          />
          <Input
            defaultValue={editingItem.reason}
            className="bg-[#FDFBF9] border-[#C8B5A6]"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("list")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderChartView = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("list-alt")}
          className="text-gray-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          <ActionButton>Today</ActionButton>
          <ActionButton icon={BarChart2} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#F0EAE4]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#4E3E3B]">Wastage Report</h3>
          <span className="font-semibold text-gray-700">Total Cost: ₹256</span>
        </div>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={wastageChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F2A287" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F2A287" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E0D8"
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "#8A7A78" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                label={{
                  value: "Unit",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#8A7A78",
                }}
                tick={{ fill: "#8A7A78" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: "8px", borderColor: "#F0EAE4" }}
              />
              <Area
                type="monotone"
                dataKey="waste"
                stroke="#D97757"
                fill="url(#colorWaste)"
                name="Total Food Waste"
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
      </div>
    </div>
  );

  const renderSuspiciousView = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("list-alt")}
          className="text-gray-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2 items-center">
          <Select>
            <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seeds">Seeds & Grains</SelectItem>
            </SelectContent>
          </Select>
          <ActionButton icon={Shield} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#F0EAE4]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#4E3E3B]">
            Suspicious stock wastage
          </h3>
          <ActionButton icon={Trash2} />
        </div>
        <div className="flex items-center gap-4 border border-[#F0EAE4] rounded-lg p-4">
          <img
            src="/rice.png"
            alt="Rice"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <p className="text-gray-700">
              Ingredient:{" "}
              <span className="font-semibold text-[#D97757]">Rice</span>
            </p>
            <p className="text-gray-700">
              Wasted: <span className="font-semibold text-[#D97757]">3kg</span>
            </p>
            <p className="text-gray-700">
              Set Limit:{" "}
              <span className="font-semibold text-[#D97757]">2.5kg</span>
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 hover:underline"
            >
              View more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddView = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("list-alt")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#4E3E3B]">Add wastage</h2>
        </div>
        <ActionButton icon={Plus} />
      </div>
      <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
        <div className="grid grid-cols-5 gap-6 items-end text-sm">
          <div className="text-[#4E3E3B] font-medium">Dish/Ingredient</div>
          <div className="text-[#4E3E3B] font-medium">Quantity</div>
          <div className="text-[#4E3E3B] font-medium">Unit</div>
          <div className="text-[#4E3E3B] font-medium">
            Suspicious Wastage Limit
          </div>
          <div className="text-[#4E3E3B] font-medium">Reason</div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="bg-[#FDFBF9] border-[#C8B5A6] text-gray-500"
            >
              Choose dish
            </Button>
            <Button
              variant="outline"
              onClick={() => setView("add-picker")}
              className="bg-[#FDFBF9] border-[#C8B5A6] text-gray-500"
            >
              Choose ingredient
            </Button>
          </div>

          <Input
            placeholder="-"
            className="bg-[#FDFBF9] border-[#C8B5A6] text-center"
          />

          <Select>
            <SelectTrigger className="bg-[#FDFBF9] border-[#C8B5A6]">
              <SelectValue placeholder="grams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="g">grams</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex">
            <Input
              placeholder="---"
              className="bg-[#FDFBF9] border-r-0 rounded-r-none border-[#C8B5A6] text-center"
            />
            <Select defaultValue="kg">
              <SelectTrigger className="bg-[#FDFBF9] w-20 rounded-l-none border-[#C8B5A6]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="g">g</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="bg-[#FDFBF9] border-[#C8B5A6] text-gray-500"
          >
            Add a reason
          </Button>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("list-alt")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Add Wastage
        </Button>
      </div>
    </div>
  );

  const renderAddPickerView = () => (
    <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("add")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-[#4E3E3B]">
              Add wastage
            </h2>
            <p className="text-sm text-gray-500">
              Pick ingredients from the list to include in wastage.
            </p>
          </div>
        </div>
        <ActionButton icon={Plus} />
      </div>
      <div className="flex gap-2 items-center mb-4 p-4 border-y border-[#F0EAE4]">
        <Select>
          <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
            <SelectValue placeholder="Type of Ingredient" />
          </SelectTrigger>
        </Select>
        <span className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
            aria-label="Search ingredients"
          />
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-[#F0EAE4]">
            <TableHead>Select</TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredientsToAdd.map((item) => (
            <TableRow key={item.name} className="border-b-[#F0EAE4]">
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#D4C2B4] focus:ring-[#D4C2B4]"
                  aria-label={`Select ${item.name}`}
                />
              </TableCell>
              <TableCell className="text-gray-700">{item.name}</TableCell>
              <TableCell>
                <Input
                  placeholder="-"
                  className="w-20 text-center bg-[#FDFBF9] border-[#C8B5A6]"
                />
              </TableCell>
              <TableCell>
                <Select defaultValue="grams">
                  <SelectTrigger className="w-28 bg-[#FDFBF9] border-[#C8B5A6]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grams">grams</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-gray-700">₹0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-6 p-4 bg-[#FDFBF9] rounded-lg border border-[#F0EAE4]">
        <span className="font-bold text-lg text-[#4E3E3B]">Total Cost</span>
        <span className="font-bold text-lg text-[#4E3E3B]">NA</span>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("list-alt")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Add Wastage
        </Button>
      </div>
    </div>
  );

  const renderLimitView = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("add")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#4E3E3B]">
            Set limit for wastage of food
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="01-03-25 to 01-04-25"
              className="w-48 pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
            />
          </span>
          <span className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="w-48 pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
              aria-label="Search limits"
            />
          </span>
          <ActionButton icon={Trash2} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#F0EAE4]">
              <TableHead className="text-[#4E3E3B]">Ingredient</TableHead>
              <TableHead className="text-[#4E3E3B]">Set Limit</TableHead>
              <TableHead className="text-[#4E3E3B]">Set Time Limit</TableHead>
              <TableHead className="text-[#4E3E3B]">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {limitIngredientsData.map((item) => (
              <TableRow key={item.name} className="border-b-[#F0EAE4]">
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell>
                  <Input
                    placeholder="-"
                    className="w-24 text-center bg-[#FDFBF9] border-[#C8B5A6]"
                  />
                </TableCell>
                <TableCell>
                  <span className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="01-03-25 to 01-04-25"
                      className="w-48 pl-9 bg-[#FDFBF9] border-[#C8B5A6] text-sm"
                    />
                  </span>
                </TableCell>
                <TableCell>
                  <Select defaultValue="grams">
                    <SelectTrigger className="w-32 bg-[#FDFBF9] border-[#C8B5A6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grams">grams</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("add")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    // This is a temporary way to allow switching between list views for demo
    if (view === "list-alt") return renderListAltView();

    switch (view) {
      case "list":
        return renderListView();
      case "edit":
        return renderEditView();
      case "chart":
        return renderChartView();
      case "suspicious":
        return renderSuspiciousView();
      case "add":
        return renderAddView();
      case "add-picker":
        return renderAddPickerView();
      case "limit":
        return renderLimitView();
      default:
        return renderListAltView(); // Default to the more feature-rich list
    }
  };

  return (
    <div className="bg-[#FDFBF9] rounded-lg shadow-sm p-6">
      {renderContent()}

      {editingItem && (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="sm:max-w-md bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#4E3E3B] text-center mt-4">
                You want to delete this entry?
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center text-center p-4">
              <img
                src={editingItem.image}
                alt={editingItem.item}
                className="w-32 h-32 rounded-lg object-cover my-4"
              />
              <p className="font-bold text-lg text-gray-800">
                {editingItem.item}
              </p>
              <p className="text-lg text-gray-700">{editingItem.quantity}</p>
            </div>
            <DialogFooter className="justify-center pb-4">
              <Button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setView("list");
                }}
                className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
