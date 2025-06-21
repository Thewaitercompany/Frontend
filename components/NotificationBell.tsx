"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Bell icon (with red badge) - unchanged as it's a presentational SVG
const BellIcon: React.FC<{ unreadCount: number }> = ({ unreadCount }) => (
  <svg
    width={36}
    height={33}
    viewBox="0 0 36 33"
    fill="none"
    style={{ position: "relative", display: "block" }}
    aria-label="Notifications"
  >
    <ellipse cx="18" cy="5" rx="5.5" ry="3.2" fill="#3A2102" />
    <path
      d="M28 18V13C28 8.477 23.523 4 18 4C12.477 4 8 8.477 8 13V18L5 23V24.5H31V23L28 18Z"
      stroke="#3A2102"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#3A2102"
    />
    <circle cx="18" cy="29" r="2.7" fill="#3A2102" />
    {unreadCount > 0 && (
      <g>
        <circle
          cx="30.5"
          cy="7.5"
          r="7"
          fill="#d82c2c"
          stroke="#fff"
          strokeWidth="2"
        />
        <text
          x="30.5"
          y="7.5"
          textAnchor="middle"
          alignmentBaseline="middle"
          dominantBaseline="middle"
          fontFamily="Calibri, Arial, sans-serif"
          fontWeight="bold"
          fontSize="12"
          fill="#fff"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {unreadCount}
        </text>
      </g>
    )}
  </svg>
);

interface NotificationBellProps {
  unreadCount: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount }) => {
  const router = useRouter();

  const handleBellClick = () => {
    router.push("/dashboard/notifications"); // Adjust this route as per your application's routing
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 70,
        right: 40,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 17,
      }}
    >
      <div
        onClick={handleBellClick}
        style={{ marginTop: 3, cursor: "pointer", position: "relative" }}
        aria-label="Open notifications"
      >
        <BellIcon unreadCount={unreadCount} />
      </div>
    </div>
  );
};

export default NotificationBell;