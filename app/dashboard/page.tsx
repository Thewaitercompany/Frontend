"use client";

import React, { useState, useEffect } from "react";
import { useOrders } from "@/hooks/useOrders";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from "@/components/CustomCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css';

// import { BellIcon } from '@heroicons/react/outline';

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
} from 'lucide-react';

const SIDEBAR_ICON_SIZE = 40;
const SIDEBAR_ICON_COLOR = "#F1EBE6";
const SIDEBAR_ICON_GAP = 12;

// Sidebar icons as custom SVGs (Figma-accurate for icon 4: open book with bookmark)
const SidebarIconsFigma = [
  // 1. User
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <circle cx="14" cy="10" r="4.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M6.2 21c.1-3.2 3.3-5.2 7.8-5.2 4.5 0 7.7 2 7.8 5.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  // 2. Chart line
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <rect x="5.5" y="5.5" width="17" height="17" rx="4.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M8.7 18.2 13 13l3.2 3.2 4.1-4.9" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 3. Table/stand with "legs" (curve/thigh connection to center line)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="9.5" rx="7.3" ry="2.8" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M14 12.2v7" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 17.8c-1.5 1.2-2.2 2.2-2.2 2.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M14 17.8c1.5 1.2 2.2 2.2 2.2 2.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M11.8 20.4v2.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16.2 20.4v2.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  // 4. Book with bookmark (Figma-accurate, open book with center line and bookmark tab)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      {/* Book body */}
      <rect x="6.8" y="7.6" width="14.4" height="12.8" rx="2.2"
        stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" />
      {/* Bookmark tab */}
      <path d="M14 7.6v6.1l2-1 2 1V7.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* Book center fold */}
      <path d="M14 7.6v12.8" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  // 5. Hex with bars
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <path d="M14 5.6 22 10.6v6.8l-8 5-8-5v-6.8L14 5.6Z" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <rect x="11" y="13" width="2" height="4" rx="1" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="15" y="10" width="2" height="7" rx="1" fill={SIDEBAR_ICON_COLOR}/>
    </svg>
  ),
  // 6. Clipboard with check
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <rect x="8.2" y="6.7" width="11.6" height="16.1" rx="2.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <rect x="11" y="4.3" width="6" height="3.2" rx="1.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.5"/>
      <path d="m11.5 15.5 2.5 2.5 4-5" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 7. Analytics (Figma-accurate layered bar chart)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      {/* Main chart base */}
      <rect x="5.5" y="5.5" width="17" height="17" rx="2.5" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      {/* Bars on main chart */}
      <rect x="9.5" y="10.5" width="2" height="8" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="12.5" y="13.5" width="2" height="5" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="15.5" y="11.5" width="2" height="7" fill={SIDEBAR_ICON_COLOR}/>
      {/* Overlapping layer - smaller rectangle shifted */}
      <rect x="7.5" y="7.5" width="13" height="13" rx="2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.2" opacity="0.6"/>
    </svg>
  ),
];

// Sidebar icons vertical centering with equal bezels
  const sidebarIconCount = SidebarIconsFigma.length;
  const SIDEBAR_TOP_MARGIN = 160;
  const SIDEBAR_BOTTOM_MARGIN = 160;
  const barHeight = window.innerHeight - SIDEBAR_TOP_MARGIN - SIDEBAR_BOTTOM_MARGIN;
  const iconsTotalHeight = sidebarIconCount * SIDEBAR_ICON_SIZE + (sidebarIconCount - 1) * SIDEBAR_ICON_GAP;
  const equalBezelPadding = Math.max((barHeight - iconsTotalHeight) / 2, 0);
  
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



export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] =
    useState<keyof typeof monthlyData>("October");
  const [revenueData, setRevenueData] = useState(monthlyData[selectedMonth]);

  const handleMonthChange = (month: keyof typeof monthlyData) => {
    setSelectedMonth(month);
    setRevenueData(monthlyData[month]);
  };
  const { totalOrderCount, pendingOrderCount } = useOrders();

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f1eb] p-6 font-['Calibri, Arial, sans-serif']">
      {/* <header className="fixed top-0 left-0 w-full h-[80px] bg-[#f5f1eb] px-6 flex items-center justify-between z-10 ml-[5%]"> */}
      <header className="fixed top-0 left-0 w-full h-[80px] bg-[#f5f1eb] px-6 flex items-center justify-between z-10">
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
        <div className="text-right">
          {/* <h2 className="text-md font-medium">Thu 13 Mar 04:20PM</h2> */}
          <h2 className="text-md font-medium">
            {new Date().toLocaleString('en-US', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).replace(',', '')}
          </h2>
        </div>
      </header>


            {/* Today's Overview */}
      <div className="flex w-full min-h-screen bg-[#F4F0E8]">
        {/* Sidebar - 10% */}

      <div className="flex flex-col items-center"
        style={{
          width: 60,
          background: "#b3878b",
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          minHeight: barHeight,
          marginTop: SIDEBAR_TOP_MARGIN,
          marginBottom: SIDEBAR_BOTTOM_MARGIN,
          position: 'fixed',
          left: 0,
          zIndex: 10,
          // Adjusted boxShadow for the subtle shadow line
          boxShadow: '2px 0 8px 0 rgba(180,140,80,0.2)', // Shadow to the right for the "line"
          justifyContent: "flex-start",
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
            <span key={idx} className="flex items-center justify-center" style={{
              width: SIDEBAR_ICON_SIZE, height: SIDEBAR_ICON_SIZE
            }}>
              <IconComp />
            </span>
          ))}
        </div>
      </div>


        {/* Main Content - 90% shifted right due to fixed sidebar */}
        {/* <div className="ml-[10%] w-[95%] pt-[90px] px-6 py-6 flex gap-6"> */}
        {/* <div className="ml-[4%] w-[96%] pt-[90px] px-6 py-6 flex gap-6"> */}
        <div className="ml-[4%] w-[96%] pt-[90px] pl-6 pr-0 py-6 flex gap-6">


          {/* Left Section - 60% */}
          <div className="w-[70%]">

            <h2 className="text-xl font-semibold mb-4">Today's Performance</h2>

            {/* Overview Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
  {[
    { label: 'Total Orders', value: 202, icon: 'fas fa-sticky-note' },
    { label: 'Completed Orders', value: 190, icon: 'fa-file-circle-check' },
    { label: 'Pending Orders', value: 10, icon: 'fa-spinner' },
    { label: 'Cancelled Orders', value: 2, icon: 'fa-times-circle' },
  ].map(({ label, value, icon }, idx) => (
    <div
      key={idx}
      className="bg-white rounded-xl shadow-md w-[220px] h-[190px] p-4 flex flex-col justify-between"
    >
      <div className="text-4xl text-[#a0826c]">
        <i className={`fa ${icon}`}></i>
      </div>

      <div>
        <h3 className="text-base font-medium text-gray-700">{label}</h3>
        <p className="text-4xl font-bold text-[#C99E5A]">{value}</p>
      </div>

      <p className="text-sm text-gray-500">View more</p>
    </div>
  ))}
</div>


            <div className="bg-white rounded-xl p-8 shadow-md w-[960px] h-[608px]">
              <h3 className="text-md font-medium mb-4">Revenue</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7F6B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF7F6B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
          <div className="w-[25%] flex flex-col gap-4">
            <div className="flex justify-end w-full">
              <div className="relative">
                <FontAwesomeIcon icon={faBell} className="text-black text-2xl h-[25px]" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-semibold">
                  1
                </span>
              </div>
            </div>

            {/* Calendar */}  
            <CustomCalendar 
              leaveDates={["2025-06-12", "2025-06-01"]} 
              salaryDates={["2025-06-13", "2025-06-28"]}
            />

            {/* Footsteps Info */}
            <div className="bg-white rounded-xl p-4 shadow-md w-[400px]">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium">Footsteps</h4>
                <button className="text-xs border border-gray-300 rounded-full px-2 py-0.5 text-gray-500">Today</button>
              </div>

              <div className="flex justify-around text-center text-lg font-bold mb-1">
                <div>
                  <div className="text-[#C99E5A]">6,000</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                    <span className="w-3 h-3 bg-[#A0826C] rounded-sm"></span>
                    New Customers
                  </div>
                </div>

                <div>
                  <div className="text-[#C99E5A]">2,000</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                    <span className="w-3 h-3 bg-[#E0CAC0] rounded-sm"></span>
                    Repeated
                  </div>
                </div>
              </div>

              <div className="w-full h-5 bg-gray-200 rounded-full mt-4 relative flex">
                <div className="h-full bg-[#A0826C] rounded-l-full w-[75%] flex items-center justify-center text-white text-xs font-semibold">75%</div>
                <div className="h-full bg-[#E0CAC0] rounded-r-full w-[25%] flex items-center justify-center text-gray-500 text-xs font-semibold">25%</div>
              </div>
            </div>


            {/* Trending Items */}            
            <div className="bg-white rounded-xl p-4 shadow-md w-[400px]">
              <h4 className="text-md font-medium mb-4">Trending Items</h4>
              <div className="flex gap-4">
                {/* Left side: Color dot, Name, Pieces, Percentage */}
                <div className="flex flex-col justify-center gap-2 w-1/2 text-xs">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-gray-700 font-medium">
                      <div className="flex items-center w-[40%]">
                        <span
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: ['#5197ff', '#f78c8c', '#a463e6', '#f5bd65', '#65c97f'][index % 5] }}
                        ></span>
                        <span>{item.name}</span>
                      </div>
                      <span className="w-[30%] text-right">{item.value} pcs</span>
                      <span className="w-[30%] text-right">{((item.value / total) * 100).toFixed(0)}%</span>
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
                          fill={['#5197ff', '#f78c8c', '#a463e6', '#f5bd65', '#65c97f'][index % 5]}
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
    </div>
  );
}
