"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy data (repeat for 6 rows)
const DUMMY_DATA = Array(7).fill({
  image: "/Screenshot 2025-06-21 040832.png", // Use your uploaded image path
  name: "Chicken Nuggets",
  category: "Starters",
  unitSold: "50 Pieces",
  revenue: "₹3,000",
  profit: "Profit",
});

const FILTER_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All", value: "all" },
];

const CATEGORY_OPTIONS = [
  { label: "Category (All)", value: "all" },
  { label: "Starters", value: "starters" },
  { label: "Main Course", value: "main" },
  { label: "Desserts", value: "desserts" },
];

export default function DishPerformancePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState("today");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const mainTextColor = "#4D3E3B";
  const tableBorderColor = "#EBCDB5";
  const white = "#fff";
  const separationLineColor = "#ede6dd";

  // Make the center block a little bigger on the right and top
  const tableBlockWidth = "calc(110vw - 320px)"; // was 420px, now bigger (less margin right)
  const tableBlockMaxWidth = 8000; // was 950, now slightly wider
  const tableBlockMarginTop = 110; // was 180, now less margin top (moves up)
  const tableBlockMarginBottom = 38;
  const tableBlockMarginLeft = 120; // shift block a little more to the left (was 230)
  const minBlockHeight = 550;
  const backButtonLeft = 118;
  const backButtonTop = 64;
  const inputHeight = 38;

  // Filtered data logic (for demo, not filtering on veg, category, today)
  const filteredData = DUMMY_DATA.filter((row) =>
    (row.name + row.category + row.unitSold + row.revenue + row.profit)
      .toLowerCase()
      .includes(search.toLowerCase())
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
      {/* < Dish Performance Button */}
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
        <span style={{
          fontFamily: "Georgia, Times New Roman, serif",
          color: mainTextColor,
          fontWeight: 700,
          fontSize: 28
        }}>Trending Dishes</span>
      </button>

      {/* Sole Message/Table Block */}
      <div
        style={{
          background: white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
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
        {/* Top Row: Search, Veg Only, Category, Today, Share, Download */}
        <div
          style={{
            borderBottom: `1.5px solid ${separationLineColor}`,
            display: "flex",
            alignItems: "center",
            gap: "1.1rem",
            flexWrap: "wrap",
            paddingLeft: "2.1rem",
            paddingRight: "2.1rem",
            paddingTop: "0.93rem",
            paddingBottom: "0.55rem",
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
              fontSize: "1.11rem",
              padding: "0.38rem 1.05rem",
              borderRadius: "0.335rem",
              border: `1.2px solid #bba9a2`,
              width: 170,
              color: "#a08e85",
              marginRight: 10,
              height: inputHeight - 6,
              boxSizing: "border-box",
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M9.5 17C13.0899 17 16 14.0899 16 10.5C16 6.91015 13.0899 4 9.5 4C5.91015 4 3 6.91015 3 10.5C3 14.0899 5.91015 17 9.5 17Z\' stroke=\'%23bba9a2\' stroke-width=\'1.2\'/%3E%3Cpath d=\'M17 17L15 15\' stroke=\'%23bba9a2\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              paddingLeft: "2.1rem"
            }}
            aria-label="Search dish performance"
          />
          {/* Veg Only */}
          <label style={{ display: "flex", alignItems: "center", marginLeft: 5, marginRight: 7, fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={() => setVegOnly(v => !v)}
              style={{
                marginRight: 7,
                accentColor: "#BFA14A",
                width: 16,
                height: 16,
              }}
            />
            <span style={{ color: "#6d5540", fontFamily: "Calibri, Arial, sans-serif", fontSize: 15 }}>Veg Only</span>
          </label>
          {/* Category Dropdown */}
          <div style={{ position: "relative", marginRight: 7 }}>
            <button
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                fontSize: 15,
                padding: "5px 22px 5px 12px",
                borderRadius: 8,
                border: `1.2px solid #d8cbb7`,
                color: "#BFA14A",
                background: "#fdfbf8",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                marginLeft: 0,
                boxShadow: "none",
                minWidth: 112,
                marginRight: 0,
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: inputHeight - 8,
              }}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={showCategoryDropdown}
              onClick={() => setShowCategoryDropdown(v => !v)}
            >
              <span>{CATEGORY_OPTIONS.find(c => c.value === category)?.label}</span>
              <span style={{
                marginLeft: 8,
                fontSize: 16,
                color: "#BFA14A",
                fontWeight: 700,
                position: "relative",
                top: 1,
                userSelect: "none"
              }}>▼</span>
            </button>
            {showCategoryDropdown && (
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
                  marginTop: 4,
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: 15
                }}
                role="listbox"
              >
                {CATEGORY_OPTIONS.map(opt => (
                  <div
                    key={opt.value}
                    style={{
                      padding: "0.5rem 0.9rem",
                      cursor: "pointer",
                      color: mainTextColor,
                      background: category === opt.value ? "#f3e6d9" : "transparent",
                      fontWeight: category === opt.value ? 700 : 500,
                      borderRadius: 8,
                      transition: "background 0.13s",
                    }}
                    role="option"
                    aria-selected={category === opt.value}
                    tabIndex={0}
                    onClick={() => {
                      setCategory(opt.value);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Today Dropdown and icons */}
          <div style={{ marginLeft: "auto", position: "relative", display: "flex", alignItems: "center" }}>
            <button
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                fontSize: 16,
                padding: "6px 20px 6px 16px",
                borderRadius: 8,
                border: `1.2px solid #d8cbb7`,
                color: "#BFA14A",
                background: "#fdfbf8",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                marginLeft: 0,
                boxShadow: "none",
                minWidth: 86,
                marginRight: 0,
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: inputHeight - 10,
              }}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={showFilterDropdown}
              onClick={() => setShowFilterDropdown((v) => !v)}
            >
              <span>
                {FILTER_OPTIONS.find((f) => f.value === filter)?.label || "Today"}
              </span>
              <span style={{
                marginLeft: 6,
                fontSize: 15,
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
                  marginTop: 4,
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: 16
                }}
                role="listbox"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    style={{
                      padding: "0.5rem 0.9rem",
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
            {/* Share and Download buttons */}
            <div style={{ marginLeft: 9, display: "flex", alignItems: "center", gap: 0 }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#BFA14A",
                  fontSize: 20,
                  cursor: "pointer",
                  padding: "3px 10px 5px 10px",
                  borderRadius: 10,
                  outline: "none",
                  lineHeight: 1,
                  marginRight: 3,
                  transition: "background 0.13s",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Share"
                title="Share"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
                  <path d="M3 11L19 4L12 21L10 13L3 11Z" stroke="#BFA14A" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#BFA14A",
                  fontSize: 20,
                  cursor: "pointer",
                  padding: "3px 9px 5px 9px",
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
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" style={{ display: "block" }}>
                  <path d="M11 4V16M11 16L6 11M11 16L16 11M4 18H18" stroke="#BFA14A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
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
            borderRadius: "24px",
            boxShadow: "none",
            overflow: "hidden",
            border: "none",
            maxHeight: "none",
            paddingBottom: 0,
          }}
        >
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Calibri, Arial, sans-serif",
            fontSize: 17,
            color: mainTextColor,
            background: "#fff",
          }}>
            <thead>
              <tr style={{
                background: "#fff",
                color: mainTextColor,
                fontWeight: 700,
                fontSize: 18,
                borderBottom: `2px solid ${tableBorderColor}`,
                letterSpacing: 0.04,
              }}>
                <th style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 80,
                  verticalAlign: "middle"
                }}>Image</th>
                <th style={{
                  padding: "10px 6px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 100,
                  verticalAlign: "middle"
                }}>Name</th>
                <th style={{
                  padding: "10px 6px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 90,
                  verticalAlign: "middle"
                }}>Category</th>
                <th style={{
                  padding: "10px 6px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 80,
                  verticalAlign: "middle"
                }}>Unit Sold</th>
                <th style={{
                  padding: "10px 6px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 90,
                  verticalAlign: "middle"
                }}>Revenue</th>
                <th style={{
                  padding: "10px 6px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 17,
                  fontWeight: 700,
                  minWidth: 70,
                  verticalAlign: "middle"
                }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#bbb", padding: "28px 0" }}>No records found.</td>
                </tr>
              )}
              {filteredData.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: idx === filteredData.length - 1 ? "none" : `2px solid ${tableBorderColor}`,
                  fontWeight: 500,
                  background: "#fff",
                }}>
                  <td style={{ padding: "10px 4px", border: "none", textAlign: "center", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{
                          width: 56,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 8,
                          boxShadow: "0 1px 9px 0 #d6cfc4"
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "10px 4px", border: "none", color: mainTextColor, textAlign: "center", verticalAlign: "middle" }}>
                    {row.name}
                  </td>
                  <td style={{ padding: "10px 4px", border: "none", color: mainTextColor, textAlign: "center", verticalAlign: "middle" }}>
                    {row.category}
                  </td>
                  <td style={{ padding: "10px 4px", border: "none", color: mainTextColor, textAlign: "center", verticalAlign: "middle" }}>
                    {row.unitSold}
                  </td>
                  <td style={{ padding: "10px 4px", border: "none", color: mainTextColor, textAlign: "center", verticalAlign: "middle" }}>
                    {row.revenue}
                  </td>
                  <td style={{ padding: "10px 4px", border: "none", color: mainTextColor, textAlign: "center", verticalAlign: "middle" }}>
                    {row.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Item Count (out of the main block, lower right, black) */}
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
          textAlign: "right"
        }}
      >
        {filteredData.length === 0
          ? "0 items"
          : `6 of 202 items`}
      </div>
    </div>
  );
}