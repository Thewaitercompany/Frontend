import React, { useState, useEffect, useRef } from 'react';
import reportImage from './1602775652-72255f886a64b064e6-40682960.png';

// ---- CARD BOUNDARY COMPONENT FOR BLOCKS ----
function CardBoundary({ title, onViewMore, children }) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#fff",
        border: "none",
        width: "75%",                     // ✅ perfect width
        height: 210,                      // ⬆️ was 168, increased by 10px (≈ 2 units)
        boxShadow:
          "0 6px 14px 0 rgba(185, 185, 185, 0.13), 0 2px 6px 0 rgba(185, 185, 185, 0.13)",
        position: "relative",
        margin: "auto",
        padding: "8px 8px 39px 8px",      // ⬆️ slight bottom padding increase
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "visible"
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontFamily: "Georgia, Times New Roman, serif",
          fontWeight: 550,
          color: "#bfa14a",
          fontSize: 23,
          marginTop: 13,
          marginBottom: 6,
          textAlign: "center",
          letterSpacing: 0.06,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          userSelect: "none",
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
        }}
      >
        <img
          src={reportImage}
          style={{
            width: 446,
            height: 98,
            objectFit: "contain",
            display: "block",
            margin: "0 auto"
          }}
          alt={title}
        />
      </div>

      {/* View More Button */}
      <button
      style={{
        position: "absolute",
        right: 22,
        bottom: 13,
        color: "#b5b8bf",                  // ✅ soft grey text
        background: "none",
        border: "none",
        outline: "none",
        borderRadius: 6,
        fontSize: 15.5,
        fontWeight: 500,
        letterSpacing: 0.08,
        padding: 0,
        cursor: "pointer",
        transition: "color 0.13s",
        zIndex: 2,
        fontFamily: "Calibri, Arial, sans-serif",
        minWidth: 83,
        minHeight: 19,
        textAlign: "right",
        userSelect: "none",
      }}
      onClick={() => {
        }}
      >
        View More
      </button>
      {children}
    </div>
  );
}

// Sidebar Icon Setup
const SIDEBAR_ICON_SIZE = 40;
const SIDEBAR_ICON_COLOR = "#F1EBE6";
const SIDEBAR_ICON_ACTIVE_COLOR = "#653211";
const SIDEBAR_ICON_GAP = 7;
const SIDEBAR_BG = "#b3878b";

const SidebarIconsFigma = [
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-user">
      <circle cx="14" cy="14" r="10" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <circle cx="14" cy="10" r="4.2" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <path d="M6.2 21c.1-3.2 3.3-5.2 7.8-5.2 4.5 0 7.7 2 7.8 5.2" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-check">
      <rect x="5.5" y="5.5" width="17" height="17" rx="4.1" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <path d="M8.7 18.2 13 13l3.2 3.2 4.1-4.9" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-ellipse">
      <ellipse cx="14" cy="9.5" rx="7.3" ry="2.8" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <path d="M14 12.2v7" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 17.8c-1.5 1.2-2.2 2.2-2.2 2.6" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 17.8c1.5 1.2 2.2 2.2 2.2 2.6" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M11.8 20.4v2.1" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16.2 20.4v2.1" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-book">
      <rect x="6.8" y="7.6" width="14.4" height="12.8" rx="2.2"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.7" />
      <path d="M14 7.6v6.1l2-1 2 1V7.6" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M14 7.6v12.8" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-home">
      <path d="M14 5.6 22 10.6v6.8l-8 5-8-5v-6.8L14 5.6Z" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <rect x="11" y="13" width="2" height="4" rx="1" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} />
      <rect x="15" y="10" width="2" height="7" rx="1" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-doc">
      <rect x="8.2" y="6.7" width="11.6" height="16.1" rx="2.2" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <rect x="11" y="4.3" width="6" height="3.2" rx="1.6" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.5" />
      <path d="m11.5 15.5 2.5 2.5 4-5" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-bar">
      <rect x="5.5" y="5.5" width="17" height="17" rx="2.5" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <rect x="9.5" y="10.5" width="2" height="8" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} />
      <rect x="12.5" y="13.5" width="2" height="5" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} />
      <rect x="15.5" y="11.5" width="2" height="7" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} />
      <rect x="7.5" y="7.5" width="13" height="13" rx="2" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.2" opacity="0.6" />
    </svg>
  ),
];

const REPORTS = [
  {
    title: "Revenue Report",
    icon: "🧾",
    description:
      "Track your total earnings across all services. Get a detailed breakdown of daily, weekly, and monthly income to monitor business growth.",
  },
  {
    title: "Expense Report",
    icon: "💸",
    description:
      "Stay on top of your costs. View a full list of your operational expenses to understand spending patterns and improve profit margins.",
  },
  {
    title: "Profit/Loss Report",
    icon: "📊",
    description:
      "See your net gain or loss in one glance. Compare your revenues against expenses to evaluate overall business performance.",
  },
  {
    title: "GST Report",
    icon: "🧾",
    description:
      "Access accurate GST calculations based on your sales and purchases. Simplify tax filing with automated breakdowns.",
  },
  {
    title: "Dish Performance",
    icon: "🍽",
    description:
      "Know which menu items are winning or wasting. Analyze individual dish sales, popularity, and impact on revenue.",
  },
  {
    title: "Peak Hours",
    icon: "⏰",
    description:
      "Find out when your cafe is buzzing. Use this to manage staffing, promotions, and inventory during high-traffic times.",
  },
  {
    title: "Staff Report",
    icon: "👨‍🍳",
    description:
      "Monitor staff attendance, performance, and productivity. Improve scheduling and reward top-performing team members.",
  },
  {
    title: "Wastage Report",
    icon: "🗑",
    description:
      "Track food and material waste to reduce losses. Gain insights into overstocking, spoilage, and kitchen inefficiencies.",
  },
];
function DashboardPage() {
  const [reportsVisible, setReportsVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeDescIndex, setActiveDescIndex] = useState(null);
  const [descBoxPos, setDescBoxPos] = useState({ col: 0, row: 0 });
  const [activeSidebarIdx, setActiveSidebarIdx] = useState(null);
  const searchInputRef = useRef(null);

  // Date/Time state for top right
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time in "Tue 10 Jun 06:36AM" style
  function formatDateTime(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let h = date.getHours();
    let m = date.getMinutes();
    let ampm = "AM";
    if (h >= 12) {
      ampm = "PM";
      if (h > 12) h -= 12;
    }
    if (h === 0) h = 12;
    return (
      days[date.getDay()] +
      " " +
      ("0" + date.getDate()).slice(-2) +
      " " +
      months[date.getMonth()] +
      " " +
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ampm
    );
  }

  useEffect(() => {
    if (reportsVisible) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
      setActiveDescIndex(null);
    }
  }, [reportsVisible]);

  const sidebarIconCount = SidebarIconsFigma.length;
  const SIDEBAR_WIDTH = 58;
  const SIDEBAR_HEIGHT = 416;
  const SIDEBAR_BORDER_RADIUS = "0 8px 8px 0";
  const SIDEBAR_TOP_OFFSET = 152;
  const SIDEBAR_BEZEL = 1;

  const iconsTotalHeight = sidebarIconCount * SIDEBAR_ICON_SIZE + (sidebarIconCount - 1) * SIDEBAR_ICON_GAP;
  const equalBezelPadding = Math.max((SIDEBAR_HEIGHT - iconsTotalHeight) / 2, SIDEBAR_BEZEL);

  const logoSrc = "/Screenshot 2025-06-07 171759.png";
  const SCALE = 0.75;

  // Slightly wider and just a little bit lower (down) and to the left
  const BLOCK_SHIFT_LEFT = 40;
  const BLOCK_SHIFT_DOWN = 145;
  const TITLE_SCALE = 1;
  const MAINBLOCK_WIDTH = 1375; // a little more wide
  const MAINBLOCK_MAXWIDTH = 1600;

  const [blockHeight, setBlockHeight] = useState(window.innerHeight - 60 - (BLOCK_SHIFT_DOWN + 30));
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
      ? `${(120 + 18) * minRows}px`
      : undefined;
  const gridMaxHeight = searchValue.trim() ? `${230 * SCALE}px` : undefined;

  const centerBlockBg = "#ffffff";
  const blockBg = "#ffffff";
  const cardShadowFigma = "0 4px 18px 0 rgba(210,190,160,0.10), 0 1.5px 7px 0 rgba(210,190,160,0.10)";

const reportsBlockStyle = {
  margin: `${BLOCK_SHIFT_DOWN}px auto 0 ${BLOCK_SHIFT_LEFT}px`,
  background: centerBlockBg,
  borderRadius: 12,
  position: "relative",
  overflow: 'visible',
  boxShadow: '0 7px 24px 0 rgba(200,170,120,0.10), 0 8px 15px rgba(0,0,0,0.08)',
  border: "1.7px solid #ede6dd",
  width: `${MAINBLOCK_WIDTH}px`,
  maxWidth: `${MAINBLOCK_MAXWIDTH}px`,
  // Change the next line only:
  height: `${blockHeight + 19}px`, // ⬆️ was +18, now +19 for +1 "unit" on bottom
  minHeight: '555px', // ⬆️ was 540px, now 541px for +1 "unit" on bottom
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
  const SEARCH_FONT_SIZE = 18 * SEARCH_BAR_SCALE * SCALE;
  const SEARCH_HEIGHT = 44 * SEARCH_BAR_SCALE * SCALE;
  const SEARCH_WIDTH = 400 * SEARCH_BAR_SCALE * SCALE;
  const SEARCH_BAR_RADIUS = "5px";

  const reportsTitleFontSize = (40 - 2) * TITLE_SCALE * SCALE;
  const reportsTitleTop = -54 * SCALE - 36;
  const reportsTitlePadding = "22px 4px";
  const reportsTitleLeft = `4px`;

  const SEARCH_BAR_TOP_PADDING = 16 * SCALE * 1.1;

  // Block content
  const blockHeadingFontSize = 21; // reduced a little
  const viewMoreFontSize = 16;
  const imageWidth =205;
  const imageHeight = 140;

  const descContent = [
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>🧾</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Revenue Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left",
        wordBreak: "break-word"
      }}>
        Track your total earnings across all services.
        Get a detailed breakdown of daily, weekly, and monthly income to monitor business growth.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>💸</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Expense Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Stay on top of your costs.<br />
        View a full list of your operational expenses to understand spending patterns and improve profit margins.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>📊</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Profit/Loss Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        See your net gain or loss in one glance.<br />
        Compare your revenues against expenses to evaluate overall business performance.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>🧾</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        GST Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Access accurate GST calculations based on your sales and purchases.<br />
        Simplify tax filing with automated breakdowns.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>🍽</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Dish Performance
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Know which menu items are winning or wasting.<br />
        Analyze individual dish sales, popularity, and impact on revenue.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>⏰</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Peak Hours
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Find out when your cafe is buzzing.<br />
        Use this to manage staffing, promotions, and inventory during high-traffic times.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>👨‍🍳</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Staff Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Monitor staff attendance, performance, and productivity.<br />
        Improve scheduling and reward top-performing team members.
      </div>
    </>,
    <>
      <span style={{ fontSize: 16, marginRight: 10, verticalAlign: "middle" }}>🗑</span>
      <span style={{ fontWeight: 600, fontSize: 16, color: "#bfa14a", fontFamily: "Georgia, Times New Roman, serif", padding: 0 }}>
        Wastage Report
      </span>
      <div style={{
        margin: "10px 0 0 0",
        fontSize: 12,
        color: "#6d4b37",
        fontFamily: "Calibri, Arial, sans-serif",
        lineHeight: 1.5,
        letterSpacing: 0.01,
        fontWeight: 500,
        textAlign: "left"
      }}>
        Track food and material waste to reduce losses.<br />
        Gain insights into overstocking, spoilage, and kitchen inefficiencies.
      </div>
    </>
  ];

  useEffect(() => {
    if (activeDescIndex !== null) {
      const close = (e) => {
        if (!e.target.closest('.desc-popup') && !e.target.closest('.view-more-btn')) {
          setActiveDescIndex(null);
        }
      };
      window.addEventListener("mousedown", close);
      return () => window.removeEventListener("mousedown", close);
    }
  }, [activeDescIndex]);

  function getDescPopupStyle(col, row) {
    return {
      position: "absolute",
      zIndex: 100,
      background: "#fff6f0",
      color: "#5c2a12",
      minWidth: 160,
      maxWidth: 220,
      width: "max-content",
      border: "1.5px solid #e1bdb1",
      borderRadius: 10,
      boxShadow: "0 4px 12px 0 rgba(170,140,100,0.12), 0 2px 8px 0 rgba(90,70,55,0.06)",
      padding: "8px 10px 7px 10px",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
      textAlign: "left",
      userSelect: "auto",
      pointerEvents: "auto",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      maxHeight: "135px",
      overflowY: "auto",
      left: col === 3 ? "auto" : 4,
      right: col === 3 ? 4 : "auto",
      marginLeft: col === 3 ? "unset" : "4px",
      marginRight: col === 3 ? "4px" : "unset",
      bottom: "auto",
      top: 0,
      boxSizing: "border-box",
    };
  }

  return (
    <div className="flex h-screen bg-[#F0EBDE] overflow-hidden" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div className="flex flex-col items-center"
        style={{
          width: SIDEBAR_WIDTH,
          height: SIDEBAR_HEIGHT,
          background: SIDEBAR_BG,
          borderRadius: SIDEBAR_BORDER_RADIUS,
          position: 'fixed',
          top: SIDEBAR_TOP_OFFSET,
          left: 0,
          zIndex: 10,
          boxShadow: '0 6px 24px 0 rgba(120,68,52,0.17)',
          justifyContent: "flex-start",
          transition: "box-shadow 0.22s, background 0.22s",
          borderLeft: "none",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            paddingTop: equalBezelPadding,
            paddingBottom: equalBezelPadding,
            gap: SIDEBAR_ICON_GAP,
            height: '100%',
            justifyContent: 'center',
          }}
        >
          {SidebarIconsFigma.map((IconComp, idx) => (
            <span
              key={idx}
              className="flex items-center justify-center"
              style={{
                width: SIDEBAR_ICON_SIZE,
                height: SIDEBAR_ICON_SIZE,
                borderRadius: 8,
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.15s",
                marginBottom: idx === SidebarIconsFigma.length - 1 ? 0 : SIDEBAR_ICON_GAP,
              }}
              onClick={() => {
                setActiveSidebarIdx(idx);
                if (idx === 6) {
                  setReportsVisible(v => !v);
                } else {
                  setReportsVisible(false);
                }
              }}
            >
              {IconComp(idx === activeSidebarIdx)}
            </span>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20,
        width: 400,
        height: 130,
        display: 'flex',
        alignItems: 'flex-start',
        pointerEvents: 'none'
      }}>
        {logoSrc && (
          <img
            src={logoSrc}
            alt="Smart Cafe Logo"
            className="object-contain"
            style={{
              maxHeight: 130,
              maxWidth: 400,
              width: 'auto',
              height: 'auto',
              display: 'block'
            }}
          />
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* Top right: Date/time and bell */}
        <div
          className="flex flex-col items-end"
          style={{
            position: 'fixed',
            top: 20,
            right: 40,
            zIndex: 30,
            alignItems: 'flex-end'
          }}
        >
          <span
            className="font-medium"
            style={{
              color: '#7B3F00',
              fontSize: 22,
              fontFamily: 'Calibri, Arial, sans-serif',
              marginBottom: 5,
              letterSpacing: 0.2,
              minWidth: 180,
              textAlign: 'right'
            }}
          >
            {formatDateTime(currentTime)}
          </span>
          <div className="relative cursor-pointer mt-1">
            {/* Bell icon */}
            <svg width={36} height={33} viewBox="0 0 36 33" fill="none" style={{ display: "block" }}>
              <ellipse cx="18" cy="5" rx="5.5" ry="3.2" fill="#3A2102" />
              <path d="M28 18V13C28 8.477 23.523 4 18 4C12.477 4 8 8.477 8 13V18L5 23V24.5H31V23L28 18Z"
                stroke="#3A2102" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#3A2102" />
              <circle cx="18" cy="29" r="2.7" fill="#3A2102" />
            </svg>
          </div>
        </div>

         {/* REPORTS & ANALYTICS BLOCK */}
        <div style={reportsBlockStyle}>
          {/* Title */}
          <div style={{
            position: "absolute",
            left: reportsTitleLeft,
            top: reportsTitleTop,
            fontSize: `${reportsTitleFontSize}px`,
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
          {reportsVisible && (
            <>
              {/* Top search bar with increased bezel and sharp corners */}
              <div
                style={{
                  padding: `${SEARCH_BAR_TOP_PADDING}px ${28 * SCALE * 1.3}px 0 ${28 * SCALE * 1.3}px`,
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
                      background: "#fcfaf8",
                      border: "1.6px solid #e7dfd7",
                      borderRadius: SEARCH_BAR_RADIUS,
                      boxShadow: "0 2px 12px 0 rgba(210,190,160,0.10)",
                      zIndex: 3,
                    }}
                    onClick={() => searchInputRef.current && searchInputRef.current.focus()}
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
                        pointerEvents: "none"
                      }}
                    >
                      <circle cx="9" cy="9" r="7" stroke="#bca177" strokeWidth="2" />
                      <line x1="15.2" y1="15.2" x2="19" y2="19" stroke="#bca177" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
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
                        paddingLeft: `${45 * SEARCH_BAR_SCALE}px`,
                        paddingRight: "12px",
                        fontWeight: 400,
                      }}
                    />
                    {!searchValue && (
                      <span
                        style={{
                          position: "absolute",
                          left: `${45 * SEARCH_BAR_SCALE}px`,
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
                  {/* Soft curved bottom border below the search bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: "0%",
                      right: "0%",
                      top: "calc(100% + 11px)",
                      height: "10px",
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "0 0 24px 24px",
                        background: "linear-gradient(180deg, #ede6dd 72%, rgba(255,255,255,0) 100%)",
                        boxShadow: "0 3px 8px rgba(210,180,140,0.13)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Faded, separation line like the inbox design */}
                <div
                  style={{
                    width: "90%",
                    height: "8px", // enough height to show fade
                    position: "relative",
                    margin: "12px 0",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "0 0 18px 18px",
                      background: "linear-gradient(to bottom, rgb(149, 145, 137)), rgba(255,255,255,0))",
                      boxShadow: "0 2px 4px rgba(170, 140, 100, 0.08)",
                    }}
                  />
                </div>
              {/* 4x2 report grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: `1px 7px`,
                  padding: `0 20px 0 13px`,
                  flex: 1,
                  minHeight: gridMinHeight,
                  maxHeight: gridMaxHeight,
                  overflow: "visible"
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
                {filteredReports.map((r, idx) => {
                  const originalIdx = REPORTS.findIndex(rr => rr.title === r.title);
                  const col = idx % 4;
                  const row = Math.floor(idx / 4);
                  return (
                    <CardBoundary
                      key={r.title}
                      title={r.title}
                      onViewMore={() => {
                        setActiveDescIndex(originalIdx);
                        setDescBoxPos({ col, row });
                      }}
                    >
                      {activeDescIndex === originalIdx && (
                        <div
                          className="desc-popup"
                          onClick={e => e.stopPropagation()}
                          style={getDescPopupStyle(col, row)}
                        >
                          {descContent[originalIdx]}
                        </div>
                      )}
                    </CardBoundary>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* EMPTY DASHBOARD (when reports block not visible) */}
        {(!reportsVisible) && (
          <div
            className="flex justify-center items-center w-full"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 32 * SCALE,
              color: "#bfa99a",
              fontWeight: 600,
              letterSpacing: 1.2,
              textAlign: "center",
              userSelect: "none",
              zIndex: 1,
            }}
          >
            Dashboard is empty for now.
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
