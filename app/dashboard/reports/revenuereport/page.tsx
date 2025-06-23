"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy data, 202 items
const DUMMY_DATA = Array.from({ length: 202 }, (_, i) => ({
  orderId: "1234567891",
  amount: "₹154",
  time: "5:20pm",
  waiter: "Mr Waiter",
  table: 10,
  method: "Zomato",
}));

const FILTER_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All", value: "all" },
];

function filterData(data: typeof DUMMY_DATA, filter: string): typeof DUMMY_DATA {
  if (filter === "all") return data;
  return data.slice(0, 6);
}

export default function RevenueReportPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("month");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredData = filterData(
    DUMMY_DATA.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    ),
    filter
  );

  // Colors
  const mainTextColor = "#4D3E3B";
  const tableBorderColor = "#EBCDB5";
  const white = "#fff";
  const separationLineColor = "#ede6dd";

  // Sizing for the inner message/table block
  const tableBlockMarginTop = 110;
  const tableBlockMarginBottom = 15;
  const tableBlockWidth = "calc(100vw - 160px)";
  const tableBlockMaxWidth = 1350;
  const backButtonLeft = 120;
  const backButtonTop = 59;
  const inputHeight = 38;
  const itemCountBottom = 18;

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
      {/* < Revenue Report Button */}
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
          fontSize: 30,
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
            fontSize: 34,
            color: mainTextColor,
            display: "inline-flex",
            alignItems: "center",
            height: 42,
            width: 42,
            justifyContent: "center",
            fontWeight: 700,
            paddingRight: 8,
            lineHeight: 1,
            marginLeft: 0,
          }}
        >
          &#60;
        </span>
        <span style={{
          fontFamily: "Georgia, Times New Roman, serif",
          color: mainTextColor,
          fontWeight: 700,
          fontSize: 30
        }}>Revenue Report</span>
      </button>

      {/* Sole Message/Table Block */}
      <div
        style={{
          background: white,
          borderTopLeftRadius: 24,    // Top left corner radius
          borderTopRightRadius: 24,   // Top right corner radius
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          position: "relative",
          overflow: "visible",
          boxShadow: "0 3px 18px 1px rgba(180,140,80,0.12)",
          margin: "100px 0 0 130px",
          width: tableBlockWidth,
          maxWidth: tableBlockMaxWidth,
          border: "none",
          display: "flex",
          flexDirection: "column",
          opacity: 1,
          pointerEvents: "auto",
        }}
      >
        {/* Top Row: Search, Filter, Share, Download */}
        <div
          style={{
            borderBottom: `1.5px solid ${separationLineColor}`,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1.3rem",
            flexWrap: "wrap",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingTop: "1.0rem",
            paddingBottom: "0.6rem",
            background: white,
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
              fontSize: "1.18rem",
              padding: "0.42rem 1.1rem",
              borderRadius: "0.375rem",
              border: `1.2px solid ${mainTextColor}`,
              width: 270,
              color: mainTextColor,
              marginRight: 12,
              height: inputHeight,
              boxSizing: "border-box",
            }}
            aria-label="Search revenue report"
          />
          {/* Filter Button (dropdown) */}
          <div style={{ position: "relative" }}>
            <button
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                fontSize: 18,
                padding: "9px 24px 9px 18px",
                borderRadius: 8,
                border: `1.3px solid #d8cbb7`,
                color: "#BFA14A",
                background: "#fdfbf8",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                marginLeft: "670px",
                boxShadow: "none",
                minWidth: 146,
                marginRight: 0,
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: inputHeight,
              }}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={showFilterDropdown}
              onClick={() => setShowFilterDropdown((v) => !v)}
            >
              <span>
                {FILTER_OPTIONS.find((f) => f.value === filter)?.label || "This Month"}
              </span>
              <span style={{
                marginLeft: 10,
                fontSize: 19,
                color: "#BFA14A",
                fontWeight: 700,
                position: "relative",
                top: 1,
                userSelect: "none"
              }}>▼</span>
            </button>
            {showFilterDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  minWidth: "100%",
                  background: white,
                  border: "1.5px solid #BFA14A",
                  boxShadow: "0 2px 16px 2px #e2d5c0",
                  zIndex: 2000,
                  borderRadius: 8,
                  marginTop: 5,
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: 17
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
                      background: filter === opt.value ? "#f3e6d9" : "transparent",
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
          {/* Share and Download buttons (figma-like, right-aligned) */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 0 }}>
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
              {/* Paper plane icon */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
                <path d="M3 11L19 4L12 21L10 13L3 11Z" stroke="#BFA14A" strokeWidth="2" strokeLinejoin="round" fill="none"/>
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
              {/* Download icon */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
                <path d="M11 4V16M11 16L6 11M11 16L16 11M4 18H18" stroke="#BFA14A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            borderRadius: "24px 24px 24px 24px",
            boxShadow: "none",
            overflow: "auto",
            border: "none",
            maxHeight: "none",
            paddingBottom: 0,
          }}
        >
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Calibri, Arial, sans-serif",
            fontSize: 21,
            color: mainTextColor,
            background: "#fff",
          }}>
            <thead>
              <tr style={{
                background: "#fff",
                color: mainTextColor,
                fontWeight: 700,
                fontSize: 22,
                borderBottom: `2px solid ${tableBorderColor}`,
                letterSpacing: 0.04,
              }}>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Order Id</th>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Amount</th>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Time</th>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Waiter Name</th>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Table No.</th>
                <th style={{ padding: "18px 20px", textAlign: "left", border: "none" }}>Order method</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#bbb", padding: "38px 0" }}>No records found.</td>
                </tr>
              )}
              {filteredData.slice(0, 6).map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: idx === filteredData.slice(0, 6).length - 1 ? "none" : `2px solid ${tableBorderColor}`,
                  fontWeight: 500,
                  background: "#fff",
                }}>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.orderId}</td>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.amount}</td>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.time}</td>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.waiter}</td>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.table}</td>
                  <td style={{ padding: "21px 20px", border: "none", color: mainTextColor }}>{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Item Count (fixed, bottom right of block) */}
        <div
          style={{
            fontSize: 18,
            color: "#7f7364",
            fontFamily: "Calibri, Arial, sans-serif",
            position: "absolute",
            right: -5, // <--- Right margin
            bottom: -30, // <--- Bottom margin
            userSelect: "none",
            letterSpacing: "0.02em",
            background: "transparent",
            zIndex: 11,
            textAlign: "right"
          }}
        >
          {filteredData.length === 0
            ? "0 items"
            : `${Math.min(6, filteredData.length)} of 202 items`}
        </div>
      </div>
    </div>
  );
}