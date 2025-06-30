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
import PurchaseHistoryPage from "./PurchaseHistoryPage";
import BuyPage from "./BuyPage";

// --- DATA FOR PRODUCT CARDS ---
const productCards = [
  {
    image: "/potatoes.jpg",
    name: "Potatoes",
    price: "₹140/kg",
    delivery: "Sat, 15 Mar",
    isVegetarian: true,
    category: "Vegetable",
    soldBy: "Mr Vinod",
  },
  {
    image: "/image2_tomato.jpg",
    name: "Tomatoes",
    price: "₹120/kg",
    delivery: "Sat, 14 Mar",
  },
  {
    image: "/onion.jpg",
    name: "Onions",
    price: "₹170/kg",
    delivery: "Sat, 15 Mar",
  },
  {
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
    price: "₹90/kg",
    delivery: "Sat, 15 Mar",
  },
  {
    image: "/cabbage.jpg",
    name: "Cabbage",
    price: "₹100/kg",
    delivery: "Sat, 15 Mar",
  },
];

// --- DATA FOR "ITEMS LIKE THIS" CARDS ---
const itemsLikeThisCards = [
  {
    image: "/image2_tomato.jpg",
    name: "Tomato",
  },
  {
    image: "/image4_ladyfinger.jpg",
    name: "Ladyfinger",
  },
  {
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
  },
  {
    image: "/cabbage.jpg",
    name: "Cabbage",
  },
  {
    image: "/onion.jpg",
    name: "Onion",
  },
  {
    image: "/image4_ladyfinger.jpg",
    name: "Ladyfinger",
  },
  {
    image: "/image2_tomato.jpg",
    name: "Tomato",
  },
  {
    image: "/onion.jpg",
    name: "Onion",
  },
  {
    image: "/bellpeper.jpg",
    name: "Bell Pepper",
  },
  {
    image: "/cabbage.jpg",
    name: "Cabbage",
  },
];

// --- COLORS FROM FIGMA ---
const figmaBrownishColor = "#C99E5A";
const figmaLightBrownBackground = "#fff";
const figmaBorderColor = "#b39793";
const figmaPlaceholderColor = "#B39793";

// SVG ICONS WITH CIRCLE, clickable but no function
function IconCircle({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <span
      tabIndex={0}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#fff",
        border: `2px solid ${figmaBorderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        outline: "none",
        userSelect: "none",
      }}
      onClick={onClick}
      onMouseDown={onClick ? (e) => { e.preventDefault(); e.stopPropagation(); } : undefined}
    >
      {children}
    </span>
  );
}

function FigmaClockIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.997 11.978V12.001C23.997 18.628 18.625 24 11.998 24C9.24751 24.0041 6.57979 23.0593 4.445 21.325L4.467 21.343C4.34039 21.2406 4.23675 21.1127 4.16283 20.9676C4.08892 20.8225 4.04638 20.6635 4.03798 20.5009C4.02959 20.3382 4.05552 20.1757 4.11411 20.0237C4.17269 19.8718 4.2626 19.7339 4.378 19.619L4.923 19.074C5.12384 18.8706 5.3927 18.7485 5.67801 18.7312C5.96333 18.7138 6.245 18.8024 6.469 18.98L6.467 18.978C8.03851 20.2286 9.98864 20.9074 11.997 20.903C13.4497 20.903 14.8803 20.5475 16.1641 19.8676C17.4479 19.1876 18.5457 18.2039 19.3619 17.0021C20.1781 15.8004 20.6878 14.4172 20.8466 12.9731C21.0054 11.5291 20.8084 10.0682 20.2729 8.71783C19.7373 7.36744 18.8795 6.16862 17.7741 5.22596C16.6688 4.2833 15.3496 3.62543 13.9316 3.30975C12.5136 2.99408 11.0399 3.03018 9.63908 3.41492C8.23824 3.79966 6.95284 4.52135 5.895 5.51701L5.9 5.51301L8.356 7.96901C8.46418 8.07731 8.53782 8.21527 8.56761 8.36542C8.59739 8.51558 8.58198 8.67119 8.52332 8.81259C8.46467 8.95398 8.36540 9.07481 8.23807 9.15979C8.11075 9.24477 7.96108 9.29009 7.808 9.29001H0.774C0.568722 9.29001 0.371853 9.20846 0.226699 9.06331C0.0815462 8.91816 0 8.72129 0 8.51601V1.48201C0.000395605 1.32914 0.0459915 1.17981 0.131051 1.05279C0.216111 0.925769 0.336836 0.826743 0.478037 0.768168C0.619238 0.709592 0.774608 0.694084 0.924602 0.723593C1.0746 0.753102 1.21251 0.826312 1.321 0.934011L3.71 3.32301C5.94032 1.18666 8.91059 -0.00409789 11.999 1.05963e-05C18.618 1.05963e-05 23.986 5.36001 23.998 11.976V11.977L23.997 11.978ZM15.244 15.789L15.719 15.178C15.9081 14.9353 15.9931 14.6275 15.9552 14.3222C15.9173 14.0169 15.7597 13.7391 15.517 13.55L15.514 13.548L13.545 12.016V6.96801C13.545 6.32701 13.025 5.80601 12.383 5.80601H11.609C10.968 5.80601 10.447 6.32601 10.447 6.96801V13.528L13.612 15.989C13.7319 16.0832 13.8692 16.1529 14.0161 16.194C14.1629 16.2351 14.3165 16.2468 14.4678 16.2285C14.6192 16.2102 14.7655 16.1622 14.8984 16.0873C15.0312 16.0124 15.148 15.9121 15.242 15.792L15.244 15.789Z" fill={figmaBorderColor}/>
    </svg>
  );
}

function FigmaCartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.4007 17.3997C17.9664 17.3997 18.5091 17.6244 18.9091 18.0245C19.3092 18.4246 19.534 18.9672 19.534 19.533C19.534 20.0988 19.3092 20.6414 18.9091 21.0415C18.5091 21.4416 17.9664 21.6663 17.4007 21.6663C16.8349 21.6663 16.2922 21.4416 15.8922 21.0415C15.4921 20.6414 15.2673 20.0988 15.2673 19.533C15.2673 18.349 16.2167 17.3997 17.4007 17.3997ZM0.333984 0.333008H3.82198L4.82465 2.46634H20.6007C20.8836 2.46634 21.1549 2.57872 21.3549 2.77876C21.5549 2.9788 21.6673 3.25011 21.6673 3.53301C21.6673 3.71434 21.614 3.89567 21.5393 4.06634L17.7207 10.9677C17.358 11.6183 16.654 12.0663 15.854 12.0663H7.90732L6.94732 13.805L6.91532 13.933C6.91532 14.0037 6.94341 14.0716 6.99342 14.1216C7.04343 14.1716 7.11126 14.1997 7.18198 14.1997H19.534V16.333H6.73398C6.16819 16.333 5.62557 16.1082 5.22549 15.7082C4.82541 15.3081 4.60065 14.7655 4.60065 14.1997C4.60065 13.8263 4.69665 13.4743 4.85665 13.1757L6.30732 10.5623L2.46732 2.46634H0.333984V0.333008ZM6.73398 17.3997C7.29978 17.3997 7.8424 17.6244 8.24248 18.0245C8.64256 18.4246 8.86732 18.9672 8.86732 19.533C8.86732 20.0988 8.64256 20.6414 8.24248 21.0415C7.8424 21.4416 7.29978 21.6663 6.73398 21.6663C6.16819 21.6663 5.62557 21.4416 5.22549 21.0415C4.82541 20.6414 4.60065 20.0988 4.60065 19.533C4.60065 18.349 5.54998 17.3997 6.73398 17.3997ZM16.334 9.93301L19.2993 4.59967H5.81665L8.33398 9.93301H16.334Z" fill={figmaBorderColor}/>
    </svg>
  );
}

// Back arrow SVG as per user image
function BackArrowIcon() {
  return (
    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2783 21.75C10.0882 21.75 9.89937 21.7101 9.72266 21.6318C9.54574 21.5534 9.38327 21.4378 9.24609 21.291L0.688477 12.1318V12.1309C0.550624 11.9845 0.439777 11.8093 0.364258 11.6152C0.288835 11.4214 0.250048 11.2128 0.25 11.002C0.25 10.7909 0.288745 10.5817 0.364258 10.3877C0.420883 10.2422 0.49717 10.1073 0.589844 9.9873L0.688477 9.87207L9.24609 0.712891L9.24707 0.711914C9.3838 0.564372 9.54575 0.448027 9.72266 0.369141C9.89932 0.290418 10.0881 0.250043 10.2783 0.25C10.4688 0.25 10.6581 0.290287 10.835 0.369141C11.0119 0.448031 11.1738 0.56436 11.3105 0.711914L11.3115 0.712891L11.4102 0.828125C11.5028 0.948168 11.5791 1.08303 11.6357 1.22852C11.7113 1.42255 11.75 1.63167 11.75 1.84277C11.75 2.05366 11.7112 2.2622 11.6357 2.45605C11.5791 2.60147 11.5028 2.73645 11.4102 2.85645L11.3115 2.97168L3.95215 10.8311L3.79199 11.002L3.95215 11.1729L11.3115 19.0312H11.3125C11.5894 19.3281 11.7471 19.7348 11.7471 20.1611C11.747 20.372 11.7079 20.5805 11.6328 20.7744C11.5577 20.9684 11.4487 21.1442 11.3115 21.291C11.0346 21.5874 10.6621 21.75 10.2783 21.75Z" fill="#4A3936" stroke="#EFECE4" strokeWidth="0.5"/>
    </svg>
  );
}

// Potato Card Expanded Page (with white "card" boundary, micro fixes)
function PotatoCardPage({
  onBack,
  type,
  setType,
  supplier,
  setSupplier,
  onShowBuy,
}: {
  onBack: () => void;
  type: string;
  setType: (val: string) => void;
  supplier: string;
  setSupplier: (val: string) => void;
  onShowBuy: () => void;
}) {
  const [count, setCount] = useState(3);
  const [veg, setVeg] = useState(true);
  // For dropdown portal rendering
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  return (
    <div
      style={{
        width: 1246,
        minHeight: 497 + 22 + 437,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        background: "transparent",
        zIndex: 9999,
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Potato Card Main Content */}
      <div
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 14,
          boxShadow:
            "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)",
          boxSizing: "border-box",
          padding: "28px 0 0 0",
          height: 497,
          position: "relative",
        }}
        className="flex flex-col"
      >
        {/* Top Bar: Back Arrow, Search, Dropdowns, Cart */}
        <div className="flex items-center" style={{ width: "100%", padding: "0 32px 0 24px", marginBottom: 18 }}>
          <span
            className="flex items-center mr-3 cursor-pointer"
            onClick={onBack}
            style={{ minWidth: 30, minHeight: 32, display: "flex" }}
          >
            <BackArrowIcon />
          </span>
          <span className="relative flex-1 max-w-[320px] mr-4">
            <Input
              placeholder="Search"
              className="pl-10 w-full h-[38px] rounded-[10px] bg-[#fff] border"
              style={{
                borderColor: figmaBorderColor,
                background: "#fff",
                fontSize: 20,
                color: figmaPlaceholderColor,
                fontFamily: "inherit",
                height: 38,
                fontWeight: 500,
              }}
              value="Potatoes"
              readOnly
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15.8 15.8M18 10.5C18 14.0899 14.866 17 10.5 17C6.13401 17 3 14.0899 3 10.5C3 6.91015 6.13401 4 10.5 4C14.866 4 18 6.91015 18 10.5Z"
                  stroke={figmaPlaceholderColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <div className="flex gap-2 ml-auto items-center" style={{ zIndex: 200 }}>
            <Select
              value={type}
              onValueChange={setType}
              open={dropdownOpen1}
              onOpenChange={setDropdownOpen1}
            >
              <SelectTrigger
                className="w-[220px] h-[38px] rounded-[10px] bg-[#fff] border font-normal justify-between pr-3"
                style={{
                  borderColor: figmaBorderColor,
                  background: "#fff",
                  fontSize: 16,
                  minWidth: 220,
                  minHeight: 38,
                  color: figmaPlaceholderColor,
                  zIndex: 1200,
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SelectValue placeholder="Type of Ingredient" />
              </SelectTrigger>
              <SelectContent
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  zIndex: 4000,
                  position: "absolute",
                  left: 0,
                }}
                className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              >
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="grains-seeds">Grains & Seeds</SelectItem>
                <SelectItem value="poultry">Poultry</SelectItem>
                <SelectItem value="raw-meat">Raw meat</SelectItem>
                <SelectItem value="in-house-ingredient">In-house Ingredient</SelectItem>
                <SelectItem value="nuts">Nuts</SelectItem>
                <SelectItem value="fungi">Fungi</SelectItem>
                <SelectItem value="kitchen-utilities">Kitchen utilities</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={supplier}
              onValueChange={setSupplier}
              open={dropdownOpen2}
              onOpenChange={setDropdownOpen2}
            >
              <SelectTrigger
                className="w-[220px] h-[38px] rounded-[10px] bg-[#fff] border font-normal justify-between pr-3"
                style={{
                  borderColor: figmaBorderColor,
                  background: "#fff",
                  fontSize: 16,
                  minWidth: 220,
                  minHeight: 38,
                  color: figmaPlaceholderColor,
                  zIndex: 1200,
                  lineHeight: "normal",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SelectValue placeholder="List of Suppliers" />
              </SelectTrigger>
              <SelectContent
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  zIndex: 4000,
                  position: "absolute",
                  left: 0,
                }}
                className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              >
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="grains-seeds">Grains & Seeds</SelectItem>
                <SelectItem value="poultry">Poultry</SelectItem>
                <SelectItem value="raw-meat">Raw meat</SelectItem>
                <SelectItem value="in-house-ingredient">In-house Ingredient</SelectItem>
                <SelectItem value="nuts">Nuts</SelectItem>
                <SelectItem value="fungi">Fungi</SelectItem>
                <SelectItem value="kitchen-utilities">Kitchen utilities</SelectItem>
              </SelectContent>
            </Select>
            <IconCircle onClick={onShowBuy}>
              <FigmaCartIcon />
            </IconCircle>
          </div>
        </div>
        {/* --- Potato Add to Cart Info Card --- */}
        <div
          style={{
            width: 741,
            height: 366,
            top: 96, // moved up by 20px, was 116
            left: 43, // moved right by 12px, was 31
            position: "absolute",
            borderRadius: 14,
            background: "#fff",
            border: "none",
            boxShadow:
              "0 6px 14px 0 rgba(185, 185, 185, 0.13), 0 2px 6px 0 rgba(185, 185, 185, 0.13)",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            padding: "0",
            margin: 0,
            zIndex: 2,
          }}
        >
          {/* Potato Main Info - left */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 36,
            alignItems: "flex-start",
            padding: "32px 0 0 32px",
            minHeight: 250,
            flex: "1 1 0",
          }}>
            {/* Image and cart */}
            <div style={{
              width: 352,
              height: 224,
              maxWidth: 352,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
              top: 0,
              left: 0,
              borderRadius: 6,
              borderWidth: 0.2,
              borderStyle: "solid",
              borderColor: "#ede7dc",
              background: "#fff",
              boxSizing: "border-box",
              boxShadow: "0 0 0.5px #ede7dc",
              padding: "0",
            }}>
              <img
                src="/potatoes.jpg"
                alt="Potatoes"
                style={{
                  width: 352,
                  height: 224,
                  objectFit: "contain",
                  borderRadius: 6,
                  border: `0.2px solid ${figmaBrownishColor}`,
                  background: "#fff",
                  marginBottom: 18,
                  marginTop: 0,
                  marginLeft: 0,
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = `https://placehold.co/352x224/${figmaBrownishColor.substring(
                    1
                  )}/ffffff?text=Potatoes`;
                }}
              />
              <Button
                variant="outline"
                className="font-semibold flex items-center justify-center h-8"
                style={{
                  background: figmaBrownishColor,
                  color: "#fff",
                  borderColor: "transparent",
                  fontSize: 18,
                  fontWeight: 500,
                  minHeight: 36,
                  borderRadius: 6,
                  boxShadow: "none",
                  width: 180,
                  margin: "14px 0 4px 0",
                  display: "block",
                  alignSelf: "flex-start",
                }}
                onClick={onShowBuy}
              >
                Add to Cart
              </Button>
              <div
                style={{
                  fontSize: "16px",
                  color: "#000",
                  marginTop: "-4px",
                  fontWeight: 400,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                  marginLeft: 0,
                }}
              >
                Delivery by{" "}
                <span style={{ color: figmaBrownishColor, fontWeight: 400 }}>
                  Sat, 15 Mar
                </span>
              </div>
            </div>
            {/* Details */}
            <div style={{
              flex: 1,
              minWidth: 280,
              marginTop: 7,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              marginLeft: 30,
            }}>
              <div
                className="font-medium text-lg mb-2"
                style={{ fontSize: 28, color: "#000", fontFamily: "Aleo, serif", fontWeight: 500, lineHeight: "32px" }}
              >
                Potatoes
              </div>
              <div
                className="text-black mb-2"
                style={{ fontSize: 22, fontWeight: 500 }}
              >
                ₹140/kg
              </div>
              <div className="mb-2" style={{ fontSize: 18, color: "#202224" }}>
                Category:{" "}
                <span style={{ color: figmaBrownishColor }}>Vegetable</span>
                <br />
                Sold By:{" "}
                <span style={{ color: figmaBrownishColor, fontWeight: 500 }}>
                  Mr Vinod
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span
                  tabIndex={0}
                  role="button"
                  aria-label={veg ? "Vegetarian" : "Non-Vegetarian"}
                  onClick={() => setVeg((v) => !v)}
                  style={{
                    display: "inline-block",
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    background: veg ? "#2ec76e" : "#e74c3c",
                    marginRight: 8,
                    cursor: "pointer",
                    border: "2px solid #ede7dc",
                    transition: "background 0.2s",
                  }}
                />
                <span className="text-black" style={{ fontSize: 15 }}>
                  {veg
                    ? "This is a Vegetarian product"
                    : "This is a Non-Vegetarian product"}
                </span>
              </div>
              {/* Add/Remove Counter */}
              <div
                className="flex items-center mt-3"
                style={{
                  border: `1.2px solid ${figmaBorderColor}`,
                  borderRadius: 8,
                  width: 170,
                  height: 40,
                  padding: "0 0 0 10px",
                  fontSize: 20,
                  fontWeight: 400,
                  background: "#fff",
                  gap: 0,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="ghost"
                  style={{
                    background: "transparent",
                    color: "#4A3936",
                    fontSize: 26,
                    fontWeight: 500,
                    minWidth: 28,
                    minHeight: 28,
                    borderRadius: 4,
                    padding: "0 8px",
                    boxShadow: "none",
                  }}
                  onClick={() => setCount(Math.max(1, count - 1))}
                >
                  −
                </Button>
                <span
                  style={{
                    flex: "1 1 0",
                    minWidth: 32,
                    textAlign: "center",
                    fontSize: 18,
                    color: "#202224",
                  }}
                >
                  {count}
                </span>
                <Button
                  variant="ghost"
                  style={{
                    background: "transparent",
                    color: "#4A3936",
                    fontSize: 24,
                    fontWeight: 500,
                    minWidth: 28,
                    minHeight: 28,
                    borderRadius: 4,
                    padding: "0 8px",
                    boxShadow: "none",
                    marginRight: 8,
                  }}
                  onClick={() => setCount(count + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          {/* Potato Right: Related Products - as a separate block, shifted up and inside potato block */}
          <div
            style={{
              width: 319,
              height: 366,
              minWidth: 260,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
              padding: "28px 23px 18px 23px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              position: "absolute",
              top: 1, // shifted up inside potato block
              right: -375, // so it visually overlaps "in" with the main potato block
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontFamily: "Aleo, serif",
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: 0,
                color: "#202224",
                marginBottom: 12,
                lineHeight: "24px",
              }}
            >
              Related to your search
            </div>
            <div
              className="grid grid-cols-2 gap-x-3 gap-y-3"
              style={{ width: "100%" }}
            >
              {productCards
                .filter((item) => item.name !== "Potatoes")
                .map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      borderRadius: 14,
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
                      padding: "8px 7px 7px 7px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 126,
                      height: 137,
                      border: `1px solid ${figmaBorderColor}`,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 52,
                        height: 52,
                        objectFit: "contain",
                        border: `1px solid ${figmaBrownishColor}`,
                        borderRadius: 6,
                        background: "#fff",
                        marginBottom: 6,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://placehold.co/52x52/${figmaBrownishColor.substring(
                          1
                        )}/ffffff?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                    <span
                      style={{
                        fontSize: 16,
                        color: "#202224",
                        fontWeight: 500,
                        marginTop: 4,
                        fontFamily: "Aleo, serif",
                        lineHeight: "16px",
                        textAlign: "center",
                      }}
                    >
                      {item.name.replace(/s$/, "")}
                    </span>
                    <span style={{ fontSize: 15, color: "#5c5c5c" }}>
                      {item.price}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Separate: 2nd block, "Items like this" with cards */}
      <div
        style={{
          width: 1246,
          minHeight: 437,
          maxHeight: 437,
          background: "#fff",
          borderRadius: 18,
          boxShadow:
            "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          padding: "38px 36px 0 36px",
        }}
      >
        <div
          style={{
            fontFamily: "Aleo, serif",
            fontWeight: 500,
            fontSize: 28,
            lineHeight: "32px",
            letterSpacing: 0,
            color: "#202224",
            marginBottom: 16,
          }}
        >
          Items like this
        </div>
        {/* Cards as per image, with names OUTSIDE the card */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 32px",
          }}
        >
          {itemsLikeThisCards.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: 202,
                height: 160,
                borderRadius: 14,
                background: "#fff",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
                border: `1px solid #ede7dc`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "18px 12px 0 12px",
                marginBottom: 18,
                position: "relative",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 120,
                  height: 80,
                  objectFit: "contain",
                  border: `1px solid ${figmaBorderColor}`,
                  borderRadius: 8,
                  background: "#fff",
                  display: "block",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = `https://placehold.co/120x80/${figmaBrownishColor.substring(
                    1
                  )}/ffffff?text=${encodeURIComponent(item.name)}`;
                }}
              />
              {/* Name completely outside the card, centered below */}
              <span
                style={{
                  fontFamily: "Aleo, serif",
                  fontWeight: 500,
                  fontSize: 18,
                  lineHeight: "20px",
                  letterSpacing: 0,
                  color: "#202224",
                  margin: 0,
                  textAlign: "center",
                  width: "100%",
                  marginTop: 18,
                  display: "block",
                }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PurchaseManagementTab() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showPotato, setShowPotato] = useState(false);
  const [showBuy, setShowBuy] = useState(false);

  // Vertical gap locked as per user image: 11px
  const verticalGap = 11;

  // At a time, only one page is visible: either main OR history OR potato card or buy page
if (showHistory) {
  return <PurchaseHistoryPage onBack={() => setShowHistory(false)} />;
}
if (showBuy) {
  return (
    <BuyPage
      onBackToPurchaseManagement={() => setShowBuy(false)}
      onPlaceOrder={() => {
        setShowBuy(false);
        setShowHistory(true);
      }}
    />
  );
}
if (showPotato) {
  return (
    <PotatoCardPage
      onBack={() => setShowPotato(false)}
      type={type}
      setType={setType}
      supplier={supplier}
      setSupplier={setSupplier}
      onShowBuy={() => {
        setShowPotato(false);
        setShowBuy(true);
      }}
    />
  );
}
  return (
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
      }}
    >
      {/* Top section: Search, Type Select, Supplier Select and Icons */}
      <div className="flex items-center mb-2 gap-2" style={{ width: "100%" }}>
        <span className="relative flex-1 max-w-[320px]">
          <Input
            placeholder="Search"
            className="pl-10 w-full h-[32px] rounded-[10px] bg-[#fff] border"
            style={{
              borderColor: figmaBorderColor,
              background: "#fff",
              fontSize: 16,
              color: figmaPlaceholderColor,
              fontFamily: "inherit",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {/* Search Icon as SVG for custom color */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15.8 15.8M18 10.5C18 14.0899 14.866 17 10.5 17C6.13401 17 3 14.0899 3 10.5C3 6.91015 6.13401 4 10.5 4C14.866 4 18 6.91015 18 10.5Z"
                stroke={figmaPlaceholderColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        <div className="flex gap-2 ml-auto items-center">
          {/* Type of Ingredient dropdown */}
          <Select value={type} onValueChange={setType}>
            <SelectTrigger
              className="w-[220px] h-[32px] rounded-[10px] bg-[#fff] border font-normal justify-between pr-3"
              style={{
                borderColor: figmaBorderColor,
                background: "#fff",
                fontSize: 16,
                minWidth: 220,
                minHeight: 32,
                color: figmaPlaceholderColor,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SelectValue placeholder="Type of Ingredient" />
            </SelectTrigger>
            <SelectContent
              className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                zIndex: 2000,
                position: "relative",
              }}
            >
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="grains-seeds">Grains & Seeds</SelectItem>
              <SelectItem value="poultry">Poultry</SelectItem>
              <SelectItem value="raw-meat">Raw meat</SelectItem>
              <SelectItem value="in-house-ingredient">In-house Ingredient</SelectItem>
              <SelectItem value="nuts">Nuts</SelectItem>
              <SelectItem value="fungi">Fungi</SelectItem>
              <SelectItem value="kitchen-utilities">Kitchen utilities</SelectItem>
            </SelectContent>
          </Select>
          {/* Supplier List Dropdown */}
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger
              className="w-[220px] h-[32px] rounded-[10px] bg-[#fff] border font-normal justify-between pr-3"
              style={{
                borderColor: figmaBorderColor,
                background: "#fff",
                fontSize: 16,
                minWidth: 220,
                minHeight: 32,
                color: figmaPlaceholderColor,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SelectValue placeholder="List of Suppliers" />
            </SelectTrigger>
            <SelectContent
              className="!border-[1px] !border-[#B39793] !bg-white !rounded-[4px] !shadow-[0_2px_8px_rgba(0,0,0,0.03)] !p-0"
              style={{
                borderColor: "#B39793",
                background: "#fff",
                zIndex: 2000,
                position: "relative",
              }}
            >
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="grains-seeds">Grains & Seeds</SelectItem>
              <SelectItem value="poultry">Poultry</SelectItem>
              <SelectItem value="raw-meat">Raw meat</SelectItem>
              <SelectItem value="in-house-ingredient">In-house Ingredient</SelectItem>
              <SelectItem value="nuts">Nuts</SelectItem>
              <SelectItem value="fungi">Fungi</SelectItem>
              <SelectItem value="kitchen-utilities">Kitchen utilities</SelectItem>
            </SelectContent>
          </Select>
          {/* Cart Icon */}
          <IconCircle onClick={() => setShowBuy(true)}>
            <FigmaCartIcon />
          </IconCircle>
          {/* Clock Icon - now clickable to open purchase history */}
          <IconCircle onClick={() => setShowHistory(true)}>
            <FigmaClockIcon />
          </IconCircle>
        </div>
      </div>
      {/* --- SEPARATION LINE BELOW THE SEARCH BAR --- */}
      <div
        style={{
          position: "relative",
          left: "-8px",
          width: "calc(100% + 16px)",
          height: "10px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
          marginTop: 2,
          marginBottom: 14,
        }}
      ></div>
      {/* --- END SEPARATION LINE --- */}
      <div className="flex-grow flex flex-col overflow-hidden px-2 pt-0">
        {/* Product Cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 overflow-y-auto"
          style={{ paddingRight: "0.2rem" }}
        >
          {productCards.map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-0 flex flex-col items-center shadow-sm relative overflow-hidden"
              style={{
                background: "#fff",
                width: 220,
                height: 260,
                borderRadius: "8px",
                boxShadow:
                  "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)",
                border: `1px solid #ede7dc`,
                cursor: item.name === "Potatoes" ? "pointer" : undefined,
              }}
              onClick={
                item.name === "Potatoes"
                  ? () => setShowPotato(true)
                  : undefined
              }
            >
              <div className="p-1.5 flex flex-col items-center w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded object-contain border"
                  style={{ border: `1px solid ${figmaBrownishColor}` }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = `https://placehold.co/96x96/${figmaBrownishColor.substring(
                      1
                    )}/ffffff?text=${encodeURIComponent(item.name)}`;
                  }}
                />
                <div
                  className="w-full flex flex-col items-start"
                  style={{ textAlign: "left" }}
                >
                  <div className="font-medium text-md mt-2 mb-1 text-black">
                    {item.name}
                  </div>
                  <div className="text-sm text-black" style={{ marginBottom: "2px" }}>
                    {item.price}
                  </div>
                  {/* Locked vertical gap */}
                  <div style={{ height: verticalGap }} />
                  <div
                    className="text-black"
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      marginBottom: 5,
                      marginTop: 0,
                    }}
                  >
                    Delivery by{" "}
                    <span style={{ color: figmaBrownishColor, fontSize: "14px", fontWeight: 400 }}>
                      {item.delivery}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center px-3"
                style={{
                  background: figmaLightBrownBackground,
                  fontSize: 14,
                  width: "100%",
                  color: "black",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 56,
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Button
                  variant="outline"
                  className="font-semibold flex items-center justify-center h-8"
                  style={{
                    background: figmaBrownishColor,
                    color: "#fff",
                    borderColor: "transparent",
                    fontSize: 16,
                    fontWeight: 500,
                    minHeight: 32,
                    borderRadius: 6,
                    boxShadow: "none",
                    width: 140,
                    margin: "0 auto",
                    display: "block",
                    marginTop: "-1px",
                  }}
                  onClick={() => setShowBuy(true)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ---- BOTTOM-RIGHT: "5 of 120 items" ---- */}
      <div
        style={{
          position: "absolute",
          right: -160,
          bottom: -40,
          width: "140px",
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
          zIndex: 10,
        }}
      >
        5 of 120 items
      </div>
      {/* ---- END BOTTOM-RIGHT ---- */}
    </div>
  );
}