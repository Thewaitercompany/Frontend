"use client";
import React, { useState } from "react";
// Removed: import { useRouter } from "next/navigation"; // Not used in this context

// Pen SVG icon component
function PenIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
        stroke="#4B3937"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        stroke="#4B3937"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

// Profile SVG icon component
const profileIcon = (
  <svg
    width={42}
    height={42}
    viewBox="0 0 28 28"
    fill="none"
    key="sidebar-user"
    style={{ marginLeft: 7 }}
  >
    <circle cx="14" cy="13" r="10" stroke="#4D3E3B" strokeWidth="1.8" />
    <circle cx="14" cy="10" r="4" stroke="#4D3E3B" strokeWidth="1.6" />
    <path
      d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5"
      stroke="#4D3E3B"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Staff Reviews Card component
function StaffReviewsCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "13px 14px 10px 14px", // Compact padding
        display: "flex",
        flexDirection: "column",
        gap: 7,
        color: "#4B3937",
        minHeight: 232, // Fixed height to ensure consistent layout
        maxHeight: 232, // Fixed height to ensure consistent layout
        justifyContent: "center",
        position: "relative",
        overflow: "hidden", // Prevents internal scrollbars for review content
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: "#4B3937",
          fontSize: 15.5,
          marginBottom: 3,
          fontFamily: "'Georgia', serif", // Georgia for headings
        }}
      >
        Reviews
      </div>
      <div style={{ zIndex: 1, position: "relative" }}>
        <div style={{ marginBottom: 2 }}>
          <span style={{ fontWeight: 600, color: "#4B3937" }}>Komal</span>
          <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>
            ★★★★★
          </span>
          <span
            style={{
              marginLeft: 2,
              color: "#4B3937",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            5
          </span>
          <div
            style={{
              color: "#4B3937",
              fontSize: 13.1,
              marginTop: 1,
              fontWeight: 400,
              letterSpacing: 0.01,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.36,
              maxWidth: "100%", // Ensures text fits within the card's width
              fontFamily: "'Inter', sans-serif", // Inter for body text
            }}
          >
            Hey,the service by Mr.Waiter was absolutely incredible,I loved the
            way he greeted us and welcomed😊
          </div>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: "#4B3937" }}>Sarthak</span>
          <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>
            ★★★★★
          </span>
          <span
            style={{
              marginLeft: 2,
              color: "#4B3937",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            5
          </span>
          <div
            style={{
              color: "#4B3937",
              fontSize: 12.9,
              marginTop: 1,
              fontWeight: 400,
              letterSpacing: 0.01,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.36,
              maxWidth: "100%", // Ensures text fits within the card's width
              fontFamily: "'Inter', sans-serif", // Inter for body text
            }}
          >
            Hey,the service by Mr. Waiter was absolutely incredible,I loved the
            way he greeted us and welcomed😊
          </div>
        </div>
      </div>
      {/* Visual fade effect at the bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          height: 36,
          background:
            "linear-gradient(to top, #00000040 0%, rgba(255,255,255,0) 100%)",
          opacity: 0.7,
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          textAlign: "right",
          color: "#b9b4ab",
          fontSize: 13,
          marginTop: -25,
          cursor: "pointer",
          zIndex: 3,
          position: "relative",
          fontFamily: "'Inter', sans-serif", // Inter for body text
        }}
      >
        View more
      </div>
    </div>
  );
}

// Simple Calendar component
function SimpleCalendar() {
  const leaveDays = [1, 12];
  const salaryDueDays = [28];

  const daysInMonth = 31;
  const startDay = 6;
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  // Generate calendar day cells
  const dayCells: JSX.Element[] = [];
  for (let i = 0; i < startDay; ++i) {
    dayCells.push(<td key={`empty-start-${i}`}></td>);
  }
  for (let d = 1; d <= daysInMonth; ++d) {
    const isLeave = leaveDays.includes(d);
    const isSalary = salaryDueDays.includes(d);
    dayCells.push(
      <td
        key={d}
        style={{
          textAlign: "center",
          padding: "4.4px 0",
          fontWeight: 500,
          color: "#4B3937",
          fontSize: 16,
          position: "relative",
          borderRadius: 999,
          cursor: "pointer",
          background: hoveredDate === d ? "#e2d5c0" : "transparent",
          transition: "background 0.11s",
        }}
        onMouseEnter={() => setHoveredDate(d)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {d}
        {isLeave && (
          <span
            style={{
              display: "block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c94536",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 2,
            }}
          ></span>
        )}
        {isSalary && (
          <span
            style={{
              display: "block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#F9B174",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 2,
            }}
          ></span>
        )}
      </td>
    );
  }
  // Fill empty cells at the end of the month if needed
  while (dayCells.length % 7 !== 0) {
    dayCells.push(<td key={`empty-end-${dayCells.length}`}></td>);
  }
  // Group cells into weeks (rows)
  const weekRows = [];
  for (let i = 0; i < dayCells.length; i += 7) {
    weekRows.push(<tr key={i}>{dayCells.slice(i, i + 7)}</tr>);
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 18px 0 rgba(140,110,70,0.06)",
        padding: "28px 26px 16px 26px",
        width: 280, // Matched with Profile Card width
        minWidth: 280, // Fixed minWidth
        maxWidth: 280, // Fixed maxWidth
        marginRight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "Georgia, Times New Roman, serif",
          fontWeight: 700,
          fontSize: 20,
          color: "#4B3937",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>March, 2025</span>
        <span
          style={{
            fontSize: 19,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ cursor: "pointer", color: "#c7b8a2" }}>&lt;</span>
          <span style={{ cursor: "pointer", color: "#c7b8a2" }}>&gt;</span>
        </span>
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4 }}
      >
        <thead>
          <tr style={{ fontSize: 14, color: "#a89d8d", fontWeight: 700 }}>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>{weekRows}</tbody>
      </table>
      <div
        style={{
          display: "flex",
          gap: 18,
          marginTop: 9,
          fontSize: 13.5,
          color: "#c1a381",
          alignItems: "center",
        }}
      >
        <span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#c94536",
              display: "inline-block",
              marginRight: 5,
              verticalAlign: "middle",
            }}
          ></span>{" "}
          Leave taken
        </span>
        <span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#F9B174",
              display: "inline-block",
              marginRight: 5,
              verticalAlign: "middle",
            }}
          ></span>{" "}
          Salary due date
        </span>
      </div>
    </div>
  );
}

// Dishes Served Graph component
function DishesServedGraph() {
  const data = [
    { hour: "10-11am", value: 78 },
    { hour: "11-12pm", value: 20 },
    { hour: "12-1pm", value: 37 },
    { hour: "1-2pm", value: 30 },
    { hour: "2-3pm", value: 50 },
    { hour: "3-4pm", value: 115 },
  ];
  const maxY = 120;
  const chartHeight = 190;
  // Calculate chartWidth based on Personal Info Card + Reviews Card + gap
  // Personal Info Card width (322) + Reviews Card width (280) + gap (28) = 630
  const chartWidth = 630;

  // Function to generate SVG path for a smooth curve
  function getCurve(points: [number, number][]) {
    let d = `M ${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const cx1 = x1 + (x2 - x1) / 2;
      const cy1 = y1;
      const cx2 = x1 + (x2 - x1) / 2;
      const cy2 = y2;
      d += ` C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
    }
    return d;
  }

  // Calculate points for the graph line
  const points = data.map((d, i) => [
    (chartWidth / (data.length - 1)) * i,
    chartHeight - (d.value / maxY) * chartHeight,
  ]) as [number, number][];

  // Create the area path by closing the curve to the x-axis
  const areaPath =
    getCurve(points) +
    ` L ${points[points.length - 1][0]},${chartHeight} L ${
      points[0][0]
    },${chartHeight} Z`;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 18px 0 rgba(140,110,70,0.06)",
        padding: "28px 26px 16px 26px",
        minWidth: chartWidth, // Fixed minWidth to match calculated width
        maxWidth: chartWidth, // Fixed maxWidth to match calculated width
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, Times New Roman, serif",
            fontWeight: 700,
            fontSize: 17.5,
            color: "#4B3937",
          }}
        >
          Dishes Served
        </span>
        <button
          style={{
            fontFamily: "Calibri, Arial, sans-serif",
            fontSize: 13.5,
            color: "#BFA14A",
            background: "#fdfbf8",
            fontWeight: 700,
            border: "1.3px solid #d8cbb7",
            borderRadius: 10,
            padding: "6px 16px",
            outline: "none",
            cursor: "pointer",
            boxShadow: "none",
          }}
        >
          Today
        </button>
      </div>
      {/* SVG for the graph */}
      <svg
        width={chartWidth}
        height={chartHeight + 27}
        style={{ marginBottom: -3 }}
      >
        {/* Horizontal grid lines */}
        {[0, 30, 60, 90, 120].map((y, i) => (
          <line
            key={i}
            x1={0}
            x2={chartWidth}
            y1={chartHeight - (y / maxY) * chartHeight}
            y2={chartHeight - (y / maxY) * chartHeight}
            stroke="#ede6dd"
            strokeWidth={1}
          />
        ))}
        {/* Area under the curve */}
        <path d={areaPath} fill="#C4A1FF" />
        {/* X-axis labels (hours) */}
        {data.map((d, i) => (
          <text
            key={i}
            x={points[i][0]}
            y={chartHeight + 21}
            textAnchor="middle"
            fontSize={13}
            fill="#a590c7"
            fontFamily="Calibri, Arial, sans-serif"
          >
            {d.hour}
          </text>
        ))}
      </svg>
      {/* Legend for the graph */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginLeft: 5,
          marginTop: 1,
          fontSize: 12.5,
          color: "#a590c7",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#C4A1FF",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        ></span>
        Quantity Served
      </div>
    </div>
  );
}

// Main Staff Profile Page component
export default function StaffProfilePage() {
  // State variables for input fields
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [joining, setJoining] = useState("");
  const [salary, setSalary] = useState("");

  // Common style for the pen icon's shadow and background
  const penShadowStyle: React.CSSProperties = {
    boxShadow: "0 4px 18px 0 rgba(130,130,130,0.17)",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Handler for the back button, simulates navigation
  const handleBackButtonClick = () => {
    // Using window.location.href for general React environments
    window.location.href = "/dashboard/restaurantprofile";
  };

  // Fixed values for back button and main block positioning, derived from RevenueReportPage
  const backButtonTop = 59;
  const backButtonLeft = 270; // Adjusted for rightward shift
  const mainBlockMarginTop = 100;
  const mainBlockMarginLeft = 280; // Adjusted for rightward shift
  // Increased width to make it elongated horizontally, ensuring content still fits
  const mainBlockWidth = 1050;

  return (
    <div
      style={{
        height: "100vh", // Main container height
        background: "#F5F1EB",
        fontFamily: "Calibri, Arial, sans-serif",
        position: "relative", // Needed for absolute positioning of back button
        overflow: "hidden", // Crucial for removing scrollbars on the main page
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Aligns content to the start when margin-left is applied
        padding: 0, // Reset padding as margin handles spacing
        boxSizing: "border-box", // Include padding in element's total width and height
      }}
    >
      {/* Back Button & Title Section - Absolutely Positioned */}
      <button
        style={{
          color: "#4D3E3B",
          background: "transparent",
          fontWeight: 700,
          letterSpacing: 0.1,
          fontFamily: "Georgia, Times New Roman, serif",
          fontSize: 20,
          border: "none",
          outline: "none",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 22, // High zIndex to keep it on top
          gap: 0,
          padding: 0,
          transition: "top 0.2s",
          position: "absolute", // Absolute positioning
          top: backButtonTop, // Fixed top position
          left: backButtonLeft, // Fixed left position, shifted right
        }}
        onClick={handleBackButtonClick} // Uses the new handler for back navigation
        aria-label="Back to Restaurant Profile"
      >
        <span
          style={{
            fontSize: 34, // Increased size for consistency with RevenueReportPage
            color: "#4D3E3B",
            display: "inline-flex",
            alignItems: "center",
            height: 42, // Increased size
            width: 42, // Increased size
            justifyContent: "center",
            fontWeight: 700,
            paddingRight: 8,
            lineHeight: 1,
            marginLeft: 0,
          }}
        >
          &#60;
        </span>
        <span
          style={{
            fontFamily: "Georgia, Times New New Roman, serif",
            color: "#4D3E3B",
            fontWeight: 700,
            fontSize: 30, // Increased size for consistency
            marginLeft: 0,
          }}
        >
          Staff&apos;s Profile
        </span>
      </button>

      {/* Main Content Block (mimicking RevenueReportPage's structure) */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24, // Matched with RevenueReportPage
          boxShadow: "0 3px 18px 1px rgba(180,140,80,0.12)", // Matched with RevenueReportPage
          padding: "20px 20px 10px 22px", // Adjusted padding for content to fit
          width: mainBlockWidth, // Fixed width to ensure 3+2 layout fits
          maxWidth: "calc(100vw - " + (mainBlockMarginLeft + 20) + "px)", // Adjusted maxWidth to consider left margin and some right padding
          // Using fixed margins to match RevenueReportPage's position
          marginTop: mainBlockMarginTop,
          marginBottom: 10, // Adjusted to reduce vertical height slightly
          marginLeft: mainBlockMarginLeft, // Shifted right
          marginRight: "auto", // Push to right to ensure fixed left margin
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15, // Reduced gap to move bottom row upwards
          overflow: "hidden", // Prevents internal scrollbars within this block
        }}
      >
        {/* Top Row: 3 Cards (Profile, Personal Information, Reviews) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Horizontal layout
            gap: 28, // Gap between cards
            marginBottom: 12, // Spacing at the bottom
            minWidth: 0, // Allows shrinking
            width: "100%", // Takes full width of parent
            justifyContent: "center", // Centers cards when they are fewer or on smaller screens
          }}
        >
          {/* Profile Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 4px 18px 0 rgba(140,110,70,0.06)",
              padding: "20px 18px 13px 18px",
              width: 280, // Adjusted width to match Calendar and fit layout
              minWidth: 280, // Fixed size
              maxWidth: 280, // Fixed size
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ marginBottom: 6 }}>{profileIcon}</div>
            <div
              style={{
                fontFamily: "Georgia, Times New Roman, serif",
                fontWeight: 700,
                fontSize: 15.5,
                color: "#4B3937",
                marginBottom: 1,
              }}
            >
              Mr Cook
            </div>
            <div
              style={{
                fontFamily: "Georgia, Times New Roman, serif",
                fontWeight: 600,
                fontSize: 13.5,
                color: "#4B3937",
                marginBottom: 5,
              }}
            >
              Cook
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ color: "#FFA726", fontSize: 13 }}>★★★★★</span>
              <span
                style={{
                  marginLeft: 3,
                  color: "#4B3937",
                  fontWeight: 600,
                  fontSize: 11,
                }}
              >
                5
              </span>
            </div>
            <span
              style={{
                position: "absolute",
                right: 14,
                top: 14,
                zIndex: 2,
                width: 28,
                height: 28,
                ...penShadowStyle,
              }}
              aria-label="Edit Profile"
              tabIndex={0}
              role="button"
            >
              <PenIcon size={15} />
            </span>
          </div>
          {/* Personal Information Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 4px 18px 0 rgba(140,110,70,0.06)",
              padding: "20px 18px 13px 18px",
              width: 322, // Adjusted width to fit layout
              minWidth: 322, // Fixed size
              maxWidth: 322, // Fixed size
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, Times New Roman, serif",
                fontWeight: 700,
                fontSize: 14.5,
                color: "#4B3937",
                marginBottom: 3,
              }}
            >
              Personal Information
            </div>
            <span
              style={{
                position: "absolute",
                right: 14,
                top: 14,
                zIndex: 2,
                width: 24,
                height: 24,
                ...penShadowStyle,
              }}
              aria-label="Edit Personal Info"
              tabIndex={0}
              role="button"
            >
              <PenIcon size={13} />
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 7,
                width: "100%",
              }}
            >
              <label
                style={{
                  fontWeight: 500,
                  fontSize: 11.5,
                  marginBottom: 1,
                  color: "#4B3937",
                }}
              >
                Email Id
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Id"
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 4,
                  fontSize: 11.6,
                  color: "#4B3937",
                  padding: "6px 7px",
                  marginBottom: 2,
                  fontFamily: "Calibri, Arial, sans-serif",
                }}
              />
              <div style={{ display: "flex", gap: 6, width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontWeight: 500,
                      fontSize: 11.5,
                      marginBottom: 1,
                      color: "#4B3937",
                    }}
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Contact Number"
                    style={{
                      width: "100%",
                      border: "1.2px solid #B0B0B0",
                      background: "#fff",
                      borderRadius: 4,
                      fontSize: 11.6,
                      color: "#4B3937",
                      padding: "6px 7px",
                      marginBottom: 2,
                      fontFamily: "Calibri, Arial, sans-serif",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontWeight: 500,
                      fontSize: 11.5,
                      marginBottom: 1,
                      color: "#4B3937",
                    }}
                  >
                    Joining Date
                  </label>
                  <input
                    type="text"
                    value={joining}
                    onChange={(e) => setJoining(e.target.value)}
                    placeholder="Joining Date"
                    style={{
                      width: "100%",
                      border: "1.2px solid #B0B0B0",
                      background: "#fff",
                      borderRadius: 4,
                      fontSize: 11.6,
                      color: "#4B3937",
                      padding: "6px 7px",
                      marginBottom: 2,
                      fontFamily: "Calibri, Arial, sans-serif",
                    }}
                  />
                </div>
              </div>
              <label
                style={{
                  fontWeight: 500,
                  fontSize: 11.5,
                  marginBottom: 1,
                  color: "#4B3937",
                }}
              >
                Salary
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 4,
                  fontSize: 11.6,
                  color: "#4B3937",
                  padding: "6px 7px",
                  marginBottom: 2,
                  fontFamily: "Calibri, Arial, sans-serif",
                }}
              />
            </div>
          </div>
          {/* Reviews Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 4px 18px 0 rgba(140,110,70,0.06)",
              padding: "0px", // ReviewsCard component has its own padding
              width: 280, // Adjusted width to match Profile Card and fit layout
              minWidth: 280, // Fixed size
              maxWidth: 280, // Fixed size
              display: "flex",
              flexDirection: "column",
              gap: 0,
              color: "#4B3937",
              justifyContent: "center",
            }}
          >
            <StaffReviewsCard />
          </div>
        </div>

        {/* Bottom Row: Calendar and Graph */}
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Horizontal layout
            gap: 28, // Gap between cards
            minWidth: 1, // Allows shrinking
            marginBottom: 0, // Reduced to move bottom row upwards
            width: "100%", // Takes full width of parent
            justifyContent: "center", // Centers cards when they are fewer or on smaller screens
          }}
        >
          <SimpleCalendar />
          <DishesServedGraph />
        </div>
      </div>
    </div>
  );
}
