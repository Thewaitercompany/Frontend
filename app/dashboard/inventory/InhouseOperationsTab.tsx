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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Search, Trash2, X, ChevronLeft, Pencil } from "lucide-react";

const inhouseData = [
  {
    id: "1",
    image: "/chickennoodels.png",
    name: "Tomato Gravy",
    description:
      "Gravy for main dishes. Tomato, Onion, Garlic, Green Chilli Gravy for main dishes Tomato, Onion, Garlic, Green Chilli",
    ingredients: "Tomato, Onion, Garlic, Green...",
    quantity: "1kg",
    cost: "₹150",
    isVeg: true,
  },
];

const rawMaterialsData = [
  { id: 1, name: "Potato", quantity: 100, unit: "grams", cost: 2 },
  { id: 2, name: "Paprika", quantity: 100, unit: "grams", cost: 2 },
  { id: 3, name: "Salt", quantity: 100, unit: "grams", cost: 2 },
  { id: 4, name: "Garlic powder", quantity: 100, unit: "grams", cost: 2 },
  { id: 5, name: "Black pepper", quantity: 100, unit: "grams", cost: 2 },
  { id: 6, name: "Mayonnaise", quantity: 100, unit: "grams", cost: 2 },
  { id: 7, name: "Onion", quantity: 0, unit: "grams", cost: 0 },
];

export default function InhouseOperationsTab() {
  const [view, setView] = useState("list"); // list, create, edit
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  const renderListView = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-end mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-800" />
          <Input
            placeholder="Search"
            className="pl-8 w-64 text-black placeholder:text-gray-800"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Image</TableHead>
              <TableHead className="text-gray-800">Name</TableHead>
              <TableHead className="text-gray-800">Description</TableHead>
              <TableHead className="text-gray-800">Ingredients</TableHead>
              <TableHead className="text-gray-800">Quantity</TableHead>
              <TableHead className="text-gray-800">Cost</TableHead>
              <TableHead className="text-gray-800">Toggle</TableHead>
              <TableHead className="text-gray-800">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inhouseData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="text-gray-800 font-medium">
                  {item.name}
                </TableCell>
                <TableCell className="max-w-xs text-gray-800">
                  {item.description.substring(0, 30)}...
                  <button className="text-gray-800 hover:underline ml-1">
                    view more
                  </button>
                </TableCell>
                <TableCell className="text-gray-800">
                  {item.ingredients}
                  <button
                    onClick={() => setShowIngredientsModal(true)}
                    className="text-gray-800 hover:underline ml-1"
                  >
                    view more
                  </button>
                </TableCell>
                <TableCell className="text-gray-800">{item.quantity}</TableCell>
                <TableCell className="text-gray-800">{item.cost}</TableCell>
                <TableCell>
                  <div className="flex flex-col items-center">
                    <Switch
                      defaultChecked={item.isVeg}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <span className="text-xs mt-1 text-gray-800">Veg Only</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setView("edit")}
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
      <div className="flex justify-end">
        <Button
          onClick={() => setView("create")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
        >
          Create Ingredient
        </Button>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setView("list")}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">
            Create your in-house ingredient
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px] text-gray-800">
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="veg">Vegetable</SelectItem>
              <SelectItem value="non-veg">Non-Vegetable</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-800" />
            <Input
              placeholder="Search"
              className="pl-8 text-black placeholder:text-gray-800"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#e5e0d8] mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-800">Select</TableHead>
              <TableHead className="text-gray-800">Raw material</TableHead>
              <TableHead className="text-gray-800">Quantity</TableHead>
              <TableHead className="text-gray-800">Unit</TableHead>
              <TableHead className="text-gray-800">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rawMaterialsData.slice(0, 6).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <label
                    htmlFor={`select-material-${item.id}`}
                    className="sr-only"
                  >
                    Select {item.name}
                  </label>
                  <input id={`select-material-${item.id}`} type="checkbox" />
                </TableCell>
                <TableCell className="text-gray-800">{item.name}</TableCell>
                <TableCell>
                  <Input
                    className="w-20 text-black placeholder:text-gray-800"
                    placeholder="Nil"
                  />
                </TableCell>
                <TableCell>
                  <Select defaultValue="grams">
                    <SelectTrigger className="text-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grams">grams</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-gray-800">NA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-[#fcfaf7] p-4 rounded-lg flex justify-between items-center mb-6 text-gray-800">
        <div>Ingredient Name</div>
        <div>Total Quantity</div>
        <div>Total Unit</div>
        <div>NA</div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setView("list");
            setShowNameModal(true);
          }}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
        >
          Create
        </Button>
      </div>
    </div>
  );

  const renderEditView = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView("list")}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">
            Edit In-house Ingredient
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 className="h-6 w-6 text-red-500" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-start">
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Image</label>
          <img
            src="/chickennoodels.png"
            alt="Tomato Gravy"
            className="w-24 h-24 rounded object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Name</label>
          <Input
            defaultValue="Tomato Gravy"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-gray-800">Description</label>
          <Input
            defaultValue="Gravy for main dishes. Tomato, Onion, Garlic, Green Chilli Gravy for main dishes Tomato, Onion, Garlic, Green Chilli"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Category</label>
          <Select defaultValue="main-course">
            <SelectTrigger className="text-gray-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main-course">Main Course</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Ingredients</label>
          <Input
            defaultValue="Tomato, Onion, Garlic, Green Chilli"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Cost</label>
          <Input
            defaultValue="₹50"
            className="text-black placeholder:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <label className="text-gray-800">Toggle</label>
          <div className="flex items-center space-x-2 mt-2">
            <Switch
              id="veg-only"
              defaultChecked
              className="data-[state=checked]:bg-green-500"
            />
            <label htmlFor="veg-only" className="text-gray-800">
              Veg Only
            </label>
          </div>
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

  return (
    <>
      {view === "list" && renderListView()}
      {view === "create" && renderCreateView()}
      {view === "edit" && renderEditView()}

      <Dialog
        open={showIngredientsModal}
        onOpenChange={setShowIngredientsModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              List of ingredients
            </DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800">Ingredients</TableHead>
                <TableHead className="text-gray-800">Quantity</TableHead>
                <TableHead className="text-gray-800">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawMaterialsData.slice(0, 6).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-800">{item.name}</TableCell>
                  <TableCell className="text-gray-800">
                    {item.quantity}
                    {item.unit}
                  </TableCell>
                  <TableCell className="text-gray-800">₹{item.cost}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold text-gray-800">
                  Total Cost
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold text-gray-800">
                  ₹
                  {rawMaterialsData
                    .slice(0, 6)
                    .reduce((acc, item) => acc + item.cost, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              Delete this ingredient?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center">
            <img
              src="/fries.png"
              alt="Tomato Gravy"
              className="w-32 h-32 rounded-full object-cover my-4"
            />
            <p className="font-bold text-lg text-gray-800">Tomato Gravy</p>
            <p className="text-lg text-gray-800">₹60</p>
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

      <Dialog open={showNameModal} onOpenChange={setShowNameModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-800">
              What would you name your in-house ingredient?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Input
              placeholder="----------"
              className="text-center my-4 text-black placeholder:text-gray-800"
            />
            <Button
              type="button"
              onClick={() => setShowNameModal(false)}
              className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
