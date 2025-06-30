import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
  Search,
  Trash2,
  Pencil,
} from "lucide-react";
import SusWastagePageComponent from "./SusWastagePage"; // <--- Import your page here (renamed to avoid conflict)
import AddWastagePage from "./AddWastagePage"; // <-- Import for AddWastagePage

// --- DATA ---
const listWastageData = [
  {
    id: 1,
    image: "/image1_rice.jpg",
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
    image: "/image2_tomato.jpg",
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
    image: "/image3_milk.jpg",
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
    image: "/image4_ladyfinger.jpg",
    item: "Lady Finger",
    quantity: "700g",
    category: "Vegetables",
    datetime: "13/03 4:30pm",
    suspiciousLimit: "2kg",
    cost: "₹40",
    reason: "Expired",
  },
];

const figmaBlack = "#302224";
const inputBorderColor = "#C99E5A";
const aleoFont = "Aleo, serif";
const deleteDialogTextColor = "#4D3E3B";
const deleteDialogButtonColor = "#C99E5A";

// --- REUSABLE BUTTON (Modified for specific icon usage) ---
const ActionButton = ({ children, className = "", ...props }: any) => (
  <Button
    variant="outline"
    className={`h-9 gap-2 border-[#B39793] text-[#B39793] bg-white rounded-full font-['Cormorant_Garamond'] font-normal text-[22px] px-3 hover:bg-[#FDFBF9] ${className}`}
    {...props}
  >
    {children}
  </Button>
);

// Shield Icon Button
export const ShieldButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    className="relative flex items-center justify-center p-0 bg-white hover:bg-[#FDFBF9]"
    onClick={onClick}
    aria-label="suspicious"
    style={{
      width: "48px",
      height: "48px",
      padding: 0,
      overflow: "hidden",
    }}
  >
    <svg
      width="33"
      height="44"
      viewBox="0 0 41 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "33px",
        height: "44px",
        display: "block",
      }}
    >
      {/* Outer Shield */}
      <path
        d="M31.6 38.5C36.6 32.9 40.9 23.9 38.1 10L38 9.05L37 9.2C32 9.9 29.2 9.6 27.1 8.75C25 7.85 23.5 6.35 21.2 4.25L20.5 3.65L19.8 4.25C17.5 6.35 16 7.85 13.9 8.75C11.8 9.6 9 9.9 4 9.2L3 9.05L2.85 10C0.1 23.9 4.4 32.9 9.4 38.5C13 42 17 45 21 46C25 45 29 42 31.6 38.5Z"
        stroke="#B39793"
        strokeWidth="2.6"
      />
      {/* Burger icon inside */}
      <svg
        x="8"
        y="10"
        width="26"
        height="27"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M13.1827 18H14.4655C15.1145 18 15.6477 17.4682 15.725 16.7973L17 3.31364H13.1364V0H11.6141V3.31364H7.77364L8.00545 5.22818C9.32682 5.61273 10.5632 6.30818 11.305 7.07727C12.4177 8.23909 13.1827 9.44182 13.1827 11.4055V18ZM0 17.1818V16.3636H11.6141V17.1818C11.6141 17.6236 11.2664 18 10.8182 18H0.772727C0.347727 18 0 17.6236 0 17.1818ZM11.6141 11.4545C11.6141 4.90909 0 4.90909 0 11.4545H11.6141ZM0 13.0909H11.5909V14.7273H0V13.0909Z"
          fill="#B39793"
        />
      </svg>
    </svg>
  </Button>
);

// Graph Icon Button (centered icon)
export const GraphButton = ({ onClick, isActive, className = "" }: { onClick: () => void; isActive: boolean; className?: string }) => {
  const color = isActive ? "#4B3937" : "#B39793";
  return (
    <button
      onClick={onClick}
      aria-label="chart"
      className={`flex items-center justify-center bg-white p-0 ${className}`}
      style={{
        width: "48px",
        height: "48px",
        border: "none",
        borderRadius: "50%",
        overflow: "hidden",
        marginLeft: "17px",
        marginRight: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: isActive ? 'brightness(0.9)' : 'none',
        transition: 'filter 0.2s ease-in-out',
      }}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
        }}
      >
        <circle cx="33" cy="33" r="31" stroke={color} strokeWidth="2" fill="white" />
        {/* Center the icon in the circle */}
        <g transform="translate(22,22)">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.03125 0.5C1.1658 0.5 1.29917 0.555055 1.40039 0.660156C1.50222 0.76595 1.56246 0.913754 1.5625 1.07129V18.3574H20.9688C21.1033 18.3574 21.2367 18.4124 21.3379 18.5176C21.4397 18.6234 21.5 18.7711 21.5 18.9287C21.5 19.0862 21.4397 19.234 21.3379 19.3398C21.2367 19.4449 21.1033 19.5 20.9688 19.5H1.03125C0.896703 19.5 0.763327 19.4449 0.662109 19.3398C0.560283 19.2341 0.500036 19.0862 0.5 18.9287V1.07129C0.500036 0.913754 0.560283 0.76595 0.662109 0.660156C0.737895 0.581462 0.83191 0.531299 0.930664 0.510742L1.03125 0.5ZM20.9521 3.38379C21.0509 3.38556 21.149 3.41647 21.2334 3.47559L21.3125 3.54395C21.412 3.64731 21.472 3.79049 21.4746 3.94434C21.4772 4.09736 21.4215 4.24147 21.3262 4.34863L14.1182 11.8389C14.017 11.9437 13.8843 11.999 13.75 11.999C13.6155 11.999 13.4821 11.9439 13.3809 11.8389H13.3818L9.98535 8.31055L9.625 7.93652L9.26465 8.31055L5.53711 12.1836C5.43528 12.2823 5.30433 12.3333 5.17285 12.3311C5.04124 12.3287 4.91049 12.2727 4.81152 12.1699C4.71242 12.0666 4.65294 11.9231 4.65039 11.7695C4.6479 11.6164 4.70241 11.4714 4.79785 11.3643L9.25684 6.73242L9.25586 6.73145C9.35701 6.62671 9.49069 6.57227 9.625 6.57227C9.75931 6.57227 9.89201 6.62767 9.99316 6.73242L13.3896 10.2607L13.75 10.6357L14.1104 10.2607L20.5928 3.52539C20.6939 3.4298 20.8228 3.38153 20.9521 3.38379Z"
              fill={color}
              stroke={color}
            />
          </svg>
        </g>
      </svg>
    </button>
  );
};

// Plus Icon Button (centered icon)
export const PlusButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="add"
    className="flex items-center justify-center bg-white hover:bg-[#FDFBF9] p-0"
    style={{
      width: "48px",
      height: "48px",
      border: "none",
      borderRadius: "50%",
      overflow: "hidden",
      marginLeft: "17px",
      marginRight: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width="42"
      height="42"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
      }}
    >
      <circle cx="33" cy="33" r="31" stroke="#B39793" strokeWidth="2.5" fill="white" />
      <g transform="translate(22,22)">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.8333 1.83333C12.8333 1.3471 12.6402 0.880788 12.2964 0.536971C11.9525 0.193155 11.4862 0 11 0C10.5138 0 10.0475 0.193155 9.70364 0.536971C9.35982 0.880788 9.16667 1.3471 9.16667 1.83333V9.16667H1.83333C1.3471 9.16667 0.880788 9.35982 0.536971 9.70364C0.193155 10.0475 0 10.5138 0 11C0 11.4862 0.193155 11.9525 0.536971 12.2964C0.880788 12.6402 1.3471 12.8333 1.83333 12.8333H9.16667V20.1667C9.16667 20.6529 9.35982 21.1192 9.70364 21.463C10.0475 21.8068 10.5138 22 11 22C11.4862 22 11.9525 21.8068 12.2964 21.463C12.6402 21.1192 12.8333 20.6529 12.8333 20.1667V12.8333H20.1667C20.6529 12.8333 21.1192 12.6402 21.463 12.2964C21.8068 11.9525 22 11.4862 22 11C22 10.5138 21.8068 10.0475 21.463 9.70364C21.1192 9.35982 20.6529 9.16667 20.1667 9.16667H12.8333V1.83333Z"
            fill="#B39793"
          />
        </svg>
      </g>
    </svg>
  </button>
);

// Back Arrow SVG component
const BackArrowSvg = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full bg-white hover:bg-[#F7EFE7] flex items-center justify-center"
    style={{
        width: '40px',
        height: '40px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="#4E3E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

// Bucket SVG Button
const BucketButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="delete"
    style={{
      background: "none",
      border: "none",
      borderRadius: "50%",
      boxShadow: "0px 2px 6px 0px #B3979340",
      width: 48,
      height: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      marginLeft: 12,
      marginRight: 6,
      transition: "background 0.15s",
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "50%",
        border: "1px solid #B39793",
        width: 38,
        height: 38,
        boxShadow: "0 1px 8px 0 #B3979320",
      }}
    >
      <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.5" cy="12" r="12" fill="#fff" />
        <path d="M12.323 8.61576L11.9665 18.7693M7.03345 18.7693L6.67697 8.61576M16.947 4.99431C17.2987 5.05298 17.6497 5.1154 18 5.18159M16.947 4.99431L15.8467 20.6568C15.8018 21.2945 15.5387 21.8901 15.11 22.3245C14.6814 22.7589 14.1187 23.0002 13.5347 23H5.46533C4.88125 23.0002 4.31863 22.7589 3.88998 22.3245C3.46133 21.8901 3.19824 21.2945 3.15333 20.6568L2.05297 4.99431M16.947 4.99431C15.7579 4.79736 14.5627 4.64796 13.3636 4.54642M2.05297 4.99431C1.70129 5.05222 1.3503 5.11427 1 5.18046M2.05297 4.99431C3.24206 4.79736 4.43732 4.64796 5.63636 4.54642M13.3636 4.54642V3.51302C13.3636 2.18177 12.4261 1.07164 11.2103 1.0299C10.0704 0.990033 8.92961 0.990033 7.7897 1.0299C6.57394 1.07164 5.63636 2.1829 5.63636 3.51302V4.54642M13.3636 4.54642C10.7917 4.33026 8.20834 4.33026 5.63636 4.54642"
          stroke="#B39793" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </button>
);

export default function SusWastagePage({ onBack }: { onBack: () => void }) { // This is the main page, keep the name
  const [view, setView] = useState("list-alt");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddWastagePage, setShowAddWastagePage] = useState(false); // <-- Add state for AddWastagePage

  // For Edit Inner Page (showing all fields like edit, but styled as Figma)
  const [showEditInner, setShowEditInner] = useState(false);
  const [editInnerData, setEditInnerData] = useState<any>(null);

  // For delete dialogue from edit wastage block (not table)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // For SusWastagePage
  const [showSusWastagePage, setShowSusWastagePage] = useState(false);

  // For Wastage Chart page
  const [showWastageChartPage, setShowWastageChartPage] = useState(false);

  const handleEdit = (item: any) => {
    setEditInnerData(item);
    setShowEditInner(true);
  };

  const handleDeleteClick = (item: any) => {
    setEditingItem(item);
    setShowDeleteModal(true);
  };

  // --- Common Top Section for List and Chart Views ---
  const renderTopSection = () => (
    <div className="flex flex-wrap gap-4 mb-4 items-center font-['Cormorant_Garamond']" style={{ marginTop: "2px" }}>
      <span className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793] h-5 w-5" />
        <Input
          placeholder="Search"
          className={`pl-10 w-full text-[${figmaBlack}] placeholder:text-[#B39793] h-[32px] rounded-[4px] border border-[#B39793] bg-[#FCFDFD] shadow-none`}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 400,
            fontSize: "16px",
            border: "1px solid #B39793",
            background: "#FCFDFD",
            color: figmaBlack,
            borderRadius: "4px",
          }}
        />
      </span>
      <div className="flex-1" />
      <div className="relative w-full sm:w-[192px]">
        <Select>
          <SelectTrigger
            className="custom-dropdown-trigger flex items-center justify-between !border-[1px] !border-[#B39793] !bg-[#FCFDFD] !text-[16px] !h-[32px] !rounded-[4px] !shadow-none !min-w-[192px] !px-[10px] !leading-[30px] !align-middle
            [&>svg:not(.custom-dropdown-icon)]:hidden [&>span[data-radix-select-icon]]:hidden"
          >
            <SelectValue
              placeholder="Type of Ingredient"
              className="custom-select-value !text-[#B39793] data-[placeholder-shown=true]:!text-[#B39793]"
            />
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
            <SelectItem
              value="vegetable"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Vegetables
            </SelectItem>
            <SelectItem
              value="dairy"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Dairy
            </SelectItem>
            <SelectItem
              value="fruits"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Fruits
            </SelectItem>
            <SelectItem
              value="grainsSeeds"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Grains & Seeds
            </SelectItem>
            <SelectItem
              value="poultry"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Poultry
            </SelectItem>
            <SelectItem
              value="rawMeat"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Raw meat
            </SelectItem>
            <SelectItem
              value="inhouse"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              In-house Ingredient
            </SelectItem>
            <SelectItem
              value="nuts"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Nuts
            </SelectItem>
            <SelectItem
              value="fungi"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Fungi
            </SelectItem>
            <SelectItem
              value="kitchenUtilities"
              className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
              hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
              data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
            >
              Kitchen utilities
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* ICON BUTTONS WITH EQUAL 17px GAPS */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "17px" }}>
        <ShieldButton onClick={() => {
          setShowSusWastagePage(true);
          setShowWastageChartPage(false);
        }} />
        <GraphButton onClick={() => {
          setShowWastageChartPage(true);
          setShowSusWastagePage(false);
        }} isActive={showWastageChartPage} />
        <PlusButton onClick={() => setShowAddWastagePage(true)} />
      </div>
    </div>
  );

  // --- Chart Page (matches StockManagementTab chart page) ---
  const renderWastageChartPage = () => (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1246,
        height: 610,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col" style={{ position: "relative" }}>
        {/* Top Section: Back, Today, GraphButton */}
        <div className="flex items-center mb-1">
          <button
            className="mr-2 px-2 py-1 text-black"
            onClick={() => setShowWastageChartPage(false)}
            style={{ background: "none", border: "none" }}
          >
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#b39793"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-2">
            <span className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B39793] h-6 w-6" />
              <Input
                placeholder="Search Ingredient"
                className="pl-10 w-64 border border-[#B39793] bg-[#fff] text-black placeholder:text-[#B39793] h-[32px] rounded-[10px]"
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  fontSize: 16,
                }}
              />
            </span>
            <Button
              variant="outline"
              className="bg-[#B39793] hover:bg-[#B39793] text-white border border-[#B39793] rounded-[10px] font-normal h-[32px] px-4"
              style={{
                borderColor: "#B39793",
                background: "#B39793",
                fontSize: 16,
              }}
            >
              Search
            </Button>
          </div>
          <div className="flex items-center ml-auto gap-2">
            <Button
              variant="outline"
              className="bg-white hover:bg-white text-[#B39793] border border-[#B39793] rounded-[10px] font-normal h-[32px] px-4"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                fontSize: 16,
              }}
            >
              Today
            </Button>
            {/* You may add refresh/bar chart icons here if needed */}
          </div>
        </div>
        <div
          className="relative"
          style={{
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "10px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
            marginTop: 2,
            marginBottom: 14,
          }}
        />
        <div className="text-[18px] font-[500] mb-1 text-black pl-3">
          Wastage Report
        </div>
        <div className="w-full flex-grow bg-white rounded-lg px-4 pt-2 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { time: "10–11am", waste: 0 },
                { time: "11–12pm", waste: 0.8 },
                { time: "12–1pm", waste: 1 },
                { time: "1–2pm", waste: 2.8 },
                { time: "2–3pm", waste: 1.6 },
                { time: "3–4pm", waste: 0.3 },
              ]}
              margin={{ top: 20, right: 30, left: 10, bottom: 35 }}
            >
              <defs>
                <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8F6D" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FF8F6D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#2B303466", fontSize: 12 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 12]}
                tickFormatter={(v) => `${v}kg`}
                tick={{ fill: "#2B303466", fontSize: 12 }}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  fontFamily: "Cormorant Garamond",
                }}
                labelStyle={{ fontSize: 16, color: "#4E3E3B" }}
              />
              <Area
                type="monotone"
                dataKey="waste"
                stroke="#FF8F6D"
                fillOpacity={1}
                fill="url(#colorWaste)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-8 mt-2 text-sm font-medium justify-center text-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF8F6D]"></span>
            <span>Total Food Waste</span>
          </div>
        </div>
      </div>
    </div>
  );

  // --- FIGMA-ACCURATE LIST VIEW ---
  const renderListAltView = () => (
    <>
      <style>
        {`
        .custom-dropdown-trigger,
        .custom-dropdown-trigger .custom-dropdown-icon,
        .custom-dropdown-trigger .custom-select-value,
        .custom-dropdown-trigger .custom-select-value[data-placeholder-shown="true"] {
          color: #B39793 !important;
        }
        `}
      </style>
      {renderTopSection()}
      {/* --- SEPARATION LINE BELOW THE SEARCH BAR --- */}
      <div
        style={{
          position: "relative",
          top: "-6px",
          left: "-0.5vw",
          width: "calc(100% + 1vw)",
          height: "10px",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
          marginTop: 2,
          marginBottom: 14,
        }}
      ></div>

      <div className="overflow-x-auto rounded-lg bg-white font-['Cormorant_Garamond'] shadow-none border-none">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow >
              <TableHead
                className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2"
                style={{ paddingTop: "1px", paddingBottom: "16px" }}
              >Item</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Quantity</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Category</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Date/<br />time</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal whitespace-nowrap text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Suspicious<br />Wastage Limit</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Cost</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Reason</TableHead>
              <TableHead className="text-[#202224] font-['Aleo'] font-medium text-[22px] leading-[20px] tracking-normal text-center px-4 py-2" style={{ paddingTop: "1px", paddingBottom: "16px" }}>Edit</TableHead>
            </TableRow>
          </TableHeader>
          {/* Peach line under headings */}
          <tbody>
            <tr>
              <td colSpan={8} style={{ padding: 0, height: 0 }}>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "2px solid #EBCDB5",
                    margin: 0,
                  }}
                />
              </td>
            </tr>
          </tbody>
          <TableBody>
            {listWastageData.map((item, idx) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell className="px-4 py-1">
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={item.image}
                        alt={item.item}
                        className="w-[65px] h-[61px] rounded object-cover border border-[#B39793]"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/60x48/B39793/ffffff?text=No+Image'; }}
                      />
                      <span className="font-['Aleo'] font-medium text-[20px] leading-tight tracking-normal text-[#000000] mt-1 whitespace-nowrap">{item.item}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.quantity}</TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.category}</TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.datetime}</TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.suspiciousLimit}</TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.cost}</TableCell>
                  <TableCell className="font-['Aleo'] font-normal text-[20px] leading-tight tracking-normal text-[#000000] text-center px-4 py-2">{item.reason}</TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                      className="text-[#000000] hover:text-[#795f53] p-1"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <Pencil className="h-7 w-7" />
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Custom line between messages, except after last row */}
                {idx !== listWastageData.length - 1 && (
                  <tr>
                    <td colSpan={8} style={{ padding: 0, height: 0 }}>
                      <div
                        style={{
                          width: "100%",
                          borderBottom: "2px solid #EBCDB5",
                          margin: 0,
                        }}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* --- 4 of 300 items - bottom right, styled as in StockManagement --- */}
      <div
        style={{
          position: "absolute",
          right: -150,
          bottom: -40,
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
        4 of 300 items
      </div>
    </>
  );

  const renderSuspiciousView = () => (
    <div className="text-center p-8 text-[#4E3E3B] font-['Cormorant_Garamond']">
      <h2 className="text-2xl font-bold mb-4">Suspicious Wastage View</h2>
      <p>Content for suspicious wastage will go here.</p>
      <Button onClick={() => setView("list-alt")} className="mt-4 bg-[#D4C2B4] hover:bg-[#C8B5A6] text-black rounded-lg px-8 font-['Cormorant_Garamond'] text-[18px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg> Back to List
      </Button>
    </div>
  );

  // --- EDIT INNER PAGE NOW LIKE GRAPH PAGE ---
const renderEditInnerPage = () => (
  <div
    className="bg-white rounded-lg shadow p-2"
    style={{
      width: 1246,
      height: 270,
      position: 'absolute',
      top: 145,
      left: 104,
      borderRadius: 14,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: "0 8px 40px 0 rgba(185,185,185,0.13), 0 2px 8px 0 rgba(185,185,185,0.08)",
    }}
  >
    <div className="bg-white rounded-xl shadow flex-grow flex flex-col" style={{ position: "relative" }}>
      {/* Top Section: Back, Title, Bucket */}
      <div className="flex justify-between items-center w-full" style={{ padding: "16px 36px 0 36px" }}>
        <div className="flex items-center">
          <BackArrowSvg onClick={() => setShowEditInner(false)} />
          <span style={{
            fontFamily: aleoFont,
            fontWeight: 700,
            fontSize: 28,
            color: "#4D3E3B",
            letterSpacing: "0px",
            marginLeft: 14,
          }}>Edit wastage</span>
        </div>
        <BucketButton onClick={() => setShowDeleteDialog(true)} />
      </div>
      {/* Soft separation line */}
      <div
        className="relative"
        style={{
          left: "-8px",
          width: "calc(100% + 16px)",
          height: "10px",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0))",
          marginTop: 8,
          marginBottom: 0,
        }}
      />

      {/* Heading Row */}
      <div
        style={{
          fontFamily: aleoFont,
          fontWeight: 500,
          fontSize: 22,
          color: "#212224",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 18,
          marginBottom: 0,
          padding: "0 56px",
          height: 26,
          textAlign: "center",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>Item</div>
        <div style={{ flex: 1, textAlign: "center" }}>Quantity</div>
        <div style={{ flex: 1, textAlign: "center" }}>Category</div>
        <div style={{ flex: 1, textAlign: "center" }}>Date/<br />time</div>
        <div style={{ flex: 1.3, textAlign: "center" }}>Suspicious<br />Wastage Limit</div>
        <div style={{ flex: 0.7, textAlign: "center" }}>Cost</div>
        <div style={{ flex: 1, textAlign: "center" }}>Reason</div>
      </div>
      {/* Peach line below headings */}
      <div style={{
        borderBottom: "1.5px solid #EBCDB5",
        margin: "16px 0 0 0",
      }}/>
      {/* Content Row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "13px 56px 0 56px",
          fontFamily: aleoFont,
          background: "#fff",
          borderRadius: "0 0 14px 14px",
          gap: 30, // 30px gap between each box!
        }}
      >
        {/* Item */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: 78,
              height: 87,
              borderRadius: 8,
              marginBottom: 2,
              marginTop: 0,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #C99E5A",
              position: "relative"
            }}
          >
<div
  style={{
    width: 66,
    height: 50,
    borderRadius: 6,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #000",
    position: "absolute",
    left: 6,
    top: 7,
    overflow: "hidden"
  }}
>
  <img
    src="/image1_rice.jpg" // This assumes the image is placed in the public folder
    alt="Rice"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
</div>

            {/* Rice word (inside boundary, under image) */}
            <span style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 62,
              width: 29,
              height: 18,
              fontFamily: aleoFont,
              fontWeight: 400,
              fontSize: 15,
              color: "#000",
              textAlign: "center",
              lineHeight: "18px",
              letterSpacing: 0,
              verticalAlign: "middle",
              display: "block"
            }}>{editInnerData?.item}</span>
          </div>
        </div>
        {/* Quantity */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 91,
            height: 53,
            border: "1px solid #C99E5A",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff"
          }}>
            <span style={{
              fontFamily: aleoFont,
              fontWeight: 500,
              fontSize: 22,
              color: "#000",
              textAlign: "center"
            }}>
              {editInnerData?.quantity}
            </span>
          </div>
        </div>
        {/* Category - dropdown moved here, below heading, matching other boxes */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            {/* Custom Category Dropdown, using the correct Type of Ingredient color */}
            <Select>
              <SelectTrigger
                className="custom-dropdown-trigger flex items-center justify-between !border-[1px] !border-[#B39793] !bg-[#FCFDFD] !text-[16px] !h-[32px] !rounded-[4px] !shadow-none !min-w-[192px] !px-[10px] !leading-[30px] !align-middle
                [&>svg:not(.custom-dropdown-icon)]:hidden [&>span[data-radix-select-icon]]:hidden"
              >
                <SelectValue
                  placeholder="Type of Ingredient"
                  className="custom-select-value !text-[#B39793] data-[placeholder-shown=true]:!text-[#B39793]"
                />
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
                style={{ zIndex: 2000, position: "relative" }} // Ensures dropdown is above everything!
                className={`!border-[1px] !border-[#B39793] !bg-white !text-[${figmaBlack}] !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0`}
              >
                <SelectItem value="vegetable" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Vegetables
                </SelectItem>
                <SelectItem value="dairy" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Dairy
                </SelectItem>
                <SelectItem value="fruits" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Fruits
                </SelectItem>
                <SelectItem value="grainsSeeds" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Grains & Seeds
                </SelectItem>
                <SelectItem value="poultry" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Poultry
                </SelectItem>
                <SelectItem value="rawMeat" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Raw meat
                </SelectItem>
                <SelectItem value="inhouse" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  In-house Ingredient
                </SelectItem>
                <SelectItem value="nuts" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Nuts
                </SelectItem>
                <SelectItem value="fungi" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Fungi
                </SelectItem>
                <SelectItem value="kitchenUtilities" className={`!text-[${figmaBlack}] !p-[3px_16px] !text-[14px] !bg-white !leading-[1.5]
                  hover:!bg-[#F7EFE7] hover:!text-[#B39793] cursor-pointer
                  data-[selected=true]:!bg-[#F7EFE7] data-[selected=true]:!text-[#B39793]`}
                >
                  Kitchen utilities
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Date/Time */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 140,
            height: 53,
            border: "1px solid #C99E5A",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            fontFamily: aleoFont,
            fontWeight: 400,
            fontSize: 19,
            color: "#000",
            flexDirection: "column",
            lineHeight: "20px",
            padding: 0,
          }}>
            <span style={{marginBottom: 0}}>{editInnerData?.datetime?.split(" ")[0]}</span>
            <span style={{marginTop: 0}}>{editInnerData?.datetime?.split(" ")[1]}</span>
          </div>
        </div>
        {/* Suspicious Wastage Limit - only underline for the input, not for the unit */}
        <div style={{ flex: 1.3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 114,
            height: 30,
            border: "1px solid #C99E5A",
            borderRadius: 5,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: aleoFont,
            fontWeight: 500,
            fontSize: 20,
            marginTop: 12
          }}>
            {/* Number with underline only */}
            <span style={{
              color: "#000",
              borderBottom: "2px solid #000",
              minWidth: 18,
              textAlign: "center",
              fontWeight: 500,
              marginRight: 4,
              display: 'inline-block',
              lineHeight: "26px"
            }}>
              {editInnerData?.suspiciousLimit?.replace(/[a-zA-Z]+$/, "")}
            </span>
            <span style={{
              color: "#000",
              fontWeight: 500,
              fontSize: 19,
              marginRight: 4,
              marginLeft: 0,
              lineHeight: "26px"
            }}>kg</span>
            <svg width={15} height={15} style={{marginTop: 3}}>
              <path d="M4 6L7.5 10L11 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* Cost */}
        <div style={{ flex: 0.7, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 79,
            height: 53,
            border: "1px solid #C99E5A",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff"
          }}>
            <span style={{
              fontFamily: aleoFont,
              fontWeight: 500,
              fontSize: 22,
              color: "#000",
              textAlign: "center"
            }}>
              {editInnerData?.cost}
            </span>
          </div>
        </div>
        {/* Reason */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 90,
            height: 53,
            border: "1px solid #C99E5A",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff"
          }}>
            <span style={{
              fontFamily: aleoFont,
              fontWeight: 500,
              fontSize: 22,
              color: "#000",
              textAlign: "center"
            }}>
              {editInnerData?.reason}
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* Save Changes Button - moved down even further by 90 units */}
    <div
      style={{
        position: "absolute",
        left: 1062,
        top: 286, // 196 + 90
        zIndex: 120,
      }}
    >
      <button
        style={{
          background: "#C99E5A",
          color: "#fff",
          fontFamily: aleoFont,
          fontSize: 24,
          fontWeight: 700,
          border: "none",
          borderRadius: 6,
          padding: 0,
          width: 188,
          height: 41,
          cursor: "pointer",
          boxShadow: "0 2px 8px 0 #C99E5A22"
        }}
        onClick={() => {
          setShowEditInner(false);
          setView("list-alt");
        }}
      >
        Save Changes
      </button>
    </div>
    {/* Delete Dialog */}
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
          zIndex: 9999
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginTop: 38 }}>
          <button
            onClick={() => setShowDeleteDialog(false)}
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
            src={editInnerData?.image}
            alt={editInnerData?.item}
            style={{
              width: 196,
              height: 148,
              borderRadius: 6,
              objectFit: "cover",
              display: "block",
            }}
            onError={e => {
              (e.currentTarget as any).src = "/image1_rice,jpg";
            }}
          />
        </div>
        <p
          style={{
            fontFamily: aleoFont,
            fontWeight: 400,
            fontSize: 30, // larger font size for Rice in delete dialog (+2 from before)
            color: deleteDialogTextColor,
            width: 196,
            margin: "16px auto 0 auto",
            textAlign: "center",
            lineHeight: "24px"
          }}
        >
          {editInnerData?.item}
        </p>
        <p
          style={{
            fontFamily: aleoFont,
            fontWeight: 400,
            fontSize: 30, // larger font size for quantity in delete dialog (+2 from before)
            color: deleteDialogTextColor,
            width: 196,
            margin: "0 auto 0 auto",
            textAlign: "center"
          }}
        >
          {editInnerData?.quantity}
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
              setShowDeleteDialog(false);
              setShowEditInner(false);
              setEditInnerData(null);
              setView("list-alt");
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
  </div>
);
const data = [
  { time: '10-11am', value: 0.2 },
  { time: '11-12pm', value: 0.4 },
  { time: '12-1pm', value: 1.2 },
  { time: '12:30-1pm', value: 3.1 }, // taller central peak
  { time: '1-2pm', value: 1.1 },
  { time: '1:30-2pm', value: 0.9 },
  { time: '2-3pm', value: 1.5 }, // second wave
  { time: '2:30-3pm', value: 0.8 },
  { time: '3-4pm', value: 0.2 },
];

 return (
    <>
      {showSusWastagePage ? (
      <SusWastagePageComponent onBack={() => setShowSusWastagePage(false)} />
      ) : showAddWastagePage ? (
      <AddWastagePage onBack={() => setShowAddWastagePage(false)} />
      ) : showWastageChartPage ? (
      renderWastageChartPage()
      ) : showEditInner ? (
      renderEditInnerPage()
      ) : (
      <div
        className="bg-white rounded-lg shadow p-2"
        style={{
        width: 1246,
        height: 610,
        position: 'absolute',
        top: 145,
        left: 104,
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        overflow: "visible",
        zIndex: 10,
        }}
      >
        <div className="bg-white rounded-xl shadow p-2 flex-grow flex flex-col" style={{ position: "relative" }}>
        {view === "list-alt" && renderListAltView()}
        {view === "suspicious" && renderSuspiciousView()}
        </div>
      </div>
      )}
    </>
  );
}