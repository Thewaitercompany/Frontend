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

// --- COLORS FROM FIGMA ---
const figmaBrownishColor = "#C99E5A";
const figmaBorderColor = "#b39793";
const figmaPlaceholderColor = "#B39793";
const greyBoundaryColor = "#E0E0E0";
const black = "#000";

// --- DATA FOR "ITEMS LIKE THIS" CARDS (copied exactly from tagged code) ---
const itemsLikeThisCards = [
  { image: "/image2_tomato.jpg", name: "Tomato" },
  { image: "/image4_ladyfinger.jpg", name: "Ladyfinger" },
  { image: "/bellpeper.jpg", name: "Bell Pepper" },
  { image: "/cabbage.jpg", name: "Cabbage" },
  { image: "/onion.jpg", name: "Onion" },
  { image: "/image4_ladyfinger.jpg", name: "Ladyfinger" },
  { image: "/image2_tomato.jpg", name: "Tomato" },
  { image: "/onion.jpg", name: "Onion" },
  { image: "/bellpeper.jpg", name: "Bell Pepper" },
  { image: "/cabbage.jpg", name: "Cabbage" },
];

// --- ICONS ---
function FigmaCartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4007 17.3997C17.9664 17.3997 18.5091 17.6244 18.9091 18.0245C19.3092 18.4246 19.534 18.9672 19.534 19.533C19.534 20.0988 19.3092 20.6414 18.9091 21.0415C18.5091 21.4416 17.9664 21.6663 17.4007 21.6663C16.8349 21.6663 16.2922 21.4416 15.8922 21.0415C15.4921 20.6414 15.2673 20.0988 15.2673 19.533C15.2673 18.349 16.2167 17.3997 17.4007 17.3997ZM0.333984 0.333008H3.82198L4.82465 2.46634H20.6007C20.8836 2.46634 21.1549 2.57872 21.3549 2.77876C21.5549 2.9788 21.6673 3.25011 21.6673 3.53301C21.6673 3.71434 21.614 3.89567 21.5393 4.06634L17.7207 10.9677C17.358 11.6183 16.654 12.0663 15.854 12.0663H7.90732L6.94732 13.805L6.91532 13.933C6.91532 14.0037 6.94341 14.0716 6.99342 14.1216C7.04343 14.1716 7.11126 14.1997 7.18198 14.1997H19.534V16.333H6.73398C6.16819 16.333 5.62557 16.1082 5.22549 15.7082C4.82541 15.3081 4.60065 14.7655 4.60065 14.1997C4.60065 13.8263 4.69665 13.4743 4.85665 13.1757L6.30732 10.5623L2.46732 2.46634H0.333984V0.333008ZM6.73398 17.3997C7.29978 17.3997 7.8424 17.6244 8.24248 18.0245C8.64256 18.4246 8.86732 18.9672 8.86732 19.533C8.86732 20.0988 8.64256 20.6414 8.24248 21.0415C7.8424 21.4416 7.29978 21.6663 6.73398 21.6663C6.16819 21.6663 5.62557 21.4416 5.22549 21.0415C4.82541 20.6414 4.60065 20.0988 4.60065 19.533C4.60065 18.349 5.54998 17.3997 6.73398 17.3997ZM16.334 9.93301L19.2993 4.59967H5.81665L8.33398 9.93301H16.334Z" fill="#4B3937"/>
    </svg>
  );
}

function IconCircle({ children, onClick }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <span
      tabIndex={0}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#F0EDE5",
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

// --- GO BACK BUTTON SVG ---
function GoBackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: "block"}}>
      <path d="M10.2783 21.75C10.0882 21.75 9.89937 21.7101 9.72266 21.6318C9.54574 21.5534 9.38327 21.4378 9.24609 21.291L0.688477 12.1318V12.1309C0.550624 11.9845 0.439777 11.8093 0.364258 11.6152C0.288835 11.4214 0.250048 11.2128 0.25 11.002C0.25 10.7909 0.288745 10.5817 0.364258 10.3877C0.420883 10.2422 0.49717 10.1073 0.589844 9.9873L0.688477 9.87207L9.24609 0.712891L9.24707 0.711914C9.3838 0.564372 9.54575 0.448027 9.72266 0.369141C9.89932 0.290418 10.0881 0.250043 10.2783 0.25C10.4688 0.25 10.6581 0.290287 10.835 0.369141C11.0119 0.448031 11.1738 0.56436 11.3105 0.711914L11.3115 0.712891L11.4102 0.828125C11.5028 0.948168 11.5791 1.08303 11.6357 1.22852C11.7113 1.42255 11.75 1.63167 11.75 1.84277C11.75 2.05366 11.7112 2.2622 11.6357 2.45605C11.5791 2.60147 11.5028 2.73645 11.4102 2.85645L11.3115 2.97168L3.95215 10.8311L3.79199 11.002L3.95215 11.1729L11.3115 19.0312H11.3125C11.5894 19.3281 11.7471 19.7348 11.7471 20.1611C11.747 20.372 11.7079 20.5805 11.6328 20.7744C11.5577 20.9684 11.4487 21.1442 11.3115 21.291C11.0346 21.5874 10.6621 21.75 10.2783 21.75Z" fill="#4A3936" stroke="#EFECE4" strokeWidth="0.5"/>
    </svg>
  );
}

// SVG for custom checkbox box
function CustomCheckboxBox() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" stroke="#4D3E3B"/>
    </svg>
  );
}
function CustomCheckboxTick() {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" style={{ position: "absolute", left: 6, top: 1 }} xmlns="http://www.w3.org/2000/svg">
      <path d="M1 8.5C1 8.5 2.5 8.5 4.5 12C4.5 12 10.059 2.833 15 1" stroke="#C99E5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

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
const paymentMethods = [
  "UPI",
  "Credit/Debit Card",
  "Cash on Delivery",
];

type BuyPageProps = {
  onBackToPurchaseManagement?: () => void;
  onPlaceOrder?: () => void;
};

function DeliveryPaymentPage({
  count,
  pricePerKg,
  onBack,
  onPlaceOrder,
  search,
  setSearch,
  type,
  setType,
  supplier,
  setSupplier,
}: {
  count: number;
  pricePerKg: number;
  onBack?: () => void;
  onPlaceOrder?: () => void;
  search: string;
  setSearch: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  supplier: string;
  setSupplier: (v: string) => void;
}) {
  const [qty, setQty] = useState(count);
  const subtotal = qty * pricePerKg;

  // Selection state - ensure independent selection for days, times, payment methods
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  // --- Custom shadow for "vanishing top" effect ---
  const boundaryShadow =
    "0 10px 32px 0 rgba(160,160,160,0.13), 0 2px 10px 0 rgba(160,160,160,0.10), 0px -34px 40px -19px rgba(160,160,160,0)";

  // HEADER - full replica, with real back button
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {/* HEADER */}
      <div className="flex items-center mb-2 gap-2" style={{ width: "100%", padding: 10, background: "#fff", borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
        {/* Go Back Button */}
        <span
          style={{
            marginRight: 10,
            marginLeft: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            minWidth: 36,
          }}
          onClick={onBack}
        >
          <GoBackIcon />
        </span>
        <span className="relative flex-1 max-w-[320px]" style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search"
            className="pl-10 w-full h-[32px] rounded-[10px] bg-[#fff] border"
            style={{
              borderColor: figmaBorderColor,
              background: "#fff",
              fontSize: 16,
              color: figmaPlaceholderColor,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div className="flex gap-2 ml-auto items-center">
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
          <IconCircle>
            <FigmaCartIcon />
          </IconCircle>
        </div>
      </div>
      {/* END HEADER */}

      <div style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "stretch",
        background: "#fff",
        gap: 40,
        padding: "18px 32px 32px 32px",
      }}>
        {/* LEFT: Delivery/Payment Info */}
        <div
          style={{
            flex: 1.3,
            background: "#fff",
            border: `1.7px solid ${greyBoundaryColor}`,
            borderRadius: 14,
            boxShadow: boundaryShadow,
            padding: "32px 36px 36px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 30,
            minHeight: 420,
            maxWidth: 900,
            borderTop: "none"
          }}
        >
          <div style={{ marginBottom: 6 }}>
            <div style={{
              fontFamily: "Aleo",
              fontWeight: 500,
              fontSize: 22,
              lineHeight: "20px",
              letterSpacing: 0,
              color: black,
              marginBottom: 24,
            }}>
              Delivery Details
            </div>
            <div style={{
              fontFamily: "Aleo",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "100%",
              color: black,
              marginBottom: 14,
            }}>
              Select a delivery day
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              {deliveryDays.map((day, idx) => (
                <div
                  key={day}
                  onClick={() =>
                    setSelectedDay(selectedDay === idx ? null : idx)
                  }
                  style={{
                    fontFamily: "Aleo",
                    fontWeight: 400,
                    fontSize: 16,
                    color: black,
                    background: selectedDay === idx ? figmaBrownishColor : "#fff",
                    border: `1.2px solid ${figmaBrownishColor}`,
                    borderRadius: 8,
                    minWidth: 140,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    boxShadow: selectedDay === idx ? "0 2px 8px rgba(201, 158, 90, 0.11)" : undefined,
                    outline: "none",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            <div style={{
              fontFamily: "Aleo",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "100%",
              color: black,
              marginBottom: 14,
            }}>
              Select a delivery time
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 0 }}>
              {deliveryTimes.map((t, idx) => (
                <div
                  key={t}
                  onClick={() =>
                    setSelectedTime(selectedTime === idx ? null : idx)
                  }
                  style={{
                    fontFamily: "Aleo",
                    fontWeight: 400,
                    fontSize: 16,
                    color: black,
                    background: selectedTime === idx ? figmaBrownishColor : "#fff",
                    border: `1.2px solid ${figmaBrownishColor}`,
                    borderRadius: 8,
                    minWidth: 140,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    boxShadow: selectedTime === idx ? "0 2px 8px rgba(201, 158, 90, 0.11)" : undefined,
                    outline: "none",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          {/* Payment Details */}
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                fontFamily: "Aleo",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: "20px",
                color: black,
                marginBottom: 16,
              }}
            >
              Payment Details
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {paymentMethods.map((p, idx) => (
                <div
                  key={p}
                  onClick={() =>
                    setSelectedPayment(selectedPayment === idx ? null : idx)
                  }
                  style={{
                    fontFamily: "Aleo",
                    fontWeight: 400,
                    fontSize: 17,
                    color: black,
                    background: selectedPayment === idx ? figmaBrownishColor : "#fff",
                    border: `1.2px solid ${figmaBrownishColor}`,
                    borderRadius: 8,
                    width: "98%",
                    minHeight: 40,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: 18,
                    cursor: "pointer",
                    transition: "background 0.3s",
                    boxShadow: selectedPayment === idx ? "0 2px 8px rgba(201, 158, 90, 0.11)" : undefined,
                    outline: "none",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT: Place Order Card Boundary */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: `1.7px solid ${greyBoundaryColor}`,
            borderRadius: 14,
            boxShadow: boundaryShadow,
            padding: "32px 32px 36px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 310,
            maxWidth: 370,
            minHeight: 420,
            justifyContent: "flex-start",
            borderTop: "none"
          }}
        >
          <div
            style={{
              width: 137,
              height: 131,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1.2px solid ${figmaBrownishColor}`,
              borderRadius: 8,
              background: "#fff",
              marginBottom: 21,
            }}
          >
            <img
              src="/potatoes.jpg"
              alt="Potatoes"
              style={{
                width: 120,
                height: 90,
                objectFit: "contain",
                borderRadius: 8,
                background: "#fff",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = `https://placehold.co/120x90/${figmaBrownishColor.substring(1)}/ffffff?text=Potatoes`;
              }}
            />
          </div>
          <div style={{
            fontFamily: "Aleo",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: "20px",
            letterSpacing: 0,
            color: black,
            marginBottom: 6,
            textAlign: "left",
            alignSelf: "stretch",
          }}>
            Potatoes
          </div>
          <div
            style={{
              fontFamily: "Aleo",
              fontWeight: 400,
              fontSize: 16,
              color: black,
              marginBottom: 8,
              textAlign: "left",
              alignSelf: "stretch",
            }}
          >
            ₹{pricePerKg}/kg
          </div>
          <div
            style={{
              fontFamily: "Aleo",
              fontWeight: 400,
              fontSize: 16,
              color: black,
              marginBottom: 6,
              textAlign: "left",
              alignSelf: "stretch",
            }}
          >
            Category:{" "}
            <span style={{ color: figmaBrownishColor }}>Vegetable</span>
            <br />
            Sold By:{" "}
            <span style={{ color: figmaBrownishColor, fontWeight: 500 }}>
              Mr Vinod
            </span>
          </div>
          {/* Veg tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              fontFamily: "Aleo",
              fontWeight: 400,
              fontSize: 13,
              color: black,
              alignSelf: "stretch",
            }}
          >
            <span style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "#3dc46a",
              marginRight: 6,
            }} />
            This is a Vegetarian product
          </div>
          {/* Counter */}
          <div
            className="flex items-center"
            style={{
              border: `1.2px solid ${figmaBrownishColor}`,
              borderRadius: 8,
              width: 170,
              height: 40,
              padding: "0 0 0 10px",
              fontSize: 20,
              fontWeight: 400,
              background: "#fff",
              gap: 0,
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 14,
              alignSelf: "flex-start",
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
              onClick={() => setQty(Math.max(1, qty - 1))}
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
              {qty}
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
              onClick={() => setQty(qty + 1)}
            >
              +
            </Button>
          </div>
          {/* Total */}
          <div
            style={{
              fontFamily: "Aleo",
              fontWeight: 500,
              fontSize: 22,
              color: black,
              marginBottom: 8,
              alignSelf: "flex-start",
            }}
          >
            Total amount
          </div>
          <div
            style={{
              fontFamily: "Aleo",
              fontWeight: 500,
              fontSize: 22,
              color: black,
              marginBottom: 18,
              alignSelf: "flex-start",
            }}
          >
            ₹{subtotal.toLocaleString()}
          </div>
          <Button
            variant="outline"
            className="font-semibold flex items-center justify-center h-8"
            style={{
              background: figmaBrownishColor,
              color: "#fff",
              borderColor: "transparent",
              fontSize: 20,
              fontWeight: 500,
              minHeight: 44,
              borderRadius: 8,
              boxShadow: "none",
              width: "100%",
              margin: "0 0 0 0",
              display: "block",
            }}
            onClick={onPlaceOrder}
          >
            Place your order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BuyPage({
  onBackToPurchaseManagement,
  onPlaceOrder,
}: BuyPageProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [count, setCount] = useState(10);
  const [checked, setChecked] = useState(true);

  const pricePerKg = 140;
  const subtotal = count * pricePerKg;

  const MAIN_WIDTH = 1246;
  const INNER_WIDTH = MAIN_WIDTH - 30;

  // Page Switching: "cart" | "delivery"
  const [page, setPage] = useState<"cart" | "delivery">("cart");

  function Header({ showBack, onBackClick }: { showBack?: boolean, onBackClick?: () => void }) {
    return (
      <div className="flex items-center mb-2 gap-2" style={{ width: "100%", padding: 10, background: "#fff", borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
        {/* Go Back Button */}
        <span
          style={{
            marginRight: 10,
            marginLeft: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            minWidth: 36,
          }}
          onClick={onBackClick}
        >
          {showBack && <GoBackIcon />}
        </span>
        <span className="relative flex-1 max-w-[320px]" style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search"
            className="pl-10 w-full h-[32px] rounded-[10px] bg-[#fff] border"
            style={{
              borderColor: figmaBorderColor,
              background: "#fff",
              fontSize: 16,
              color: figmaPlaceholderColor,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div className="flex gap-2 ml-auto items-center">
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
          <IconCircle>
            <FigmaCartIcon />
          </IconCircle>
        </div>
      </div>
    );
  }

  // Navigation handlers
  const handleCartBack = () => {
    if (onBackToPurchaseManagement) {
      onBackToPurchaseManagement();
    }
  };
  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder();
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: MAIN_WIDTH,
        height: 411,
        minHeight: 401,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
        zIndex: 1,
      }}
    >
      {page === "cart" && (
        <>
          <Header showBack onBackClick={handleCartBack} />
          {/* Shopping Cart Main Block */}
          <div
            style={{
              width: INNER_WIDTH,
              minHeight: 257,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: "0 0 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              marginTop: 2,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "Aleo, serif",
                fontWeight: 700,
                fontSize: 28,
                lineHeight: "32px",
                color: "#202224",
                padding: "32px 0 0 38px",
              }}
            >
              Shopping Cart
            </div>
            {/* Cart item (separate block, not touching subtotal block) */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "20px 32px 0 38px",
                width: "100%",
                position: "relative",
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                marginTop: 8,
                marginBottom: 0,
                gap: 0,
              }}
            >
              {/* Checkbox */}
              <span
                tabIndex={0}
                style={{
                  marginTop: 30,
                  marginRight: 12,
                  width: 22,
                  height: 22,
                  position: "relative",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onClick={() => setChecked((v) => !v)}
              >
                <CustomCheckboxBox />
                {checked && <CustomCheckboxTick />}
              </span>
              {/* Product image and info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 24,
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: 162,
                    height: 120,
                    border: `1.2px solid ${figmaBrownishColor}`,
                    borderRadius: 8,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <img
                    src="/potatoes.jpg"
                    alt="Potatoes"
                    style={{
                      width: 140,
                      height: 100,
                      objectFit: "contain",
                      borderRadius: 8,
                      background: "#fff",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = `https://placehold.co/140x100/${figmaBrownishColor.substring(1)}/ffffff?text=Potatoes`;
                    }}
                  />
                </div>
                {/* Info */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6,
                    minWidth: 260,
                    width: 260,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Aleo, serif",
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: "26px",
                      color: "#202224",
                      marginBottom: 3,
                    }}
                  >
                    Potatoes
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: "#000" }}>
                    ₹140/kg
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: "#202224",
                      marginBottom: 2,
                    }}
                  >
                    Category:{" "}
                    <span style={{ color: figmaBrownishColor }}>Vegetable</span>
                    <br />
                    Sold By:{" "}
                    <span style={{ color: figmaBrownishColor, fontWeight: 500 }}>
                      Mr Vinod
                    </span>
                  </div>
                  {/* Add/Remove Counter */}
                  <div
                    className="flex items-center"
                    style={{
                      border: `1.2px solid ${figmaBrownishColor}`,
                      borderRadius: 8,
                      width: 170,
                      height: 40,
                      padding: "0 0 0 10px",
                      fontSize: 20,
                      fontWeight: 400,
                      background: "#fff",
                      gap: 0,
                      justifyContent: "space-between",
                      marginTop: 8,
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
              {/* Subtotal price */}
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: 28,
                  fontWeight: 500,
                  color: "#000",
                  fontFamily: "Aleo, serif",
                  marginTop: -20,
                  minWidth: 110,
                  textAlign: "right",
                }}
              >
                ₹{subtotal.toLocaleString()}
              </div>
            </div>
          </div>
          {/* Subtotal and Buy Now */}
          <div
            style={{
              width: INNER_WIDTH,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 38px 18px 38px",
            }}
          >
            <div
              style={{
                fontFamily: "Aleo, serif",
                fontWeight: 700,
                fontSize: 26,
                color: "#202224",
                letterSpacing: 0,
                marginLeft: 0,
              }}
            >
              Subtotal (1)
              <span style={{ fontWeight: 500, fontSize: 26, marginLeft: 10 }}>
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            <Button
              variant="outline"
              className="font-semibold flex items-center justify-center h-8"
              style={{
                background: figmaBrownishColor,
                color: "#fff",
                borderColor: "transparent",
                fontSize: 22,
                fontWeight: 500,
                minHeight: 44,
                borderRadius: 8,
                boxShadow: "none",
                width: 180,
                margin: "0 0 0 24px",
                display: "block",
              }}
              onClick={() => setPage("delivery")}
            >
              Buy Now
            </Button>
          </div>
          {/* --- "Items like this" block from tagged code, EXACT replica --- */}
          <div
            style={{
              width: 1246,
              minHeight: 457,
              maxHeight: 457,
              background: "#fff",
              borderRadius: 18,
              boxShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              padding: "30px 36px 0 36px",
              marginTop: 32,
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
                      (e.target as HTMLImageElement).src = `https://placehold.co/120x80/${figmaBrownishColor.substring(1)}/ffffff?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
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
        </>
      )}
      {page === "delivery" && (
        <DeliveryPaymentPage
          count={count}
          pricePerKg={pricePerKg}
          onBack={() => setPage("cart")}
          onPlaceOrder={handlePlaceOrder}
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          supplier={supplier}
          setSupplier={setSupplier}
        />
      )}
    </div>
  );
}