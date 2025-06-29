"use client";
import React, { useState, useEffect } from "react";

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
  Cell,
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
    { name: "1", Expense: 20, Revenue: 15 },
    { name: "3", Expense: 35, Revenue: 45 },
    { name: "5", Expense: 25, Revenue: 35 },
    { name: "7", Expense: 40, Revenue: 30 },
    { name: "9", Expense: 35, Revenue: 25 },
    { name: "11", Expense: 50, Revenue: 40 },
    { name: "13", Expense: 90, Revenue: 40 },
    { name: "15", Expense: 65, Revenue: 55 },
    { name: "17", Expense: 50, Revenue: 40 },
    { name: "19", Expense: 55, Revenue: 45 },
    { name: "21", Expense: 60, Revenue: 55 },
    { name: "23", Expense: 75, Revenue: 60 },
    { name: "25", Expense: 70, Revenue: 65 },
    { name: "27", Expense: 60, Revenue: 55 },
    { name: "29", Expense: 65, Revenue: 85 },
    { name: "31", Expense: 60, Revenue: 50 },
  ],
  November: [
    { name: "1", Expense: 10, Revenue: 15 },
    { name: "3", Expense: 25, Revenue: 45 },
    { name: "5", Expense: 35, Revenue: 35 },
    { name: "7", Expense: 40, Revenue: 30 },
    { name: "9", Expense: 55, Revenue: 25 },
    { name: "11", Expense: 20, Revenue: 40 },
    { name: "13", Expense: 30, Revenue: 40 },
    { name: "15", Expense: 25, Revenue: 55 },
    { name: "17", Expense: 50, Revenue: 40 },
    { name: "19", Expense: 25, Revenue: 45 },
    { name: "21", Expense: 30, Revenue: 55 },
    { name: "23", Expense: 35, Revenue: 60 },
    { name: "25", Expense: 50, Revenue: 65 },
    { name: "27", Expense: 30, Revenue: 55 },
    { name: "29", Expense: 25, Revenue: 85 },
    { name: "31", Expense: 40, Revenue: 50 },
  ],
  December: [
    { name: "1", Expense: 20, Revenue: 25 },
    { name: "3", Expense: 35, Revenue: 35 },
    { name: "5", Expense: 25, Revenue: 15 },
    { name: "7", Expense: 40, Revenue: 20 },
    { name: "9", Expense: 35, Revenue: 35 },
    { name: "11", Expense: 50, Revenue: 30 },
    { name: "13", Expense: 90, Revenue: 50 },
    { name: "15", Expense: 65, Revenue: 65 },
    { name: "17", Expense: 50, Revenue: 30 },
    { name: "19", Expense: 55, Revenue: 45 },
    { name: "21", Expense: 60, Revenue: 55 },
    { name: "23", Expense: 75, Revenue: 40 },
    { name: "25", Expense: 70, Revenue: 55 },
    { name: "27", Expense: 60, Revenue: 45 },
    { name: "29", Expense: 65, Revenue: 75 },
    { name: "31", Expense: 60, Revenue: 30 },
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

export default function ExpenseOverview() {
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
      {/* Main Dashboard Content */}
      <h2 className="text-2xl font-bold text-[#4A3F3F] ml-[105px] mt-[15px]">
          Sales Overview
        </h2>
      <div className="min-h-screen bg-[#F4F0E8] px-12 py-6 ml-14">
        
        {/* Top Section - Overview + Trending */}
        <div className="flex gap-6 flex-wrap">
          {[
            {
              label: "Revenue/Orders",
              value: 20000,
              path: "/dashboard/sales-overview/revenue-orders",
              icon: (
                <svg width="37" height="32" viewBox="0 0 37 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="25.5779" height="30.8029" rx="1.5" stroke="#B39793"/>
                  <path d="M28.6943 18.0449C33.0726 18.045 36.4998 21.1199 36.5 24.7725C36.5 28.4252 33.0727 31.5009 28.6943 31.501C24.3159 31.501 20.8887 28.4252 20.8887 24.7725C20.8889 21.1199 24.3161 18.0449 28.6943 18.0449Z" fill="white" stroke="#B39793"/>
                  <path d="M2.90625 27.1035H13.7035" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M15.3652 27.1035L19.518 27.1035" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.90625 24.2148H18.6869" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.90625 21.3203H19.5174" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M10.3828 3.25195H16.1967" stroke="#B39793" stroke-linecap="round"/>
                  <line x1="13.3711" y1="3.25195" x2="13.3711" y2="6.14312" stroke="#B39793"/>
                  <path d="M13.29 5.92188C18.3564 5.92203 22.3408 9.48295 22.3408 13.7344C22.3408 14.797 22.0713 15.4273 21.6729 15.8242C21.2633 16.2321 20.6402 16.4724 19.7715 16.5859C18.9041 16.6992 17.8629 16.6778 16.6797 16.624C15.5108 16.5709 14.2078 16.4863 12.874 16.4863C11.5394 16.4863 10.2891 16.5709 9.19727 16.624C8.08996 16.6779 7.15887 16.6985 6.40137 16.5869C5.64943 16.4762 5.13789 16.2456 4.80371 15.8545C4.46719 15.4606 4.23834 14.82 4.23828 13.7344C4.23828 9.48285 8.22356 5.92188 13.29 5.92188Z" stroke="#B39793"/>
                  <rect x="2.47813" y="15.9391" width="21.6251" height="2.09117" rx="1.04559" fill="white" stroke="#B39793" stroke-width="0.8"/>
                  <path d="M25 21.4863H32M25 23.9018H32M27.9995 21.4863C28.6663 21.6324 29.9998 22.1459 29.9998 23.6819C29.9998 26.3173 25.9993 26.3173 25.9993 26.3173C25.9993 26.3173 27.9995 27.8548 30.999 28.5144" stroke="#B39793" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              ),
            },
            {
              label: "Expenses/Purchase",
              value: 12000,
              path: "/dashboard/sales-overview/expense-purchase",
              icon: (
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="22.4667" height="31.6292" rx="1.5" stroke="#B39793"/>
                  <path d="M25.333 18.5C29.1017 18.5 32.167 21.5913 32.167 25.416C32.1668 29.2406 29.1016 32.3311 25.333 32.3311C21.5646 32.3309 18.5002 29.2405 18.5 25.416C18.5 21.5914 21.5645 18.5002 25.333 18.5Z" fill="white" stroke="#B39793"/>
                  <path d="M2.56641 27.8086H12.0997" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M13.5664 27.8086L17.2331 27.8086" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.56641 24.8438H16.4997" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.56641 21.875H17.2331" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M9.16797 3.33594H14.3013" stroke="#B39793" stroke-linecap="round"/>
                  <line x1="11.8652" y1="3.33594" x2="11.8652" y2="6.30223" stroke="#B39793"/>
                  <path d="M11.7324 6.0625C16.1085 6.06264 19.665 9.65184 19.665 14.0908C19.665 15.2012 19.4211 15.8631 19.0674 16.2725C18.7147 16.6806 18.1844 16.9178 17.4375 17.0312C16.685 17.1455 15.7766 17.1245 14.7314 17.0693C13.703 17.015 12.547 16.9277 11.3652 16.9277C10.1824 16.9277 9.073 17.015 8.1123 17.0693C7.13354 17.1247 6.32385 17.1442 5.66992 17.0322C5.03057 16.9228 4.59687 16.6974 4.30664 16.3027C4.00488 15.8922 3.79886 15.2193 3.79883 14.0908C3.79883 9.65175 7.35622 6.0625 11.7324 6.0625Z" stroke="#B39793"/>
                  <rect x="2.23398" y="16.3434" width="19" height="2.16629" rx="1.08315" fill="white" stroke="#B39793" stroke-width="0.8"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21 22.25C21 21.9185 21.1171 21.6005 21.3254 21.3661C21.5338 21.1317 21.8164 21 22.1111 21H27.6667C28.0203 21 28.3594 21.158 28.6095 21.4393C28.8595 21.7206 29 22.1022 29 22.5V29.4999C29 29.5888 28.9789 29.6762 28.9389 29.7529C28.8989 29.8297 28.8415 29.893 28.7724 29.9364C28.7034 29.9798 28.6253 30.0017 28.5463 29.9999C28.4672 29.998 28.39 29.9725 28.3227 29.9259L27.1111 29.0869L25.8996 29.9259C25.8295 29.9743 25.7489 30 25.6667 30C25.5844 30 25.5038 29.9743 25.4338 29.9259L24.2222 29.0869L23.0107 29.9259C22.9433 29.9725 22.8661 29.998 22.7871 29.9999C22.708 30.0017 22.6299 29.9798 22.5609 29.9364C22.4919 29.893 22.4344 29.8297 22.3944 29.7529C22.3544 29.6762 22.3333 29.5888 22.3333 29.4999V26.4999H21.4444C21.3266 26.4999 21.2135 26.4472 21.1302 26.3535C21.0468 26.2597 21 26.1325 21 25.9999V22.25ZM23.2222 28.6049L23.9893 28.0739C24.0594 28.0254 24.14 27.9997 24.2222 27.9997C24.3045 27.9997 24.3851 28.0254 24.4551 28.0739L25.6667 28.9129L26.8782 28.0739C26.9483 28.0254 27.0289 27.9997 27.1111 27.9997C27.1933 27.9997 27.274 28.0254 27.344 28.0739L28.1111 28.6049V22.5C28.1111 22.3674 28.0643 22.2402 27.9809 22.1464C27.8976 22.0527 27.7845 22 27.6667 22H23.2C23.2148 22.081 23.2222 22.1643 23.2222 22.25V28.6049ZM22.1111 22C22.0522 22 21.9957 22.0263 21.954 22.0732C21.9123 22.1201 21.8889 22.1837 21.8889 22.25V25.4999H22.3333V22.25C22.3333 22.1837 22.3099 22.1201 22.2682 22.0732C22.2266 22.0263 22.17 22 22.1111 22ZM24.1111 24C24.1111 23.8673 24.1579 23.7402 24.2413 23.6464C24.3246 23.5526 24.4377 23.5 24.5556 23.5H26.7778C26.8957 23.5 27.0087 23.5526 27.092 23.6464C27.1754 23.7402 27.2222 23.8673 27.2222 24C27.2222 24.1326 27.1754 24.2597 27.092 24.3535C27.0087 24.4473 26.8957 24.4999 26.7778 24.4999H24.5556C24.4377 24.4999 24.3246 24.4473 24.2413 24.3535C24.1579 24.2597 24.1111 24.1326 24.1111 24ZM24.1111 25.9999C24.1111 25.8673 24.1579 25.7401 24.2413 25.6464C24.3246 25.5526 24.4377 25.4999 24.5556 25.4999H26.3333C26.4512 25.4999 26.5643 25.5526 26.6476 25.6464C26.731 25.7401 26.7778 25.8673 26.7778 25.9999C26.7778 26.1325 26.731 26.2597 26.6476 26.3535C26.5643 26.4472 26.4512 26.4999 26.3333 26.4999H24.5556C24.4377 26.4999 24.3246 26.4472 24.2413 26.3535C24.1579 26.2597 24.1111 26.1325 24.1111 25.9999Z" fill="#B39793"/>
                </svg>
              ),
            },
            {
              label: "Report & Analytics",
              // value: 2,
              path: "/dashboard/reports",
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="22.0003" height="31" rx="1.5" stroke="#B39793"/>
                  <path d="M24.8145 18.043C28.5031 18.043 31.499 21.0528 31.499 24.7715C31.4988 28.49 28.503 31.499 24.8145 31.499C21.1262 31.4988 18.1311 28.4898 18.1309 24.7715C18.1309 21.0529 21.126 18.0432 24.8145 18.043Z" fill="white" stroke="#B39793"/>
                  <path d="M2.51172 27.1035H11.851" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M13.2891 27.1035L16.8811 27.1035" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.51172 24.2148H16.1615" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M2.51172 21.3223H16.8799" stroke="#B39793" stroke-linecap="round"/>
                  <path d="M8.97852 3.25195H14.0074" stroke="#B39793" stroke-linecap="round"/>
                  <line x1="11.6367" y1="3.25195" x2="11.6367" y2="6.14319" stroke="#B39793"/>
                  <path d="M11.4902 5.92188C15.774 5.92189 19.252 9.41687 19.252 13.7344C19.2519 14.8145 19.0127 15.4557 18.6689 15.8516C18.3258 16.2466 17.8091 16.4775 17.0781 16.5879C16.3418 16.6991 15.4526 16.6788 14.4287 16.625C13.4215 16.5721 12.2888 16.4873 11.1309 16.4873C9.97171 16.4873 8.88437 16.5721 7.94336 16.625C6.98447 16.679 6.19236 16.6978 5.55273 16.5889C4.92732 16.4824 4.50556 16.2633 4.22363 15.8818C3.93038 15.4849 3.72854 14.8328 3.72852 13.7344C3.72852 9.41687 7.20644 5.92188 11.4902 5.92188Z" stroke="#B39793"/>
                  <rect x="2.19492" y="15.941" width="18.597" height="2.09124" rx="1.04562" fill="white" stroke="#B39793" stroke-width="0.8"/>
                  <path d="M23.511 24.7574H26.0624M23.511 26.3169H24.7867M21.3848 21.2485V27.4866C21.3848 27.6934 21.4744 27.8917 21.6339 28.038C21.7934 28.1842 22.0097 28.2663 22.2352 28.2663H27.3381C27.5637 28.2663 27.78 28.1842 27.9395 28.038C28.099 27.8917 28.1886 27.6934 28.1886 27.4866V22.9414C28.1886 22.8375 28.1659 22.7347 28.1219 22.6389C28.078 22.5432 28.0136 22.4565 27.9326 22.3838L26.0445 20.691C25.8856 20.5485 25.6723 20.4688 25.45 20.4688H22.2352C22.0097 20.4688 21.7934 20.5509 21.6339 20.6971C21.4744 20.8434 21.3848 21.0417 21.3848 21.2485Z" stroke="#B39793" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M25.6367 20.4688V22.0283C25.6367 22.2351 25.7263 22.4334 25.8858 22.5796C26.0453 22.7259 26.2616 22.808 26.4872 22.808H28.1881" stroke="#B39793" stroke-width="0.8" stroke-linejoin="round"/>
                </svg>
              ),
            },
          ].map(({ label, value, icon, path }, idx) => (
            <div
        key={idx}
        style={{ width: "282px" }}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[180px] h-[180px] cursor-pointer hover:shadow-lg transition"
        onClick={() => router.push(path)}
      >
        <div className="text-4xl">{icon}</div>

        <div className="space-y-2">
          <h3 className="font-aleo font-semibold text-[20px] text-gray-700">{label}</h3>
          <p className="text-4xl font-bold text-[#C99E5A]">
            {value ? `₹${value}` : ''}
          </p>
        </div>

        <p className="text-sm text-gray-500 hover:text-[#C99E5A] transition-colors">View more</p>
      </div>

          ))}

          {/* Trending Items */}
          <div
            style={{ width: "450px" }}
            className="bg-white rounded-xl p-6 shadow-md min-h-[180px]"
            onClick={() => router.push('/dashboard/sales-overview/trending-dishes')}
          >
            <div className="relative">
              <h4 className="absolute -top-3 text-lg font-bold text-[#4A3F3F] bg-white px-1">
                Trending Dishes
              </h4>
            </div>

            <div className="flex gap-6 h-[100px] mt-8">
              <div className="flex flex-col justify-center gap-0">
                {pieData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-700 font-medium gap-1"
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: ["#5197ff", "#f78c8c", "#a463e6", "#f5bd65", "#65c97f"][index % 5],
                        }}
                      ></span>
                      <span className="truncate font-aleo">{item.name}</span>
                    </div>
                    <div className="min-w-[70px] font-aleo">{item.value} pcs</div>
                    <div className="min-w-[50px] font-aleo">
                      {((item.value / total) * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
                <div className="mt-2">
                  <p className="text-sm text-gray-500 hover:text-[#C99E5A] transition-colors">View more</p>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="w-1/2 flex justify-center items-center -ml-[10%] -mt-[5%]">
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
                        fill={["#5197ff", "#f78c8c", "#a463e6", "#f5bd65", "#65c97f"][index % 5]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Revenue Chart Full Width */}
        <div className="mt-10">
        <div className="w-full bg-white shadow-xl rounded-t-xl p-6 flex justify-end items-center">
  <svg
    width="83"
    height="30"
    viewBox="0 0 83 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    
<rect x="0.5" y="0.5" width="82" height="29" rx="3.5" fill="#FCFDFD" stroke="#B39793"/>
<path d="M33.528 19V10.11H30.266V8.962H38.12V10.11H34.886V19H33.528ZM32.52 19V18.426C32.52 18.342 32.5387 18.2767 32.576 18.23C32.6133 18.174 32.6693 18.1413 32.744 18.132L33.794 17.908L33.948 19H32.52ZM34.466 19L34.62 17.908L35.67 18.132C35.7447 18.1413 35.8007 18.174 35.838 18.23C35.8753 18.2767 35.894 18.342 35.894 18.426V19H34.466ZM36.972 9.76L38.12 10.11V11.384H37.476C37.4013 11.384 37.336 11.37 37.28 11.342C37.2333 11.3047 37.2007 11.244 37.182 11.16L36.972 9.76ZM31.414 9.76L31.204 11.16C31.1947 11.244 31.162 11.3047 31.106 11.342C31.05 11.37 30.9847 11.384 30.91 11.384H30.266V10.11L31.414 9.76ZM41.821 11.79C42.5304 11.79 43.1324 11.944 43.627 12.252C44.131 12.5507 44.5184 12.9753 44.789 13.526C45.0597 14.0767 45.195 14.716 45.195 15.444C45.195 16.172 45.0597 16.8113 44.789 17.362C44.5184 17.9127 44.131 18.342 43.627 18.65C43.1324 18.9487 42.5304 19.098 41.821 19.098C41.1304 19.098 40.5284 18.9487 40.015 18.65C39.511 18.342 39.119 17.9127 38.839 17.362C38.5684 16.8113 38.433 16.172 38.433 15.444C38.433 14.716 38.5684 14.0767 38.839 13.526C39.119 12.9753 39.511 12.5507 40.015 12.252C40.5284 11.944 41.1304 11.79 41.821 11.79ZM41.821 18.118C42.521 18.118 43.0437 17.8847 43.389 17.418C43.7344 16.9513 43.907 16.298 43.907 15.458C43.907 14.8887 43.8277 14.408 43.669 14.016C43.5197 13.6147 43.291 13.3067 42.983 13.092C42.675 12.8773 42.2877 12.77 41.821 12.77C41.345 12.77 40.9484 12.882 40.631 13.106C40.323 13.3207 40.0944 13.6287 39.945 14.03C39.7957 14.4313 39.721 14.9073 39.721 15.458C39.721 16.27 39.8937 16.9187 40.239 17.404C40.5844 17.88 41.1117 18.118 41.821 18.118ZM48.832 19.098C48.2533 19.098 47.7633 18.9487 47.362 18.65C46.9606 18.3513 46.6573 17.9313 46.452 17.39C46.2466 16.8393 46.144 16.2 46.144 15.472C46.144 14.7813 46.2653 14.1607 46.508 13.61C46.7506 13.05 47.1006 12.6067 47.558 12.28C48.0246 11.944 48.5753 11.776 49.21 11.776C49.6486 11.776 50.022 11.8507 50.33 12C50.638 12.1493 50.9133 12.3547 51.156 12.616V8.682H52.402V19H51.66C51.4733 19 51.3613 18.9113 51.324 18.734L51.212 17.88C50.904 18.244 50.554 18.538 50.162 18.762C49.7793 18.986 49.336 19.098 48.832 19.098ZM49.238 18.09C49.6486 18.09 50.0033 17.9967 50.302 17.81C50.61 17.6233 50.8946 17.3573 51.156 17.012V13.582C50.9226 13.274 50.6706 13.0593 50.4 12.938C50.1293 12.8167 49.826 12.756 49.49 12.756C49.0513 12.756 48.678 12.8633 48.37 13.078C48.062 13.2833 47.8286 13.5913 47.67 14.002C47.5113 14.4033 47.432 14.8933 47.432 15.472C47.432 16.3213 47.5766 16.97 47.866 17.418C48.1553 17.866 48.6126 18.09 49.238 18.09ZM51.576 8.682L51.422 9.774L50.372 9.55C50.2973 9.53133 50.2413 9.49867 50.204 9.452C50.1666 9.40533 50.148 9.34 50.148 9.256V8.682H51.576ZM51.982 19L52.136 17.908L53.186 18.132C53.2606 18.1413 53.3166 18.174 53.354 18.23C53.3913 18.2767 53.41 18.342 53.41 18.426V19H51.982ZM56.158 19.112C55.7847 19.112 55.4487 19.042 55.15 18.902C54.8513 18.7527 54.6133 18.538 54.436 18.258C54.2587 17.978 54.17 17.6327 54.17 17.222C54.17 16.942 54.2447 16.676 54.394 16.424C54.5527 16.1627 54.8047 15.9293 55.15 15.724C55.4953 15.528 55.9433 15.3647 56.494 15.234C57.054 15.1033 57.7353 15.0287 58.538 15.01V14.464C58.538 13.9133 58.4167 13.498 58.174 13.218C57.9407 12.9287 57.5953 12.784 57.138 12.784C56.8953 12.784 56.6387 12.8493 56.368 12.98C56.1067 13.1013 55.864 13.2273 55.64 13.358C55.416 13.4793 55.2387 13.54 55.108 13.54C55.024 13.54 54.9493 13.5167 54.884 13.47C54.828 13.4233 54.7813 13.3673 54.744 13.302L54.52 12.91C54.912 12.5273 55.332 12.2427 55.78 12.056C56.2373 11.8693 56.7413 11.776 57.292 11.776C57.824 11.776 58.272 11.888 58.636 12.112C59 12.336 59.2753 12.6487 59.462 13.05C59.658 13.4513 59.756 13.9227 59.756 14.464V19H59.21C59.0887 19 58.9907 18.9813 58.916 18.944C58.8413 18.9067 58.79 18.8273 58.762 18.706L58.622 18.048C58.2487 18.384 57.8753 18.6453 57.502 18.832C57.1287 19.0187 56.6807 19.112 56.158 19.112ZM56.522 18.23C56.942 18.23 57.3107 18.146 57.628 17.978C57.9453 17.81 58.2487 17.5767 58.538 17.278V15.808C58.0527 15.8173 57.614 15.8547 57.222 15.92C56.83 15.976 56.494 16.06 56.214 16.172C55.9433 16.2747 55.7333 16.41 55.584 16.578C55.444 16.7367 55.374 16.9327 55.374 17.166C55.374 17.5393 55.4813 17.81 55.696 17.978C55.92 18.146 56.1953 18.23 56.522 18.23ZM59.336 19L59.49 17.908L60.54 18.132C60.6147 18.1413 60.6707 18.174 60.708 18.23C60.7453 18.2767 60.764 18.342 60.764 18.426V19H59.336ZM63.0587 21.408L64.3467 18.58L61.4207 11.902H62.4987C62.6107 11.902 62.6947 11.93 62.7507 11.986C62.816 12.042 62.8627 12.1027 62.8907 12.168L64.7807 16.634C64.8087 16.6993 64.8414 16.7927 64.8787 16.914C64.916 17.0353 64.9487 17.1473 64.9767 17.25C64.9954 17.1753 65.014 17.1053 65.0327 17.04C65.0514 16.9747 65.0747 16.9093 65.1027 16.844C65.1307 16.7693 65.1587 16.6947 65.1867 16.62L67.0207 12.168C67.0487 12.0933 67.0954 12.0327 67.1607 11.986C67.2354 11.93 67.31 11.902 67.3847 11.902H68.3787L64.4307 21.1C64.3934 21.1933 64.342 21.268 64.2767 21.324C64.2114 21.38 64.1134 21.408 63.9827 21.408H63.0587ZM62.3167 12.252V11.902H63.3667V12.252H62.3167ZM66.6567 12.252V11.902H67.7067V12.252H66.6567ZM62.4007 11.902L62.2467 12.994L61.1967 12.77C61.122 12.7513 61.066 12.7187 61.0287 12.672C60.9914 12.6253 60.9727 12.56 60.9727 12.476V11.902H62.4007ZM64.1507 11.902V12.476C64.1507 12.56 64.132 12.6253 64.0947 12.672C64.0574 12.7187 64.0014 12.7513 63.9267 12.77L62.8767 12.994L62.7227 11.902H64.1507ZM67.0767 11.902L66.9227 12.994L65.8727 12.77C65.798 12.7513 65.742 12.7187 65.7047 12.672C65.6674 12.6253 65.6487 12.56 65.6487 12.476V11.902H67.0767ZM68.8267 11.902V12.476C68.8267 12.56 68.808 12.6253 68.7707 12.672C68.7334 12.7187 68.6774 12.7513 68.6027 12.77L67.5527 12.994L67.3987 11.902H68.8267Z" fill="#B39793"/>
<path d="M15 8.5C18.59 8.5 21.5 11.41 21.5 15C21.5 18.59 18.59 21.5 15 21.5C11.41 21.5 8.5 18.59 8.5 15C8.5 11.41 11.41 8.5 15 8.5ZM15 8.90039C13.3822 8.90039 11.8305 9.54255 10.6865 10.6865C9.54255 11.8305 8.90039 13.3822 8.90039 15C8.90039 16.6178 9.54255 18.1695 10.6865 19.3135C11.8305 20.4574 13.3822 21.0996 15 21.0996C16.6178 21.0996 18.1695 20.4574 19.3135 19.3135C20.4574 18.1695 21.0996 16.6178 21.0996 15C21.0996 13.3822 20.4574 11.8305 19.3135 10.6865C18.1695 9.54255 16.6178 8.90039 15 8.90039ZM15 11.2998C15.049 11.2998 15.0962 11.318 15.1328 11.3506C15.1694 11.3831 15.1925 11.4279 15.1982 11.4766L15.2002 11.5137V14.917L15.3467 15.0635L17.2412 16.958C17.2769 16.9939 17.2972 17.0422 17.2988 17.0928C17.3004 17.1436 17.2826 17.1933 17.249 17.2314C17.2155 17.2695 17.1687 17.293 17.1182 17.2979C17.0693 17.3025 17.0209 17.2887 16.9814 17.2598L16.9453 17.2275L14.8584 15.1416C14.8281 15.1112 14.809 15.0717 14.8027 15.0293L14.7998 14.9805V11.5C14.7998 11.447 14.8209 11.3959 14.8584 11.3584C14.8866 11.3302 14.9224 11.3114 14.9609 11.3037L15 11.2998Z" fill="#B39793" stroke="#B39793"/>


  </svg>
</div>




        <div className="bg-white rounded-b-xl p-8 shadow-md w-full pt-0">


          

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyData["October"]}>
              <defs>

                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B196FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#B196FF" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7F6B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF7F6B" stopOpacity={0} />
                </linearGradient>
                
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="Revenue"
                stroke="#B196FF"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="Expense"
                stroke="#FF7F6B"
                fill="url(#colorExpense)"
                strokeWidth={2}
              />
              
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-8 mt-4 text-sm font-medium">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B196FF]"></span>
              <span>Revenue</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF7F6B]"></span>
              <span>Expense</span>
            </div>
            
          </div>
        </div>
        </div>
      </div>


      
    </div>
  );
}
