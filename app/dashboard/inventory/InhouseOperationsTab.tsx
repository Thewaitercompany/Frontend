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
import { Switch } from "@/components/ui/switch";
import { Search, Trash2, ChevronLeft, Pencil } from "lucide-react";

const inhouseData = [
  {
    id: "1",
    image: "/tomatogravy.png", // Assuming this image exists
    name: "Tomato Gravy",
    description: "Gravy for main dishes",
    ingredients: "Tomato, Onion, Garlic, Green...",
    quantity: "1kg",
    cost: "₹150",
    isVeg: true,
  },
];

const rawMaterialsData = [
  { id: 1, name: "Potato", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 2, name: "Paprika", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 3, name: "Salt", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 4, name: "Garlic powder", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 5, name: "Black pepper", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 6, name: "Mayonnaise", quantity: "Nil", unit: "grams", cost: "NA" },
  { id: 7, name: "Onion", quantity: "Nil", unit: "grams", cost: "NA" },
];

const ingredientsForEdit = [
  { id: 1, name: "Potato", quantity: 100, unit: "grams", cost: 2 },
  { id: 2, name: "Paprika", quantity: 100, unit: "grams", cost: 2 },
  { id: 3, name: "Salt", quantity: 100, unit: "grams", cost: 2 },
  { id: 4, name: "Garlic powder", quantity: 100, unit: "grams", cost: 2 },
  { id: 5, name: "Black pepper", quantity: 100, unit: "grams", cost: 2 },
  { id: 6, name: "Mayonnaise", quantity: 100, unit: "grams", cost: 2 },
];

const ingredientsList = [
  { name: "Potatoes", quantity: "100g", cost: "₹5" },
  { name: "Paprika", quantity: "100g", cost: "₹5" },
  { name: "Salt", quantity: "100g", cost: "₹5" },
  { name: "Garlic Powder", quantity: "100g", cost: "₹5" },
  { name: "Black Pepper", quantity: "100g", cost: "₹5" },
  { name: "Mayonnaise", quantity: "100g", cost: "₹5" },
];

const ActionButton = ({ icon: Icon, ...props }: any) => (
  <Button
    variant="outline"
    size="icon"
    className="h-9 w-9 border-[#C8B5A6] text-[#4E3E3B] bg-white"
    {...props}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

export default function InhouseOperationsTab() {
  const [view, setView] = useState("list"); // list, create, edit
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showEditIngredientsModal, setShowEditIngredientsModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  const renderListView = () => (
    <div className="bg-[#FDFBF9] rounded-lg p-6">
      <div className="flex justify-start mb-4">
        <span className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
          />
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#F0EAE4]">
              <TableHead className="text-[#4E3E3B]">Image</TableHead>
              <TableHead className="text-[#4E3E3B]">Name</TableHead>
              <TableHead className="text-[#4E3E3B]">Description</TableHead>
              <TableHead className="text-[#4E3E3B]">Ingredients</TableHead>
              <TableHead className="text-[#4E3E3B]">Quantity</TableHead>
              <TableHead className="text-[#4E3E3B]">Cost</TableHead>
              <TableHead className="text-[#4E3E3B]">Toggle</TableHead>
              <TableHead className="text-[#4E3E3B]">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inhouseData.map((item) => (
              <TableRow key={item.id} className="border-b-transparent">
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="text-gray-700 font-medium">
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item.description}
                  <button className="text-blue-600 hover:underline ml-1 block text-xs">
                    view more
                  </button>
                </TableCell>
                <TableCell className="text-gray-700">
                  {item.ingredients}
                  <button
                    onClick={() => setShowIngredientsModal(true)}
                    className="text-blue-600 hover:underline ml-1 block text-xs"
                  >
                    view more
                  </button>
                </TableCell>
                <TableCell className="text-gray-700">{item.quantity}</TableCell>
                <TableCell className="text-gray-700">{item.cost}</TableCell>
                <TableCell>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="veg-toggle"
                        className="sr-only"
                        defaultChecked={item.isVeg}
                      />
                      <label
                        htmlFor="veg-toggle"
                        className="block w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
                      >
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
                      </label>
                      <style jsx>{`
                        input:checked + label {
                          background-color: #4ade80;
                        }
                        input:checked + label span {
                          transform: translateX(100%);
                        }
                      `}</style>
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-5 w-5 border-2 border-green-500 rounded-sm flex items-center justify-center">
                        {item.isVeg && (
                          <div className="h-2.5 w-2.5 bg-green-500"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs mt-2 text-gray-500">Veg Only</span>
                    <span className="text-xs text-gray-400">
                      By default the toggle is set to veg
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setView("edit")}
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
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setView("create")}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Create Ingredient
        </Button>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#F0EAE4]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("list")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#4E3E3B]">
            Create your in-house ingredient
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm">
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
          </Select>
          <span className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
            />
          </span>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#F0EAE4]">
              <TableHead className="text-[#4E3E3B]">Select</TableHead>
              <TableHead className="text-[#4E3E3B]">Raw material</TableHead>
              <TableHead className="text-[#4E3E3B]">Quantity</TableHead>
              <TableHead className="text-[#4E3E3B]">Unit</TableHead>
              <TableHead className="text-[#4E3E3B]">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rawMaterialsData.map((item) => (
              <TableRow key={item.id} className="border-b-[#F0EAE4]">
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    aria-label={`Select ${item.name}`}
                  />
                </TableCell>
                <TableCell className="text-gray-700">{item.name}</TableCell>
                <TableCell>
                  <Input
                    className="w-20 text-center bg-[#FDFBF9] border-[#C8B5A6]"
                    placeholder="Nil"
                    aria-label={`Quantity for ${item.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Select defaultValue="grams">
                    <SelectTrigger className="bg-[#FDFBF9] border-[#C8B5A6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grams">grams</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-gray-700">{item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-[#FDFBF9] p-4 rounded-b-lg flex justify-between items-center text-[#4E3E3B] font-semibold">
        <div>Ingredient Name</div>
        <div>Total Quantity</div>
        <div>Total Unit</div>
        <div>NA</div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => {
            setView("list");
            setShowNameModal(true);
          }}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8"
        >
          Create
        </Button>
      </div>
    </div>
  );

  const renderEditView = () => (
    <div className="bg-[#FDFBF9] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("list")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold text-[#4E3E3B]">
            Edit In-house Ingredient
          </h2>
        </div>
        <ActionButton icon={Trash2} onClick={() => setShowDeleteModal(true)} />
      </div>
      <div className="bg-white rounded-lg p-6 border border-[#F0EAE4]">
        <div className="grid grid-cols-6 gap-6 items-start text-sm">
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Image</span>
            <div className="border border-[#C8B5A6] rounded-lg p-2 bg-[#FDFBF9]">
              <img
                src="/tomatogravy.png"
                alt="Tomato Gravy"
                className="w-20 h-16 rounded-md object-cover"
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Name</span>
            <Input
              defaultValue="Tomato Gravy"
              className="bg-[#FDFBF9] border-[#C8B5A6]"
            />
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Description</span>
            <Input
              defaultValue="Gravy for main dishes. Tomato, Onion, Garlic, Green Chilli"
              className="bg-[#FDFBF9] border-[#C8B5A6]"
            />
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Category</span>
            <Select>
              <SelectTrigger
                className="bg-[#FDFBF9] border-[#C8B5A6]"
                aria-label="Category"
              >
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Ingredients</span>
            <div className="p-2 bg-[#FDFBF9] border-[#C8B5A6] rounded-md">
              Tomato, Onion, Garlic, Green Chilli
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Cost</span>
            <Input
              defaultValue="₹50"
              className="bg-[#FDFBF9] border-[#C8B5A6]"
            />
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#4E3E3B]">Toggle</span>
            <div className="flex items-center space-x-2 p-2">
              <Switch
                id="veg-only-edit"
                defaultChecked
                className="data-[state=checked]:bg-green-500"
              />
              <label htmlFor="veg-only-edit" className="text-gray-700">
                Veg Only
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => {
            setShowEditIngredientsModal(true);
          }}
          className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-6"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#FDFBF9] rounded-lg shadow-sm">
        {view === "list" && renderListView()}
        {view === "create" && renderCreateView()}
        {view === "edit" && renderEditView()}
      </div>

      <Dialog
        open={showIngredientsModal}
        onOpenChange={setShowIngredientsModal}
      >
        <DialogContent className="bg-white rounded-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowIngredientsModal(false)}
                  className="text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <DialogTitle className="text-[#4E3E3B]">
                  List of ingredients
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow className="border-b-[#F0EAE4]">
                <TableHead className="text-[#4E3E3B]">Ingredients</TableHead>
                <TableHead className="text-[#4E3E3B]">Quantity</TableHead>
                <TableHead className="text-[#4E3E3B]">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientsList.map((item, index) => (
                <TableRow key={index} className="border-b-[#F0EAE4]">
                  <TableCell className="text-gray-700">{item.name}</TableCell>
                  <TableCell className="text-gray-700">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-gray-700">{item.cost}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-b-transparent">
                <TableCell className="font-bold text-[#4E3E3B]">
                  Total Cost
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="font-bold text-[#4E3E3B]">₹30</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showEditIngredientsModal}
        onOpenChange={setShowEditIngredientsModal}
      >
        <DialogContent className="bg-white rounded-lg p-6 max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEditIngredientsModal(false)}
                  className="text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <DialogTitle className="text-[#4E3E3B]">
                  Edit ingredients for your in-house ingredient.
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="flex gap-2 items-center my-4 p-4 border-y border-[#F0EAE4]">
            <Select>
              <SelectTrigger
                className="w-48 bg-white border-[#C8B5A6] rounded-full text-sm"
                aria-label="Type of Ingredient"
              >
                <SelectValue placeholder="Type of Ingredient" />
              </SelectTrigger>
            </Select>
            <span className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-9 bg-white border-[#C8B5A6] rounded-full text-sm"
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
              {ingredientsForEdit.map((item) => (
                <TableRow key={item.id} className="border-b-[#F0EAE4]">
                  <TableCell>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 rounded border-green-500 text-green-500 focus:ring-green-500"
                      aria-label={`Select ${item.name}`}
                    />
                  </TableCell>
                  <TableCell className="text-gray-700">{item.name}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.quantity}
                      className="w-20 text-center bg-[#FDFBF9] border-[#C8B5A6]"
                      aria-label={`Quantity for ${item.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={item.unit}>
                      <SelectTrigger
                        className="bg-[#FDFBF9] border-[#C8B5A6]"
                        aria-label={`Unit for ${item.name}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grams">grams</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-700">₹{item.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4 p-4 bg-[#FDFBF9] rounded-lg border border-[#F0EAE4]">
            <span className="font-bold text-lg text-[#4E3E3B]">Total Cost</span>
            <span className="font-bold text-lg text-[#4E3E3B]">₹12</span>
          </div>
          <DialogFooter className="justify-end mt-6">
            <Button
              type="button"
              onClick={() => {
                setShowEditIngredientsModal(false);
                setView("list");
              }}
              className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg p-6">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-[#4E3E3B]">
                Delete this ingredient?
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col items-center text-center p-4">
            <img
              src="/fries.png" // Assuming fries.png for delete confirmation
              alt="Tomato Gravy"
              className="w-40 h-32 rounded-lg object-cover my-4"
            />
            <p className="font-bold text-lg text-gray-800">Tomato Gravy</p>
            <p className="text-lg text-gray-700">₹60</p>
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

      <Dialog open={showNameModal} onOpenChange={setShowNameModal}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-center text-[#4E3E3B]">
              What would you name your in-house ingredient?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Input
              placeholder="----------"
              className="text-center my-4 bg-transparent border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-b-[#C8B5A6]"
              aria-label="In-house ingredient name"
            />
            <Button
              type="button"
              onClick={() => setShowNameModal(false)}
              className="bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
