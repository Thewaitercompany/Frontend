'use client';

import React, {
  useState,
  useEffect,
  ChangeEvent,
  CSSProperties,
} from 'react';
import { useRouter } from 'next/navigation'; // <-- Import useRouter for navigation

const reportImageUrl = "/1602775652-72255f886a64b064e6-40682960.png";

type CardBoundaryProps = {
  title: string;
  onClick: () => void;
};

function CardBoundary({ title, onClick }: CardBoundaryProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        background: "#fdfbf8",
        border: "none",
        width: "88%",
        height: 240,
        boxShadow:
          "0 6px 14px 0 rgba(185, 185, 185, 0.13), 0 2px 6px 0 rgba(185, 185, 185, 0.13)",
        position: "relative",
        margin: "auto",
        padding: "8px 8px 39px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "visible",
        cursor: "pointer",
        outline: "none",
        transition: "background 0.18s",
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontFamily: "Georgia, Times New Roman, serif",
          fontWeight: hovered ? 900 : 700,
          color: "#bfa14a",
          fontSize: 20,
          marginTop: 1,
          marginBottom: 6,
          textAlign: "center",
          letterSpacing: 0.06,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block", // Underline fits text
          userSelect: "none",
          position: "relative",
          borderBottom: hovered ? "3px solid #bfa14a" : "none",
          paddingBottom: hovered ? 1 : 0,
          textShadow: hovered ? "0 0 1px #bfa14a, 0 0 1px #bfa14a" : "none",
          transition: "font-weight 0.18s, border-bottom 0.18s, padding-bottom 0.18s, text-shadow 0.18s",
        }}
      >
        {title}
      </div>
      {/* Image */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0",
          minHeight: 104,
          zIndex: 1,
          marginTop: 12,
        }}
      >
        <img
          src={reportImageUrl}
          style={{
            width: 160,
            height: 110,
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
            transform: hovered ? "scale(1.55)" : "scale(1.39)",
            transition: "transform 0.30s cubic-bezier(.4,1,.7,1)",
            willChange: "transform",
            background: "transparent",
          }}
          alt={title}
          loading="lazy"
        />
      </div>
      {/* View More Button */}
      <div
        style={{
          position: "absolute",
          right: 22,
          bottom: 13,
          color: hovered ? "#bfa14a" : "#b5b8bf",
          background: "none",
          border: "none",
          outline: "none",
          borderRadius: 6,
          fontSize: 15.5,
          fontWeight: hovered ? 700 : 500,
          letterSpacing: 0.08,
          padding: 0,
          cursor: "pointer",
          transition: "color 0.13s, text-decoration 0.13s, font-weight 0.13s",
          zIndex: 2,
          fontFamily: "Calibri, Arial, sans-serif",
          minWidth: 83,
          minHeight: 19,
          textAlign: "right",
          userSelect: "none",
          textDecoration: hovered ? "underline" : "none",
          textDecorationColor: hovered ? "#bfa14a" : undefined,
          textUnderlineOffset: hovered ? 2 : undefined,
        }}
      >
        View More
      </div>
    </div>
  );
}

type Report = {
  title: string;
  icon: string;
};

const REPORTS: Report[] = [
  { title: "Revenue Report", icon: "🧾" },
  { title: "Expense Report", icon: "💸" },
  { title: "Profit/Loss Report", icon: "📊" },
  { title: "GST Report", icon: "🧾" },
  { title: "Dish Performance", icon: "🍽" },
  { title: "Peak Hours", icon: "⏰" },
  { title: "Staff Report", icon: "👨‍🍳" },
  { title: "Wastage Report", icon: "🗑" },
];

function slugify(title: string) {
  // Remove spaces, slashes, and special characters, make lower case
  return title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function DashboardPage() {
  const [showTitle, setShowTitle] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter(); // <-- Add useRouter here

  const reportsVisible = true;

  useEffect(() => {
    setShowTitle(true);
  }, []);

  const MAINBLOCK_WIDTH = 1380;
  const MAINBLOCK_MAXWIDTH = 1600;
  const BLOCK_SHIFT_LEFT = 80;
  const BLOCK_SHIFT_DOWN = 130;

  const [blockHeight, setBlockHeight] = useState(
    typeof window !== "undefined"
      ? window.innerHeight - 60 - (BLOCK_SHIFT_DOWN + 30)
      : 600
  );
  useEffect(() => {
    const handleResize = () => {
      setBlockHeight(window.innerHeight - 60 - (BLOCK_SHIFT_DOWN + 30));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [BLOCK_SHIFT_DOWN]);

  const filteredReports = REPORTS.filter(r =>
    r.title.toLowerCase().includes(searchValue.trim().toLowerCase())
  );
  const minRows = 2;
  const gridMinHeight =
    filteredReports.length < minRows * 4
      ? ((120 + 18) * minRows) + "px"
      : undefined;

  const gridMaxHeight = searchValue.trim() ? (230 * 0.75) + "px" : undefined;

  const centerBlockBg = "#fdfbf8";
  const reportsBlockStyle: CSSProperties = {
    margin: BLOCK_SHIFT_DOWN + "px auto 0 " + BLOCK_SHIFT_LEFT + "px",
    background: centerBlockBg,
    borderRadius: 12,
    position: "absolute",
    left: 70 - 40,
    top: -15,
    overflow: 'visible',
    boxShadow: '0 7px 24px 0 rgba(200,170,120,0.10), 0 8px 15px rgba(0,0,0,0.08)',
    border: "1.7px solid #ede6dd",
    width: MAINBLOCK_WIDTH + "px",
    maxWidth: MAINBLOCK_MAXWIDTH + "px",
    height: (blockHeight + 5.2) + "px",
    minHeight: '555px',
    padding: "0 0 22px 0",
    transition: "transform 0.7s cubic-bezier(.7,-0.18,.39,1.24), opacity 0.7s cubic-bezier(.7,-0.18,.39,1.24)",
    transform: reportsVisible
      ? "translateY(0) scale(1)"
      : "translateY(200px) scale(0.85)",
    opacity: reportsVisible ? 1 : 0,
    pointerEvents: reportsVisible ? 'auto' : 'none',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
  };

  const SEARCH_BAR_SCALE = 0.8 * 1.3;
  const SEARCH_FONT_SIZE = 18 * SEARCH_BAR_SCALE * 0.75;
  const SEARCH_HEIGHT = 44 * SEARCH_BAR_SCALE * 0.75;
  const SEARCH_WIDTH = 400 * SEARCH_BAR_SCALE * 0.75;
  const SEARCH_BAR_RADIUS = "5px";

  const reportsTitleFontSize = (40 - 2) * 1 * 0.75;
  const reportsTitleTop = -54 * 0.75 - 36;
  const reportsTitlePadding = "22px 4px";
  const reportsTitleLeft = 4;

  const SEARCH_BAR_TOP_PADDING = 16 * 0.75 * 1.1;

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Calibri, Arial, sans-serif', background: 'transparent' }}>
      {/* Main content area */}
      <div className="flex-1 flex flex-col relative" style={{ background: 'none' }}>
        {/* Reports & Analytics Block */}
        {reportsVisible && (
          <div style={reportsBlockStyle}>
            {/* Title */}
            <div style={{
              position: "absolute",
              left: reportsTitleLeft,
              top: reportsTitleTop,
              fontSize: reportsTitleFontSize + "px",
              fontWeight: 600,
              color: "#8b5b2b",
              fontFamily: "Georgia, Times New Roman, serif",
              letterSpacing: "0.8px",
              opacity: showTitle ? 1 : 0,
              transition: "opacity 0.5s",
              zIndex: 15,
              pointerEvents: "none",
              userSelect: "none",
              background: "none",
              padding: reportsTitlePadding,
              border: "none",
              boxShadow: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "1180px",
              maxWidth: "90vw",
            }}>
              Reports & Analytics
            </div>
            {/* Top search bar with increased bezel and sharp corners */}
            <div
              style={{
                padding: SEARCH_BAR_TOP_PADDING + "px " + (28 * 0.75 * 1.3) + "px 0 " + (28 * 0.75 * 1.3) + "px",
                display: "flex",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: SEARCH_WIDTH,
                    height: SEARCH_HEIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    background: "#fdfbf8",
                    border: "1.6px solid #e7dfd7",
                    borderRadius: SEARCH_BAR_RADIUS,
                    boxShadow: "0 2px 12px 0 rgba(210,190,160,0.10)",
                    zIndex: 3,
                  }}
                >
                  <svg
                    width={22 * SEARCH_BAR_SCALE}
                    height={22 * SEARCH_BAR_SCALE}
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                      position: 'absolute',
                      left: 16 * SEARCH_BAR_SCALE,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: "#bca177",
                      pointerEvents: "none",
                    }}
                  >
                    <circle cx="9" cy="9" r="7" stroke="#bca177" strokeWidth="2" />
                    <line x1="15.2" y1="15.2" x2="19" y2="19" stroke="#bca177" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    placeholder=""
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: SEARCH_FONT_SIZE,
                      fontFamily: "Calibri, Arial, sans-serif",
                      color: "#7B3F00",
                      paddingLeft: (45 * SEARCH_BAR_SCALE) + "px",
                      paddingRight: "12px",
                      fontWeight: 400,
                    }}
                  />
                  {!searchValue && (
                    <span
                      style={{
                        position: "absolute",
                        left: (45 * SEARCH_BAR_SCALE) + "px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#bca177",
                        fontSize: SEARCH_FONT_SIZE,
                        fontFamily: "Calibri, Arial, sans-serif",
                        pointerEvents: "none",
                        opacity: 1,
                        userSelect: "none",
                        fontWeight: 400,
                      }}
                    >
                      Search
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* Faded, separation line */}
            <div
              style={{
                width: "100%",
                height: "4px",
                position: "relative",
                margin: "11px 0",
                zIndex: 6,
                pointerEvents: "none",
                borderRadius: "400",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "900",
                  background: "#e7dfd7",
                  boxShadow: "0 90px 90px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            {/* 4x2 report grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "13px 7px",
                padding: "0 20px 0 23px",
                flex: 1,
                minHeight: gridMinHeight,
                maxHeight: gridMaxHeight,
                overflow: "visible",
              }}>
              {filteredReports.length === 0 && (
                <div style={{
                  gridColumn: 'span 4',
                  textAlign: 'center',
                  color: "#bbb",
                  fontSize: 25,
                  fontFamily: "Calibri, Arial, sans-serif",
                  alignSelf: "center",
                }}>
                  No reports found.
                </div>
              )}
              {filteredReports.map((r, idx) => (
                <CardBoundary
                  key={r.title}
                  title={r.title}
                  onClick={() => {
                    // Go to /dashboard/reports/slug (eg: revenuereport, expensereport, wastagereport)
                    router.push(`/dashboard/reports/${slugify(r.title)}`);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DashboardPage;