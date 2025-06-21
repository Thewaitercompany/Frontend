"use client";

import React, { useState } from "react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays
} from "date-fns";

type CalendarProps = {
  leaveDates: string[];
  salaryDates: string[];
};

const CustomCalendar: React.FC<CalendarProps> = ({ leaveDates, salaryDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
  <h2 className="ml-[4%] text-[20px] font-bold font-aleo">
    {format(currentMonth, "MMMM, yyyy")}
  </h2>

  <div className="flex gap-2 mr-[5%]">
    <button onClick={prevMonth} className="text-gray-500 text-xl">
      &lt;
    </button>
    <button onClick={nextMonth} className="text-gray-500 text-xl">
      &gt;
    </button>
  </div>
</div>

    );
  };

  const renderDays = () => {
    const days = [];
    const date = new Date();
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-medium text-gray-600">
          {format(addDays(startOfWeek(date, { weekStartsOn: 1 }), i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });


    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isDisabled = !isSameMonth(day, monthStart);
        const isLeave = leaveDates.includes(formattedDate);
        const isSalary = salaryDates.includes(formattedDate);
        const isToday = isSameDay(day, today);

        days.push(
          <div
            key={day.toString()}
            onClick={() => {
              if (!isDisabled) setSelectedDate(day);
            }}
            className={`relative w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm
              ${isDisabled ? "text-gray-400" : "text-black"} 
              ${isSameDay(day, selectedDate || new Date()) ? "border border-black bg-transparent text-black" : ""}
              ${isToday && !isSameDay(day, selectedDate || new Date()) ? "border border-[#C99E5A] bg-transparent" : ""}
            `}
          >
            {format(day, "d")}
            <div className="absolute bottom-1 flex gap-1">
              {isLeave && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
              {isSalary && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7 mb-1">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-[420px] mt-0">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="flex gap-4 mt-4 text-sm text-gray-600 ml-[5%]">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Leave Taken</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-500 rounded-full" />
          <span>Salary Due Date</span>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
