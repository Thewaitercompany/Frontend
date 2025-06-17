import React, { useState, useEffect } from 'react';

// Use a relative path from public/ for the image, since Next.js/Cra will automatically map /public/* to the root URL.
// So your file at /public/1602775652-72255f886a64b064e6-40682960.png is referenced as "/1602775652-72255f886a64b064e6-40682960.png"
const reportImageUrl = "/1602775652-72255f886a64b064e6-40682960.png";

// ---- CARD BOUNDARY COMPONENT FOR BLOCKS ----
function CardBoundary({ title, onViewMore, children }) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#fdfbf8",
        border: "none",
        width: "75%",
        height: 220,
        boxShadow:
          "0 6px 14px 0 rgba(185, 185, 185, 0.13), 0 2px 6px 0 rgba(185, 185, 185, 0.13)",
        position: "relative",
        margin: "auto",
        padding: "8px 8px 39px 8px",
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
    fontSize: 20,
    marginTop: 1, // decreased from 3 to 2 to move heading up by 1 unit
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
          src={reportImageUrl}
          style={{
              width: 500,
              height: 160,
              objectFit: "contain",
              display: "block",
              margin: "0 auto"
          }}
          alt={title}
          loading="lazy"
        />
      </div>

      {/* View More Button */}
      <button
        style={{
          position: "absolute",
          right: 22,
          bottom: 13,
          color: "#b5b8bf",
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
        onClick={onViewMore}
      >
        View More
      </button>
      {children}
    </div>
  );
}

const REPORTS = [
  {
    title: "Revenue Report",
    icon: "🧾",
  },
  {
    title: "Expense Report",
    icon: "💸",
  },
  {
    title: "Profit/Loss Report",
    icon: "📊",
  },
  {
    title: "GST Report",
    icon: "🧾",
  },
  {
    title: "Dish Performance",
    icon: "🍽",
  },
  {
    title: "Peak Hours",
    icon: "⏰",
  },
  {
    title: "Staff Report",
    icon: "👨‍🍳",
  },
  {
    title: "Wastage Report",
    icon: "🗑",
  },
];

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

function DashboardPage() {
  const [showTitle, setShowTitle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeDescIndex, setActiveDescIndex] = useState(null);

  // Always visible on load
  const reportsVisible = true;

  useEffect(() => {
    setShowTitle(true);
    setActiveDescIndex(null);
  }, []);

  const MAINBLOCK_WIDTH = 1400;
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
      ? `${(120 + 18) * minRows}px`
      : undefined;
  const gridMaxHeight = searchValue.trim() ? `${230 * 0.75}px` : undefined;

  const centerBlockBg = "#fdfbf8";
  const reportsBlockStyle = {
    margin: `${BLOCK_SHIFT_DOWN}px auto 0 ${BLOCK_SHIFT_LEFT}px`,
    background: centerBlockBg,
    borderRadius: 12,
    position: "absolute",
    left: 70 - 40,
    top: 0,
    overflow: 'visible',
    boxShadow: '0 7px 24px 0 rgba(200,170,120,0.10), 0 8px 15px rgba(0,0,0,0.08)',
    border: "1.7px solid #ede6dd",
    width: `${MAINBLOCK_WIDTH}px`,
    maxWidth: `${MAINBLOCK_MAXWIDTH}px`,
    height: `${blockHeight + 19}px`,
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
  const reportsTitleLeft = `4px`;

  const SEARCH_BAR_TOP_PADDING = 16 * 0.75 * 1.1;

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
            {/* Top search bar with increased bezel and sharp corners */}
            <div
              style={{
                padding: `${SEARCH_BAR_TOP_PADDING}px ${28 * 0.75 * 1.3}px 0 ${28 * 0.75 * 1.3}px`,
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
                      pointerEvents: "none"
                    }}
                  >
                    <circle cx="9" cy="9" r="7" stroke="#bca177" strokeWidth="2" />
                    <line x1="15.2" y1="15.2" x2="19" y2="19" stroke="#bca177" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
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
                    }}
                  >
                    {activeDescIndex === originalIdx && (
                      <div
                        className="desc-popup"
                        onClick={e => e.stopPropagation()}
                        style={{
                          ...getDescPopupStyle(col, row),
                        }}
                      >
                        {descContent[originalIdx]}
                      </div>
                    )}
                  </CardBoundary>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;