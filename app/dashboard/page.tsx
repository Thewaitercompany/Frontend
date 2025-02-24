'use client';

import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Link from 'next/link';
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Monthly revenue data
const monthlyData = {
  'October': [
    { name: '1', Sales: 20, Profit: 15 },
    { name: '3', Sales: 35, Profit: 45 },
    { name: '5', Sales: 25, Profit: 35 },
    { name: '7', Sales: 40, Profit: 30 },
    { name: '9', Sales: 35, Profit: 25 },
    { name: '11', Sales: 50, Profit: 40 },
    { name: '13', Sales: 90, Profit: 40 },
    { name: '15', Sales: 65, Profit: 55 },
    { name: '17', Sales: 50, Profit: 40 },
    { name: '19', Sales: 55, Profit: 45 },
    { name: '21', Sales: 60, Profit: 55 },
    { name: '23', Sales: 75, Profit: 60 },
    { name: '25', Sales: 70, Profit: 65 },
    { name: '27', Sales: 60, Profit: 55 },
    { name: '29', Sales: 65, Profit: 85 },
    { name: '31', Sales: 60, Profit: 50 },
  ],
  'November': [
    { name: '1', Sales: 10, Profit: 15 },
    { name: '3', Sales: 25, Profit: 45 },
    { name: '5', Sales: 35, Profit: 35 },
    { name: '7', Sales: 40, Profit: 30 },
    { name: '9', Sales: 55, Profit: 25 },
    { name: '11', Sales: 20, Profit: 40 },
    { name: '13', Sales: 30, Profit: 40 },
    { name: '15', Sales: 25, Profit: 55 },
    { name: '17', Sales: 50, Profit: 40 },
    { name: '19', Sales: 25, Profit: 45 },
    { name: '21', Sales: 30, Profit: 55 },
    { name: '23', Sales: 35, Profit: 60 },
    { name: '25', Sales: 50, Profit: 65 },
    { name: '27', Sales: 30, Profit: 55 },
    { name: '29', Sales: 25, Profit: 85 },
    { name: '31', Sales: 40, Profit: 50 },
  ],
  'December': [
    { name: '1', Sales: 20, Profit: 25 },
    { name: '3', Sales: 35, Profit: 35 },
    { name: '5', Sales: 25, Profit: 15 },
    { name: '7', Sales: 40, Profit: 20 },
    { name: '9', Sales: 35, Profit: 35 },
    { name: '11', Sales: 50, Profit: 30 },
    { name: '13', Sales: 90, Profit: 50 },
    { name: '15', Sales: 65, Profit: 65 },
    { name: '17', Sales: 50, Profit: 30 },
    { name: '19', Sales: 55, Profit: 45 },
    { name: '21', Sales: 60, Profit: 55 },
    { name: '23', Sales: 75, Profit: 40 },
    { name: '25', Sales: 70, Profit: 55 },
    { name: '27', Sales: 60, Profit: 45 },
    { name: '29', Sales: 65, Profit: 75 },
    { name: '31', Sales: 60, Profit: 30 },
  ],
};

const customerData = [
  { name: 'New Customers', value: 34249 },
  { name: 'Repeated', value: 5420 },
];

const orderDivisionData = [
  { name: 'Starters', value: 2000 },
  { name: 'Main course', value: 2000 },
  { name: 'Desserts', value: 2000 },
  { name: 'Beverages', value: 2000 },
  { name: 'Alcohol', value: 2000 },
];


const footstepData = [
  { name: 'Jun', value: 2.5 },
  { name: 'Jul', value: 5.0 },
  { name: 'Aug', value: 7.5 },
  { name: 'Sep', value: 5.0 },
  { name: 'Oct', value: 10.0 },
];

const COLORS = ['#6B8AF4', '#FF7F6B', '#96D160', '#FFB572', '#FF8FD2'];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof monthlyData>('October');
  const [revenueData, setRevenueData] = useState(monthlyData[selectedMonth]);

  const handleMonthChange = (month: keyof typeof monthlyData) => {
    setSelectedMonth(month);
    setRevenueData(monthlyData[month]);
  };

  return (
    (<div className="min-h-screen bg-[#f5f1eb] p-8 font-serif">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Waiter Company Logo"
              width={150}
              height={50}
              className="h-8 w-auto"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </Link>
          <span className="text-xl text-gray-400">×</span>
          <span className="text-xl">Badshah&apos;s Kitchen</span>
        </div>
        <div className="text-right">
            <Link href="/dashboard">
            <h2 className="text-xl font-medium">Dashboard</h2>
            </Link>
          <p className="text-sm text-gray-600">
            Saturday, November, 2024
          </p>
        </div>
      </header>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium">Today&apos;s Overview</h2>
          <div className="flex gap-4">
            <Link 
              href="/dashboard/tables"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              List of Tables
            </Link>
            <Link
              href="/dashboard/menu"
              className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm hover:bg-[#C99E5A] transition-colors"
            >
              Restaurant&apos;s Menu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <Link href="/dashboard/total-orders" className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors">
            <h3 className="text-sm text-gray-600 mb-2">Total Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">200</p>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Completed Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">170</p>
          </div>
          <Link href="/dashboard/pending-orders" className="bg-white rounded-xl p-6 shadow-sm hover:bg-[#C99E5A] transition-colors">
            <h3 className="text-sm text-gray-600 mb-2">Pending Orders</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">30</p>
          </Link>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Total Sales</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">50,000</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">Total Profit</h3>
            <p className="text-2xl font-medium text-[#C99E5A]">22,000</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Revenue</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['Yearly', 'Monthly', 'Weekly', 'Daily'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors
                    ${period === selectedPeriod 
                      ? 'bg-[#C99E5A] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9E9E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF9E9E" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CEB5FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#CEB5FF" stopOpacity={0}/>
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
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-6">Customers</h3>
          <div className="flex justify-center mb-6">
            <PieChart width={200} height={200}>
              <Pie
                data={customerData}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#6B8AF4', '#E2E8FF'][index]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#6B8AF4]">New Customers</span>
              <span className="text-xl font-medium text-[#C99E5A]">34,249</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#E2E8FF]">Repeated</span>
              <span className="text-xl font-medium text-[#C99E5A]">5,420</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-6">Order Division</h3>
          <div className="flex justify-center mb-6">
            <PieChart width={200} height={200}>
              <Pie
                data={orderDivisionData}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {orderDivisionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {orderDivisionData.map((item, index) => (
              <div key={index}>
                <p className="text-sm" style={{ color: COLORS[index] }}>{item.name}</p>
                <p className="text-lg font-medium" style={{ color: COLORS[index] }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-6">Footstep/month</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={footstepData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6B8AF4"
                  strokeWidth={2}
                  dot={{ stroke: '#6B8AF4', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>)
  );
}