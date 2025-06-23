"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Sidebar Icon Setup
const SIDEBAR_ICON_SIZE = 43;
const SIDEBAR_ICON_COLOR = "#F1EBE6";
const SIDEBAR_ICON_ACTIVE_COLOR = "#4D3E3B";
const SIDEBAR_ICON_GAP = 7;
const SIDEBAR_BG = "#B39793";
const SIDEBAR_WIDTH_COLLAPSED = 65;
const SIDEBAR_WIDTH_EXPANDED = 282;
const SIDEBAR_HEIGHT = 480;
const SIDEBAR_TOP_OFFSET = 151;
const SIDEBAR_BORDER_RADIUS = "0 8px 8px 0";

const SidebarIconsFigma = [
  // Restaurant's Profile
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-user"
    >
      <circle
        cx="14"
        cy="13"
        r="10"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.8"
      />
      <circle
        cx="14"
        cy="10"
        r="4"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.6"
      />
      <path
        d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  // Dashboard
  (active: boolean) => (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_6393_5190)">
        <path
          d="M28.2703 6H17.7297C12.3561 6 8 10.3561 8 15.7297V26.2703C8 31.6439 12.3561 36 17.7297 36H28.2703C33.6439 36 38 31.6439 38 26.2703V15.7297C38 10.3561 33.6439 6 28.2703 6Z"
          stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
          strokeWidth="2.5"
        />
        <path
          d="M14.8926 25.8645L18.8656 20.578C19.1088 20.2525 19.4655 20.0301 19.8649 19.9551C20.2644 19.88 20.6774 19.9576 21.0223 20.1726L24.898 22.6213C25.2561 22.8493 25.6895 22.9278 26.1049 22.8399C26.5203 22.752 26.8846 22.5046 27.1196 22.151L31.1088 16.1348"
          stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_6393_5190"
          x="0.75"
          y="0.75"
          width="44.5"
          height="44.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6393_5190"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_6393_5190"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  // List of tables
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-ellipse"
    >
      <ellipse
        cx="14"
        cy="9.5"
        rx="7.3"
        ry="2.8"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.8"
      />
      <path
        d="M14 12.2v7"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 17.8c-1.5 1.2-2.2 2.2-2.2 2.6"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 17.8c1.5 1.2 2.2 2.2 2.2 2.6"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M11.8 20.4v2.1"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16.2 20.4v2.1"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  // Restaurant's Menu
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-book"
    >
      <rect
        x="6.8"
        y="7.6"
        width="14.4"
        height="12.8"
        rx="2.2"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.7"
      />
      <path
        d="M14 7.6v6.1l2-1 2 1V7.6"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 7.6v12.8"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  // Inventory
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-home"
    >
      <path
        d="M14 5.6 22 10.6v6.8l-8 5-8-5v-6.8L14 5.6Z"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="1.8"
      />
      <rect
        x="11"
        y="13"
        width="2"
        height="4"
        rx="1"
        fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
      />
      <rect
        x="15"
        y="10"
        width="2"
        height="7"
        rx="1"
        fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
      />
    </svg>
  ),
  // Sales Overview
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-doc"
    >
      <path
        d="M7 8.5v11.5c0 1.1.9 2 2 2h5.5"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M7 8.5c0-1.1.9-2 2-2h3"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 6.5h3c1.1 0 2 .9 2 2v4"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M11.5 16.5l3 3 6-6"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  // Reports
  (active: boolean) => (
    <svg
      width={SIDEBAR_ICON_SIZE}
      height={SIDEBAR_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      key="sidebar-bar"
    >
      <path
        d="M4.7 10.8V21.9H15"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <rect
        x="8.5"
        y="5.5"
        width="13"
        height="13"
        rx="2"
        stroke={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        strokeWidth="2.2"
        fill="none"
      />
      <rect
        x="11.5"
        y="12.3"
        width="1.6"
        height="4.4"
        fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        rx="0.5"
      />
      <rect
        x="14.5"
        y="9"
        width="1.6"
        height="7.7"
        fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        rx="0.5"
      />
      <rect
        x="17.5"
        y="14.7"
        width="1.6"
        height="2.2"
        fill={active ? SIDEBAR_ICON_ACTIVE_COLOR : SIDEBAR_ICON_COLOR}
        rx="0.5"
      />
    </svg>
  ),
];

const SIDEBAR_LABELS = [
  "Restaurant's Profile",
  "Dashboard",
  "List of tables",
  "Restaurant's Menu",
  "Inventory",
  "Sales Overview",
  "Reports",
];

// Define routes for each sidebar item
const SIDEBAR_ROUTES = [
  "/dashboard/restaurantprofile", // Restaurant's Profile
  "/dashboard", // Dashboard
  "/dashboard/tables", // List of tables
  "/dashboard/menu", // Restaurant's Menu
  "/dashboard/inventory", // Inventory
  "/dashboard/total-orders", // Sales Overview (using total-orders as sales overview)
  "/dashboard/reports", // Reports
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const sidebarIconCount = SidebarIconsFigma.length;
  const iconsTotalHeight =
    sidebarIconCount * SIDEBAR_ICON_SIZE +
    (sidebarIconCount - 1) * SIDEBAR_ICON_GAP;
  const equalBezelPadding = Math.max(
    (SIDEBAR_HEIGHT - iconsTotalHeight) / 2,
    1
  );

  const handleIconClick = (index: number) => {
    const route = SIDEBAR_ROUTES[index];
    if (route) {
      router.push(route);
    }
  };

  // Function to check if a route is active
  const isRouteActive = (route: string) => {
    if (route === "/dashboard") {
      // For dashboard, check if we're exactly on /dashboard or on a sub-route that doesn't match other specific routes
      return (
        pathname === "/dashboard" ||
        (pathname.startsWith("/dashboard/") &&
          !pathname.startsWith("/dashboard/restaurantprofile") &&
          !pathname.startsWith("/dashboard/tables") &&
          !pathname.startsWith("/dashboard/menu") &&
          !pathname.startsWith("/dashboard/inventory") &&
          !pathname.startsWith("/dashboard/total-orders") &&
          !pathname.startsWith("/dashboard/reports"))
      );
    }
    return pathname.startsWith(route);
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        fontFamily: "Calibri, Arial, sans-serif",
        background: "transparent",
      }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col items-center"
        style={{
          width: isHovered ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED,
          height: SIDEBAR_HEIGHT,
          background: SIDEBAR_BG,
          borderRadius: SIDEBAR_BORDER_RADIUS,
          position: "fixed",
          top: SIDEBAR_TOP_OFFSET,
          left: 0,
          zIndex: 100,
          boxShadow: "0 6px 24px 0 rgba(120,68,52,0.17)",
          justifyContent: "flex-start",
          transition:
            "width 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.22s, background 0.22s",
          borderLeft: "none",
          pointerEvents: "auto",
          overflow: "visible",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        aria-label="Sidebar"
      >
        <div
          className="flex flex-col items-center"
          style={{
            paddingTop: equalBezelPadding,
            paddingBottom: equalBezelPadding,
            gap: SIDEBAR_ICON_GAP,
            height: "100%",
            justifyContent: "center",
            alignItems: isHovered ? "flex-start" : "center",
            width: "100%",
            transition: "align-items 0.2s",
          }}
        >
          {SidebarIconsFigma.map((IconComp, idx) => {
            const isActive = isRouteActive(SIDEBAR_ROUTES[idx]);
            return (
              <button
                key={idx}
                className="flex items-center"
                style={{
                  width: isHovered
                    ? SIDEBAR_WIDTH_EXPANDED - 16
                    : SIDEBAR_ICON_SIZE,
                  height: SIDEBAR_ICON_SIZE,
                  borderRadius: 8,
                  background: isActive
                    ? "rgba(77, 62, 59, 0.15)"
                    : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isHovered ? "flex-start" : "center",
                  transition:
                    "background 0.18s, width 0.23s cubic-bezier(.4,2,.6,1)",
                  outline: "none",
                  border: "none",
                  marginBottom:
                    idx === SidebarIconsFigma.length - 1 ? 0 : SIDEBAR_ICON_GAP,
                  paddingLeft: isHovered ? 16 : 0,
                }}
                onClick={() => handleIconClick(idx)}
                tabIndex={0}
                aria-label={SIDEBAR_LABELS[idx]}
              >
                {IconComp(isActive)}
                <span
                  style={{
                    opacity: isHovered ? 1 : 0,
                    maxWidth: isHovered ? 230 : 0,
                    marginLeft: isHovered ? 24 : 0,
                    color: isActive ? "#4D3E3B" : "#F1EBE6",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 23,
                    letterSpacing: 0.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    transition:
                      "opacity 0.13s, max-width 0.21s, margin-left 0.18s, color 0.22s, font-size 0.15s",
                  }}
                >
                  {SIDEBAR_LABELS[idx]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
