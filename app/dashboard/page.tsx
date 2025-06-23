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
import { useRouter } from "next/navigation";


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
  Cell
} from "recharts";
import Link from "next/link";
import Image from "next/image";

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

const backgroundColor = "#F5EFE3";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  const router = useRouter();

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
        fontFamily: "Aleo",
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
          <span className="text-xl">Smart Cafe</span>
        </div>
        <div className="text-right flex items-center gap-4">
          <h2 className="font-aleo font-normal text-[24px]">{formatDateTime(currentTime)}</h2>

          
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="min-h-screen bg-[#F4F0E8] pt-[80px]">
        {/* Main Content Container */}
        <div className="w-full px-12 py-4 flex gap-8">
          {/* Left Section - 70% */}
          <div className="w-[70%] space-y-5 space-x-12">
            <h2 className="text-2xl font-bold text-[#4A3F3F] ml-12">
              Today&apos;s Performance
            </h2>

            {/* Overview Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                {
      label: "Total Orders",
      value: 202,
      path: "/dashboard/total-orders",
      icon: (
        <svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3259 1.14551C20.9701 1.14551 22.2585 1.78885 22.2585 3.0781V30.7786H3.57679C2.24751 30.6078 1.52304 30.4684 1 28.846V3.0781C1.28977 1.77106 1.80292 1.45836 2.93259 1.14551H20.3259Z" fill="white" stroke="#B39793" stroke-width="0.8"/>
<rect x="4.86523" y="4.36719" width="21.9027" height="28.3447" fill="white"/>
<path d="M20.9699 34.0003C20.9699 34.0003 7.44265 34.0003 6.79812 34.0003C6.15359 34.0003 4.8652 32.7119 4.86553 32.0677C4.86586 31.4235 4.68493 7.4362 4.86493 6.29978C5.04493 5.16336 5.37068 4.79513 6.15333 4.36719H24.8351H26.1235L26.1242 28.6396C26.1242 28.7722 26.0715 28.8994 25.9777 28.9932L20.9699 34.0003ZM20.9699 34.0003V32.0677L20.9705 28.8467M20.9705 28.8467L25.5477 29.0469L25.9075 29.0627L20.9705 28.8467Z" stroke="#B39793" stroke-width="0.8"/>
<rect x="6.5543" y="7.40586" width="3.06519" height="3.06519" rx="0.6" stroke="#B39793" stroke-width="0.8"/>
<rect x="6.5543" y="12.5592" width="3.06519" height="3.06519" rx="0.6" stroke="#B39793" stroke-width="0.8"/>
<rect x="6.5543" y="17.7125" width="3.06519" height="3.06519" rx="0.6" stroke="#B39793" stroke-width="0.8"/>
<rect x="6.5543" y="22.8658" width="3.06519" height="3.06519" rx="0.6" stroke="#B39793" stroke-width="0.8"/>
<rect x="6.5543" y="28.0201" width="3.06519" height="3.06519" rx="0.6" stroke="#B39793" stroke-width="0.8"/>
<path d="M11.3066 14.0303H21.6138" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 14.0303H21.6138" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 14.0303H21.6138" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 19.1836H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 19.1836H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 19.1836H19.037" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 24.3369H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 24.3369H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 24.3369H19.037" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 29.4902H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 29.4902H19.037" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 29.4902H19.037" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<path d="M20.9931 21.7311C21.2711 20.5977 24.078 9.1637 25.9914 1.72403C26.0635 1.44341 26.3578 1.28583 26.6326 1.37746L29.5334 2.34437C29.7881 2.42928 29.9303 2.70024 29.8554 2.95811L24.2194 22.3712C24.2011 22.4341 24.1706 22.4929 24.1296 22.5441L22.3144 24.8131C22.0443 25.1508 21.5019 25.0095 21.4308 24.583L20.9876 21.9237C20.9765 21.8568 20.9769 21.7969 20.9931 21.7311Z" fill="white" stroke="#B39793" stroke-width="0.8"/>
<path d="M11.3066 8.87598H22.9022" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 8.87598H22.9022" stroke="black" stroke-width="0.8" stroke-linecap="round"/>
<path d="M11.3066 8.87598H22.9022" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<path d="M22.1176 24.9007C21.9554 25.1247 21.6021 25.0285 21.5758 24.7533L21.3115 21.9649C21.2919 21.7563 21.4871 21.5927 21.6893 21.6477L23.5937 22.166C23.7959 22.2211 23.8813 22.4611 23.7586 22.6309L22.1176 24.9007Z" stroke="#B39793" stroke-width="0.8"/>
<path d="M29.3438 3.78418L31.2763 4.42838L29.3438 10.8704" stroke="#B39793" stroke-width="0.8" stroke-linecap="round"/>
<mask id="path-17-inside-1_6393_1267" fill="white">
<rect x="26.0078" y="1" width="4.53988" height="2.91205" rx="0.7" transform="rotate(17.0318 26.0078 1)"/>
</mask>
<rect x="26.0078" y="1" width="4.53988" height="2.91205" rx="0.7" transform="rotate(17.0318 26.0078 1)" fill="white" stroke="#B39793" stroke-width="1.6" mask="url(#path-17-inside-1_6393_1267)"/>
</svg>

      ),
    },
    {
      label: "Completed Orders",
      value: 190,
      path: "/dashboard/completed-orders",
      icon: (
        <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="22.4667" height="31.6292" rx="1.5" stroke="#B39793"/>
<path d="M25.333 18.5C29.1017 18.5 32.167 21.5913 32.167 25.416C32.1668 29.2406 29.1016 32.3311 25.333 32.3311C21.5646 32.3309 18.5002 29.2405 18.5 25.416C18.5 21.5914 21.5645 18.5002 25.333 18.5Z" fill="white" stroke="#B39793"/>
<path d="M2.56641 27.8086H12.0997" stroke="#B39793" stroke-linecap="round"/>
<path d="M13.5664 27.8086L17.2331 27.8086" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.56641 24.8428H16.4997" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.56641 21.876H17.2331" stroke="#B39793" stroke-linecap="round"/>
<path d="M9.16797 3.33691H14.3013" stroke="#B39793" stroke-linecap="round"/>
<line x1="11.8652" y1="3.33691" x2="11.8652" y2="6.30321" stroke="#B39793"/>
<path d="M11.7324 6.06152C16.1085 6.06167 19.665 9.65086 19.665 14.0898C19.665 15.2002 19.4211 15.8621 19.0674 16.2715C18.7147 16.6796 18.1844 16.9169 17.4375 17.0303C16.685 17.1445 15.7766 17.1236 14.7314 17.0684C13.703 17.014 12.547 16.9268 11.3652 16.9268C10.1824 16.9268 9.073 17.014 8.1123 17.0684C7.13354 17.1237 6.32385 17.1432 5.66992 17.0312C5.03057 16.9218 4.59687 16.6965 4.30664 16.3018C4.00488 15.8912 3.79886 15.2184 3.79883 14.0898C3.79883 9.65077 7.35622 6.06152 11.7324 6.06152Z" stroke="#B39793"/>
<rect x="2.23398" y="16.3434" width="19" height="2.16629" rx="1.08315" fill="white" stroke="#B39793" stroke-width="0.8"/>
<path d="M32.9197 20.8611C33.1709 21.5263 32.8194 21.9818 32.1394 22.4313C31.5908 22.7928 30.8921 23.1856 30.1516 23.8562C29.4253 24.5136 28.7171 25.3059 28.0876 26.0855C27.5489 26.7549 27.0361 27.4457 26.5504 28.1564C26.3075 28.5125 25.9678 29.0439 25.9678 29.0439C25.8458 29.2373 25.678 29.3956 25.4799 29.5039C25.2819 29.6122 25.0603 29.6668 24.836 29.6627C24.6118 29.6613 24.3917 29.6011 24.1966 29.4877C24.0014 29.3744 23.8378 29.2116 23.7212 29.015C23.1351 28.0046 22.6833 27.6051 22.4756 27.4623C21.92 27.0779 21.2676 27.0225 21.2676 26.1283C21.2676 25.418 21.8514 24.8426 22.5713 24.8426C23.0799 24.8618 23.5522 25.0673 23.9712 25.3565C24.2387 25.5409 24.5221 25.7855 24.8166 26.1066C25.2113 25.5535 25.6218 25.0124 26.0475 24.4841C26.7264 23.6435 27.5278 22.7416 28.3874 21.9631C29.2322 21.1979 30.2091 20.4815 31.2447 20.1031C31.9194 19.8561 32.6692 20.1953 32.9197 20.8611Z" fill="white" stroke="#B39793" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
    },
    {
      label: "Pending Orders",
      value: 10,
      path: "/dashboard/pending-orders",
      icon: (
        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="22.4667" height="31.2667" rx="1.5" stroke="#B39793"/>
<circle cx="24.9329" cy="25.6663" r="6.83333" fill="white" stroke="#B39793"/>
<path d="M2.56641 27.5H12.0997" stroke="#B39793" stroke-linecap="round"/>
<path d="M13.5664 27.5L17.2331 27.5" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.56641 24.5664H16.4997" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.56641 21.6338H17.2331" stroke="#B39793" stroke-linecap="round"/>
<path d="M9.16602 3.2998H14.2993" stroke="#B39793" stroke-linecap="round"/>
<line x1="11.8672" y1="3.2998" x2="11.8672" y2="6.23314" stroke="#B39793"/>
<path d="M11.7344 6C16.1157 6.00014 19.667 9.55222 19.667 13.9336C19.667 15.0296 19.4237 15.6816 19.0713 16.085C18.7189 16.4882 18.1877 16.7236 17.4395 16.8359C16.6864 16.9489 15.7783 16.9276 14.7334 16.873C13.7047 16.8193 12.5489 16.7334 11.3672 16.7334C10.1845 16.7334 9.07517 16.8193 8.11426 16.873C7.13554 16.9278 6.3255 16.9477 5.6709 16.8369C5.03017 16.7285 4.59713 16.5046 4.30762 16.1152C4.00707 15.711 3.80081 15.0483 3.80078 13.9336C3.80078 9.55213 7.35292 6 11.7344 6Z" stroke="#B39793"/>
<rect x="2.23398" y="16.1666" width="19" height="2.13333" rx="1.06667" fill="white" stroke="#B39793" stroke-width="0.8"/>
<path d="M24.9336 22.7334V26.5866L27.6539 29.3073" stroke="#B39793" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      ),
    },
    {
      label: "Cancelled Orders",
      value: 2,
      path: "/dashboard/cancelled-orders",
      icon: (
        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="22.7303" height="31.6292" rx="1.5" stroke="#B39793"/>
<circle cx="25.5837" cy="25.5847" r="6.91573" fill="white" stroke="#B39793"/>
<path d="M2.5957 27.8086H12.2362" stroke="#B39793" stroke-linecap="round"/>
<path d="M13.7188 27.8086L17.4266 27.8086" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.5957 24.8428H16.6856" stroke="#B39793" stroke-linecap="round"/>
<path d="M2.5957 21.876H17.4272" stroke="#B39793" stroke-linecap="round"/>
<path d="M9.26953 3.33691H14.4605" stroke="#B39793" stroke-linecap="round"/>
<line x1="11.9941" y1="3.33691" x2="11.9941" y2="6.30321" stroke="#B39793"/>
<path d="M11.8662 6.06152C16.2999 6.06165 19.8945 9.65613 19.8945 14.0898C19.8945 15.199 19.6467 15.8592 19.2891 16.2686C18.9315 16.6777 18.3941 16.9166 17.6367 17.0303C16.8745 17.1447 15.9553 17.1236 14.8984 17.0684C13.8581 17.014 12.6898 16.9268 11.4951 16.9268C10.2994 16.9268 9.17791 17.014 8.20605 17.0684C7.21638 17.1237 6.39606 17.1434 5.7334 17.0312C5.08487 16.9214 4.64544 16.6949 4.35156 16.2998C4.04656 15.8896 3.83792 15.2177 3.83789 14.0898C3.83789 9.65605 7.43242 6.06152 11.8662 6.06152Z" stroke="#B39793"/>
<rect x="2.25352" y="16.3434" width="19.2225" height="2.16629" rx="1.08315" fill="white" stroke="#B39793" stroke-width="0.8"/>
<path d="M28.2031 22.5469C28.2582 22.5461 28.3132 22.5565 28.3643 22.5771C28.4154 22.5979 28.462 22.629 28.501 22.668C28.54 22.707 28.571 22.7536 28.5918 22.8047C28.6126 22.8558 28.6228 22.9107 28.6221 22.9658C28.6213 23.021 28.6091 23.0754 28.5869 23.126C28.5647 23.1765 28.5333 23.2228 28.4932 23.2607L28.4873 23.2666L26.3975 25.3555C26.3822 25.3707 26.3684 25.3874 26.3564 25.4053L26.3262 25.4629C26.3096 25.5028 26.3008 25.5456 26.3008 25.5889C26.3008 25.6321 26.3097 25.6749 26.3262 25.7148C26.3345 25.7349 26.3444 25.7545 26.3564 25.7725L26.3975 25.8223L28.4883 27.9131C28.5272 27.9513 28.5589 27.9976 28.5801 28.0479C28.6011 28.0979 28.6121 28.1517 28.6123 28.2061C28.6125 28.2606 28.6018 28.3148 28.5811 28.3652C28.5603 28.4156 28.5298 28.4614 28.4912 28.5C28.4527 28.5385 28.4068 28.5691 28.3564 28.5898C28.306 28.6106 28.2518 28.6213 28.1973 28.6211C28.1429 28.6209 28.0892 28.6099 28.0391 28.5889C27.9888 28.5677 27.9425 28.5369 27.9043 28.498L27.9033 28.4961L25.8135 26.4062H25.8125C25.7821 26.376 25.7466 26.3514 25.707 26.335H25.7061C25.6662 26.3185 25.6233 26.3096 25.5801 26.3096C25.5584 26.3096 25.5368 26.3122 25.5156 26.3164L25.4541 26.335C25.4141 26.3515 25.3773 26.3757 25.3467 26.4062L23.2578 28.4961L23.2559 28.498C23.2177 28.5368 23.1722 28.5677 23.1221 28.5889C23.0718 28.6101 23.0174 28.6209 22.9629 28.6211C22.9084 28.6213 22.8541 28.6106 22.8037 28.5898C22.7534 28.5691 22.7074 28.5385 22.6689 28.5C22.6305 28.4615 22.5998 28.4156 22.5791 28.3652C22.5584 28.3149 22.5476 28.2605 22.5479 28.2061C22.5481 28.1517 22.559 28.0979 22.5801 28.0479C22.6013 27.9976 22.633 27.9523 22.6719 27.9141L22.6729 27.9121L24.7627 25.8223C24.7932 25.7918 24.8174 25.7556 24.834 25.7158C24.8506 25.6758 24.8594 25.6322 24.8594 25.5889C24.8594 25.5672 24.8568 25.5456 24.8525 25.5244L24.834 25.4629L24.8037 25.4053C24.7917 25.3874 24.777 25.3707 24.7617 25.3555L22.6729 23.2666C22.5975 23.1891 22.5552 23.0847 22.5557 22.9766C22.5561 22.8678 22.5999 22.7635 22.6768 22.6865C22.7538 22.6094 22.8588 22.5659 22.9678 22.5654C23.0766 22.565 23.1812 22.6073 23.2588 22.6836L25.3467 24.7715C25.3772 24.802 25.4133 24.8262 25.4531 24.8428C25.4932 24.8594 25.5367 24.8682 25.5801 24.8682C25.6234 24.8681 25.6661 24.8593 25.7061 24.8428C25.7262 24.8344 25.7457 24.8246 25.7637 24.8125L25.8135 24.7715L27.9033 22.6826L27.9092 22.6768C27.9471 22.6367 27.9924 22.6042 28.043 22.582C28.0935 22.5599 28.148 22.5477 28.2031 22.5469Z" fill="#B39793" stroke="#B39793" stroke-width="0.6"/>
</svg>

      ),
    },
              ].map(({ label, value, icon, path }, idx) => (
                <div
          key={idx}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[180px] cursor-pointer hover:shadow-lg transition"
          onClick={() => router.push(path)}
        >
          <div className="text-4xl">{icon}</div>

          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-700">{label}</h3>
            <p className="text-4xl font-bold text-[#C99E5A]">{value}</p>
          </div>

          <p className="text-sm text-gray-500 hover:text-[#C99E5A] transition-colors">
            View more
          </p>
        </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-8 shadow-md h-[642px]">
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

            <div className="relative mr-[3%]">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faBell}
                className="text-black text-2xl h-[25px] cursor-pointer"
                onClick={() => setShowNotifications((v) => !v)}
              />
            </div>

            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-semibold">
              {unreadNotificationsCount}
            </span>
          </div>

            {/* Calendar */}
            <div className="relative h-[400px]"> {/* Parent with height and relative positioning */}
              <div className="absolute top-[-3%] left-[-3%] rounded-xl p-4">
                <CustomCalendar
                  leaveDates={["2025-06-12", "2025-06-01"]}
                  salaryDates={["2025-06-13", "2025-06-28"]}
                />
              </div>
            </div>


            {/* Footsteps Info */}
            <div className="bg-white rounded-xl p-2 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-[#4A3F3F]">
                  Footsteps
                </h4>
                <button className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-500 hover:bg-gray-50">
                  Today
                </button>
              </div>

              <div className="flex justify-center items-center gap-x-6 text-center text-lg font-bold mb-4">
                {/* Left block */}
                <div>
                  <div className="text-[#C99E5A] text-2xl">6,000</div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-3 h-3 bg-[#A0826C] rounded-sm"></span>
                    New Customers
                  </div>
                </div>

                {/* Vertical line */}
                <div className="w-px h-10 bg-gray-300" />

                {/* Right block */}
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
              <h4 className="text-lg font-medium mb-2 text-[#4A3F3F]">
                Trending Items
              </h4>
              <div className="flex gap-6">
                {/* Left side: Color dot, Name, Pieces, Percentage */}
                <div className="flex flex-col justify-center gap-3 w-1/2">
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-700 font-medium gap-1"
                    >
                      {/* Color Dot + Name */}
                      <div className="flex items-center gap-2 min-w-[120px]">
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
                        <span className="truncate font-aleo">{item.name}</span>
                      </div>

                      {/* Value */}
                      <div className="min-w-[70px] font-aleo">{item.value} pcs</div>

                      {/* Percentage */}
                      <div className="min-w-[50px] font-aleo">
                        {((item.value / total) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>


                {/* Right side: Pie Chart */}
                <div className="w-1/2 flex justify-center items-center ml-[5%]">
                  <PieChart width={150} height={150}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={65}
                      fill="#8884d8"
                      dataKey="value"
                      label={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#5197ff", "#f78c8c", "#a463e6", "#f5bd65", "#65c97f"][index % 5]
                          }
                          stroke="none" // <-- removes the white line
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
      {/* <style jsx>{`
        :global(html),
        :global(body) {
          overflow: hidden !important;
        }
      `}</style> */}
    </div>
  );
}
