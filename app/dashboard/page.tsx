"use client";
import React, { useState, useEffect } from "react";
import MySidebar from "../../components/MySidebar";
import NotificationPanel from "../../components/NotificationPanel";

// Bell icon
const BellIcon: React.FC<{ unreadCount?: number }> = ({ unreadCount = 0 }) => (
  <svg width={36} height={33} viewBox="0 0 36 33" fill="none" style={{ position: 'relative', display: "block" }}>
    <ellipse cx="18" cy="5" rx="5.5" ry="3.2" fill="#3A2102" />
    <path d="M28 18V13C28 8.477 23.523 4 18 4C12.477 4 8 8.477 8 13V18L5 23V24.5H31V23L28 18Z"
      stroke="#3A2102" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#3A2102" />
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

const LOGO_HEIGHT = 88; // increased size a bit
const backgroundColor = "#F5EFE3";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  // We want the notification count to update as in NotificationPage
  // So we will lift a minimal notification state and pass it to NotificationPage

  // This will let NotificationPage manage notifications and update count
  const [notificationPageKey, setNotificationPageKey] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // We'll receive the unread count from NotificationPage via a callback
  const handleUnreadCount = (count: number) => setUnreadNotificationsCount(count);

  function formatDateTime(date: Date): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: backgroundColor,
        fontFamily: "Calibri, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <MySidebar />

      {/* Main area (shifted right for sidebar) */}
      <div
        style={{
          marginLeft: 65,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            width: "100%",
            height: 54,
            background: backgroundColor,
            position: "fixed",
            left: 65,
            top: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 36,
            paddingRight: 34,
            borderBottom: "none",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              transform: "translate(-85px, 18px)",
            }}
          >
            <img
              src="/Screenshot 2025-06-07 171759.png"
              alt="Company Logo"
              style={{
                height: LOGO_HEIGHT,
                width: "auto",
                objectFit: "contain",
                background: backgroundColor,
                display: "block",
              }}
            />
          </div>
          {/* Separated Bell */}
          <div
            style={{
              position: "absolute",
              top: 72,    // Adjust this to move bell vertically
              right: 95,  // Adjust this to move bell horizontally
              zIndex: 21,
              background: "transparent"
            }}
          >
            <div
              className="relative cursor-pointer"
              onClick={() => setShowNotifications((v) => !v)}
              title="View notifications"
              style={{}}
            >
              <BellIcon unreadCount={unreadNotificationsCount} />
            </div>
          </div>
          {/* Separated Time/Date/Day */}
          <div
            style={{
              position: "absolute",
              top: 18,     // Adjust this to move time vertically
              right: 90,   // Adjust this to move time horizontally (space to the left of the bell)
              zIndex: 20,
              background: "transparent"
            }}
          >
            <span
              style={{
                color: "#463716",
                fontFamily: "Calibri, Arial, sans-serif",
                fontWeight: 400,
                fontSize: 24,
                minWidth: 180,
                textAlign: "right",
                userSelect: "none",
                letterSpacing: "0.03em",
                lineHeight: "1.1",
                marginLeft: 2
              }}
            >
              {formatDateTime(currentTime)}
            </span>
          </div>
        </div>
        {/* Central dashboard area */}
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            background: backgroundColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 54,
            overflow: "hidden",
          }}
        >
          {/* Intentionally left blank or add dashboard content here */}
        </div>
        {/* Notification Panel Overlay */}
        {showNotifications && (
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.06)"
          }}>
            {/* Render the NotificationPage component as a panel */}
            <NotificationPanel
              // Optionally, you can add a prop to let NotificationPage close itself:
              onClose={() => setShowNotifications(false)}
              // onUnreadCountChange={handleUnreadCount}
            />
            {/* Overlay click to close */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1001,
                background: "transparent",
                cursor: "pointer"
              }}
              onClick={() => setShowNotifications(false)}
            />
          </div>
        )}
      </div>
      {/* Remove scroll on html/body */}
      <style>
        {`
          html, body {
            overflow: hidden !important;
          }
        `}
      </style>
    </div>
  );
}