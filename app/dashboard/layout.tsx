"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MySidebar from "../../components/MySidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

function formatDateTime(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let h = date.getHours();
  const m = date.getMinutes();
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [unreadNotificationsCount, _setUnreadNotificationsCount] = useState(3);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    if (pathname.includes("/menu/edit")) return "Edit Dish";
    if (pathname.includes("/menu/add")) return "Add Dish";
    if (pathname.includes("/menu")) return "Menu";
    if (pathname.includes("/pending-orders")) return "Pending Orders";
    if (pathname.includes("/total-orders")) return "Total Orders";
    if (pathname.includes("/notifications")) return "Notifications";
    return "Smart Cafe";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F5EFE3",
      }}
    >
      <MySidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: "80px",
            backgroundColor: "#f5f1eb",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/logo.png"
                alt="The Waiter Company Logo"
                width={50}
                height={50}
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <Image
              src="/x.png"
              alt="x"
              width={50}
              height={50}
              className="w-2 h-2"
            />
            <span
              style={{
                fontSize: "1.25rem",
                color: "#202224",
                fontFamily: "serif",
              }}
            >
              {getPageTitle()}
            </span>
          </div>
          <div
            style={{
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Link
              href="/dashboard/notifications"
              style={{ position: "relative", color: "#202224" }}
            >
              <FontAwesomeIcon
                icon={faBell}
                style={{
                  color: "#202224",
                  fontSize: "1.5rem",
                  height: "25px",
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "-0.25rem",
                  right: "-0.25rem",
                  backgroundColor: "#e53e3e",
                  color: "#202224",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  width: "1rem",
                  height: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                {unreadNotificationsCount}
              </span>
            </Link>
            <h2 style={{ fontSize: "1rem", fontWeight: 500, color: "#202224" }}>
              {formatDateTime(currentTime)}
            </h2>
          </div>
        </header>
        <main style={{ flex: 1, overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
