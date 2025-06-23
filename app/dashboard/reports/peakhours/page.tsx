"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy data for Peak Hours (matching screenshot)
const DUMMY_DATA = [
  {
    time: "01pm-02pm",
    totalCustomers: 17,
    newCustomers: 5,
    totalSales: "₹1,900",
    tablesOccupied: "6/10",
  },
  {
    time: "12pm-01pm",
    totalCustomers: 15,
    newCustomers: 4,
    totalSales: "₹1,500",
    tablesOccupied: "6/10",
  },
  {
    time: "11am-12pm",
    totalCustomers: 22,
    newCustomers: 8,
    totalSales: "₹2,200",
    tablesOccupied: "8/10",
  },
  {
    time: "10am-11am",
    totalCustomers: 15,
    newCustomers: 2,
    totalSales: "₹1,700",
    tablesOccupied: "5/10",
  },
  {
    time: "09am-10am",
    totalCustomers: 20,
    newCustomers: 3,
    totalSales: "₹2,000",
    tablesOccupied: "7/10",
  },
  {
    time: "08am-09am",
    totalCustomers: 18,
    newCustomers: 1,
    totalSales: "₹1,600",
    tablesOccupied: "6/10",
  },
];

const FILTER_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All", value: "all" },
];

export default function PeakHoursPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("today");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const mainTextColor = "#4D3E3B";
  const tableBorderColor = "#EBCDB5";
  const white = "#fff";
  const separationLineColor = "#ede6dd";

  // Block sizing and spacing (match your previous for consistent layout)
  const tableBlockWidth = "calc(110vw - 320px)";
  const tableBlockMaxWidth = 8000;
  const tableBlockMarginTop = 110;
  const tableBlockMarginBottom = 38;
  const tableBlockMarginLeft = 120;
  const minBlockHeight = 540;
  const backButtonLeft = 118;
  const backButtonTop = 60;
  const inputHeight = 38;

  // Filtered data logic (search only for demo)
  const filteredData = DUMMY_DATA.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        fontFamily: "Calibri, Arial, sans-serif",
        overflow: "hidden",
        width: "100vw",
        position: "relative",
      }}
    >
      {/* Peak Hours Button */}
      <button
        style={{
          color: mainTextColor,
          background: "transparent",
          fontWeight: 700,
          letterSpacing: 0.1,
          fontFamily: "Georgia, Times New Roman, serif",
          top: backButtonTop,
          left: backButtonLeft,
          zIndex: 22,
          border: "none",
          padding: 0,
          fontSize: 29,
          outline: "none",
          borderRadius: 8,
          position: "absolute",
          transition: "top 0.2s",
          display: "flex",
          alignItems: "center",
          gap: 0,
          cursor: "pointer",
        }}
        onClick={() => router.push("/dashboard/reports")}
        aria-label="Back to Reports"
      >
        {/* Back Icon */}
        <span
          style={{
            fontSize: 32,
            color: mainTextColor,
            display: "inline-flex",
            alignItems: "center",
            height: 39,
            width: 39,
            justifyContent: "center",
            fontWeight: 700,
            paddingRight: 7,
            lineHeight: 1,
            marginLeft: 0,
          }}
        >
          &#60;
        </span>
        <span
          style={{
            fontFamily: "Georgia, Times New Roman, serif",
            color: mainTextColor,
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          Peak Hours
        </span>
      </button>

      {/* Main Block */}
      <div
        style={{
          background: white,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 3px 18px 1px rgba(180,140,80,0.12)",
          margin: `${tableBlockMarginTop}px 0 ${tableBlockMarginBottom}px ${tableBlockMarginLeft}px`,
          width: tableBlockWidth,
          maxWidth: tableBlockMaxWidth,
          minWidth: 520,
          border: "none",
          display: "flex",
          flexDirection: "column",
          opacity: 1,
          pointerEvents: "auto",
          minHeight: minBlockHeight,
          height: "auto",
        }}
      >
        {/* Top Row: Search + Today Dropdown + Share + Download */}
        <div
          style={{
            borderBottom: `1.5px solid ${separationLineColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "2.1rem",
            paddingRight: "2.1rem",
            paddingTop: "1.1rem",
            paddingBottom: "0.71rem",
            background: white,
            minHeight: 64,
            gap: "1.1rem",
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontFamily: "Calibri, Arial, sans-serif",
              background: white,
              fontSize: "1.13rem",
              padding: "0.45rem 1.05rem",
              borderRadius: "0.38rem",
              border: `1.1px solid #bba9a2`,
              width: 315,
              color: "#a08e85",
              height: inputHeight,
              boxSizing: "border-box",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.5 17C13.0899 17 16 14.0899 16 10.5C16 6.91015 13.0899 4 9.5 4C5.91015 4 3 6.91015 3 10.5C3 14.0899 5.91015 17 9.5 17Z' stroke='%23bba9a2' stroke-width='1.2'/%3E%3Cpath d='M17 17L15 15' stroke='%23bba9a2' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              paddingLeft: "2.1rem",
            }}
            aria-label="Search peak hours report"
          />
          {/* Right-side controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Today Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                style={{
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: 17,
                  padding: "8px 27px 8px 22px",
                  borderRadius: 8,
                  border: `1.3px solid #d8cbb7`,
                  color: "#BFA14A",
                  background: "#fdfbf8",
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "none",
                  minWidth: 111,
                  display: "flex",
                  alignItems: "center",
                  height: inputHeight,
                }}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={showFilterDropdown}
                onClick={() => setShowFilterDropdown((v) => !v)}
              >
                <span>
                  {FILTER_OPTIONS.find((f) => f.value === filter)?.label ||
                    "Today"}
                </span>
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: 19,
                    color: "#BFA14A",
                    fontWeight: 700,
                    position: "relative",
                    top: 1,
                    userSelect: "none",
                  }}
                >
                  ▼
                </span>
              </button>
              {showFilterDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    minWidth: "100%",
                    background: white,
                    border: "1.5px solid #BFA14A",
                    boxShadow: "0 2px 16px 2px #e2d5c0",
                    zIndex: 2000,
                    borderRadius: 8,
                    marginTop: 5,
                    fontFamily: "Calibri, Arial, sans-serif",
                    fontSize: 17,
                  }}
                  role="listbox"
                >
                  {FILTER_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      style={{
                        padding: "0.7rem 1.1rem",
                        cursor: "pointer",
                        color: mainTextColor,
                        background:
                          filter === opt.value ? "#f3e6d9" : "transparent",
                        fontWeight: filter === opt.value ? 700 : 500,
                        borderRadius: 8,
                        transition: "background 0.13s",
                      }}
                      role="option"
                      aria-selected={filter === opt.value}
                      tabIndex={0}
                      onClick={() => {
                        setFilter(opt.value);
                        setShowFilterDropdown(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Share */}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#BFA14A",
                fontSize: 22,
                cursor: "pointer",
                padding: "5px 16px 7px 16px",
                borderRadius: 10,
                outline: "none",
                lineHeight: 1,
                marginRight: 4,
                transition: "background 0.13s",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Share"
              title="Share"
              type="button"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                style={{ display: "block" }}
              >
                <path
                  d="M3 11L19 4L12 21L10 13L3 11Z"
                  stroke="#BFA14A"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
            {/* Download */}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#BFA14A",
                fontSize: 22,
                cursor: "pointer",
                padding: "5px 12px 7px 12px",
                borderRadius: 10,
                outline: "none",
                lineHeight: 1,
                transition: "background 0.13s",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Download"
              title="Download"
              type="button"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                style={{ display: "block" }}
              >
                <path
                  d="M11 4V16M11 16L6 11M11 16L16 11M4 18H18"
                  stroke="#BFA14A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* --- SEPARATION LINE --- */}
        <div
          style={{
            width: "100%",
            height: "4px",
            background: separationLineColor,
            marginTop: 0,
            marginBottom: 0,
            border: "none",
            pointerEvents: "none",
          }}
        />
        {/* Table */}
        <div
          style={{
            margin: "0",
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "none",
            overflow: "hidden",
            border: "none",
            maxHeight: "none",
            paddingBottom: 0,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "Calibri, Arial, sans-serif",
              fontSize: 20,
              color: mainTextColor,
              background: "#fff",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#fff",
                  color: mainTextColor,
                  fontWeight: 700,
                  fontSize: 20,
                  borderBottom: `2px solid ${tableBorderColor}`,
                  letterSpacing: 0.04,
                }}
              >
                <th
                  style={{
                    padding: "16px 10px",
                    textAlign: "center",
                    border: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    minWidth: 150,
                    verticalAlign: "middle",
                  }}
                >
                  Time
                </th>
                <th
                  style={{
                    padding: "16px 10px",
                    textAlign: "center",
                    border: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    minWidth: 180,
                    verticalAlign: "middle",
                  }}
                >
                  Total Customers
                </th>
                <th
                  style={{
                    padding: "16px 10px",
                    textAlign: "center",
                    border: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    minWidth: 180,
                    verticalAlign: "middle",
                  }}
                >
                  New Customers
                </th>
                <th
                  style={{
                    padding: "16px 10px",
                    textAlign: "center",
                    border: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    minWidth: 180,
                    verticalAlign: "middle",
                  }}
                >
                  Total Sales
                </th>
                <th
                  style={{
                    padding: "16px 10px",
                    textAlign: "center",
                    border: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    minWidth: 180,
                    verticalAlign: "middle",
                  }}
                >
                  Tables Occupied
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      color: "#bbb",
                      padding: "38px 0",
                      fontSize: 20,
                    }}
                  >
                    No records found.
                  </td>
                </tr>
              )}
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom:
                      idx === filteredData.length - 1
                        ? "none"
                        : `2px solid ${tableBorderColor}`,
                    fontWeight: 500,
                    background: "#fff",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 10px",
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.time}
                  </td>
                  <td
                    style={{
                      padding: "16px 10px",
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.totalCustomers}
                  </td>
                  <td
                    style={{
                      padding: "16px 10px",
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.newCustomers}
                  </td>
                  <td
                    style={{
                      padding: "16px 10px",
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.totalSales}
                  </td>
                  <td
                    style={{
                      padding: "16px 10px",
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.tablesOccupied}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Item Count (bottom right, fixed) */}
      <div
        style={{
          fontSize: 15,
          color: "#000",
          fontFamily: "Calibri, Arial, sans-serif",
          position: "absolute",
          right: 45,
          bottom: 14,
          userSelect: "none",
          letterSpacing: "0.02em",
          background: "transparent",
          zIndex: 99,
          textAlign: "right",
        }}
      >
        {filteredData.length === 0
          ? "0 items"
          : `${filteredData.length} of 202 items`}
      </div>
    </div>
  );
}
