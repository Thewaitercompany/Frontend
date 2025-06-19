"use client";
import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function formatDateTime(date) {
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

  const backgroundColor = "#F5EFE3";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: backgroundColor,
        fontFamily: "Calibri, Arial, sans-serif",
      }}
    >
      {/* Top bar: logo and time */}
      <div
        style={{
          width: "100vw",
          height: 54,
          background: backgroundColor,
          position: "fixed",
          left: 25,
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 36,
          paddingRight: 34,
        }}
      >
        {/* Company logo (dragged a little left and micro bit lower) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: "translate(-45px, 15px)", // Move logo a bit left and micro bit more lower
          }}
        >
          <img
            src="/Screenshot 2025-06-07 171759.png"
            alt="Company Logo"
            style={{
              height: 75,
              width: "auto",
              objectFit: "contain",
              background: backgroundColor,
              display: "block",
            }}
          />
        </div>
        {/* Time display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: "translate(-24px, 7px)",
          }}
        >
          <span
            style={{
              color: "#463716",
              fontFamily: "Calibri, Arial, sans-serif",
              fontWeight: 400,
              fontSize: 25,
              minWidth: 180,
              textAlign: "right",
              userSelect: "none",
              letterSpacing: "0.03em",
              lineHeight: "1.1",
            }}
          >
            {formatDateTime(currentTime)}
          </span>
        </div>
      </div>

      {/* Empty dashboard area */}
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          background: backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 54,
        }}
      >
        {/* Intentionally left empty as per your request */}
      </div>
    </div>
  );
}

export default DashboardPage;