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
} from "recharts";
import {
  Search,
  Trash2,
  ChevronLeft,
  Pencil,
  Shield,
  BarChart2,
  Plus,
} from "lucide-react";

const wastageData = [
  {
    id: 1,
    image: "/ro.svg",
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
    image: "/po.svg",
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
    image: "/freedhaniya.png",
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
  { time: "10-11am", waste: 0.1 },
  { time: "11-12pm", waste: 0.5 },
  { time: "12-1pm", waste: 1 },
  { time: "1-2pm", waste: 3 },
  { time: "2-3pm", waste: 1.5 },
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

export default function WastageTab() {
  const [view, setView] = useState("list"); // list, add, edit, limit, suspicious, chart
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setView("edit");
  };

  const handleDeleteClick = (item) => {
    setEditingItem(item);
    setShowDeleteModal(true);
  };

  const renderHeader = () => (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      <div className="flex-1 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView("list")}
          className={view === "list" ? "hidden" : ""}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <span className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 h-5 w-5" />
          <Input
            placeholder="Search"
            className="pl-10 w-64 text-black placeholder:text-gray-800"
          />
        </span>
      </div>
      <Select>
        <SelectTrigger className="w-40 text-gray-800">
          <SelectValue placeholder="Type of Ingredient" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vegetable">Vegetable</SelectItem>
          <SelectItem value="dairy">Dairy</SelectItem>
          <SelectItem value="grain">Grain</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView("suspicious")}
        className="text-gray-800"
      >
        <Shield size={20} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView("chart")}
        className="text-gray-800"
      >
        <BarChart2 size={20} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView("add")}
        className="text-gray-800"
      >
        <Plus size={20} />
      </Button>
    </div>
  );

  const renderListView = () => (
    <>
      {renderHeader()}
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Item</TableHead>
              <TableHead className="text-gray-800">Quantity</TableHead>
              <TableHead className="text-gray-800">Category</TableHead>
              <TableHead className="text-gray-800">Date/time</TableHead>
              <TableHead className="text-gray-800">
                Suspicious Wastage Limit
              </TableHead>
              <TableHead className="text-gray-800">Cost</TableHead>
              <TableHead className="text-gray-800">Reason</TableHead>
              <TableHead className="text-gray-800">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wastageData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.item}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-gray-800">{item.item}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">{item.quantity}</TableCell>
                <TableCell className="text-gray-800">{item.category}</TableCell>
                <TableCell className="text-gray-800">{item.datetime}</TableCell>
                <TableCell className="text-gray-800">
                  {item.suspiciousLimit}
                </TableCell>
                <TableCell className="text-gray-800">{item.cost}</TableCell>
                <TableCell className="text-gray-800">{item.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-gray-800"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );

  const renderEditView = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView("list")}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">Edit wastage</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteClick(editingItem)}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Item</label>
          <div className="flex items-center gap-2 p-2 rounded-md border bg-gray-50">
            <img
              src={editingItem.image}
              alt={editingItem.item}
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-gray-800">{editingItem.item}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Quantity</label>
          <Input
            defaultValue={editingItem.quantity.replace("g", "")}
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Category</label>
          <Select defaultValue={editingItem.category}>
            <SelectTrigger className="text-gray-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Seeds & Grains">Seeds & Grains</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Dairy">Dairy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Date/time</label>
          <Input
            defaultValue={editingItem.datetime}
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Suspicious Wastage Limit</label>
          <Input
            defaultValue={editingItem.suspiciousLimit}
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Cost</label>
          <Input
            defaultValue={editingItem.cost}
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Reason</label>
          <Input
            defaultValue={editingItem.reason}
            className="text-black placeholder:text-gray-800"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("list")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderChartView = () => (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView("list")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Wastage Report</h3>
          <span className="font-semibold text-gray-800">Total Cost: ₹256</span>
        </div>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={wastageChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: "#1f2937" }} />
              <YAxis tick={{ fill: "#1f2937" }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="waste"
                stroke="#FF7F6B"
                fill="#FF7F6B"
                fillOpacity={0.6}
                name="Total Food Waste"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-8 mt-4 text-sm font-medium justify-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF7F6B]"></span>
            <span className="text-gray-800">Total Food Waste</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuspiciousView = () => (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView("list")}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">
            Suspicious stock wastage
          </h3>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-6 w-6 text-red-500" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/ro.svg"
            alt="Rice"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <p className="text-gray-800">
              Ingredient: <span className="font-semibold">Rice</span>
            </p>
            <p className="text-gray-800">
              Wasted: <span className="font-semibold">3kg</span>
            </p>
            <p className="text-gray-800">
              Set Limit: <span className="font-semibold">2.5kg</span>
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-gray-800 hover:underline"
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView("list")}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">Add wastage</h2>
        </div>
        <Button variant="outline" size="icon" onClick={() => setView("limit")}>
          <Plus size={20} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Dish/Ingredient</label>
          <div className="flex flex-col gap-2">
            <Button variant="outline">Choose dish</Button>
            <Button variant="outline">Choose ingredient</Button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Quantity</label>
          <Input
            placeholder="-"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Unit</label>
          <Select>
            <SelectTrigger className="text-gray-800">
              <SelectValue placeholder="grams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grams">grams</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Suspicious Wastage Limit</label>
          <Input
            placeholder="--- kg"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-800">Reason</label>
          <Button variant="outline">Add a reason</Button>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("list")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
        >
          Add Wastage
        </Button>
      </div>
    </div>
  );

  const renderLimitView = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView("add")}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">
            Set limit for wastage of food
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="01-03-25 to 01-04-25"
            className="w-48 text-black placeholder:text-gray-800"
          />
          <Input
            placeholder="Search"
            className="text-black placeholder:text-gray-800"
          />
          <Button variant="ghost" size="icon">
            <Trash2 className="h-6 w-6 text-red-500" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Ingredient</TableHead>
              <TableHead className="text-gray-800">Set Limit</TableHead>
              <TableHead className="text-gray-800">Set Time Limit</TableHead>
              <TableHead className="text-gray-800">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {limitIngredientsData.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="text-gray-800">{item.name}</TableCell>
                <TableCell>
                  <Input
                    placeholder="-"
                    className="w-24 text-black placeholder:text-gray-800"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="01-03-25 to 01-04-25"
                    className="w-48 text-black placeholder:text-gray-800"
                  />
                </TableCell>
                <TableCell>
                  <Select defaultValue="grams">
                    <SelectTrigger className="w-32 text-gray-800">
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
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
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
      case "limit":
        return renderLimitView();
      default:
        return renderListView();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {renderContent()}

      {editingItem && (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-800">
                You want to delete this entry?
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center text-center">
              <img
                src={editingItem.image}
                alt={editingItem.item}
                className="w-32 h-32 rounded-full object-cover my-4"
              />
              <p className="font-bold text-lg text-gray-800">
                {editingItem.item}
              </p>
              <p className="text-lg text-gray-800">{editingItem.quantity}</p>
            </div>
            <DialogFooter className="justify-center">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  setShowDeleteModal(false);
                  setView("list");
                }}
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
