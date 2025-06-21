"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Dummy data for GST Report
const DUMMY_DATA = [
  {
    gstNo: "0000001",
    paidToGstNo: <>Mr Singh/<br />012344</>,
    paidFor: "Raw Materials",
    gstPercent: "5%",
    gstAmount: "₹50",
    totalBill: "₹1,000",
    invoiceNo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          value=""
          style={{
            width: 38,
            height: 28,
            borderRadius: 6,
            border: "1.3px solid #ebcdb5",
            background: "#fff7ec",
            textAlign: "center",
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 2,
            outline: "none"
          }}
          placeholder=""
          readOnly
        />
        <span style={{ fontSize: 15, color: "#4D3E3B", fontWeight: 500, marginTop: 0 }}>00001</span>
      </div>
    ),
  },
];

const FILTER_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All", value: "all" },
];

function filterData(data: typeof DUMMY_DATA, filter: string): typeof DUMMY_DATA {
  // For demonstration, no actual filtering
  return data;
}

export default function GSTReportPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("today");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredData = filterData(
    DUMMY_DATA.filter((row) =>
      Object.values(row).some((val) =>
        (typeof val === "string"
          ? val
          : typeof val === "object" && val !== null && "props" in val
          ? (val.props?.children || "")
          : ""
        ).toString().toLowerCase().includes(search.toLowerCase())
      )
    ),
    filter
  );

  // Colors and style constants
  const mainTextColor = "#4D3E3B";
  const tableBorderColor = "#EBCDB5";
  const white = "#fff";
  const separationLineColor = "#ede6dd";

  // Sizing for the inner message/table block
  const tableBlockWidth = "calc(100vw - 160px)";
  const tableBlockMaxWidth = 1350;
  const tableBlockMarginTop = 108;
  const tableBlockMarginBottom = 15;
  const tableBlockMarginLeft = 135;
  const minBlockHeight = 570;

  // Back button position
  const backButtonLeft = 120;
  const backButtonTop = 59;
  const inputHeight = 38;

  // Center align for all columns (except maybe "Paid To/GST No." if multiline)
  const centerCols = [
    "gstNo",
    "paidToGstNo",
    "paidFor",
    "gstPercent",
    "gstAmount",
    "totalBill",
    "invoiceNo"
  ];

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
      {/* < GST Report Button */}
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
        }}>GST Report</span>
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
          overflow: "visible",
          boxShadow: "0 3px 18px 1px rgba(180,140,80,0.12)",
          margin: `${tableBlockMarginTop}px 0 ${tableBlockMarginBottom}px ${tableBlockMarginLeft}px`,
          width: tableBlockWidth,
          maxWidth: tableBlockMaxWidth,
          minWidth: 600,
          border: "none",
          display: "flex",
          flexDirection: "column",
          opacity: 1,
          pointerEvents: "auto",
          minHeight: minBlockHeight,
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
              border: `1.2px solid #bba9a2`,
              width: 270,
              color: "#a08e85",
              marginRight: 12,
              height: inputHeight,
              boxSizing: "border-box",
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M9.5 17C13.0899 17 16 14.0899 16 10.5C16 6.91015 13.0899 4 9.5 4C5.91015 4 3 6.91015 3 10.5C3 14.0899 5.91015 17 9.5 17Z\' stroke=\'%23bba9a2\' stroke-width=\'1.2\'/%3E%3Cpath d=\'M17 17L15 15\' stroke=\'%23bba9a2\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              paddingLeft: "2.1rem"
            }}
            aria-label="Search GST report"
          />
          {/* Filter Button (dropdown) - RIGHT ALIGNED */}
          <div style={{ marginLeft: "auto", position: "relative", display: "flex", alignItems: "center" }}>
            <button
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                fontSize: 18,
                padding: "8px 27px 8px 22px",
                borderRadius: 8,
                border: `1.3px solid #d8cbb7`,
                color: "#BFA14A",
                background: "#fdfbf8",
                fontWeight: 700,
                cursor: "pointer",
                outline: "none",
                marginLeft: 0,
                boxShadow: "none",
                minWidth: 111,
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
                {FILTER_OPTIONS.find((f) => f.value === filter)?.label || "Today"}
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
            {/* Share and Download buttons (right-aligned) */}
            <div style={{ marginLeft: 10, display: "flex", alignItems: "center", gap: 0 }}>
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
            fontSize: 19,
            color: mainTextColor,
            background: "#fff",
          }}>
            <thead>
              <tr style={{
                background: "#fff",
                color: mainTextColor,
                fontWeight: 700,
                fontSize: 20,
                borderBottom: `2px solid ${tableBorderColor}`,
                letterSpacing: 0.04,
              }}>
                <th style={{
                  padding: "14px 16px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 110
                }}>GST No.</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 180
                }}>Paid To/<br />GST No.</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 160
                }}>Paid For</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 80
                }}>GST %</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 110
                }}>GST Amount</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 110
                }}>Total Bill</th>
                <th style={{
                  padding: "14px 10px",
                  textAlign: "center",
                  border: "none",
                  fontSize: 19,
                  fontWeight: 700,
                  minWidth: 120
                }}>Invoice/<br />Bill No.</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#bbb", padding: "38px 0" }}>No records found.</td>
                </tr>
              )}
              {filteredData.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: idx === filteredData.length - 1 ? "none" : `2px solid ${tableBorderColor}`,
                  fontWeight: 500,
                  background: "#fff",
                }}>
                  <td style={{ padding: "18px 16px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.gstNo}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.paidToGstNo}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.paidFor}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.gstPercent}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.gstAmount}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.totalBill}</td>
                  <td style={{ padding: "18px 10px", border: "none", color: mainTextColor, textAlign: "center" }}>{row.invoiceNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Item Count (out of the main block, lower right, black) */}
      <div
        style={{
          fontSize: 17,
          color: "#000",
          fontFamily: "Calibri, Arial, sans-serif",
          position: "absolute",
          right: 45,
          bottom: 18,
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