"use client";
import React, { useState } from 'react';
import ReportsAnalytics from './ReportsAnalytics';
import RestaurantProfile from './RestaurantProfile'; // <-- import your RestaurantProfile component

// Sidebar Icon Setup
const SIDEBAR_ICON_SIZE = 43;
const SIDEBAR_ICON_COLOR = "#F1EBE6";
const SIDEBAR_ICON_ACTIVE_COLOR = "#4D3E3B";
const SIDEBAR_ICON_GAP = 7;
const SIDEBAR_BG = "#B39793";

const SidebarIconsFigma = [
  // ... your icon array unchanged ...
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-user">
      <circle cx="14" cy="13" r="10" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" />
      <circle cx="14" cy="10" r="4" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.6" />
      <path d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" />
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
  // Docs/Clipboard Figma-style sidebar icon
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-doc">
      <path d="M7 8.5v11.5c0 1.1.9 2 2 2h5.5" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M7 8.5c0-1.1.9-2 2-2h3" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 6.5h3c1.1 0 2 .9 2 2v4" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M11.5 16.5l3 3 6-6" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  // Reports & Analytics Figma-style sidebar icon
  (active) => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none" key="sidebar-bar">
      <path d="M4.7 10.8V21.9H15" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      <rect x="8.5" y="5.5" width="13" height="13" rx="2" stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} strokeWidth="2.2" fill="none" />
      <rect x="11.5" y="12.3" width="1.6" height="4.4" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} rx="0.5" />
      <rect x="14.5" y="9" width="1.6" height="7.7" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} rx="0.5" />
      <rect x="17.5" y="14.7" width="1.6" height="2.2" fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR} rx="0.5" />
    </svg>
  )
];

function Sidebar() {
  const [activeSidebarIdx, setActiveSidebarIdx] = useState(null);

  const sidebarIconCount = SidebarIconsFigma.length;
  const SIDEBAR_WIDTH = 65;
  const SIDEBAR_HEIGHT = 480;
  const SIDEBAR_BORDER_RADIUS = "0 8px 8px 0";
  const SIDEBAR_TOP_OFFSET = 151;
  const SIDEBAR_BEZEL = 1;
  const REPORTS_ANALYTICS_LEFT_SHIFT = 65;

  const iconsTotalHeight = sidebarIconCount * SIDEBAR_ICON_SIZE + (sidebarIconCount - 1) * SIDEBAR_ICON_GAP;
  const equalBezelPadding = Math.max((SIDEBAR_HEIGHT - iconsTotalHeight) / 2, SIDEBAR_BEZEL);

  // The last index for Reports & Analytics
  const REPORTS_ANALYTICS_IDX = SidebarIconsFigma.length - 1;
  // The first index for Restaurant Profile
  const RESTAURANT_PROFILE_IDX = 0;

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Calibri, Arial, sans-serif', background: 'transparent' }}>
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
          zIndex: 100,
          boxShadow: '0 6px 24px 0 rgba(120,68,52,0.17)',
          justifyContent: "flex-start",
          transition: "box-shadow 0.22s, background 0.22s",
          borderLeft: "none",
          pointerEvents: "auto",
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
                setActiveSidebarIdx(prev => prev === idx ? null : idx);
              }}
            >
              {IconComp(idx === activeSidebarIdx)}
            </span>
          ))}
        </div>
      </div>
      {/* Restaurant Profile appears only when first icon is active */}
      {activeSidebarIdx === RESTAURANT_PROFILE_IDX && (
        <div
          style={{
            marginLeft: SIDEBAR_WIDTH - REPORTS_ANALYTICS_LEFT_SHIFT,
            width: `calc(100vw - 0px)`,
            height: "100vh",
            position: "fixed",
            top: 16,
            left: SIDEBAR_WIDTH - REPORTS_ANALYTICS_LEFT_SHIFT,
            zIndex: 50,
            background: "transparent",
            overflow: "auto",
            pointerEvents: "auto",
          }}
        >
          <RestaurantProfile />
        </div>
      )}
      {/* Reports & Analytics appears only when last icon is active */}
      {activeSidebarIdx === REPORTS_ANALYTICS_IDX && (
        <div
          style={{
            marginLeft: SIDEBAR_WIDTH - REPORTS_ANALYTICS_LEFT_SHIFT,
            width: `calc(100vw - 0px)`,
            height: "100vh",
            position: "fixed",
            top: 16,
            left: SIDEBAR_WIDTH - REPORTS_ANALYTICS_LEFT_SHIFT,
            zIndex: 50,
            background: "transparent",
            overflow: "auto",
            pointerEvents: "auto",
          }}
        >
          <ReportsAnalytics />
        </div>
      )}
    </div>
  );
}

export default Sidebar;