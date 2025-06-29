"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useOrders } from "@/hooks/useOrders";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";

import { Clock } from "lucide-react";

interface Order {
  id: string;
  name: string;
  quantity: number;
  price: number;
  time: string;
  staffName: string;
  customerDetails: string;
  tableNo: string;
  orderStatus: string;
  isVeg?: boolean;
  category?: string;
}

interface ApiOrderItem {
  _id: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
}

interface ApiOrder {
  items?: ApiOrderItem[];
  createdAt: string;
  tableNumber: string;
  phoneNumber?: string;
}

export default function TrendingDishes() {
    const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  const { totalOrderCount, pendingOrderCount } = useOrders();
  const completedOrderCount = totalOrderCount - pendingOrderCount;

  const categories = [
    "Starters",
    "Drinks",
    "Desserts",
    "Main Course",
    "All Items",
  ];

  const pieData = [
    {
      name: "Chicken Nuggets",
      value: 50,
      unitSold: 50,
      price: 80,
      revenue: 50 * 80,
      category: "Starters",
      color: "#4F9EFF",
      image: "https://via.placeholder.com/69x53.png?text=Nuggets",
      isVeg: false,
    },
    {
      name: "Cold Coffee",
      value: 25,
      unitSold: 25,
      price: 60,
      revenue: 25 * 60,
      category: "Drinks",
      color: "#FF9E9E",
      image: "https://via.placeholder.com/69x53.png?text=Coffee",
      isVeg: true,
    },
    {
      name: "Pasta",
      value: 15,
      unitSold: 15,
      price: 100,
      revenue: 15 * 100,
      category: "Main Course",
      color: "#CEB5FF",
      image: "https://via.placeholder.com/69x53.png?text=Pasta",
      isVeg: true,
    },
    {
      name: "Ginger Tea",
      value: 7,
      unitSold: 7,
      price: 20,
      revenue: 7 * 20,
      category: "Drinks",
      color: "#C99E5A",
      image: "https://via.placeholder.com/69x53.png?text=Tea",
      isVeg: true,
    },
    {
      name: "Paneer Sandwich",
      value: 3,
      unitSold: 3,
      price: 90,
      revenue: 3 * 90,
      category: "Starters",
      color: "#A0826C",
      image: "https://via.placeholder.com/69x53.png?text=Sandwich",
      isVeg: true,
    },
  ];

  const filteredOrders = pieData.filter((order) => {
    const matchesCategory =
      selectedCategory === "All Items" || order.category === selectedCategory;

    const matchesSearch = order.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesVegOnly = !isVegOnly || order.isVeg;

    return matchesCategory && matchesSearch && matchesVegOnly;
  });

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
    <div className="min-h-screen bg-[#f5f1eb] font-['Calibri'] overflow-x-hidden mt-6">
      {/* Today's Overview */}
      <div className="flex w-full min-h-screen bg-[#F4F0E8]">
        {/* Main Content */}
        <div className="ml-[60px] w-full px-6">
          {/* Controls above box */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#4b2e2e]">
              <button
                title="Back to Dashboard"
                onClick={() => router.push("/dashboard")}
                className="w-[25px] h-[25px]"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="25" height="25" fill="#F1EEE6" />
                  <path
                    d="M17.2783 23.75C17.0882 23.75 16.8994 23.7101 16.7227 23.6318C16.5457 23.5534 16.3833 23.4378 16.2461 23.291L7.68848 14.1318V14.1309C7.55062 13.9845 7.43978 13.8093 7.36426 13.6152C7.28884 13.4214 7.25005 13.2128 7.25 13.002C7.25 12.7909 7.28875 12.5817 7.36426 12.3877C7.42088 12.2422 7.49717 12.1073 7.58984 11.9873L7.68848 11.8721L16.2461 2.71289L16.2471 2.71191C16.3838 2.56437 16.5457 2.44803 16.7227 2.36914C16.8993 2.29042 17.0881 2.25004 17.2783 2.25C17.4688 2.25 17.6581 2.29029 17.835 2.36914C18.0119 2.44803 18.1738 2.56436 18.3105 2.71191L18.3115 2.71289L18.4102 2.82812C18.5028 2.94817 18.5791 3.08303 18.6357 3.22852C18.7113 3.42255 18.75 3.63167 18.75 3.84277C18.75 4.05366 18.7112 4.2622 18.6357 4.45605C18.5791 4.60147 18.5028 4.73645 18.4102 4.85645L18.3115 4.97168L10.9521 12.8311L10.792 13.002L10.9521 13.1729L18.3115 21.0312H18.3125C18.5894 21.3281 18.7471 21.7348 18.7471 22.1611C18.747 22.372 18.7079 22.5805 18.6328 22.7744C18.5577 22.9684 18.4487 23.1442 18.3115 23.291C18.0346 23.5874 17.6621 23.75 17.2783 23.75Z"
                    fill="#4A3936"
                    stroke="#EFECE4"
                    strokeWidth="0.5"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-medium font-black">
                Trending Dishes
              </h2>
            </div>
            
          </div>

          {/* White Box */}
          <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
            {/* Search + Today */}
            <div className="flex items-center justify-between mb-3">
  {/* Left: Search */}
  <div className="w-[20%]">
    <div className="flex items-center border border-[#b3978b] rounded-[6px] px-3 py-0.5 bg-white">
      <Search className="text-[#b3978b] w-6 h-6 mr-2" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-lg placeholder-[#b3978b] text-[#b3978b] bg-transparent focus:outline-none"
      />
    </div>
  </div>

  {/* Right: Rest of the items */}
  <div className="flex items-center gap-4">
    <label className="flex items-center gap-1 text-[#4b2e2e] text-xl font-extrabold">
      <input
        type="checkbox"
        className="w-4 h-4"
        checked={isVegOnly}
        onChange={(e) => setIsVegOnly(e.target.checked)}
      />
      Veg Only
    </label>

    <select
      title="Select Category"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border border-[#b3978b] rounded px-2 py-1 text-xl font-extrabold bg-white text-sm text-[#8c6c6a] h-[36px] w-[160px]"
    >
      {categories.map((cat, idx) => (
        <option key={idx} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    <button className="flex items-center gap-2 border border-[#b3978b] rounded-[6px] px-3 py-[4px] text-[#8c6c6a] text-sm">
      <Clock className="w-4 h-4" />
      Today
    </button>

    <div
      className="cursor-pointer"
      onClick={() =>
        router.push('/dashboard/sales-overview/trending-dishes/graph')
      }
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="21" cy="21" r="20.5" stroke="#B39793" />
        <path
          d="M11.0312 11.5C11.1658 11.5 11.2992 11.5551 11.4004 11.6602C11.5022 11.7659 11.5625 11.9138 11.5625 12.0713V29.3574H30.9688C31.1033 29.3574 31.2367 29.4124 31.3379 29.5176C31.4397 29.6234 31.5 29.7711 31.5 29.9287C31.5 30.0862 31.4397 30.2341 31.3379 30.3398C31.2367 30.4449 31.1033 30.5 30.9688 30.5H11.0312C10.8967 30.5 10.7633 30.4449 10.6621 30.3398C10.5603 30.2341 10.5 30.0862 10.5 29.9287V12.0713C10.5 11.9138 10.5603 11.7659 10.6621 11.6602C10.7379 11.5815 10.8319 11.5313 10.9307 11.5107L11.0312 11.5ZM30.9521 14.3838C31.0509 14.3856 31.149 14.4165 31.2334 14.4756L31.3125 14.5439C31.412 14.6473 31.472 14.7905 31.4746 14.9443C31.4772 15.0974 31.4215 15.2415 31.3262 15.3486L24.1182 22.8389C24.017 22.9437 23.8843 22.999 23.75 22.999C23.6155 22.999 23.4821 22.9439 23.3809 22.8389H23.3818L19.9854 19.3105L19.625 18.9365L19.2646 19.3105L15.5371 23.1836C15.4353 23.2823 15.3043 23.3333 15.1729 23.3311C15.0412 23.3287 14.9105 23.2727 14.8115 23.1699C14.7124 23.0666 14.6529 22.9231 14.6504 22.7695C14.6479 22.6164 14.7024 22.4714 14.7979 22.3643L19.2568 17.7324L19.2559 17.7314C19.357 17.6267 19.4907 17.5723 19.625 17.5723C19.7593 17.5723 19.892 17.6277 19.9932 17.7324L23.3896 21.2607L23.75 21.6357L24.1104 21.2607L30.5928 14.5254C30.6939 14.4298 30.8228 14.3815 30.9521 14.3838Z"
          fill="#B39793"
          stroke="#B39793"
        />
      </svg>
    </div>

  </div>
</div>


            {/* Table */}
            <div className="overflow-x-auto rounded-md ">
              <table className="min-w-full bg-white text-base text-center text-xl font-extrabold">
                {" "}
                {/* increased from text-sm to text-base */}
                <thead className="text-[#4b2e2e] font-medium">
                  {" "}
                  {/* changed font-large (invalid) to font-medium */}
                  <tr className="border-b border-[#e0d5cc] bg-transparent">
                    
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Unit Sold</th>
                    <th className="py-2 px-4">Revenue</th>
                    <th className="py-2 px-4">Profit</th>
                  </tr>
                </thead>
                <tbody className="text-[#4b2e2e] font-medium">
  {filteredOrders.map((item, i) => (
    <tr key={i} className="border-b border-[#f5e9e2]">
      {/* Image */}
      <td className="py-3 px-4">
        <div className="flex justify-center items-center">
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "12px",
              width: "69px",
              height: "53px",
            }}
          >
            <img
              src="https://www.shutterstock.com/image-photo/paneer-tikka-kabab-red-sauce-260nw-423525136.jpg"
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </td>

      {/* Name */}
      <td className="py-3 px-4">{item.name}</td>

      {/* Category */}
      <td className="py-3 px-4">{item.category}</td>

      {/* Unit Sold */}
      <td className="py-3 px-4">{item.unitSold}</td>

      {/* Revenue */}
      <td className="py-3 px-4">₹{item.revenue}</td>

      {/* Profit */}
      <td className="py-3 px-4">Profit</td>
    </tr>
  ))}
</tbody>


              </table>
            </div>
          </div>

          {/* Footer Count outside box */}
          {/* <div className="text-right text-black-500 mt-2 pr-2 text-md font-extrabold">
            {filteredOrders.length} of {orders.length} items
          </div> */}
        </div>
      </div>
    </div>
  );
}
