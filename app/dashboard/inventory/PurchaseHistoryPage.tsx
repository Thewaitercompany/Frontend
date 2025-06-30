import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- COLORS FROM FIGMA ---
const figmaBrownishColor = "#C99E5A";
const figmaBorderColor = "#b39793";
const figmaPlaceholderColor = "#B39793";
const insideBoxContentColor = "#000000";
const iconCircleBackgroundColor = "#F0EDE5";
const clockIconFillColor = "#4B3937";

// --- VECTOR FOR LEFT OF SEARCH BAR (BACK ARROW) ---
function GoBackVector({ onClick }: { onClick: () => void }) {
  // This matches the back arrow style from your SusWastagePage.tsx
  return (
    <button
      aria-label="back"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        padding: 0,
        marginRight: 12,
        marginLeft: 0,
        marginTop: 0,
        cursor: "pointer",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      type="button"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M17.5 7L11.5 14L17.5 21" stroke="#4A3936" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// --- PLUS BUTTON ---
function PlusButton({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label="add"
      className="flex items-center justify-center p-0"
      style={{
        width: "48px",
        height: "48px",
        border: "none",
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isActive ? "#F0EDE5" : "#fff",
        transition: "background 0.2s",
      }}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <circle cx="33" cy="33" r="31" stroke="#B39793" strokeWidth="2.5" fill={isActive ? "#F0EDE5" : "white"} />
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
              fill={isActive ? "#4B3937" : "#B39793"}
            />
          </svg>
        </g>
      </svg>
    </button>
  );
}

// --- PENCIL BUTTON (FIXED FOR EDIT PAGE) ---
function PencilButton({ onClick, isActive, fixedCircle }: { onClick: () => void; isActive: boolean; fixedCircle?: boolean }) {
  // fixedCircle: if true, use the correct matching circle background like plus/clock
  return (
    <button
      onClick={onClick}
      aria-label="edit"
      className="flex items-center justify-center p-0"
      style={{
        width: "48px",
        height: "48px",
        border: "none",
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isActive || fixedCircle ? "#F0EDE5" : "#fff",
        boxShadow: fixedCircle ? "0 1px 4px rgba(0,0,0,0.04)" : undefined,
        borderColor: fixedCircle ? "#B39793" : undefined,
        borderWidth: fixedCircle ? 2 : undefined,
        borderStyle: fixedCircle ? "solid" : undefined,
        transition: "background 0.2s",
      }}
    >
      {/* Removed the inner circle. Only the Pencil icon remains. */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <g>
          {/* Pencil icon, positioning adjusted for perfect center */}
          <Pencil
            className="h-5 w-5" // h-5 w-5 means 20x20px
            style={{
              color: isActive || fixedCircle ? "#4B3937" : "#B39793",
              // Adjust marginLeft and marginTop to roughly center the icon if it's not perfectly centered by default
              marginLeft: 2,
              marginTop: 2,
              width: 20,
              height: 20,
            }}
          />
        </g>
      </svg>
    </button>
  );
}
function IconCircle({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <span
      tabIndex={0}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-figmaBrownishColor"
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: iconCircleBackgroundColor,
        border: `2px solid ${figmaBorderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        userSelect: "none",
        marginRight: "16px",
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.997 11.978V12.001C23.997 18.628 18.625 24 11.998 24C9.24751 24.0041 6.57979 23.0593 4.445 21.325L4.467 21.343C4.34039 21.2406 4.23675 21.1127 4.16283 20.9676C4.08892 20.8225 4.04638 20.6635 4.03798 20.5009C4.02959 20.3382 4.05552 20.1757 4.11411 20.0237C4.17269 19.8718 4.2626 19.7339 4.378 19.619L4.923 19.074C5.12384 18.8706 5.3927 18.7485 5.67801 18.7312C5.96333 18.7138 6.245 18.8024 6.469 18.98L6.467 18.978C8.03851 20.2286 9.98864 20.9074 11.997 20.903C13.4497 20.903 14.8803 20.5475 16.1641 19.8676C17.4479 19.1876 18.5457 18.2039 19.3619 17.0021C20.1781 15.8004 20.6878 14.4172 20.8466 12.9731C21.0054 11.5291 20.8084 10.0682 20.2729 8.71783C19.7373 7.36744 18.8795 6.16862 17.7741 5.22596C16.6688 4.2833 15.3496 3.62543 13.9316 3.30975C12.5136 2.99408 11.0399 3.03018 9.63908 3.41492C8.23824 3.79966 6.95284 4.52135 5.895 5.51701L5.9 5.51301L8.356 7.96901C8.46418 8.07731 8.53782 8.21527 8.56761 8.36542C8.59739 8.51558 8.58198 8.67119 8.52332 8.81259C8.46467 8.95398 8.36540 9.07481 8.23807 9.15979C8.11075 9.24477 7.96108 9.29009 7.808 9.29001H0.774C0.568722 9.29001 0.371853 9.20846 0.226699 9.06331C0.0815462 8.91816 0 8.72129 0 8.51601V1.48201C0.000395605 1.32914 0.0459915 1.17981 0.131051 1.05279C0.216111 0.925769 0.336836 0.826743 0.478037 0.768168C0.619238 0.709592 0.774608 0.694084 0.924602 0.723593C1.0746 0.753102 1.21251 0.826312 1.321 0.934011L3.71 3.32301C5.94032 1.18666 8.91059 -0.00409789 11.999 1.05963e-05C18.618 1.05963e-05 23.986 5.36001 23.998 11.976V11.977L23.997 11.978ZM15.244 15.789L15.719 15.178C15.9081 14.9353 15.9931 14.6275 15.9552 14.3222C15.9173 14.0169 15.7597 13.7391 15.517 13.55L15.514 13.548L13.545 12.016V6.96801C13.545 6.32701 13.025 5.80601 12.383 5.80601H11.609C10.968 5.80601 10.447 6.32601 10.447 6.96801V13.528L13.612 15.989C13.7319 16.0832 13.8692 16.1529 14.0161 16.194C14.1629 16.2351 14.3165 16.2468 14.4678 16.2285C14.6192 16.2102 14.7655 16.1622 14.8984 16.0873C15.0312 16.0124 15.148 15.9121 15.242 15.792L15.244 15.789Z" fill={clockIconFillColor}/>
    </svg>
  );
}

// --- GRAPH BUTTON ---
function GraphButton({ onClick, isActive }: { onClick: () => void; isActive: boolean }) {
  const color = isActive ? "#4B3937" : "#B39793";
  return (
    <button
      onClick={onClick}
      aria-label="chart"
      className="flex items-center justify-center bg-white p-0"
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: isActive ? 'brightness(0.9)' : 'none',
        transition: 'filter 0.2s ease-in-out',
        marginRight: "16px"
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
        }}
      >
        <circle cx="33" cy="33" r="31" stroke={color} strokeWidth="2" fill="white" />
        <g transform="translate(22,22)">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.03125 0.5C1.1658 0.5 1.29917 0.555055 1.40039 0.660156C1.50222 0.76595 1.56246 0.913754 1.5625 1.07129V18.3574H20.9688C21.1033 18.3574 21.2367 18.4124 21.3379 18.5176C21.4397 18.6234 21.5 18.7711 21.5 18.9287C21.5 19.0862 21.4397 19.234 21.3379 19.3398C21.2367 19.4449 21.1033 19.5 20.9688 19.5H1.03125C0.896703 19.5 0.763327 19.4449 0.662109 19.3398C0.560283 19.2341 0.500036 19.0862 0.5 18.9287V1.07129C0.500036 0.913754 0.560283 0.76595 0.662109 0.660156C0.737895 0.581462 0.83191 0.531299 0.930664 0.510742L1.03125 0.5ZM20.9521 3.38379C21.0509 3.38556 21.149 3.41647 21.2334 3.47559L21.3125 3.54395C21.412 3.64731 21.472 3.79049 21.4746 3.94434C21.4772 4.09736 21.4215 4.24147 21.3262 4.34863L14.1182 11.8389C14.017 11.9437 13.8843 11.999 13.75 11.999C13.6155 11.999 13.4821 11.9439 13.3809 11.8389H13.3818L9.98535 8.31055L9.625 7.93652L9.26465 8.31055L5.53711 12.1836C5.43528 12.2823 5.30433 12.3333 5.17285 12.3311C5.04124 12.3287 4.91049 12.2727 4.81152 12.1699C4.71242 12.0666 4.65294 11.9231 4.65039 11.7695C4.64790 11.6164 4.70241 11.4714 4.79785 11.3643L9.25684 6.73242L9.25586 6.73145C9.35701 6.62671 9.49069 6.57227 9.625 6.57227C9.75931 6.57227 9.89201 6.62767 9.99316 6.73242L13.3896 10.2607L13.75 10.6357L14.1104 10.2607L20.5928 3.52539C20.6939 3.4298 20.8228 3.38153 20.9521 3.38379Z"
              fill={color}
              stroke={color}
            />
          </svg>
        </g>
      </svg>
    </button>
  );
}

// --- DATA ---
const purchaseData = [
  {
    id: 1,
    ingredient: "Potatoes",
    costPerUnit: "₹140/kg",
    category: "Vegetable",
    unitPurchased: "10kg",
    totalCost: "₹1,400",
    invoiceDetails: "00001",
    supplierName: "Mr Raghu",
    status: "Delivered on: 13/03 5:00pm",
  },
  {
    id: 2,
    ingredient: "Tomatoes",
    costPerUnit: "₹120/kg",
    category: "Vegetable",
    unitPurchased: "15kg",
    totalCost: "₹1,800",
    invoiceDetails: "00002",
    supplierName: "Mr Raghu",
    status: "Delivered on: 11/03 4:00pm",
  },
  {
    id: 3,
    ingredient: "Ladyfinger",
    costPerUnit: "₹70/kg",
    category: "Vegetable",
    unitPurchased: "5kg",
    totalCost: "₹450",
    invoiceDetails: "00003",
    supplierName: "Mr Anmol",
    status: "Delivered on: 11/03 1:00pm",
  },
  {
    id: 4,
    ingredient: "Onions",
    costPerUnit: "₹170/kg",
    category: "Vegetable",
    unitPurchased: "10kg",
    totalCost: "₹1700",
    invoiceDetails: "00004",
    supplierName: "Mr Anmol",
    status: "Delivered on: 09/03 4:00pm",
  },
];

// --- ADD PURCHASE PAGE COMPONENT ---
function AddPurchasePage({ onBack }: { onBack: () => void }) {
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [unitPurchased, setUnitPurchased] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [plusActive, setPlusActive] = useState(true);

const fieldConfigs = [
  {
    label: "Ingredient",
    box: { width: 84, height: 68 },
    input: (
      <input
        style={{
          border: `1px solid ${figmaBrownishColor}`,
          borderRadius: 8,
          width: 84,
          height: 68,
          padding: "0 8px 24px 8px",
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: "15px",
          color: insideBoxContentColor,
          textAlign: "center",
          background: "#fff",
          outline: "none",
          margin: 0,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        placeholder="Add ingredient name"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
    ),
    align: "center",
  },
  {
    label: "Category",
    box: { width: 150, height: 32 },
    input: (
      <select
        className="add-purchase-select"
        style={{
          width: 150,
          height: 32,
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: "14px",
          color: insideBoxContentColor,
          textAlign: "left",
          background: "#fff",
          outline: "none",
          margin: 0,
          boxSizing: "border-box",
          paddingLeft: 12,
          paddingRight: 28,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234D3E3B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "16px 16px",
        }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" style={{ color: insideBoxContentColor }}>
          Type of Ingredient
        </option>
        <option style={{ color: insideBoxContentColor }} value="Vegetable">
          Vegetable
        </option>
        <option style={{ color: insideBoxContentColor }} value="Fruit">
          Fruit
        </option>
        <option style={{ color: insideBoxContentColor }} value="Spice">
          Spice
        </option>
        <option style={{ color: insideBoxContentColor }} value="Dairy">
          Dairy
        </option>
      </select>
    ),
    align: "left",
  },
  ...[
    { label: "Unit\nPurchased", width: 110, value: unitPurchased, onChange: setUnitPurchased, placeholder: "Add total purchased unit" },
    { label: "Total\nCost", width: 96, value: totalCost, onChange: setTotalCost, placeholder: "Enter total cost" },
    { label: "Invoice\nno.", width: 96, value: invoiceNo, onChange: setInvoiceNo, placeholder: "Enter invoice number" },
    { label: "Date/\nTime", width: 108, value: dateTime, onChange: setDateTime, placeholder: "Enter date and time", type: "text" },
    { label: "Supplier\nName", width: 108, value: supplierName, onChange: setSupplierName, placeholder: "Enter supplier name" },
  ].map(({ label, width, value, onChange, placeholder, type = "text" }) => ({
    label,
    box: { width, height: 68 },
    input: (
      <input
        type={type}
        style={{
          border: `1px solid ${figmaBrownishColor}`,
          borderRadius: 8,
          width,
          height: 68,
          padding: "0 8px 31px 8px",
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: "15px",
          color: insideBoxContentColor,
          textAlign: "center",
          background: "#fff",
          outline: "none",
          margin: 0,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
    align: "center",
  })),
  {
    label: "Upload\nInvoice",
    box: { width: 108, height: 68 },
    input: (
      <label
        style={{
          border: `1px solid ${figmaBrownishColor}`,
          borderRadius: 8,
          width: 108,
          height: 68,
          fontFamily: "Aleo",
          fontWeight: 400,
          fontSize: "15px",
          color: insideBoxContentColor,
          textAlign: "center",
          background: invoiceFile ? "#F5F5F5" : "#fff",
          outline: "none",
          margin: 0,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) setInvoiceFile(e.target.files[0]);
          }}
        />
        <span
          style={{
            color: insideBoxContentColor,
            width: "100%",
            textAlign: "center",
            whiteSpace: "pre-line",
            fontSize: "14px",
          }}
        >
          {invoiceFile ? invoiceFile.name : "Upload Invoice"}
        </span>
      </label>
    ),
    align: "center",
  },
];

  const headingStyle: React.CSSProperties = {
    fontFamily: "Aleo",
    fontWeight: 500,
    fontSize: "22px",
    lineHeight: "20px",
    letterSpacing: "0px",
    textAlign: "center",
    color: "#202224",
    paddingTop: "16px",
    paddingBottom: "16px",
    minWidth: 0,
    flex: 1,
    whiteSpace: "pre-line",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // --- Custom CSS for select dropdown border and placeholder ---
  const customDropdownStyle = `
  .add-purchase-select {
    border: 1px solid #C99E5A !important;
    border-radius: 8px;
    color: #000 !important;
    background: #fff !important;
    text-align: left;
    box-sizing: border-box;
    padding-left: 12px !important;
    padding-right: 28px !important;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234D3E3B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
  }
  .add-purchase-select:focus {
    outline: none;
  }
  .add-purchase-select option {
    color: #000 !important;
    background: #fff !important;
  }
  input::placeholder {
    color: #000 !important;
    opacity: 1 !important;
    white-space: pre-line !important;
  }
  select:invalid {
    color: #000 !important;
  }
  input::-webkit-input-placeholder { color: #000 !important; white-space: pre-line !important; }
  input:-moz-placeholder { color: #000 !important; white-space: pre-line !important; }
  input::-moz-placeholder { color: #000 !important; white-space: pre-line !important; }
  input:-ms-input-placeholder { color: #000 !important; white-space: pre-line !important; }
  `;

  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1246,
        height: 340,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div className="flex items-center" style={{ padding: "18px 18px 0 18px", minHeight: 60 }}>
        <button
          className="mr-2 px-2 py-1 text-black"
          onClick={() => {
            setPlusActive(false);
            onBack();
          }}
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
        <span
          style={{
            fontFamily: "Aleo",
            fontWeight: 500,
            fontSize: "22px",
            color: "#4D3E3B",
            marginLeft: 8,
            flex: 1,
          }}
        >
          Add new purchase
        </span>
        <span style={{ marginLeft: "auto" }}>
          <PlusButton
            isActive={plusActive}
            onClick={() => {
              setPlusActive(!plusActive);
              if (plusActive) onBack();
            }}
          />
        </span>
      </div>
      <div
        style={{
          position: "relative",
          left: "-8px",
          width: "calc(100% + 16px)",
          height: "10px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
          marginTop: 2,
          marginBottom: 8,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "0 18px",
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {fieldConfigs.map(({ label }, idx) => (
          <div key={idx} style={headingStyle}>
            {label.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        width: "calc(100% - 36px)",
        margin: "0 18px",
        borderBottom: "2px solid #EBCDB5",
        marginBottom: "0px"
      }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "16px 18px",
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {fieldConfigs.map(({ input, align, box }, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: align === "left" ? "flex-start" : "center",
              alignItems: "center",
              width: box.width,
              height: box.height,
            }}
          >
            {input}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: -60,
          width: "180px",
          height: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            background: figmaBrownishColor,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontFamily: "Aleo",
            fontWeight: 500,
            fontSize: "18px",
            padding: "8px 32px",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          }}
        >
          Add Purchase
        </button>
      </div>
      <style>{customDropdownStyle}</style>
    </div>
  );
}

// --- EDIT PURCHASE PAGE COMPONENT ---
function EditPurchasePage({ onBack, editRow }: { onBack: () => void; editRow: any }) {
  const [ingredient, setIngredient] = useState(editRow.ingredient || "");
  const [category, setCategory] = useState(editRow.category || "");
  const [unitPurchased, setUnitPurchased] = useState(editRow.unitPurchased || "");
  const [totalCost, setTotalCost] = useState(editRow.totalCost || "");
  const [invoiceNo, setInvoiceNo] = useState(editRow.invoiceDetails || "");
  const [dateTime, setDateTime] = useState(""); // You may parse from editRow.status if needed
  const [supplierName, setSupplierName] = useState(editRow.supplierName || "");
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [editActive, setEditActive] = useState(true);

  const fieldConfigs = [
    {
      label: "Ingredient",
      box: { width: 110, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 110,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: "100%",
            letterSpacing: "0px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
          placeholder="Add ingredient name"
        />
      ),
      align: "center",
    },
    {
      label: "Category",
      box: { width: 150, height: 32 },
      input: (
        <select
          className="add-purchase-select"
          style={{
            width: 150,
            height: 32,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "14px",
            color: insideBoxContentColor,
            textAlign: "left",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            paddingLeft: 12,
            paddingRight: 28,
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234D3E3B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "16px 16px",
          }}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="" style={{ color: insideBoxContentColor }}>
            Type of Ingredient
          </option>
          <option style={{ color: insideBoxContentColor }} value="Vegetable">
            Vegetable
          </option>
          <option style={{ color: insideBoxContentColor }} value="Fruit">
            Fruit
          </option>
          <option style={{ color: insideBoxContentColor }} value="Spice">
            Spice
          </option>
          <option style={{ color: insideBoxContentColor }} value="Dairy">
            Dairy
          </option>
        </select>
      ),
      align: "left",
    },
    {
      label: "Unit\nPurchased",
      box: { width: 110, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 110,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={unitPurchased}
          onChange={e => setUnitPurchased(e.target.value)}
          placeholder="Add total purchased unit"
        />
      ),
      align: "center",
    },
    {
      label: "Total\nCost",
      box: { width: 96, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 96,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={totalCost}
          onChange={e => setTotalCost(e.target.value)}
          placeholder="Enter total cost"
        />
      ),
      align: "center",
    },
    {
      label: "Invoice\nno.",
      box: { width: 96, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 96,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={invoiceNo}
          onChange={e => setInvoiceNo(e.target.value)}
          placeholder="Enter invoice number"
        />
      ),
      align: "center",
    },
    {
      label: "Date/\nTime",
      box: { width: 108, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 108,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={dateTime}
          onChange={e => setDateTime(e.target.value)}
          placeholder="Enter date and time"
          type="text"
        />
      ),
      align: "center",
    },
    {
      label: "Supplier\nName",
      box: { width: 108, height: 68 },
      input: (
        <input
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 108,
            height: 68,
            padding: 0,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={supplierName}
          onChange={e => setSupplierName(e.target.value)}
          placeholder="Enter supplier name"
        />
      ),
      align: "center",
    },
    {
      label: "Upload\nImage",
      box: { width: 108, height: 68 },
      input: (
        <label
          style={{
            border: `1px solid ${figmaBrownishColor}`,
            borderRadius: 8,
            width: 108,
            height: 68,
            fontFamily: "Aleo",
            fontWeight: 400,
            fontSize: "17px",
            color: insideBoxContentColor,
            textAlign: "center",
            background: invoiceFile ? "#F5F5F5" : "#fff",
            outline: "none",
            margin: 0,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            style={{ display: "none" }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) setInvoiceFile(e.target.files[0]);
            }}
          />
          <span style={{ color: insideBoxContentColor, width: "100%", textAlign: "center", whiteSpace: "pre-line" }}>
            {invoiceFile ? invoiceFile.name : "Upload Image"}
          </span>
        </label>
      ),
      align: "center",
    },
  ];

  const headingStyle: React.CSSProperties = {
    fontFamily: "Aleo",
    fontWeight: 500,
    fontSize: "22px",
    lineHeight: "20px",
    letterSpacing: "0px",
    textAlign: "center",
    color: "#202224",
    paddingTop: "16px",
    paddingBottom: "16px",
    minWidth: 0,
    flex: 1,
    whiteSpace: "pre-line",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // --- Custom CSS for select dropdown border and placeholder ---
  const customDropdownStyle = `
  .add-purchase-select {
    border: 1px solid #C99E5A !important;
    border-radius: 8px;
    color: #000 !important;
    background: #fff !important;
    text-align: left;
    box-sizing: border-box;
    padding-left: 12px !important;
    padding-right: 28px !important;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234D3E3B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
  }
  .add-purchase-select:focus {
    outline: none;
  }
  .add-purchase-select option {
    color: #000 !important;
    background: #fff !important;
  }
  input::placeholder {
    color: #000 !important;
    opacity: 1 !important;
    white-space: pre-line !important;
  }
  select:invalid {
    color: #000 !important;
  }
  input::-webkit-input-placeholder { color: #000 !important; white-space: pre-line !important; }
  input:-moz-placeholder { color: #000 !important; white-space: pre-line !important; }
  input::-moz-placeholder { color: #000 !important; white-space: pre-line !important; }
  input:-ms-input-placeholder { color: #000 !important; white-space: pre-line !important; }
  `;

  return (
    <div
      className="bg-white rounded-lg shadow p-2"
      style={{
        width: 1200,
        height: 350,
        position: "absolute",
        top: 145,
        left: 104,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div className="flex items-center" style={{ padding: "18px 18px 0 18px", minHeight: 60 }}>
        <button
          className="mr-2 px-2 py-1 text-black"
          onClick={() => {
            setEditActive(false);
            onBack();
          }}
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
        <span
          style={{
            fontFamily: "Aleo",
            fontWeight: 500,
            fontSize: "22px",
            color: "#4D3E3B",
            marginLeft: 8,
            flex: 1,
          }}
        >
          Edit Purchases
        </span>
        <span style={{ marginLeft: "auto" }}>
          <PencilButton
            isActive={editActive}
            onClick={() => {
              setEditActive(!editActive);
              if (editActive) onBack();
            }}
            fixedCircle={true} // Added fixedCircle prop as per requirement
          />
        </span>
      </div>
      <div
        style={{
          position: "relative",
          left: "-8px",
          width: "calc(100% + 16px)",
          height: "10px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))",
          marginTop: 2,
          marginBottom: 8,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "0 18px",
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {fieldConfigs.map(({ label }, idx) => (
          <div key={idx} style={headingStyle}>
            {label.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        width: "calc(100% - 36px)",
        margin: "0 18px",
        borderBottom: "2px solid #EBCDB5",
        marginBottom: "0px"
      }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "16px 18px",
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {fieldConfigs.map(({ input, align, box }, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: align === "left" ? "flex-start" : "center",
              alignItems: "center",
              width: box.width,
              height: box.height,
            }}
          >
            {input}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: -60,
          width: "180px",
          height: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            background: figmaBrownishColor,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontFamily: "Aleo",
            fontWeight: 500,
            fontSize: "18px",
            padding: "8px 32px",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          }}
        >
          Save Changes
        </button>
      </div>
      <style>{customDropdownStyle}</style>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function PurchaseManagementTabBlank({ onBack }: { onBack?: () => void }) {
  const [search, setSearch] = useState("");
  const [showWastageChartPage, setShowWastageChartPage] = useState(false);
  const [showAddPurchasePage, setShowAddPurchasePage] = useState(false);
  const [showEditPurchasePage, setShowEditPurchasePage] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);
  const [showMainPage, setShowMainPage] = useState(false); // New state for showing main page

  // --- Chart Page (matches Figma chart page) ---
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
        {/* Top Section: Back, Search, Today Button */}
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
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M9.5918 1.25781C14.4809 1.25781 18.4101 5.06363 18.4102 9.71777C18.4102 14.3719 14.4809 18.1777 9.5918 18.1777C4.70274 18.1777 0.773438 14.3719 0.773438 9.71777C0.773459 5.06365 4.70275 1.25785 9.5918 1.25781ZM9.5918 2.0498C7.48828 2.04982 5.46679 2.85334 3.97363 4.28906C2.47999 5.72541 1.63673 7.67778 1.63672 9.71777C1.63672 11.7578 2.48 13.7101 3.97363 15.1465C5.46679 16.5822 7.48828 17.3857 9.5918 17.3857C11.6953 17.3857 13.7168 16.5822 15.21 15.1465C16.7036 13.7101 17.5469 11.7578 17.5469 9.71777C17.5469 7.67774 16.7036 5.72541 15.21 4.28906C13.7168 2.85332 11.6953 2.0498 9.5918 2.0498ZM9.5918 4.8418C9.70306 4.84181 9.80742 4.88135 9.88574 4.94824C9.96346 5.01469 10.0093 5.10264 10.0205 5.19336L10.0234 5.25V9.55957L10.1768 9.70703L12.6992 12.1318C12.7747 12.2047 12.8144 12.2991 12.8174 12.3936C12.8203 12.4878 12.7866 12.5829 12.7168 12.6592C12.6462 12.7362 12.5436 12.7883 12.4287 12.7988C12.3152 12.8092 12.2046 12.777 12.1182 12.7139L12.0684 12.6719L9.2793 9.99121C9.21527 9.92953 9.17718 9.85214 9.16504 9.77246L9.16016 9.69727V5.23828C9.16016 5.13981 9.20048 5.04073 9.2793 4.96484C9.3589 4.8883 9.4711 4.84181 9.5918 4.8418Z" fill="#B39793" stroke="#B39793"/>
              </svg>
              Today
            </Button>
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
        <div
          className="text-[18px] font-[500] mb-1 text-black pl-3"
          style={{
            fontFamily: "'Aleo', serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0px",
            color: "#4D3E3B"
          }}
        >
          Total Purchases: ₹25,560
        </div>
        <div
          className="w-full flex-grow bg-white px-4 pt-2 pb-6"
          style={{
            border: "1px solid rgba(208, 208, 208, 0.4)",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)"
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { day: "Saturday", purchases: 1000 },
                { day: "Sunday", purchases: 500 },
                { day: "Monday", purchases: 3000 },
                { day: "Tuesday", purchases: 6500 },
                { day: "Wednesday", purchases: 5000 },
                { day: "Today", purchases: 3500 },
              ]}
              margin={{ top: 20, right: 30, left: 10, bottom: 35 }}
            >
              <defs>
                <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8F6D" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FF8F6D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#2B303466", fontSize: 12 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 12000]}
                tickFormatter={(v) => `${v / 1000}k`}
                ticks={[0, 3000, 6000, 9000, 12000]}
                dx={-5}
                tick={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0px",
                  fill: "#2B303466"
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  fontFamily: "Cormorant Garamond",
                }}
                labelStyle={{ fontSize: 16, color: "#4E3E3B" }}
                formatter={(value) => [`₹${value}`, 'Purchases']}
              />
              <Area
                type="monotone"
                dataKey="purchases"
                stroke="#FF8F6D"
                fillOpacity={1}
                fill="url(#colorPurchases)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-8 mt-2 text-sm font-medium justify-center text-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF8F6D]"></span>
            <span style={{ fontFamily: "'Aleo', serif", fontWeight: 400, fontSize: "16px", lineHeight: "20px", letterSpacing: "0px", color: "#202224" }}>Total Purchases</span>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RETURN ---
  if (showMainPage && onBack) {
    // Go back to PurchaseManagementTab.tsx main parent page
    onBack();
    return null;
  }

  return (
    <>
      <style>
        {`
          .custom-search-input::placeholder {
            color: ${figmaPlaceholderColor};
            opacity: 1;
            font-family: inherit;
          }
        `}
      </style>

      {showAddPurchasePage ? (
        <AddPurchasePage onBack={() => setShowAddPurchasePage(false)} />
      ) : showEditPurchasePage && editRow ? (
        <EditPurchasePage onBack={() => setShowEditPurchasePage(false)} editRow={editRow} />
      ) : showWastageChartPage ? (
        renderWastageChartPage()
      ) : (
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
          {/* Top section: GoBack Vector, Search bar and Icons */}
          <div className="flex items-center mb-2 gap-2" style={{ width: "100%" }}>
            <GoBackVector onClick={() => setShowMainPage(true)} />
            <span className="relative flex-1 max-w-[320px]">
              <Input
                placeholder="Search"
                className={`pl-10 w-full h-[32px] rounded-[7px] bg-[#fff] border custom-search-input`}
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
            <div className="flex ml-auto items-center">
              <Button
                variant="outline"
                className="bg-white hover:bg-white text-[#B39793] border border-[#B39793] rounded-[10px] font-normal h-[32px] px-4"
                style={{
                  borderColor: "#B39793",
                  background: "#fff",
                  fontSize: 16,
                  marginRight: "15px"
                }}
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M9.5918 1.25781C14.4809 1.25781 18.4101 5.06363 18.4102 9.71777C18.4102 14.3719 14.4809 18.1777 9.5918 18.1777C4.70274 18.1777 0.773438 14.3719 0.773438 9.71777C0.773459 5.06365 4.70275 1.25785 9.5918 1.25781ZM9.5918 2.0498C7.48828 2.04982 5.46679 2.85334 3.97363 4.28906C2.47999 5.72541 1.63673 7.67778 1.63672 9.71777C1.63672 11.7578 2.48 13.7101 3.97363 15.1465C5.46679 16.5822 7.48828 17.3857 9.5918 17.3857C11.6953 17.3857 13.7168 16.5822 15.21 15.1465C16.7036 13.7101 17.5469 11.7578 17.5469 9.71777C17.5469 7.67774 16.7036 5.72541 15.21 4.28906C13.7168 2.85332 11.6953 2.0498 9.5918 2.0498ZM9.5918 4.8418C9.70306 4.84181 9.80742 4.88135 9.88574 4.94824C9.96346 5.01469 10.0093 5.10264 10.0205 5.19336L10.0234 5.25V9.55957L10.1768 9.70703L12.6992 12.1318C12.7747 12.2047 12.8144 12.2991 12.8174 12.3936C12.8203 12.4878 12.7866 12.5829 12.7168 12.6592C12.6462 12.7362 12.5436 12.7883 12.4287 12.7988C12.3152 12.8092 12.2046 12.777 12.1182 12.7139L12.0684 12.6719L9.2793 9.99121C9.21527 9.92953 9.17718 9.85214 9.16504 9.77246L9.16016 9.69727V5.23828C9.16016 5.13981 9.20048 5.04073 9.2793 4.96484C9.3589 4.8883 9.4711 4.84181 9.5918 4.8418Z" fill="#B39793" stroke="#B39793"/>
                </svg>
                Today
              </Button>
              <GraphButton onClick={() => setShowWastageChartPage(true)} isActive={showWastageChartPage} />
              <PlusButton isActive={showAddPurchasePage} onClick={() => setShowAddPurchasePage(true)} />
              <IconCircle onClick={() => setShowMainPage(true)}>
                <FigmaClockIcon />
              </IconCircle>
            </div>
          </div>
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
          <div className="flex-grow flex flex-col overflow-auto px-2 pt-0">
            <Table className="h-full">
              <TableHeader>
                <TableRow>
                  {[
                    "Ingredient",
                    "Cost/unit",
                    "Category",
                    "Unit Purchased",
                    "Total Cost",
                    "Invoice Details",
                    "Supplier Name",
                    "Status",
                    "Edit",
                  ].map((header) => (
                    <TableHead
                      key={header}
                      style={{
                        fontFamily: "Aleo",
                        fontWeight: 500,
                        fontSize: "22px",
                        lineHeight: "20px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#4D3E3B",
                        paddingTop: '16px',
                        paddingBottom: '16px',
                      }}
                      className="px-4"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Peach line below headings */}
                <tr>
                  <td colSpan={9} style={{ padding: 0, height: 0 }}>
                    <div
                      style={{
                        width: "100%",
                        borderBottom: "2px solid #EBCDB5",
                        margin: 0,
                      }}
                    />
                  </td>
                </tr>
                {purchaseData.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <TableRow style={{ height: '102px' }}>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.ingredient}
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.costPerUnit}
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.unitPurchased}
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.totalCost}
                      </TableCell>
                      <TableCell className="px-4 text-center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "48px",
                              border: "1px solid #C99E5A",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "Aleo",
                              fontWeight: 400,
                              fontSize: "18px",
                              lineHeight: "100%",
                              letterSpacing: "0px",
                              color: "#202224",
                              marginBottom: "4px"
                            }}
                          >
                          </div>
                          <span
                            style={{
                              fontFamily: "Aleo",
                              fontWeight: 400,
                              fontSize: "18px",
                              lineHeight: "100%",
                              letterSpacing: "0px",
                              color: "#202224",
                            }}
                          >
                            {row.invoiceDetails}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.supplierName}
                      </TableCell>
                      <TableCell
                        className="px-4"
                        style={{
                          fontFamily: "Aleo",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0px",
                          color: "#202224",
                          textAlign: "center",
                          whiteSpace: "pre-wrap",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell className="px-4 text-center">
                        <button
                          style={{ background: "none", border: "none", cursor: "pointer" }}
                          onClick={() => {
                            setEditRow(row);
                            setShowEditPurchasePage(true);
                          }}
                        >
                          <Pencil className="h-5 w-5 text-gray-500 cursor-pointer mx-auto" />
                        </button>
                      </TableCell>
                    </TableRow>
                    {/* Custom line between messages, except after last row */}
                    {idx !== purchaseData.length - 1 && (
                      <tr>
                        <td colSpan={9} style={{ padding: 0, height: 0 }}>
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
            4 of 120 items
          </div>
        </div>
      )}
    </>
  );
}
