"use client";
import React, { useState, useEffect } from "react";
import NotificationPanel from "../../components/NotificationPanel";
import { useOrders } from "@/hooks/useOrders";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CustomCalendar from "@/components/CustomCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";

// Bell icon from Nitanshu fix
const BellIcon: React.FC<{ unreadCount?: number }> = ({ unreadCount = 0 }) => (
  <svg
    width={36}
    height={33}
    viewBox="0 0 36 33"
    fill="none"
    style={{ position: "relative", display: "block" }}
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

// Monthly revenue data
const monthlyData = {
  October: [
    { name: "1", Sales: 20, Profit: 15 },
    { name: "3", Sales: 35, Profit: 45 },
    { name: "5", Sales: 25, Profit: 35 },
    { name: "7", Sales: 40, Profit: 30 },
    { name: "9", Sales: 35, Profit: 25 },
    { name: "11", Sales: 50, Profit: 40 },
    { name: "13", Sales: 90, Profit: 40 },
    { name: "15", Sales: 65, Profit: 55 },
    { name: "17", Sales: 50, Profit: 40 },
    { name: "19", Sales: 55, Profit: 45 },
    { name: "21", Sales: 60, Profit: 55 },
    { name: "23", Sales: 75, Profit: 60 },
    { name: "25", Sales: 70, Profit: 65 },
    { name: "27", Sales: 60, Profit: 55 },
    { name: "29", Sales: 65, Profit: 85 },
    { name: "31", Sales: 60, Profit: 50 },
  ],
  November: [
    { name: "1", Sales: 10, Profit: 15 },
    { name: "3", Sales: 25, Profit: 45 },
    { name: "5", Sales: 35, Profit: 35 },
    { name: "7", Sales: 40, Profit: 30 },
    { name: "9", Sales: 55, Profit: 25 },
    { name: "11", Sales: 20, Profit: 40 },
    { name: "13", Sales: 30, Profit: 40 },
    { name: "15", Sales: 25, Profit: 55 },
    { name: "17", Sales: 50, Profit: 40 },
    { name: "19", Sales: 25, Profit: 45 },
    { name: "21", Sales: 30, Profit: 55 },
    { name: "23", Sales: 35, Profit: 60 },
    { name: "25", Sales: 50, Profit: 65 },
    { name: "27", Sales: 30, Profit: 55 },
    { name: "29", Sales: 25, Profit: 85 },
    { name: "31", Sales: 40, Profit: 50 },
  ],
  December: [
    { name: "1", Sales: 20, Profit: 25 },
    { name: "3", Sales: 35, Profit: 35 },
    { name: "5", Sales: 25, Profit: 15 },
    { name: "7", Sales: 40, Profit: 20 },
    { name: "9", Sales: 35, Profit: 35 },
    { name: "11", Sales: 50, Profit: 30 },
    { name: "13", Sales: 90, Profit: 50 },
    { name: "15", Sales: 65, Profit: 65 },
    { name: "17", Sales: 50, Profit: 30 },
    { name: "19", Sales: 55, Profit: 45 },
    { name: "21", Sales: 60, Profit: 55 },
    { name: "23", Sales: 75, Profit: 40 },
    { name: "25", Sales: 70, Profit: 55 },
    { name: "27", Sales: 60, Profit: 45 },
    { name: "29", Sales: 65, Profit: 75 },
    { name: "31", Sales: 60, Profit: 30 },
  ],
};

const customerData = [
  { name: "New Customers", value: 34249 },
  { name: "Repeated", value: 5420 },
];

const orderDivisionData = [
  { name: "Starters", value: 2000 },
  { name: "Main course", value: 2000 },
  { name: "Desserts", value: 2000 },
  { name: "Beverages", value: 2000 },
  { name: "Alcohol", value: 2000 },
];

const footstepData = [
  { name: "Jun", value: 2.5 },
  { name: "Jul", value: 5.0 },
  { name: "Aug", value: 7.5 },
  { name: "Sep", value: 5.0 },
  { name: "Oct", value: 10.0 },
];

const pieData = [
  { name: "Chicken Nuggets", value: 50, color: "#4F9EFF" },
  { name: "Cold Coffee", value: 25, color: "#FF9E9E" },
  { name: "Pasta", value: 15, color: "#CEB5FF" },
  { name: "Ginger Tea", value: 7, color: "#C99E5A" },
  { name: "Paneer Sandwich", value: 3, color: "#A0826C" },
];

const total = pieData.reduce((sum, item) => sum + item.value, 0);

const leaveDates = ["2025-06-05", "2025-06-12"];
const salaryDates = ["2025-06-07"];

const COLORS = ["#6B8AF4", "#FF7F6B", "#96D160", "#FFB572", "#FF8FD2"];

const LOGO_HEIGHT = 88;
const backgroundColor = "#F5EFE3";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPageKey, setNotificationPageKey] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  const [_customerData, setCustomerData] = useState([]);
  const [_orderDivisionData, setOrderDivisionData] = useState([]);
  const [_footstepData, setFootstepData] = useState([]);
  const [_leaveDates, setLeaveDates] = useState([]);
  const [_salaryDates, setSalaryDates] = useState([]);
  const [_COLORS, setColors] = useState([]);
  const [_currentDate, setCurrentDate] = useState(new Date());
  const [_selectedPeriod, setSelectedPeriod] = useState("week");
  const [_totalOrderCount, setTotalOrderCount] = useState(0);
  const [_pendingOrderCount, setPendingOrderCount] = useState(0);

  const _handleMonthChange = (month: keyof typeof monthlyData) => {
    // Implementation here
  };

  const { totalOrderCount, pendingOrderCount } = useOrders();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnreadCount = (count: number) =>
    setUnreadNotificationsCount(count);

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
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[80px] bg-[#f5f1eb] px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl font-serif">Smart Cafe</span>
        </div>
        <div className="text-right flex items-center gap-4">
          <h2 className="text-md font-medium">{formatDateTime(currentTime)}</h2>
          <div className="relative">
            <FontAwesomeIcon
              icon={faBell}
              className="text-black text-2xl h-[25px] cursor-pointer"
              onClick={() => setShowNotifications((v) => !v)}
            />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-semibold">
              {unreadNotificationsCount}
            </span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="min-h-screen bg-[#F4F0E8] pt-[80px]">
        {/* Main Content Container */}
        <div className="w-full px-12 py-8 flex gap-8">
          {/* Left Section - 70% */}
          <div className="w-[70%] space-y-8">
            <h2 className="text-2xl font-semibold text-[#4A3F3F]">
              Today&apos;s Performance
            </h2>

            {/* Overview Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Total Orders",
                  value: 202,
                  icon: "fas fa-sticky-note",
                },
                {
                  label: "Completed Orders",
                  value: 190,
                  icon: "fa-file-circle-check",
                },
                { label: "Pending Orders", value: 10, icon: "fa-spinner" },
                {
                  label: "Cancelled Orders",
                  value: 2,
                  icon: "fa-times-circle",
                },
              ].map(({ label, value, icon }, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[180px]"
                >
                  <div className="text-4xl text-[#a0826c]">
                    <i className={`fa ${icon}`}></i>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-gray-700">
                      {label}
                    </h3>
                    <p className="text-4xl font-bold text-[#C99E5A]">{value}</p>
                  </div>

                  <p className="text-sm text-gray-500 hover:text-[#C99E5A] cursor-pointer transition-colors">
                    View more
                  </p>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-8 shadow-md h-[600px]">
              <h3 className="text-xl font-medium mb-6 text-[#4A3F3F]">
                Revenue
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={monthlyData["October"]}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7F6B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF7F6B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorProfit"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#B196FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#B196FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Sales"
                    stroke="#FF7F6B"
                    fill="url(#colorSales)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="Profit"
                    stroke="#B196FF"
                    fill="url(#colorProfit)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="flex justify-center gap-8 mt-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF7F6B]"></span>
                  <span>Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#B196FF]"></span>
                  <span>Profit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 30% */}
          <div className="w-[30%] space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <CustomCalendar
                leaveDates={["2025-06-12", "2025-06-01"]}
                salaryDates={["2025-06-13", "2025-06-28"]}
              />
            </div>

            {/* Footsteps Info */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-[#4A3F3F]">
                  Footsteps
                </h4>
                <button className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-500 hover:bg-gray-50">
                  Today
                </button>
              </div>

              <div className="flex justify-around text-center text-lg font-bold mb-4">
                <div>
                  <div className="text-[#C99E5A] text-2xl">6,000</div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-3 h-3 bg-[#A0826C] rounded-sm"></span>
                    New Customers
                  </div>
                </div>

                <div>
                  <div className="text-[#C99E5A] text-2xl">2,000</div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-3 h-3 bg-[#E0CAC0] rounded-sm"></span>
                    Repeated
                  </div>
                </div>
              </div>

              <div className="w-full h-6 bg-gray-100 rounded-full mt-6 relative flex overflow-hidden">
                <div className="h-full bg-[#A0826C] w-[75%] flex items-center justify-center text-white text-xs font-semibold">
                  75%
                </div>
                <div className="h-full bg-[#E0CAC0] w-[25%] flex items-center justify-center text-gray-600 text-xs font-semibold">
                  25%
                </div>
              </div>
            </div>

            {/* Trending Items */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-lg font-medium mb-6 text-[#4A3F3F]">
                Trending Items
              </h4>
              <div className="flex gap-6">
                {/* Left side: Color dot, Name, Pieces, Percentage */}
                <div className="flex flex-col justify-center gap-3 w-1/2">
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-700 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: [
                              "#5197ff",
                              "#f78c8c",
                              "#a463e6",
                              "#f5bd65",
                              "#65c97f",
                            ][index % 5],
                          }}
                        ></span>
                        <span className="truncate max-w-[80px]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-right min-w-[45px]">
                        {item.value} pcs
                      </span>
                      <span className="text-right min-w-[30px]">
                        {((item.value / total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right side: Pie Chart */}
                <div className="w-1/2 flex justify-center items-center">
                  <PieChart width={150} height={150}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#5197ff",
                              "#f78c8c",
                              "#a463e6",
                              "#f5bd65",
                              "#65c97f",
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Panel Overlay */}
      {showNotifications && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.06)",
          }}
        >
          {/* Render the NotificationPage component as a panel */}
          <NotificationPanel onClose={() => setShowNotifications(false)} />
          {/* Overlay click to close */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1001,
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={() => setShowNotifications(false)}
          />
        </div>
      )}

      {/* Remove scroll on html/body */}
      <style jsx>{`
        :global(html),
        :global(body) {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}
