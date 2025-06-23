"use client";
import React, { useState } from "react";

// Staff Performance Icon with image inside a circle
const StaffPerformanceIcon = ({ onClick, imageUrl, circleColor = "#D5D5D5", size = 40 }) => (
    <button
        onClick={onClick}
        style={{
            background: circleColor,
            border: `1.2px solid ${circleColor}`,
            borderRadius: "50%",
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
            overflow: "hidden",
            padding: 0,
            flexShrink: 0,
        }}
    >
<img
    src="/2bb6ca406cd027d513b3c1deffef4da8a234c4d0.png" // Removed the semicolon here
    alt="Staff Performance"
    style={{
        width: "60%",
        height: "60%",
        objectFit: "contain",
        borderRadius: "50%",
    }}
    // Changed fallback to a generic placeholder to prevent continuous failed reloads
    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/24x24/D5D5D5/000000?text=SP"; }}
/>
    </button>
);


// Dummy staff data - now only one entry as per Figma
const STAFF_DATA = [
    {
        image: null, // Avatar placeholder
        name: "Mr Raju",
        designation: "Waiter",
        salary: "₹ 10,000",
        ordersServed: 50,
        hoursWorked: "9/10",
        leavesTaken: 2,
        rating: 4.5,
    },
];

export default function StaffPerformancePage() {
  const [search, setSearch] = useState("");

  // Filtered staff data (simple filter on name/designation)
  const filteredData = STAFF_DATA.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.designation.toLowerCase().includes(search.toLowerCase())
  );

  // Colors and layout constants
  const mainTextColor = "#4D3E3B";
  const tableBorderColor = "#EBCDB5";
  const white = "#fff";
  const separationLineColor = "#ede6dd";
  const shadow = "0 3px 18px 1px rgba(180,140,80,0.12)";

  return (
    <div
      style={{
        minHeight: "100vh", // Ensure it stretches over the entire screen vertically
        background: "#F5F1EB", // Background color from the provided page
        fontFamily: "Calibri, Arial, sans-serif",
        width: "100vw",
        position: "relative",
        overflow: "hidden", // Prevents overall page scrollbars
        display: "flex",
        flexDirection: "column", // Use column to allow stacking of elements
        alignItems: "flex-start", // Align items to the start
        paddingBottom: 20, // Add some padding to the bottom bezel
      }}
    >
      {/* Back Button & Title - Adjusted position */}
      <button
        style={{
          color: mainTextColor,
          background: "transparent",
          fontWeight: 700,
          letterSpacing: 0.1,
          fontFamily: "Georgia, Times New Roman, serif",
          fontSize: 27,
          border: "none",
          outline: "none",
          borderRadius: 8,
          position: "absolute", // Use absolute positioning for precise control
          top: 90, // Moved down
          left: 140, // Moved right
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1,
          gap: 0,
          padding: 0,
          transition: "top 0.2s",
        }}
        onClick={() => window.location.href = "/dashboard/restaurantprofile"} // Changed to window.location.href
        aria-label="Back to Restaurant Profile"
      >
        <span
          style={{
            fontSize: 29,
            color: mainTextColor,
            display: "inline-flex",
            alignItems: "center",
            height: 36,
            width: 36,
            justifyContent: "center",
            fontWeight: 700,
            paddingRight: 8,
            lineHeight: 1,
            marginLeft: 2,
          }}
        >
          &#60;
        </span>
        <span
          style={{
            fontFamily: "Georgia, Times New Roman, serif",
            color: mainTextColor,
            fontWeight: 700,
            fontSize: 26,
            marginLeft: 0,
          }}
        >
          Staff Performance
        </span>
      </button>

      {/* Main content area containing the table block - Adjusted position */}
      <div style={{
          marginTop: 130, // Adjusted to move down, accounting for button
          marginLeft: 150, // Adjusted to move right
          flexGrow: 1, // Allows this block to grow and fill available space
          width: "calc(100vw - 180px)", // Adjusted width to ensure it stretches
          maxWidth: 1350, // Max width constraint
          alignSelf: "flex-start", // Ensures it aligns to the start of the column
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}>
        {/* Table block - Main component with shadow and rounded corners */}
        <div
          style={{
            background: white,
            borderRadius: 24, // Consistent with Revenue Report Page
            boxShadow: shadow, // Consistent shadow
            border: "none",
            display: "flex",
            flexDirection: "column",
            opacity: 1,
            pointerEvents: "auto",
            flexGrow: 1, // Make this block grow to fill available vertical space
            paddingBottom: 60, // Add padding to the bottom to push content up and make it taller
          }}
        >
          {/* Top Row: Search, Sort, and Staff Performance Icon */}
          <div
            style={{
              borderBottom: `1.5px solid ${separationLineColor}`,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "1.3rem", // Increased gap as in Revenue Report
              flexWrap: "nowrap",
              paddingLeft: "2.5rem", // Adjusted padding
              paddingRight: "2.5rem", // Adjusted padding
              paddingTop: "1.0rem",
              paddingBottom: "0.6rem",
              background: white,
              position: "relative",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 auto", maxWidth: 270 }}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  fontFamily: "Calibri, Arial, sans-serif",
                  background: white,
                  fontSize: "1.18rem",
                  padding: "0.42rem 1.1rem 0.42rem 2.2rem",
                  borderRadius: "0.375rem",
                  border: `1.2px solid #B39793`, // Changed border color
                  width: "100%",
                  color: mainTextColor,
                  height: 38,
                  boxSizing: "border-box",
                }}
                aria-label="Search staff"
              />
              {/* Search Icon - Fixed position and color */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  transform: "translateY(-50%)",
                  color: "#B39793", // Changed icon color
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" stroke="#B39793" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#B39793" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            {/* Sort Button (From 1st) */}
            <button
              style={{
                marginLeft: "auto",
                background: "#fdfbf8",
                border: "1.3px solid #B39793", // Changed border color
                borderRadius: 12,
                fontFamily: "Calibri, Arial, sans-serif",
                fontSize: 17,
                color: "#BFA14A",
                fontWeight: 700,
                padding: "9px 25px 9px 18px",
                outline: "none",
                cursor: "pointer",
                position: "relative",
                minWidth: 140,
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "none",
                height: 38,
              }}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 5 }}>
                <circle cx="10" cy="10" r="8" stroke="#BFA14A" strokeWidth="1.3" fill="none" />
                <path d="M7 10h6M10 7v6" stroke="#BFA14A" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              From 1st
            </button>
            {/* Staff Performance Icon added here */}
            <StaffPerformanceIcon
                onClick={() => window.location.href = "/dashboard/restaurantprofile"} // Navigates back to restaurant profile
                imageUrl="https://placehold.co/40x40/D5D5D5/000000?text=SP" // Placeholder image for now
                circleColor="#D5D5D5"
                size={40}
            />
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
              fontSize: 18.5,
              color: mainTextColor,
              background: "#fff",
            }}>
              <thead>
                <tr style={{
                  background: "#fff",
                  color: mainTextColor,
                  fontWeight: 700,
                  fontSize: 18.5,
                  borderBottom: `2px solid ${tableBorderColor}`,
                  letterSpacing: 0.04,
                }}>
                  <th style={{ padding: "15px 24px 15px 22px", textAlign: "left", border: "none" }}>Image</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Name</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Designation</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Salary</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Orders Served</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Hours Worked</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Leaves Taken</th>
                  <th style={{ padding: "15px 24px", textAlign: "left", border: "none" }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {/* Display only the first entry */}
                {filteredData.slice(0, 1).map((row, idx) => (
                  <tr key={idx} style={{
                    borderBottom: "none", // No border for a single entry
                    fontWeight: 500,
                    background: "#fff",
                  }}>
                    <td style={{ padding: "18px 24px 18px 22px", border: "none" }}>
                      {/* Avatar icon */}
                      <svg width="38" height="38" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="13" r="10" stroke="#4B3937" strokeWidth="2.1" />
                        <circle cx="14" cy="10" r="4" stroke="#4B3937" strokeWidth="1.6" />
                        <path d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5" stroke="#4B3937" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.name}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.designation}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.salary}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.ordersServed}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.hoursWorked}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.leavesTaken}</td>
                    <td style={{ padding: "18px 24px", border: "none", color: mainTextColor }}>{row.rating}</td>
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
              right: 22,
              bottom: -30,
              userSelect: "none",
              letterSpacing: "0.02em",
              background: "transparent",
              zIndex: 11,
              textAlign: "right"
            }}
          >
            {filteredData.length === 0
              ? "0 of 0 items"
              : `${Math.min(1, filteredData.length)} of 202 items`}
          </div>
        </div>
      </div>
    </div>
  );
}
