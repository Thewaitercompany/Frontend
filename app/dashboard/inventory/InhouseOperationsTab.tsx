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
import { Search, Trash2, ChevronLeft, Pencil } from "lucide-react";

// --- Figma Colors and Fonts ---
const aleoFont = "Aleo, sans-serif";
const figmaBrownishColor = "#C99E5A";
const figmaBorderColor = "#B39793";
const figmaLightBrown = "#B39793";
const figmaLightBrownBackground = "#F1EEE6";
const figmaBlack = "#212224";
const deleteDialogTextColor = "#4D3E3B";
const deleteDialogButtonColor = "#C99E5A";
const contentTypography = {
  fontFamily: aleoFont,
  fontSize: 18,
  lineHeight: "100%",
  letterSpacing: 0,
};
const vegTickLabelTypography = {
  fontFamily: aleoFont,
  fontSize: 9,
  lineHeight: "100%",
  letterSpacing: 0,
  color: "#858585",
};

const inhouseData = [
  {
    id: "1",
    image: "/tomatogravy.png",
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

// --- Figma-style Tickbox ---
const CustomTickbox = ({
  checked,
  onChange,
  ariaLabel,
  style = {},
  className = "",
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={`w-7 h-6 rounded-[4px] flex items-center justify-center border-[1.2px] border-[${figmaBrownishColor}] bg-white cursor-pointer select-none ${className}`}
    style={style}
    tabIndex={0}
    role="checkbox"
    aria-checked={checked}
    aria-label={ariaLabel}
    onClick={() => onChange?.(!checked)}
  >
    {checked && (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "translate(1px, 2px)" }}
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
);

// --- GoBack Vector SVG for modal ---
const GoBackVector = () => (
  <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.2783 21.75C10.0882 21.75 9.89937 21.7101 9.72266 21.6318C9.54574 21.5534 9.38327 21.4378 9.24609 21.291L0.688477 12.1318V12.1309C0.550624 11.9845 0.439777 11.8093 0.364258 11.6152C0.288835 11.4214 0.250048 11.2128 0.25 11.002C0.25 10.7909 0.288745 10.5817 0.364258 10.3877C0.420883 10.2422 0.49717 10.1073 0.589844 9.9873L0.688477 9.87207L9.24609 0.712891L9.24707 0.711914C9.3838 0.564372 9.54575 0.448027 9.72266 0.369141C9.89933 0.29042 10.0881 0.250043 10.2783 0.25C10.4688 0.25 10.6581 0.290288 10.835 0.369141C11.0119 0.448031 11.1738 0.56436 11.3105 0.711914L11.3115 0.712891L11.4102 0.828125C11.5028 0.948168 11.5791 1.08303 11.6357 1.22852C11.7113 1.42255 11.75 1.63167 11.75 1.84277C11.75 2.05367 11.7112 2.2622 11.6357 2.45605C11.5791 2.60147 11.5028 2.73645 11.4102 2.85645L11.3115 2.97168L3.95215 10.8311L3.79199 11.002L3.95215 11.1729L11.3115 19.0312H11.3125C11.5894 19.3281 11.7471 19.7348 11.7471 20.1611C11.747 20.372 11.7079 20.5805 11.6328 20.7744C11.5577 20.9684 11.4487 21.1442 11.3115 21.291C11.0346 21.5874 10.6621 21.75 10.2783 21.75Z" fill="#4A3936" stroke="#EFECE4" strokeWidth="0.5"/>
  </svg>
);

export default function InhouseOperationsTab() {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [showEditIngredientsModal, setShowEditIngredientsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedRawMaterials, setSelectedRawMaterials] = useState<number[]>([]);
  const [selectedEditIngredients, setSelectedEditIngredients] = useState<number[]>(ingredientsForEdit.map(i => i.id));
  const [mainRowVegChecked, setMainRowVegChecked] = useState(true);
  const [editVegChecked, setEditVegChecked] = useState(true);
  const [selectedIngredientType, setSelectedIngredientType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showIngredientsDetailModal, setShowIngredientsDetailModal] = useState(false);

  // Always close modals on main view change to prevent modal state leakage
function goToView(newView: "list" | "create" | "edit") {
  setShowIngredientsDetailModal(false);
  setShowIngredientsModal(false);
  setShowEditIngredientsModal(false);
  setShowDeleteModal(false);
  setShowNameModal(false);
  setView(newView);
}

  // --- MAIN LIST VIEW ---
  const renderListView = () => (
    <div
      className="shadow p-2"
      style={{
        background: "#fff",
        borderRadius: 14,
        width: 1246,
        height: 610,
        position: "absolute",
        top: 145,
        left: 104,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top section: Search and Type select */}
      <div className="flex flex-wrap gap-2 mb-2 items-center" style={{ marginBottom: 14 }}>
        <span className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793]" />
          <Input
            placeholder="Search"
            className="pl-10 w-[314px] h-[32px] rounded-[10px] bg-[#fff] border border-[#B39793] font-normal placeholder:text-[#B39793]"
            style={{
              borderColor: figmaBorderColor,
              background: "#fff",
              color: figmaBrownishColor,
              ...contentTypography,
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
                borderColor: figmaBorderColor,
                background: "#fff",
                minWidth: 220,
                minHeight: 32,
                color: figmaBorderColor,
                display: "flex",
                alignItems: "center",
                ...contentTypography,
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
        </div>
      </div>
      {/* --- SEPARATION LINE BELOW THE SEARCH BAR --- */}
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
      {/* --- TABLE --- */}
      <div className="overflow-x-hidden rounded-lg bg-white flex-grow" style={{ borderRadius: 14, boxShadow: "0px 2px 1000px rgba(0,0,0,0.03)" }}>
        <Table>
          <TableHeader style={{ borderBottom: "none" }}>
            <TableRow className="border-b-[#fff]">
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-4">Image</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-5">Name</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-9">Description</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-12">Ingredients</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-1">Quantity</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-5">Cost</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-16">Toggle</TableHead>
            <TableHead className="text-[#202224] font-[Aleo] text-[23px] leading-[23px] px-4">Edit</TableHead>
            </TableRow>
            {/* First Line: #EBCDB5 below headings */}
            <TableRow>
              <TableCell colSpan={8}>
                <div className="w-[1195px] h-[2px]" style={{ backgroundColor: "#EBCDB5" }} />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inhouseData.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow className="border-b-transparent">
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover border-2 border-black"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "/crispyfries.jpg";
                      }}
                    />
                  </TableCell>
                  <TableCell style={contentTypography}>{item.name}</TableCell>
                  <TableCell style={contentTypography}>
                    {item.description}
                    <button
                      style={{
                        color: "#1769AA",
                        textDecoration: "underline",
                        fontFamily: aleoFont,
                        fontSize: 18,
                        marginLeft: 4,
                        borderBottom: "0px solid #1769AA",
                      }}
                    >
                      view more
                    </button>
                  </TableCell>
                  <TableCell style={contentTypography}>
                    {item.ingredients}
                    <button
                      onClick={() => setShowIngredientsModal(true)}
                      style={{
                        color: "#1769AA",
                        textDecoration: "underline",
                        fontFamily: aleoFont,
                        fontWeight: 400,
                        fontSize: 18,
                        marginLeft: 4,
                        borderBottom: "0px solid #1769AA",
                      }}
                    >
                      view more
                    </button>
                  </TableCell>
                  <TableCell style={contentTypography}>{item.quantity}</TableCell>
                  <TableCell style={contentTypography}>{item.cost}</TableCell>
                  <TableCell style={{ verticalAlign: "top" }}>
                    <div className="flex flex-col items-center">
                      <CustomTickbox checked={mainRowVegChecked} onChange={setMainRowVegChecked} ariaLabel="Veg Only" />
                      <span style={vegTickLabelTypography} className="mt-1">
                        Veg Only
                      </span>
                      <span style={vegTickLabelTypography}>
                        By default the toggle is set to veg
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => goToView("edit")}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                {/* After-message separation line for each entry */}
                <TableRow>
                  <TableCell colSpan={8} style={{ padding: 0, border: "none" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#EBCDB5",
                        margin: 0,
                        marginTop: 4,
                        marginBottom: 4,
                        border: "none",
                      }}
                    />
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-6" style={{ marginTop: 28 }}>
        <Button
          onClick={() => goToView("create")}
          className="text-white rounded-lg px-6"
          style={{
            background: figmaBrownishColor,
            fontFamily: aleoFont,
            fontWeight: 700,
            borderRadius: 6,
            fontSize: 18,
          }}
        >
          Create Ingredient
        </Button>
      </div>
      {/* Bottom right: count */}
      <div
        style={{
          position: "absolute",
          right: -150,
          bottom: -40,
          width: "114px",
          height: "20px",
          fontFamily: aleoFont,
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: 0,
          color: "#202224",
          background: "transparent",
          textAlign: "right",
          paddingRight: "8px",
          zIndex: 10,
        }}
      >
        1 of 20 items
      </div>
    </div>
  );

  // --- CREATE VIEW ---
  const renderCreateView = () => (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        width: 1246,
        height: 610,
        position: "absolute",
        top: 145,
        left: 104,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.03)",
        border: "none",
        overflow: "hidden",
      }}
    >
      {/* Top section: Back, Title, Type, Search */}
<div className="flex items-center justify-between" style={{ padding: "26px 36px 0 36px" }}>
  <div className="flex items-center gap-4">
    {/* Custom SVG Back Button */}
    <button
      onClick={() => goToView("list")}
      aria-label="Back"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.506246 12.3022L9.0635 21.4613C9.22307 21.6321 9.41251 21.7676 9.621 21.86C9.82949 21.9524 10.053 22 10.2786 22C10.7344 22 11.1715 21.8062 11.4938 21.4613C11.6533 21.2905 11.7799 21.0877 11.8663 20.8646C11.9526 20.6414 11.9971 20.4022 11.9971 20.1607C11.9971 19.6729 11.816 19.205 11.4938 18.8601L4.13452 11.0016L11.4938 3.14304C11.6542 2.97275 11.7815 2.77015 11.8684 2.54692C11.9553 2.3237 12 2.08427 12 1.84245C12 1.60062 11.9553 1.36119 11.8684 1.13797C11.7815 0.914743 11.6542 0.712143 11.4938 0.541851C11.3347 0.370157 11.1454 0.233877 10.9368 0.140879C10.7283 0.0478783 10.5046 0 10.2786 0C10.0527 0 9.829 0.0478783 9.62044 0.140879C9.41189 0.233877 9.2226 0.370157 9.0635 0.541851L0.506246 9.70097C0.345834 9.87126 0.218509 10.0739 0.13162 10.2971C0.044733 10.5203 0 10.7597 0 11.0016C0 11.2434 0.044733 11.4828 0.13162 11.706C0.218509 11.9293 0.345834 12.1319 0.506246 12.3022Z" fill="#4A3936"/>
      </svg>
    </button>
    <h2
      className="text-xl font-semibold text-[#4E3E3B]"
      style={{
        fontFamily: aleoFont,
        fontWeight: 700,
        fontSize: 24,
        marginLeft: 8,
      }}
    >
      Create your in-house ingredient
          </h2>
        </div>
        {/* --- New Figma-style Ingredient Type Dropdown + Search Bar --- */}
        <div className="flex items-center justify-end" style={{ fontFamily: aleoFont }}>
          {/* Type of Ingredient Dropdown */}
          <Select value={selectedIngredientType} onValueChange={setSelectedIngredientType}>
            <SelectTrigger
              className="w-[220px] h-[32px] rounded-[10px] bg-[#fff] border border-[#B39793] font-normal justify-between pr-3"
              style={{
                borderColor: figmaLightBrown,
                background: "#fff",
                fontSize: 16,
                minWidth: 220,
                minHeight: 32,
                color: figmaLightBrown,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
            <SelectContent
              className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              style={{
                borderColor: figmaLightBrown,
                background: "#fff",
              }}
            >
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
                  className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Bar */}
          <div style={{ position: "relative", marginLeft: "10px" }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: figmaLightBrown, height: "20px", width: "20px" }} />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[314px] h-[32px] rounded-[10px] text-black bg-[#fff] border border-[#B39793] placeholder:text-[#B39793] font-normal"
              style={{
                borderColor: figmaLightBrown,
                background: "#fff",
                fontSize: 16,
              }}
            />
          </div>
        </div>
      </div>
      {/* Table */}
      <div
        className="overflow-x-auto"
        style={{
          flex: 1,
          margin: "18px 0 0 0",
          padding: "0 36px",
          overflowY: "hidden",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#EBCDB5]">
              <TableHead style={{ ...contentTypography, color: "#4E3E3B" }}>Select</TableHead>
              <TableHead style={{ ...contentTypography, color: "#4E3E3B" }}>Raw material</TableHead>
              <TableHead style={{ ...contentTypography, color: "#4E3E3B" }}>Quantity</TableHead>
              <TableHead style={{ ...contentTypography, color: "#4E3E3B" }}>Unit</TableHead>
              <TableHead style={{ ...contentTypography, color: "#4E3E3B" }}>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rawMaterialsData.map((item) => (
              <TableRow key={item.id} className="border-b-[#F0EAE4]">
                <TableCell>
                  <CustomTickbox
                    checked={selectedRawMaterials.includes(item.id)}
                    ariaLabel={`Select ${item.name}`}
                    onChange={(checked) => {
                      setSelectedRawMaterials((prev) =>
                        checked
                          ? [...prev, item.id]
                          : prev.filter((id) => id !== item.id)
                      );
                    }}
                  />
                </TableCell>
                <TableCell style={contentTypography}>{item.name}</TableCell>
                <TableCell>
                  <Input
                    className="text-center rounded-md"
                    placeholder="Nil"
                    aria-label={`Quantity for ${item.name}`}
                    style={{
                      ...contentTypography,
                      width: 89,
                      height: 30,
                      background: "#fff",
                      border: `2px solid ${figmaBrownishColor}`,
                      color: "#000", // Black text for Nil
                      padding: 0,
                      textAlign: "center",
                      fontFamily: aleoFont,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select defaultValue="grams">
                    <SelectTrigger
                      className="rounded-md"
                      style={{
                        ...contentTypography,
                        width: 89,
                        height: 30,
                        background: "#fff",
                        border: `2px solid ${figmaBrownishColor}`,
                        color: "#000", // Black text for grams
                        padding: 0,
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: aleoFont,
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grams" style={{ color: "#000", fontFamily: aleoFont }}>grams</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell style={contentTypography}>{item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Bottom bar */}
      <div
        style={{
          background: figmaLightBrownBackground,
          borderRadius: "0 0 14px 14px",
          minHeight: 58,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 36px",
        }}
      >
        <div style={contentTypography}>Ingredient Name</div>
        <div style={contentTypography}>Total Quantity</div>
        <div style={contentTypography}>Total Unit</div>
        <div style={contentTypography}>NA</div>
        <Button
          onClick={() => setShowNameModal(true)}
          className="text-white px-8"
          style={{
            background: figmaBrownishColor,
            fontFamily: aleoFont,
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 18,
            height: 38,
            marginLeft: 16,
            
            boxShadow: "0 1.5px 4px rgba(200, 158, 90, 0.09)",
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );

  // --- EDIT VIEW ---
  const headingFont = {
    fontFamily: "Aleo, sans-serif",
    fontWeight: 500,
    fontSize: 22,
    lineHeight: "20px",
    letterSpacing: 0,
    color: "#202224",
    textAlign: "center" as const,
  };

  const smallContentFont = {
    fontFamily: "Aleo, sans-serif",
    fontWeight: 400,
    fontSize: 15,
    lineHeight: "100%",
    letterSpacing: 0,
    color: "#212224",
  };

  const categoryFont = {
    fontFamily: "Aleo, sans-serif",
    fontWeight: 400,
    lineHeight: "100%",
    letterSpacing: 0,
    color: "#202224",
  };

  const vegTickLabelTypography = {
    fontFamily: "Aleo, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "100%",
    letterSpacing: 0,
    color: "#26344A",
  };

  const editHeadings = [
    "Image",
    "Name",
    "Description",
    "Category",
    "Ingredients",
    "Cost",
    "Toggle",
  ];

  const gridTemplate =
    "96px 124px 232px 108px 108px 68px 140px";

  const figmaBrownishColor = "#C99E5A";

  const renderEditView = () => (
    <div
      style={{
        width: 1246,
        minHeight: 370,
        position: "absolute",
        top: 145,
        left: 104,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "",
        borderRadius: 22,
        boxShadow:
          "0 0px 0px 0 rgba(185,185,185,0.08), 0 0px 0px 0 rgba(185,185,185,0.05)",
        zIndex: 100,
        padding: "0",
        border: "none",
      }}
    >
      <div
        style={{
          width: 1146,
          minHeight: 294,
          margin: "0px 0 0 0",
          background: "#fff",
          borderRadius: 16,
          boxShadow:
            "0 1.5px 4px 0 rgba(200, 158, 90, 0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: 0,
          position: "relative",
        }}
      >
        <div
          className="flex justify-between items-center w-full"
          style={{
            padding: "25px 3px 0 3px",
          }}
        >
          <div className="flex items-center">
<button
  onClick={() => goToView("list")}
  aria-label="Back"
  style={{
    background: "none",
    border: "none",
    padding: 0,
    marginRight: 10,
    cursor: "pointer",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <svg width="24" height="24" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.506246 12.3022L9.0635 21.4613C9.22307 21.6321 9.41251 21.7676 9.621 21.86C9.82949 21.9524 10.053 22 10.2786 22C10.7344 22 11.1715 21.8062 11.4938 21.4613C11.6533 21.2905 11.7799 21.0877 11.8663 20.8646C11.9526 20.6414 11.9971 20.4022 11.9971 20.1607C11.9971 19.6729 11.816 19.205 11.4938 18.8601L4.13452 11.0016L11.4938 3.14304C11.6542 2.97275 11.7815 2.77015 11.8684 2.54692C11.9553 2.3237 12 2.08427 12 1.84245C12 1.60062 11.9553 1.36119 11.8684 1.13797C11.7815 0.914743 11.6542 0.712143 11.4938 0.541851C11.3347 0.370157 11.1454 0.233877 10.9368 0.140879C10.7283 0.0478783 10.5046 0 10.2786 0C10.0527 0 9.829 0.0478783 9.62044 0.140879C9.41189 0.233877 9.2226 0.370157 9.0635 0.541851L0.506246 9.70097C0.345834 9.87126 0.218509 10.0739 0.13162 10.2971C0.044733 10.5203 0 10.7597 0 11.0016C0 11.2434 0.044733 11.4828 0.13162 11.706C0.218509 11.9293 0.345834 12.1319 0.506246 12.3022Z" fill="#4A3936"/>
  </svg>
</button>
<span
  style={{
    fontFamily: "Aleo, sans-serif",
    fontWeight: 700,
    fontSize: 26,
    color: "#4D3E3B",
    letterSpacing: "0px",
    marginLeft: 14,
  }}
>
  Edit In-house Ingredient
</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowDeleteModal(true)}
            className="bg-white text-[#4E3E3B]"
            style={{
              border: "1px solid #B39793",
              borderRadius: "50%",
              width: 42,
              height: 42,
              padding: 0,
              marginLeft: "-6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.323 8.61576L11.9665 18.7693M7.03345 18.7693L6.67697 8.61576M16.947 4.99431C17.2987 5.05298 17.6497 5.1154 18 5.18159M16.947 4.99431L15.8467 20.6568C15.8018 21.2945 15.5387 21.8901 15.11 22.3245C14.6814 22.7589 14.1187 23.0002 13.5347 23H5.46533C4.88125 23.0002 4.31863 22.7589 3.88998 22.3245C3.46133 21.8901 3.19824 21.2945 3.15333 20.6568L2.05297 4.99431M16.947 4.99431C15.7579 4.79736 14.5627 4.64796 13.3636 4.54642M2.05297 4.99431C1.70129 5.05222 1.3503 5.11427 1 5.18046M2.05297 4.99431C3.24206 4.79736 4.43732 4.64796 5.63636 4.54642M13.3636 4.54642V3.51302C13.3636 2.18177 12.4261 1.07164 11.2103 1.0299C10.0704 0.990033 8.92961 0.990033 7.7897 1.0299C6.57394 1.07164 5.63636 2.1829 5.63636 3.51302V4.54642M13.3636 4.54642C10.7917 4.33026 8.20834 4.33026 5.63636 4.54642"
                stroke="#B39793"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div
          style={{
            width: "calc(100% - 67px)",
            height: "7px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
            margin: "15px 3px 0 34px",
            position: "relative",
            borderRadius: 2,
          }}
        />
        <div
          className="grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: gridTemplate,
            gap: "36px",
            marginTop: 8,
            padding: "0 18px",
            alignItems: "center",
          }}
        >
          {editHeadings.map((label, i) => (
            <div
              key={label}
              style={{
                width: "100%",
                ...headingFont,
                fontWeight: 500,
                fontSize: 22,
                paddingLeft: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            width: "calc(100% - 68px)",
            height: "3px",
            backgroundColor: "#EBCDB5",
            margin: "8px 34px 0 34px",
            borderRadius: 2,
          }}
        />
        <div
          className="grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: gridTemplate,
            gap: "37px",
            marginTop: 10,
            padding: "0 32px 32px 20px",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 96 }}
          >
            <div
              style={{
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 8,
                background: "#fff",
                width: 66,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/crispyfries.jpg"
                alt="Tomato Gravy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                }}
              />
            </div>
          </div>
          {/* Name */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 124 }}
          >
            <div
              style={{
                ...smallContentFont,
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 8,
                color: "#212224",
                fontWeight: 400,
                fontSize: 15,
                height: 54,
                width: 70,
                background: "#fff",
                whiteSpace: "pre-line",
                textAlign: "left",
                padding: 5,
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              Tomato<br />Gravy
            </div>
          </div>
          {/* Description */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 232 }}
          >
            <div
              style={{
                ...smallContentFont,
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 8,
                color: "#212224",
                fontWeight: 400,
                fontSize: 15,
                height: 170,
                width: 162,
                background: "#fff",
                padding: 8,
                whiteSpace: "pre-line",
                overflow: "hidden",
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                textAlign: "left",
              }}
            >
              {"Gravy for main\ndishes Tomato,\nOnion, Garlic,\nGreen Chilli Gravy \nfor main dishes \nTomato, Onion,\nGarlic, Green Chilli"}
            </div>
          </div>
          {/* Category */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 108, position: "relative" }}
          >
            <div
              style={{
                width: 108,
                display: "auto",
                alignItems: "left",
                justifyContent: "left",
                position: "relative",
              }}
            >
              <Select>
                <SelectTrigger
                  className="bg-[#fff]"
                  aria-label="Category"
                  style={{
                    border: `1px solid ${figmaBrownishColor}`,
                    borderRadius: 7,
                    height: 28,
                    fontWeight: 400,
                    fontSize: 14,
                    background: "#fff",
                    boxShadow: "none",
                    outline: "none",
                    width: 98,
                    padding: "7px 2px",
                    textAlign: "left",
                    zIndex: 2000,
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "flex-start",
                    ...categoryFont,
                    marginTop: -17,
                  }}
                >
                  <SelectValue
                    placeholder="Categories"
                    style={{ ...categoryFont, textAlign: "left" }}
                  />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  align="start"
                  style={{
                    border: `1px solid ${figmaBrownishColor}`,
                    borderRadius: 5,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    minWidth: 98,
                    width: 98,
                    fontSize: 15,
                    zIndex: 3000,
                    left: 0,
                    top: -6,
                    position: "absolute",
                    marginTop: 0,
                    padding: "7px 2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    ...categoryFont,
                  }}
                >
                  <SelectItem
                    value="starters"
                    style={{
                      ...categoryFont,
                      textAlign: "left",
                      width: "100%",
                      padding: "7px 2px",
                    }}
                    className="!text-left !justify-start"
                  >
                    Starters
                  </SelectItem>
                  <SelectItem
                    value="drinks"
                    style={{
                      ...categoryFont,
                      textAlign: "left",
                      width: "100%",
                      padding: "7px 2px",
                    }}
                    className="!text-left !justify-start"
                  >
                    Drinks
                  </SelectItem>
                  <SelectItem
                    value="maincourse"
                    style={{
                      ...categoryFont,
                      textAlign: "left",
                      width: "100%",
                      padding: "7px 2px",
                    }}
                    className="!text-left !justify-start"
                  >
                    Main Course
                  </SelectItem>
                  <SelectItem
                    value="desserts"
                    style={{
                      ...categoryFont,
                      textAlign: "left",
                      width: "100%",
                      padding: "7px 2px",
                    }}
                    className="!text-left !justify-start"
                  >
                    Desserts
                  </SelectItem>
                  <SelectItem
                    value="addnew"
                    style={{
                      ...categoryFont,
                      textAlign: "left",
                      width: "100%",
                      padding: "7px 2px",
                    }}
                    className="!text-left !justify-start"
                  >
                    Add New
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* INGREDIENTS CONTENT BLOCK - ONLY THIS OPENS THE DIALOG */}
            <div
              className="flex flex-col items-center justify-center"
              style={{ width: 100, cursor: "pointer" }}
              onClick={() => setShowIngredientsDetailModal(true)}
              tabIndex={0}
              role="button"
              aria-label="Edit Ingredients"
              onKeyPress={e => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowIngredientsDetailModal(true);
                }
              }}
            >
            <div
              style={{
                ...smallContentFont,
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 8,
                color: "#212224",
                fontWeight: 400,
                fontSize: 15,
                height: 84,
                width: 108,
                background: "#fff",
                padding: 5,
                whiteSpace: "pre-line",
                overflow: "hidden",
                textAlign: "left",
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                cursor: "pointer",
              }}
            >
              {"Tomato,\nOnion, Garlic,\nOnion, Garlic,\nGreen Chilli\n"}
            </div>
          </div>
          {/* Cost */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 63 }}
          >
            <div
              style={{
                ...smallContentFont,
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 8,
                color: "#212224",
                fontWeight: 400,
                fontSize: 15,
                height: 42,
                width: 48,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              ₹50
            </div>
          </div>
          {/* Toggle */}
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: 140, height: 100, paddingRight: 0 }}
          >
            <div className="flex flex-col items-center justify-center" style={{ width: "100%" }}>
              <CustomTickbox
                checked={editVegChecked}
                onChange={setEditVegChecked}
                ariaLabel="Veg Only"
                style={{
                  border: `2px solid ${figmaBrownishColor}`,
                  borderRadius: 6,
                  width: 28,
                  height: 28,
                  minWidth: 28,
                  minHeight: 28,
                  marginBottom: 0,
                }}
              />
              <span style={vegTickLabelTypography} className="mt-1">
                Veg Only
              </span>
              <span style={{ ...vegTickLabelTypography, fontSize: 12 }}>
                By default,<br />
                the toggle is set to veg.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: 1246,
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 18,
          marginBottom: 14,
          paddingRight: 38,
        }}
      >
        <Button
          onClick={() => goToView("list")}
          className="text-white"
          style={{
            background: figmaBrownishColor,
            fontFamily: "Aleo, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            height: 52,
            minWidth: 260,
            borderRadius: 17,
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
  // --- MODALS ---
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        {view === "list" && renderListView()}
        {view === "create" && renderCreateView()}
        {view === "edit" && renderEditView()}
      </div>
      
      {/* VIEW MORE DIALOGUE BOX - FULL CUSTOM v3 STYLE */}
      <Dialog
        open={showIngredientsModal}
        onOpenChange={setShowIngredientsModal}
      >
        <DialogContent
          className="bg-white"
          style={{
            borderRadius: 14,
            background: "#fff",
            padding: 0,
            overflow: "visible",
            minWidth: 600,
            maxWidth: 600,
          }}
        >
          <DialogHeader>
            <div className="flex items-center justify-between" style={{ padding: "32px 40px 0 40px" }}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowIngredientsModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="Back"
                >
                  <GoBackVector />
                </button>
                <DialogTitle
                  style={{
                    color: "#4A3936",
                    fontWeight: 700,
                    fontSize: 26,
                    lineHeight: "32px",
                    fontFamily: aleoFont,
                  }}
                  className="ml-2"
                >
                  List of ingredients
                </DialogTitle>
              </div>
            </div>
            {/* Separation line under the top */}
            <div
              style={{
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "10px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
            marginTop: 10,
            marginBottom: 14,
              }}
            ></div>
          </DialogHeader>
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              width: 552,
              minHeight: 24,
              margin: "-30px auto 24px auto",
              fontFamily: aleoFont,
              color: "#000",
              fontSize: 20,
              padding: "0 4px",
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    style={{
                      color: "#4A3936",
                      fontFamily: aleoFont,
                      fontWeight: 700,
                      fontSize: 18,
                      background: "#fff",
                      border: "none"
                    }}
                  >
                    Ingredients
                  </TableHead>
                  <TableHead
                    style={{
                      color: "#4A3936",
                      fontFamily: aleoFont,
                      fontWeight: 700,
                      fontSize: 18,
                      background: "#fff",
                      border: "none"
                    }}
                  >
                    Quantity
                  </TableHead>
                  <TableHead
                    style={{
                      color: "#4A3936",
                      fontFamily: aleoFont,
                      fontWeight: 700,
                      fontSize: 18,
                      background: "#fff",
                      border: "none"
                    }}
                  >
                    Cost
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredientsList.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: aleoFont,
                          fontWeight: 400,
                          fontSize: 18,
                          border: "none",
                          background: "#fff",
                          padding: "14px 0",
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: aleoFont,
                          fontWeight: 400,
                          fontSize: 18,
                          border: "none",
                          background: "#fff",
                          padding: "14px 0",
                        }}
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#000",
                          fontFamily: aleoFont,
                          fontWeight: 400,
                          fontSize: 18,
                          border: "none",
                          background: "#fff",
                          padding: "14px 0",
                        }}
                      >
                        {item.cost}
                      </TableCell>
                    </TableRow>
                    {/* #EBCDB5 line under each message */}
                    <TableRow>
                      <TableCell colSpan={3} style={{ padding: 0, border: "none" }}>
                        <div style={{
                          width: "100%",
                          height: "2px",
                          backgroundColor: "#EBCDB5",
                          margin: 0,
                          border: "none"
                        }} />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
                <TableRow>
                  <TableCell
                    style={{
                      color: "#4A3936",
                      fontFamily: aleoFont,
                      fontWeight: 700,
                      fontSize: 18,
                      border: "none",
                      background: "#fff",
                      padding: "18px 0 8px 0"
                    }}
                  >
                    Total Cost
                  </TableCell>
                  <TableCell
                    style={{
                      border: "none",
                      background: "#fff",
                      padding: "18px 0 8px 0"
                    }}
                  />
                  <TableCell
                    style={{
                      color: "#4A3936",
                      fontFamily: aleoFont,
                      fontWeight: 700,
                      fontSize: 18,
                      border: "none",
                      background: "#fff",
                      padding: "18px 0 8px 0"
                    }}
                  >
                    ₹30
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
      {/* INGREDIENTS CONTENT BLOCK MODAL: CENTERED LIKE DELETE MODAL */}
        </DialogContent>
      </Dialog>

      {/* All other modals stay unchanged */}
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
                    <CustomTickbox
                      checked={selectedEditIngredients.includes(item.id)}
                      ariaLabel={`Select ${item.name}`}
                      onChange={(checked) => {
                        setSelectedEditIngredients((prev) =>
                          checked
                            ? [...prev, item.id]
                            : prev.filter((id) => id !== item.id)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell style={contentTypography}>{item.name}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={item.quantity}
                      className="w-20 text-center bg-[#FDFBF9] border-[#C8B5A6]"
                      aria-label={`Quantity for ${item.name}`}
                      style={contentTypography}
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
                  <TableCell style={contentTypography}>₹{item.cost}</TableCell>
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
                goToView("list");
              }}
              className="text-white rounded-lg px-8"
              style={{
                background: figmaBrownishColor,
                fontFamily: aleoFont,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent
          style={{
            width: 400,
            minHeight: 270,
            borderRadius: 12,
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
            padding: 0,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -54%)",
            zIndex: 9999,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginTop: 38 }}>
            <button
              onClick={() => setShowDeleteModal(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: 14,
                marginLeft: -18,
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Back"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M23 27L10 16L23 5" stroke="#4D3E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span
              style={{
                color: deleteDialogTextColor,
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 20,
                width: 275,
                height: 24,
                textAlign: "left",
                lineHeight: "24px",
                letterSpacing: 0,
              }}
            >
              You want to delete this entry?
            </span>
          </div>
          {/* Image center */}
          <div
            style={{
              width: 196,
              height: 148,
              borderRadius: 6,
              marginTop: 16,
              marginLeft: "auto",
              marginRight: "auto",
              overflow: "hidden",
              background: "#F7F3EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/tomatogravy.png"
              alt="Tomato Gravy"
              style={{
                width: 196,
                height: 148,
                borderRadius: 6,
                objectFit: "cover",
                display: "block",
              }}
              onError={e => {
                (e.currentTarget as any).src = "/crispyfries.jpg";
              }}
            />
          </div>
          <p
            style={{
              fontFamily: aleoFont,
              fontWeight: 400,
              fontSize: 30,
              color: deleteDialogTextColor,
              width: 196,
              margin: "16px auto 0 auto",
              textAlign: "center",
              lineHeight: "24px"
            }}
          >
            Tomato Gravy
          </p>
          <p
            style={{
              fontFamily: aleoFont,
              fontWeight: 400,
              fontSize: 30,
              color: deleteDialogTextColor,
              width: 196,
              margin: "0 auto 0 auto",
              textAlign: "center"
            }}
          >
            1kg
          </p>
          {/* Delete button center */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 18,
              marginBottom: 18,
              width: "100%"
            }}
          >
            <button
              onClick={() => {
                setShowDeleteModal(false);
                goToView("list");
              }}
              style={{
                background: deleteDialogButtonColor,
                color: "#fff",
                fontFamily: aleoFont,
                fontWeight: 700,
                fontSize: 20,
                border: "none",
                borderRadius: 8,
                padding: "8px 38px",
                cursor: "pointer",
                margin: "0 auto",
                boxShadow: "0 2px 8px 0 #C99E5A22"
              }}
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
<Dialog open={showNameModal} onOpenChange={setShowNameModal}>
  <DialogContent
    style={{
      background: "#FFFFFF",
      borderRadius: 22, // strong curve, matches delete modal
      width: 322,
      minWidth: 362,
      maxWidth: 322,
      height: 210,
      minHeight: 250,
      maxHeight: 210,
      padding: 0,
      position: "fixed",
      left: 769,
      top: 351,
      boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    }}
  >
    <DialogHeader
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 0,
        padding: 0,
        marginTop: 18,
        marginLeft: 0,
      }}
    >
      {/* Custom SVG Back Button (close dialog) */}
      <button
        style={{
      background: "#FFFFFF",
      borderRadius: 22,
      width: 0,
      minWidth: 0,
      maxWidth: 322,
      height: 210,
      minHeight: 210,
      maxHeight: 210,
      padding: 0,
      position: "fixed",
      left: 28,
      top: 28,
      boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
        }}
        aria-label="Close"
        onClick={() => setShowNameModal(false)}
      >
        <svg width="24" height="24" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.506246 12.3022L9.0635 21.4613C9.22307 21.6321 9.41251 21.7676 9.621 21.86C9.82949 21.9524 10.053 22 10.2786 22C10.7344 22 11.1715 21.8062 11.4938 21.4613C11.6533 21.2905 11.7799 21.0877 11.8663 20.8646C11.9526 20.6414 11.9971 20.4022 11.9971 20.1607C11.9971 19.6729 11.816 19.205 11.4938 18.8601L4.13452 11.0016L11.4938 3.14304C11.6542 2.97275 11.7815 2.77015 11.8684 2.54692C11.9553 2.3237 12 2.08427 12 1.84245C12 1.60062 11.9553 1.36119 11.8684 1.13797C11.7815 0.914743 11.6542 0.712143 11.4938 0.541851C11.3347 0.370157 11.1454 0.233877 10.9368 0.140879C10.7283 0.0478783 10.5046 0 10.2786 0C10.0527 0 9.829 0.0478783 9.62044 0.140879C9.41189 0.233877 9.2226 0.370157 9.0635 0.541851L0.506246 9.70097C0.345834 9.87126 0.218509 10.0739 0.13162 10.2971C0.044733 10.5203 0 10.7597 0 11.0016C0 11.2434 0.044733 11.4828 0.13162 11.706C0.218509 11.9293 0.345834 12.1319 0.506246 12.3022Z" fill="#4A3936"/>
        </svg>
      </button>
      <DialogTitle
        style={{
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: 23.5,
          lineHeight: "100%",
          letterSpacing: 0,
          color: "#4D3E3B",
          marginLeft: 0,
          marginTop: 4,
          textAlign: "left",
          width: 266,
          height: 48,
          display: "flex",
          alignItems: "center",
        }}
      >
          <span>
    What would you name your <br />
    in-house ingredient?
  </span>
      </DialogTitle>
    </DialogHeader>
    {/* Input line with Figma-style font/spacing */}
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
        marginBottom: 0,
      }}
    >
      <Input
        placeholder="----------"
        aria-label="In-house ingredient name"
        style={{
          width: 200,
          height: 34,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          border: "none",
          borderBottom: "2px solid #fff",
          borderRadius: 5,
          outline: "none",
          background: "transparent",
          textAlign: "center",
          fontFamily: "Aleo",
          fontWeight: 500,
          fontSize: 28,
          lineHeight: "100%",
          letterSpacing: 0,
          color: "#4D3E3B",
          padding: 0,
        }}
      />
    </div>
    {/* Save button */}
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
      }}
    >
      <Button
        type="button"
        onClick={() => setShowNameModal(false)}
        style={{
          width: 188,
          height: 40,
          borderRadius: 6,
          background: "#C99E5A",
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: 24,
          lineHeight: "100%",
          letterSpacing: "-0.11px",
          textAlign: "center",
          color: "#FFFFFF",
          boxShadow: "0 2px 8px 0 #C99E5A22",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Save
      </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Ingredients Detail Modal */}
{view === "edit" && (
  <Dialog
    open={showIngredientsDetailModal}
    onOpenChange={setShowIngredientsDetailModal}
  >
    <DialogContent
      style={{
        width: 1035,
        height: 554,
        minHeight: 554,
        minWidth: 1035,
        background: "#fff",
        borderRadius: 14,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        padding: 0,
        boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "20px 38px 0 38px", // reduced top padding for less gap above first message
          fontFamily: aleoFont,
          fontWeight: 500,
          fontSize: 22,
          color: "#212224",
          justifyContent: "flex-start",
          letterSpacing: 0,
        }}
      >
        {/* SVG Back Button */}
        <button
          onClick={() => setShowIngredientsDetailModal(false)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            marginRight: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            height: 32,
          }}
          aria-label="Go back"
        >
          <svg width="20" height="28" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2783 21.75C10.0882 21.75 9.89937 21.7101 9.72266 21.6318C9.54574 21.5534 9.38327 21.4378 9.24609 21.291L0.688477 12.1318V12.1309C0.550624 11.9845 0.439777 11.8093 0.364258 11.6152C0.288835 11.4214 0.250048 11.2128 0.25 11.002C0.25 10.7909 0.288745 10.5817 0.364258 10.3877C0.420883 10.2422 0.49717 10.1073 0.589844 9.9873L0.688477 9.87207L9.24609 0.712891L9.24707 0.711914C9.3838 0.564372 9.54575 0.448027 9.72266 0.369141C9.89933 0.29042 10.0881 0.250043 10.2783 0.25C10.4688 0.25 10.6581 0.290288 10.835 0.369141C11.0119 0.448031 11.1738 0.56436 11.3105 0.711914L11.3115 0.712891L11.4102 0.828125C11.5028 0.948168 11.5791 1.08303 11.6357 1.22852C11.7113 1.42255 11.75 1.63167 11.75 1.84277C11.75 2.05367 11.7112 2.2622 11.6357 2.45605C11.5791 2.60147 11.5028 2.73645 11.4102 2.85645L11.3115 2.97168L3.95215 10.8311L3.79199 11.002L3.95215 11.1729L11.3115 19.0312H11.3125C11.5894 19.3281 11.7471 19.7348 11.7471 20.1611C11.747 20.372 11.7079 20.5805 11.6328 20.7744C11.5577 20.9684 11.4487 21.1442 11.3115 21.291C11.0346 21.5874 10.6621 21.75 10.2783 21.75Z" fill="#4A3936" stroke="#EFECE4" strokeWidth="0.5"/>
          </svg>
        </button>
        <span>Edit ingredients for your in-house ingredient.</span>
      </div>

      {/* Dropdown + Search */}
      <div className="flex items-center justify-end" style={{ width: "100%", marginTop: -41, paddingRight: 38, fontFamily: aleoFont }}>
        {/* Dropdown */}
        <Select value={selectedIngredientType} onValueChange={setSelectedIngredientType}>
          <SelectTrigger
            className="w-[220px] h-[32px] rounded-[5px] bg-[#fff] border border-[#B39793] font-normal justify-between pr-3"
            style={{
              borderColor: figmaLightBrown,
              background: "#fff",
              fontSize: 16,
              minWidth: 220,
              minHeight: 32,
              color: figmaLightBrown,
              lineHeight: 'normal',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'none',
            }}
          >
            <SelectValue placeholder="Type of Ingredient" />
          </SelectTrigger>
          <SelectContent
            className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
            style={{
              borderColor: figmaLightBrown,
              background: "#fff",
            }}
          >
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
                className="text-black !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5] hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Bar */}
        <div style={{ position: "relative", marginLeft: "10px" }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: figmaLightBrown, height: '20px', width: '20px' }} />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-[210px] h-[32px] rounded-[5px] text-black bg-[#fff] border border-[#B39793] placeholder:text-[#B39793] font-normal"
            style={{
              borderColor: figmaLightBrown,
              background: "#fff",
              fontSize: 16,
            }}
          />
        </div>
      </div>

      {/* Soft separation line (enhanced visibility) */}
      <div
        className="relative"
        style={{
          left: "0px",
          width: "calc(100% + 1px)",
          height: "10px",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0))",
          marginTop: 2,
          marginBottom: 14,
          borderTop: "5px solid rgba(0, 0, 0, 0.06)",
          borderBottom: "none",
        }}
      />
      {/* Table Headings */}
      <div
        className="grid"
        style={{
          width: 1002,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "87px 210px 123px 100px 89px 90px",
          gap: 80,
          alignItems: "center",
          fontFamily: aleoFont,
          fontWeight: 500,
          fontSize: 22,
          color: figmaBlack,
          lineHeight: "20px",
          letterSpacing: 0,
          background: "#fff",
          marginTop: -11,
          marginRight: -10,
          verticalAlign: "middle",
        }}
      >
        <div style={{ textAlign: "center" }}>Select</div>
        <div style={{ textAlign: "center" }}>Ingredients</div>
        <div style={{ textAlign: "center" }}>Quantity</div>
        <div style={{ textAlign: "center" }}>Unit</div>
        <div style={{ textAlign: "center" }}>Cost</div>
      </div>
      {/* Golden separation line below headings */}
      <div
        style={{
          width: 1032,
          height: 1,
          background: "#EBCDB5",
          margin: "0 auto 0 auto",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#EBCDB5",
        }}
      />

      {/* Ingredient Rows */}
      <div
        style={{
          width: 1002,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          gap: 2.7, // no gap, to minimize vertical spacing between rows
        }}
      >
        {ingredientsForEdit.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: "87px 210px 123px 100px 89px 90px",
                alignItems: "center",
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 20,
                color: figmaBlack,
                height: 48,
                verticalAlign: "middle",
                background: "#fff",
                margin: 0, // remove default margin
              }}
            >
              {/* Tick */}
              <div style={{ display: "flex", justifyContent: "right" }}>
                <CustomTickbox
                  checked={selectedEditIngredients.includes(item.id)}
                  onChange={(checked) => {
                    setSelectedEditIngredients((prev) =>
                      checked
                        ? [...prev, item.id]
                        : prev.filter((id) => id !== item.id)
                    );
                  }}
                  ariaLabel={`Select ${item.name}`}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    border: `2px solid ${figmaBrownishColor}`,
                    borderRadius: 4,
                  }}
                />
              </div>
              {/* Name */}
              <div style={{
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 5,
                width: 123,
                height: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 19,
                color: "#000",
                marginLeft: "148px",
                background: "#fff",
              }}>
                {item.name}
              </div>
              {/* Quantity */}
              <div style={{
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 5,
                width: 87,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 20,
                color: "#000",
                marginLeft: "205px",
                background: "#fff",
              }}>
                {item.quantity}
              </div>
              {/* Unit dropdown */}
              <div style={{
                border: `1px solid ${figmaBrownishColor}`,
                borderRadius: 5,
                width: 89,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 20,
                color: "#000",
                marginLeft: "275px",
                background: "#fff",
              }}>
                <Select defaultValue={item.unit}>
                  <SelectTrigger
                    className="bg-[#fff] border-[#C99E5A] rounded-[5px] h-[30px] w-[89px] px-2 flex items-center justify-between"
                    style={{
                      fontFamily: aleoFont,
                      fontWeight: 400,
                      fontSize: 20,
                      color: "#000",
                      background: "#fff",
                      border: `1px solid ${figmaBrownishColor}`,
                      height: 30,
                      minHeight: 30,
                      width: 89,
                      minWidth: 89,
                      borderRadius: 5,
                      boxShadow: "none",
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grams" style={{ color: "#000", fontFamily: aleoFont }}>grams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Cost */}
              <div style={{
                fontFamily: aleoFont,
                fontWeight: 400,
                fontSize: 20,
                color: "#000",
                textAlign: "center",
                width: 90,
                marginLeft: "345px",
              }}>
                ₹{item.cost}
              </div>
            </div>
            {/* line under each row */}
            <div
              style={{
                width: 1034,
                height: 1,
                background: "#EBCDB5",
                marginLeft: "-16px",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#EBCDB5",
                marginTop: 0, // remove default margin between rows
                marginBottom: 0, // remove default margin between rows
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Bottom bazel */}
      <div
        style={{
          width: 1034,
          height: 60,
          position: "absolute",
          left: 1,
          bottom: 0,
          background: "#F1EEE6",
          borderBottomRightRadius: 14,
          borderBottomLeftRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 32,
          fontFamily: aleoFont,
        }}
      >
        <span style={{
          fontWeight: 600,
          fontSize: 24,
          color: "#212224",
          marginRight: 757,
          verticalAlign: "middle",
        }}>Total Cost</span>
        <span style={{
          fontWeight: 600,
          fontSize: 24,
          color: "#212224",
          verticalAlign: "middle",
        }}>
          ₹{ingredientsForEdit.filter(i => selectedEditIngredients.includes(i.id)).reduce((acc, item) => acc + item.cost, 0)}
        </span>
      </div>
      {/* Save Changes button OUTSIDE the dialog, below and right-aligned */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          marginTop: 82,
        }}
      >
        <Button
          onClick={() => setShowIngredientsDetailModal(false)}
          className="text-white"
          style={{
            background: figmaBrownishColor,
            fontFamily: aleoFont,
            fontWeight: 700,
            fontSize: 22,
            width: 188,
            height: 41,
            borderRadius: 6,
            marginRight: 32,
            marginTop: -8,
          }}
        >
          Save Changes
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)}

    </>
  );
}