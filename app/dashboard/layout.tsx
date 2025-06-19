import React from "react";
import MySidebar from "../../components/MySidebar"; // Use your actual sidebar path

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <MySidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}