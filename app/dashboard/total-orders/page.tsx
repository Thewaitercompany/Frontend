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
  id: number;
  image: string;
  name: string;
  price: number;
  date: string;
  time: string;
  tableNo: number;
  contactDetails: string;
  category: string;
  isVeg?: boolean;
  orderStatus: string;
}

export default function TotalOrders() {
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const { totalOrderCount, pendingOrderCount } = useOrders();
  const completedOrderCount = totalOrderCount - pendingOrderCount;
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- this is needed for search input
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showBill, setShowBill] = useState(false);
  const router = useRouter();

  const categories = [
    "Starters",
    "Drinks",
    "Desserts",
    "Main Course",
    "All Items",
  ];

  const [currentDate, setCurrentDate] = useState("");

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

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          "https://qr-customer-sj9m.onrender.com/orders"
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          const sampleOrders = [
            {
              id: 1,
              name: "Paneer Tikka",
              price: 150,
              date: "01 Feb 2025",
              time: "10:00 AM",
              tableNo: 5,
              contactDetails: "9876543210",
              category: "Starters",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 2,
              name: "Orange Juice",
              price: 80,
              date: "01 Feb 2025",
              time: "10:30 AM",
              tableNo: 7,
              contactDetails: "9123456780",
              category: "Drinks",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 3,
              name: "Gulab Jamun",
              price: 70,
              date: "01 Feb 2025",
              time: "11:00 AM",
              tableNo: 2,
              contactDetails: "9090909090",
              category: "Desserts",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 4,
              name: "Butter Naan",
              price: 40,
              date: "01 Feb 2025",
              time: "11:30 AM",
              tableNo: 8,
              contactDetails: "9191919191",
              category: "Main Course",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 5,
              name: "Manchow Soup",
              price: 90,
              date: "01 Feb 2025",
              time: "12:00 PM",
              tableNo: 1,
              contactDetails: "9234567890",
              category: "Starters",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 6,
              name: "Cold Coffee",
              price: 100,
              date: "01 Feb 2025",
              time: "12:30 PM",
              tableNo: 4,
              contactDetails: "9345678901",
              category: "Drinks",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 7,
              name: "Rasgulla",
              price: 65,
              date: "01 Feb 2025",
              time: "01:00 PM",
              tableNo: 6,
              contactDetails: "9456789012",
              category: "Desserts",
              image: "/default.png",
              isVeg: true,
              orderStatus: "Served",
            },
            {
              id: 8,
              name: "Chicken Butter Masala",
              price: 180,
              date: "01 Feb 2025",
              time: "01:30 PM",
              tableNo: 3,
              contactDetails: "9567890123",
              category: "Main Course",
              image: "/default.png",
              isVeg: false,
              orderStatus: "Cancelled",
            },
          ];
          setOrders(sampleOrders);
          return;
        }

        const formattedOrders: Order[] = data.flatMap(
          (order: any) =>
            order.items?.map((item: any) => ({
              id:
                typeof item._id === "string"
                  ? parseInt(item._id) || 0
                  : item._id || 0,
              image: item.image || "/default.png",
              name: item.name || "Unknown Item",
              price: item.price || 0,
              date: new Date(order.createdAt).toLocaleDateString(),
              time: new Date(order.createdAt).toLocaleTimeString(),
              tableNo: order.tableNumber || 0,
              contactDetails: order.phoneNumber || "Unknown",
              category: item.category || "Uncategorized",
              isVeg: item.isVeg !== undefined ? item.isVeg : true,
              orderStatus: order.status || "Pending",
            })) || []
        );
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);

        const fallbackOrders = [
          {
            id: 1,
            name: "Paneer Tikka",
            price: 150,
            date: "01 Feb 2025",
            time: "10:00 AM",
            tableNo: 5,
            contactDetails: "9876543210",
            category: "Starters",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 2,
            name: "Orange Juice",
            price: 80,
            date: "01 Feb 2025",
            time: "10:30 AM",
            tableNo: 7,
            contactDetails: "9123456780",
            category: "Drinks",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 3,
            name: "Gulab Jamun",
            price: 70,
            date: "01 Feb 2025",
            time: "11:00 AM",
            tableNo: 2,
            contactDetails: "9090909090",
            category: "Desserts",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 4,
            name: "Butter Naan",
            price: 40,
            date: "01 Feb 2025",
            time: "11:30 AM",
            tableNo: 8,
            contactDetails: "9191919191",
            category: "Main Course",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 5,
            name: "Manchow Soup",
            price: 90,
            date: "01 Feb 2025",
            time: "12:00 PM",
            tableNo: 1,
            contactDetails: "9234567890",
            category: "Starters",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 6,
            name: "Cold Coffee",
            price: 100,
            date: "01 Feb 2025",
            time: "12:30 PM",
            tableNo: 4,
            contactDetails: "9345678901",
            category: "Drinks",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 7,
            name: "Rasgulla",
            price: 65,
            date: "01 Feb 2025",
            time: "01:00 PM",
            tableNo: 6,
            contactDetails: "9456789012",
            category: "Desserts",
            image: "/default.png",
            isVeg: true,
            orderStatus: "Served",
          },
          {
            id: 8,
            name: "Chicken Butter Masala",
            price: 180,
            date: "01 Feb 2025",
            time: "01:30 PM",
            tableNo: 3,
            contactDetails: "9567890123",
            category: "Main Course",
            image: "/default.png",
            isVeg: false,
            orderStatus: "Cancelled",
          },
        ];
        setOrders(fallbackOrders);
      }
    }

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesCategory =
      selectedCategory === "All Items" || order.category === selectedCategory;

    const matchesSearch = order.name
      ? order.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    const matchesVegOnly = !isVegOnly || order.isVeg;

    return matchesCategory && matchesSearch && matchesVegOnly;
  });

  return (
    <div className="min-h-screen bg-[#f5f1eb] font-['Calibri'] overflow-x-hidden">
      {/* Today's Overview */}
      <div className="flex w-full min-h-screen bg-[#F4F0E8]">
        {/* Main Content (no sidebar) */}
        <div className="ml-[60px] w-full px-6">
          {/* Controls above box */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#4b2e2e]">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-[25px] h-[25px]"
                title="Back to Dashboard"
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

              <h2 className="text-xl font-medium font-black">Total Orders</h2>
            </div>
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

              <div className="relative">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-[#4D3E3B] text-2xl h-[25px]"
                />

                {/* Notification dot */}
                <span
                  className="absolute bg-[#F55151] border border-white text-white text-[12px] leading-[14px] font-normal w-[16px] h-[16px] flex items-center justify-center rounded-full"
                  style={{
                    left: "96.41%",
                    top: "13.7%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "Aleo",
                  }}
                >
                  1
                </span>
              </div>
            </div>
          </div>

          {/* White Box */}
          <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
            {/* Search + Today */}
            <div className="flex items-center justify-between mb-3">
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

              <button className="flex items-center gap-2 border border-[#b3978b] rounded-[6px] px-3 py-[4px] text-[#8c6c6a] text-sm">
                <Clock className="w-4 h-4" />
                Today
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full bg-white text-base text-center text-xl font-extrabold">
                <thead className="text-[#4b2e2e] font-medium">
                  <tr className="border-b border-[#e0d5cc] bg-transparent">
                    <th className="py-2 px-4">Order Id</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Time</th>
                    <th className="py-2 px-4">Waiter Name</th>
                    <th className="py-2 px-4">Table No.</th>
                    <th className="py-2 px-4">Order Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#4b2e2e] font-medium">
                  {Array.isArray(filteredOrders) &&
                    filteredOrders.map((order, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#f5e9e2] cursor-pointer hover:bg-[#f9f3f0]"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{order.time}</td>
                        <td className="py-3 px-4">Mr Waiter</td>
                        <td className="py-3 px-4">{order.tableNo}</td>
                        <td className="py-3 px-4 text-green-600">
                          {order.orderStatus}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl shadow-lg w-[799px] p-6 relative">
                {/* Top Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="w-[12px] h-[22px]"
                      title="Back to Dashboard"
                    >
                      <svg
                        width="12"
                        height="22"
                        viewBox="0 0 12 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          fill="#4A3936"
                        />
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          stroke="#EFECE4"
                        />
                      </svg>
                    </button>

                    <h2 className="text-xl font-semibold text-[#4b2e2e]">
                      Order Details
                    </h2>
                  </div>
                  <div className="flex items-center space-x-6 text-[#4b2e2e] font-medium">
                    <div className="flex items-center space-x-1">
                      <svg
                        width="24"
                        height="22"
                        viewBox="0 0 24 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.8 22L6.6 16.8438C6.78 16.3167 7.07 15.8982 7.47 15.5884C7.87 15.2785 8.32 15.1241 8.82 15.125H10.8V9.59063C7.74 9.47604 5.1748 8.96042 3.1044 8.04375C1.034 7.12708 -0.000799537 6.05 4.63499e-07 4.8125C4.63499e-07 3.48333 1.17 2.34896 3.51 1.40938C5.85 0.469792 8.68 0 12 0C15.34 0 18.1752 0.469792 20.5056 1.40938C22.836 2.34896 24.0008 3.48333 24 4.8125C24 6.05 22.9648 7.12708 20.8944 8.04375C18.824 8.96042 16.2592 9.47604 13.2 9.59063V15.125H15.18C15.66 15.125 16.1052 15.2799 16.5156 15.5898C16.926 15.8996 17.2208 16.3176 17.4 16.8438L19.2 22H16.8L15.36 17.875H8.64L7.2 22H4.8ZM12 6.875C13.94 6.875 15.77 6.68021 17.49 6.29062C19.21 5.90104 20.47 5.40833 21.27 4.8125C20.47 4.21667 19.21 3.72396 17.49 3.33438C15.77 2.94479 13.94 2.75 12 2.75C10.06 2.75 8.23 2.94479 6.51 3.33438C4.79 3.72396 3.53 4.21667 2.73 4.8125C3.53 5.40833 4.79 5.90104 6.51 6.29062C8.23 6.68021 10.06 6.875 12 6.875Z"
                          fill="#4D3E3B"
                        />
                      </svg>

                      <span>{selectedOrder.tableNo}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        width="34"
                        height="23"
                        viewBox="0 0 34 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5041 13.8535H23.3147C22.9465 16.0927 21.7533 21.0783 22.0001 21.6639C22.2647 22.2917 22.966 21.9655 23.0595 21.6639C23.153 21.3623 24.5041 13.8535 24.5041 13.8535Z"
                          fill="#4D3E3B"
                        />
                        <path
                          d="M29.5826 13.7559H30.736C31.1042 15.995 32.3334 21.0782 32.0867 21.6638C31.8221 22.2917 31.1207 21.9654 31.0273 21.6638C30.9338 21.3622 29.5826 13.7559 29.5826 13.7559Z"
                          fill="#4D3E3B"
                        />
                        <path
                          d="M0.115913 2.31482C-0.156373 1.26925 0.0180382 0.850903 0.993949 0.266067C1.96986 -0.31877 2.90514 0.218532 3.5305 1.1441C4.15586 2.06967 4.90032 4.88457 5.28657 7.38791C5.46751 8.56063 5.57925 10.4123 5.57925 10.4123H10.945C11.6379 10.657 12.0185 10.9981 12.2133 11.8756C12.4081 12.7532 12.0067 13.5096 10.945 14.022C10.945 14.022 10.8554 14.0243 10.6951 14.0282C10.6951 14.0282 12.0182 20.3638 12.1161 21.1443C12.2139 21.9248 11.3349 22.4116 10.945 21.4365C10.5551 20.4614 9.36572 14.058 9.36572 14.058L9.36608 14.058C7.8607 14.0887 5.62048 14.1244 4.21341 14.1008C4.21341 14.1008 3.13994 21.3389 2.94514 21.6321C2.75034 21.9252 1.89201 22.1182 1.87198 21.4365C1.83596 20.2104 2.74563 15.9221 3.13355 14.0543C3.046 14.0449 2.98201 14.0342 2.94514 14.022C2.3601 13.8274 1.87198 12.7537 1.87198 12.7537C2.01166 8.3341 0.867503 3.9153 0.115913 2.31482Z"
                          fill="#4D3E3B"
                        />
                        <path
                          d="M15.2376 10.4123H18.7498C18.6729 10.4123 18.6982 16.0945 18.73 18.9975H19.3351C20.06 19.2515 20.2202 19.4757 20.504 19.873L20.5059 19.8755C20.7908 20.2744 20.5059 21.9243 20.5059 21.9243H13.3843C13.3843 21.9243 13.1536 20.679 13.3843 20.1687C13.6151 19.6584 13.84 19.3941 14.4572 18.9975H15.2376V10.4123Z"
                          fill="#4D3E3B"
                        />
                        <path
                          d="M27.0423 9.14398H6.74996V6.99767C6.86929 5.81122 7.2806 5.42603 8.50603 5.14404H25.2863C26.4192 5.41738 26.7161 5.76839 27.0423 6.50988V9.14398Z"
                          fill="#4D3E3B"
                        />
                        <path
                          d="M33.8707 2.21788C34.2451 0.579438 32.7976 -0.416441 31.4317 0.169126C30.0659 0.754693 28.6178 6.05321 28.6025 10.5104H22.8476C22.2707 10.7144 21.9647 11.0801 21.6758 12.0714C21.7008 12.7959 21.8567 13.3818 22.4574 13.925H24.3099H30.9439C31.4708 13.613 31.6866 13.3309 32.0171 12.7543C32.0171 12.7543 31.9635 9.5172 32.3109 7.48617C32.6727 5.37121 33.4963 3.85632 33.8707 2.21788Z"
                          fill="#4D3E3B"
                        />
                      </svg>

                      <span>2/4</span>
                    </div>
                  </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl p-4 flex justify-between gap-6 border border-[#C99E5A]">
                  {/* Left Side */}
                  <div className="w-1/2 space-y-2">
                    <div className="text-[#4b2e2e] font-bold">
                      Order ID: {selectedOrder.id}
                    </div>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-24 h-24 overflow-hidden shadow"
                        style={{ borderRadius: "12px" }}
                      >
                        <img
                          src="https://www.shutterstock.com/image-photo/paneer-tikka-kabab-red-sauce-260nw-423525136.jpg"
                          alt="Paneer Tikka"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1 text-[#4b2e2e]">
                        <div className="text-lg font-semibold">
                          {selectedOrder.name}
                        </div>

                        <div className="flex justify-between w-20 text-sm">
                          <span>₹{selectedOrder.price}</span>
                          <span>x1</span>
                        </div>

                        <div className="text-sm italic text-gray-500">
                          No onions, extra cheese
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Status */}
                  <div className="w-1/2 flex flex-col justify-center">
                    {/* Progress Bar */}
                    <div className="w-full h-[15px] rounded-full bg-[#D9D9D9] overflow-hidden">
                      <div
                        className={`h-full w-full rounded-full transition-all duration-300 ${
                          selectedOrder.orderStatus === "Served"
                            ? "bg-[#6EE2A9]"
                            : selectedOrder.orderStatus === "Cancelled"
                            ? "bg-[#FC8989]"
                            : ""
                        }`}
                      ></div>
                    </div>

                    {/* Status Labels */}
                    <div className="flex justify-between text-sm font-medium text-[#4b2e2e] mt-2">
                      {/* Received */}
                      <div className="text-left w-1/3">
                        <div>Received</div>
                        <div className="text-xs flex justify-start items-center gap-1 text-gray-600 mt-1">
                          🕒 {selectedOrder.time}
                        </div>
                      </div>

                      {/* Prepared */}
                      <div className="text-center w-1/3">
                        <div>Prepared</div>
                        <div className="text-xs flex justify-center items-center gap-1 text-gray-600 mt-1">
                          <svg
                            width="14"
                            height="20"
                            viewBox="0 0 14 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.9544 7.2517H10.2175V5.28317C10.5623 5.28317 10.8929 5.14621 11.1367 4.90241C11.3805 4.65862 11.5175 4.32796 11.5175 3.98318C11.5175 3.63839 11.3805 3.30773 11.1367 3.06394C10.8929 2.82014 10.5623 2.68318 10.2175 2.68318C9.93278 2.68318 9.6718 2.77743 9.45762 2.93212C9.56816 2.73968 9.62705 2.52192 9.62858 2.3C9.62858 1.95522 9.49161 1.62456 9.24781 1.38076C9.00402 1.13696 8.67336 1 8.32858 1C7.73708 1 7.24307 1.39747 7.08577 1.93827C6.92847 1.39747 6.4348 1 5.8433 1C5.49852 1 5.16786 1.13696 4.92406 1.38076C4.68026 1.62456 4.5433 1.95522 4.5433 2.3C4.5433 2.53075 4.6083 2.74427 4.71392 2.93212C4.49348 2.77084 4.22754 2.68367 3.9544 2.68318C3.60962 2.68318 3.27896 2.82014 3.03516 3.06394C2.79136 3.30773 2.6544 3.63839 2.6544 3.98318C2.6544 4.32796 2.79136 4.65862 3.03516 4.90241C3.27896 5.14621 3.60962 5.28317 3.9544 5.28317M13.2406 19.2397C13.2406 19.2397 13.8906 15.079 9.99062 15.079C8.95323 15.7706 8.06467 16.2487 7.06562 16.2464H7.10625C6.1072 16.2487 5.21865 15.7706 4.18125 15.079C0.28125 15.079 0.93125 19.2397 0.93125 19.2397"
                              fill="white"
                            />
                            <path
                              d="M10.9371 2.75898C10.6163 2.53993 9.61788 2.88183 9.61788 2.88183C10.1047 1.66048 8.98933 1.0498 8.98933 1.0498C8.98933 1.0498 9.24933 2.26173 8.48005 2.9179C8.3975 2.98843 8.33933 3.08235 8.33933 3.1909V7.18938H8.54603L8.64775 7.20108H10.3777V5.23288C10.6728 5.23299 10.9591 5.13271 11.1897 4.94853C11.4202 4.76434 11.5812 4.50722 11.6462 4.2194C11.7113 3.93159 11.6764 3.63021 11.5475 3.36481C11.4186 3.0994 11.2032 2.88575 10.9367 2.75898L10.9312 2.888M9.795 15.1282C8.76475 15.8149 6.8453 17.1666 4.1582 15.1282C4.28333 16.927 7.30193 18.5858 10.4346 17.0437L10.5711 19.2332H13.2296C13.2296 19.2332 13.695 15.1282 9.795 15.1282Z"
                              fill="#D0CFCE"
                            />
                            <path
                              d="M10.1764 7.24023C10.3957 7.69741 10.5481 8.1837 10.6292 8.68421L10.6084 8.56721C10.6084 8.56721 9.53911 8.76838 7.85983 7.34423M3.92571 7.24023C3.70636 7.6974 3.55379 8.18368 3.47266 8.68421L3.49346 8.56721C3.49346 8.56721 4.56271 8.76838 6.24198 7.34423"
                              fill="#A57939"
                            />
                            <path
                              d="M3.50439 8.52788C3.43482 8.88771 3.4 9.25339 3.40039 9.61988C3.40039 12.1637 5.05009 14.2258 7.08524 14.2258C9.12039 14.2258 10.7707 12.1637 10.7707 9.61956C10.7707 9.28091 10.7415 8.95103 10.6862 8.63318C9.55849 8.55908 8.64199 8.04168 7.86199 7.24023H6.43524C5.59414 7.90973 4.63377 8.36733 3.50439 8.52788Z"
                              fill="#FCEA2B"
                            />
                            <path
                              d="M3.92949 7.24023C3.59344 7.93476 3.40039 8.74888 3.40039 9.61956C3.40039 12.1637 5.05009 14.2258 7.08524 14.2258C9.12039 14.2258 10.7707 12.1637 10.7707 9.61956C10.7707 8.74888 10.5774 7.93476 10.2416 7.24056"
                              stroke="black"
                              stroke-width="0.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M13.259 19.2509C13.1728 19.2509 13.0901 19.2166 13.0292 19.1557C12.9682 19.0947 12.934 19.0121 12.934 18.9259V17.9509C12.934 16.5043 11.4728 15.4126 10.1224 15.3535C8.10578 16.9824 6.06251 16.9824 4.04588 15.3535C2.69551 15.4126 1.23398 16.504 1.23398 17.9509V18.9259C1.23398 19.0121 1.19974 19.0947 1.13879 19.1557C1.07784 19.2166 0.99518 19.2509 0.908984 19.2509C0.822789 19.2509 0.740124 19.2166 0.679174 19.1557C0.618225 19.0947 0.583984 19.0121 0.583984 18.9259V17.9509C0.583984 16.2206 2.25448 14.7019 4.15898 14.7009C4.235 14.7009 4.3086 14.7276 4.36698 14.7763C6.19511 16.2999 7.97286 16.2999 9.80098 14.7763C9.85937 14.7276 9.93297 14.7009 10.009 14.7009C11.9135 14.7019 13.584 16.2206 13.584 17.9509V18.9259C13.584 19.0121 13.5497 19.0947 13.4888 19.1557C13.4278 19.2166 13.3452 19.2509 13.259 19.2509ZM9.03398 9.17588C9.03396 9.26126 9.01713 9.3458 8.98443 9.42467C8.95174 9.50355 8.90383 9.57521 8.84344 9.63556C8.78305 9.69592 8.71137 9.7438 8.63248 9.77645C8.55359 9.8091 8.46904 9.8259 8.38366 9.82588C8.29828 9.82586 8.21374 9.80902 8.13486 9.77633C8.05599 9.74363 7.98433 9.69572 7.92397 9.63533C7.86361 9.57495 7.81574 9.50326 7.78309 9.42437C7.75043 9.34548 7.73364 9.26093 7.73366 9.17555C7.7337 9.00308 7.80226 8.83768 7.92425 8.71575C8.04624 8.59382 8.21167 8.52535 8.38415 8.52539C8.55662 8.52543 8.72202 8.59399 8.84395 8.71598C8.96588 8.83797 9.03403 9.0034 9.03398 9.17588ZM6.43398 9.17588C6.43396 9.26126 6.41712 9.3458 6.38443 9.42467C6.35174 9.50355 6.30383 9.57521 6.24344 9.63556C6.18305 9.69592 6.11137 9.7438 6.03248 9.77645C5.95359 9.8091 5.86904 9.8259 5.78366 9.82588C5.69828 9.82586 5.61374 9.80902 5.53487 9.77633C5.45599 9.74363 5.38433 9.69572 5.32397 9.63533C5.26361 9.57495 5.21574 9.50326 5.18309 9.42437C5.15043 9.34548 5.13364 9.26093 5.13366 9.17555C5.1337 9.00308 5.20226 8.83768 5.32425 8.71575C5.44624 8.59382 5.61167 8.52535 5.78415 8.52539C5.95662 8.52543 6.12202 8.59399 6.24395 8.71598C6.36588 8.83797 6.43403 9.0034 6.43398 9.17588ZM7.08398 12.4269C6.70991 12.4269 6.33551 12.3339 5.96371 12.148C5.92551 12.1289 5.89145 12.1025 5.86347 12.0702C5.83549 12.0379 5.81413 12.0005 5.80063 11.96C5.78712 11.9195 5.78173 11.8767 5.78476 11.8341C5.78778 11.7915 5.79917 11.7499 5.81827 11.7117C5.83737 11.6735 5.86381 11.6394 5.89607 11.6114C5.92833 11.5835 5.96579 11.5621 6.00631 11.5486C6.04682 11.5351 6.0896 11.5297 6.1322 11.5327C6.1748 11.5358 6.21639 11.5472 6.25458 11.5663C6.81261 11.8458 7.35536 11.8458 7.91371 11.5663C7.99085 11.5277 8.08016 11.5213 8.16199 11.5486C8.24381 11.5759 8.31145 11.6345 8.35002 11.7117C8.38859 11.7888 8.39494 11.8781 8.36767 11.96C8.34039 12.0418 8.28173 12.1094 8.20458 12.148C7.83235 12.3339 7.45882 12.4269 7.08398 12.4269Z"
                              fill="black"
                            />
                            <path
                              d="M4.04688 15.3545C4.04688 15.3545 5.238 18.8837 10.6012 17.011V18.9204"
                              stroke="black"
                              stroke-width="0.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4.6457 19.0893C4.91494 19.0893 5.1332 18.871 5.1332 18.6018C5.1332 18.3325 4.91494 18.1143 4.6457 18.1143C4.37646 18.1143 4.1582 18.3325 4.1582 18.6018C4.1582 18.871 4.37646 19.0893 4.6457 19.0893Z"
                              fill="black"
                            />
                            <path
                              d="M9.5207 19.0893C9.78994 19.0893 10.0082 18.871 10.0082 18.6018C10.0082 18.3325 9.78994 18.1143 9.5207 18.1143C9.25146 18.1143 9.0332 18.3325 9.0332 18.6018C9.0332 18.871 9.25146 19.0893 9.5207 19.0893Z"
                              fill="black"
                            />
                            <path
                              d="M3.92571 7.2397C3.70636 7.69687 3.55379 8.18315 3.47266 8.68368L3.49346 8.56668C3.49346 8.56668 4.56271 8.76785 6.24198 7.3437M10.1764 7.2397C10.3957 7.69688 10.5481 8.18317 10.6292 8.68368L10.6084 8.56668C10.6084 8.56668 9.53911 8.76785 7.85983 7.3437M3.95236 5.2832V7.25173"
                              stroke="black"
                              stroke-width="0.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3.95234 7.2517H10.2154V5.28317C10.5602 5.28317 10.8909 5.14621 11.1347 4.90241C11.3785 4.65862 11.5154 4.32796 11.5154 3.98317C11.5154 3.63839 11.3785 3.30773 11.1347 3.06394C10.8909 2.82014 10.5602 2.68317 10.2154 2.68317C9.93072 2.68317 9.66974 2.77742 9.45557 2.93212C9.5661 2.73968 9.62499 2.52192 9.62652 2.3C9.62652 1.95522 9.48955 1.62456 9.24576 1.38076C9.00196 1.13696 8.6713 1 8.32652 1C7.73502 1 7.24102 1.39747 7.08372 1.93827C6.92642 1.39747 6.43274 1 5.84124 1C5.49646 1 5.1658 1.13696 4.92201 1.38076C4.67821 1.62456 4.54124 1.95522 4.54124 2.3C4.54124 2.53075 4.60624 2.74427 4.71187 2.93212C4.49143 2.77084 4.22549 2.68367 3.95234 2.68317C3.60756 2.68317 3.2769 2.82014 3.03311 3.06394C2.78931 3.30773 2.65234 3.63839 2.65234 3.98317C2.65234 4.32796 2.78931 4.65862 3.03311 4.90241C3.2769 5.14621 3.60756 5.28317 3.95234 5.28317"
                              stroke="black"
                              stroke-width="0.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Cook
                        </div>
                      </div>

                      {/* Served */}
                      <div className="text-right w-1/3">
                        <div>{selectedOrder.orderStatus}</div>
                        <div className="text-xs flex justify-end items-center gap-1 text-gray-600 mt-1">
                          🕒 12:55 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="flex mt-6 justify-between gap-12">
                  {/* Left: Price Breakdown */}
                  <div className="w-[217px] text-[#000] font-['Aleo'] space-y-2 text-[16px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] font-normal">Total</span>
                      <span className="text-[16px]">
                        ₹{selectedOrder.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[16px]">GST 10%</span>
                      <span className="text-[16px]">
                        ₹{(selectedOrder.price * 0.1).toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-[#C99E5A] my-2 w-full" />

                    <div className="flex justify-between items-center">
                      <span className="text-[18px]">Total Bill</span>
                      <span className="text-[16px]">
                        ₹{(selectedOrder.price * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Center: Order Info (Wider) */}
                  <div className="flex-[2] text-black font-['Aleo'] space-y-1 text-[18px] leading-[22px]">
                    <div className="flex gap-1 whitespace-nowrap">
                      <span className="font-light">Order Method:</span>
                      <span className="font-normal font-semibold">Dine-in</span>
                    </div>
                    <div className="flex gap-1 whitespace-nowrap">
                      <span className="font-light">Payment Method:</span>
                      <span className="font-normal font-semibold">
                        Google Pay
                      </span>
                    </div>
                    <div className="flex gap-1 whitespace-nowrap">
                      <span className="font-light">Served By:</span>
                      <span className="font-normal font-semibold">
                        Mr Waiter
                      </span>
                    </div>
                    <div className="flex gap-1 whitespace-nowrap">
                      <span className="font-light">Served To:</span>
                      <span className="font-normal font-semibold">
                        Mr Shyam Singh {selectedOrder.contactDetails}
                      </span>
                    </div>
                  </div>

                  {/* Right: Button */}
                  <div
                    className="flex items-start justify-end"
                    onClick={() => setShowBill(true)}
                  >
                    <svg
                      width="85"
                      height="22"
                      viewBox="0 0 85 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.3"
                        y="0.3"
                        width="84.4"
                        height="21.4"
                        rx="3.7"
                        fill="#FCFDFD"
                        stroke="#C99E5A"
                        stroke-width="0.6"
                      />
                      <path
                        d="M30.08 15L26.576 6.396H27.512C27.616 6.396 27.7 6.424 27.764 6.48C27.828 6.528 27.876 6.592 27.908 6.672L30.332 12.744C30.388 12.88 30.44 13.028 30.488 13.188C30.536 13.348 30.58 13.512 30.62 13.68C30.66 13.512 30.7 13.348 30.74 13.188C30.78 13.028 30.828 12.88 30.884 12.744L33.308 6.672C33.332 6.608 33.376 6.548 33.44 6.492C33.512 6.428 33.6 6.396 33.704 6.396H34.64L31.136 15H30.08ZM27.308 6.696V6.396H28.208V6.696H27.308ZM33.08 6.696V6.396H33.98V6.696H33.08ZM27.38 6.396L27.248 7.332L26.348 7.14C26.284 7.124 26.236 7.096 26.204 7.056C26.172 7.016 26.156 6.96 26.156 6.888V6.396H27.38ZM29.024 6.396V6.888C29.024 6.96 29.008 7.016 28.976 7.056C28.944 7.096 28.896 7.124 28.832 7.14L27.932 7.332L27.8 6.396H29.024ZM33.416 6.396L33.284 7.332L32.384 7.14C32.32 7.124 32.272 7.096 32.24 7.056C32.208 7.016 32.192 6.96 32.192 6.888V6.396H33.416ZM35.06 6.396V6.888C35.06 6.96 35.044 7.016 35.012 7.056C34.98 7.096 34.932 7.124 34.868 7.14L33.968 7.332L33.836 6.396H35.06ZM36.4109 15V8.916H37.4789V15H36.4109ZM35.5469 15V14.508C35.5469 14.436 35.5629 14.38 35.5949 14.34C35.6269 14.292 35.6749 14.264 35.7389 14.256L36.6389 14.064L36.7709 15H35.5469ZM37.1189 15L37.2509 14.064L38.1509 14.256C38.2149 14.264 38.2629 14.292 38.2949 14.34C38.3269 14.38 38.3429 14.436 38.3429 14.508V15H37.1189ZM36.7709 8.916L36.6389 9.852L35.7389 9.66C35.6749 9.644 35.6269 9.616 35.5949 9.576C35.5629 9.536 35.5469 9.48 35.5469 9.408V8.916H36.7709ZM36.9269 7.764C36.7269 7.764 36.5509 7.688 36.3989 7.536C36.2469 7.384 36.1709 7.208 36.1709 7.008C36.1709 6.8 36.2469 6.62 36.3989 6.468C36.5509 6.316 36.7269 6.24 36.9269 6.24C37.1349 6.24 37.3149 6.316 37.4669 6.468C37.6189 6.62 37.6949 6.8 37.6949 7.008C37.6949 7.208 37.6189 7.384 37.4669 7.536C37.3149 7.688 37.1349 7.764 36.9269 7.764ZM41.8159 15.084C41.2319 15.084 40.7199 14.952 40.2799 14.688C39.8479 14.424 39.5119 14.048 39.2719 13.56C39.0319 13.072 38.9119 12.496 38.9119 11.832C38.9119 11.264 39.0279 10.752 39.2599 10.296C39.4919 9.84 39.8199 9.48 40.2439 9.216C40.6759 8.952 41.1799 8.82 41.7559 8.82C42.2599 8.82 42.6999 8.932 43.0759 9.156C43.4519 9.38 43.7439 9.696 43.9519 10.104C44.1679 10.504 44.2759 10.984 44.2759 11.544C44.2759 11.712 44.2559 11.824 44.2159 11.88C44.1839 11.936 44.1159 11.964 44.0119 11.964H39.9679C39.9679 11.988 39.9679 12.016 39.9679 12.048C39.9679 12.072 39.9679 12.096 39.9679 12.12C40.0079 12.792 40.1959 13.316 40.5319 13.692C40.8679 14.06 41.3239 14.244 41.8999 14.244C42.1479 14.244 42.3919 14.196 42.6319 14.1C42.8799 13.996 43.0959 13.896 43.2799 13.8C43.4719 13.704 43.6079 13.656 43.6879 13.656C43.7759 13.656 43.8439 13.688 43.8919 13.752L44.1919 14.148C44.0319 14.356 43.8159 14.532 43.5439 14.676C43.2799 14.812 42.9959 14.916 42.6919 14.988C42.3879 15.052 42.0959 15.084 41.8159 15.084ZM40.0039 11.292H43.3159C43.3159 10.796 43.1799 10.392 42.9079 10.08C42.6359 9.768 42.2599 9.612 41.7799 9.612C41.2599 9.612 40.8519 9.76 40.5559 10.056C40.2599 10.352 40.0759 10.764 40.0039 11.292ZM47.3797 15L45.4117 8.916H46.2517C46.4357 8.916 46.5477 8.992 46.5877 9.144L47.7517 13.056C47.7837 13.2 47.8117 13.34 47.8357 13.476C47.8677 13.604 47.8917 13.736 47.9077 13.872C47.9317 13.776 47.9557 13.684 47.9797 13.596C48.0037 13.508 48.0277 13.42 48.0517 13.332C48.0837 13.244 48.1157 13.152 48.1477 13.056L49.4317 9.12C49.4477 9.056 49.4797 9.004 49.5277 8.964C49.5837 8.924 49.6477 8.904 49.7197 8.904H50.1877C50.3477 8.904 50.4477 8.976 50.4877 9.12L51.7477 13.056C51.7797 13.144 51.8077 13.236 51.8317 13.332C51.8557 13.42 51.8797 13.508 51.9037 13.596C51.9277 13.684 51.9477 13.776 51.9637 13.872C51.9797 13.776 51.9957 13.684 52.0117 13.596C52.0277 13.5 52.0477 13.408 52.0717 13.32C52.0957 13.224 52.1197 13.136 52.1437 13.056L53.3317 9.144C53.3477 9.08 53.3837 9.028 53.4397 8.988C53.4957 8.94 53.5637 8.916 53.6437 8.916H54.4477L52.4797 15H51.6277C51.5317 15 51.4597 14.932 51.4117 14.796L50.0677 10.668C50.0357 10.58 50.0077 10.488 49.9837 10.392C49.9677 10.296 49.9517 10.204 49.9357 10.116C49.9197 10.188 49.8997 10.272 49.8757 10.368C49.8597 10.464 49.8317 10.568 49.7917 10.68L48.4357 14.796C48.3877 14.932 48.3037 15 48.1837 15H47.3797ZM46.0477 9.216V8.916H46.9477V9.216H46.0477ZM53.1037 9.216V8.916H54.0037V9.216H53.1037ZM46.1197 8.916L45.9877 9.852L45.0877 9.66C45.0237 9.644 44.9757 9.616 44.9437 9.576C44.9117 9.536 44.8957 9.48 44.8957 9.408V8.916H46.1197ZM47.6197 8.916V9.408C47.6197 9.48 47.6037 9.536 47.5717 9.576C47.5397 9.616 47.4917 9.644 47.4277 9.66L46.5277 9.852L46.3957 8.916H47.6197ZM53.4637 8.916L53.3317 9.852L52.4317 9.66C52.3677 9.644 52.3197 9.616 52.2877 9.576C52.2557 9.536 52.2397 9.48 52.2397 9.408V8.916H53.4637ZM54.9637 8.916V9.408C54.9637 9.48 54.9477 9.536 54.9157 9.576C54.8837 9.616 54.8357 9.644 54.7717 9.66L53.8717 9.852L53.7397 8.916H54.9637ZM59.5569 15V6.396H62.3049C62.9689 6.396 63.5249 6.48 63.9729 6.648C64.4209 6.816 64.7569 7.068 64.9809 7.404C65.2129 7.732 65.3289 8.144 65.3289 8.64C65.3289 8.936 65.2649 9.212 65.1369 9.468C65.0169 9.724 64.8369 9.948 64.5969 10.14C64.3649 10.324 64.0729 10.468 63.7209 10.572C64.3449 10.7 64.8169 10.928 65.1369 11.256C65.4569 11.584 65.6169 12.016 65.6169 12.552C65.6169 13.056 65.4929 13.492 65.2449 13.86C64.9969 14.22 64.6489 14.5 64.2009 14.7C63.7529 14.9 63.2209 15 62.6049 15H59.5569ZM60.7209 14.076H62.5809C63.2049 14.076 63.6769 13.94 63.9969 13.668C64.3169 13.388 64.4769 13.004 64.4769 12.516C64.4769 12.076 64.3169 11.728 63.9969 11.472C63.6849 11.208 63.2129 11.076 62.5809 11.076H60.7209V14.076ZM60.7209 10.248H62.2569C62.6649 10.248 63.0089 10.192 63.2889 10.08C63.5769 9.96 63.7969 9.792 63.9489 9.576C64.1009 9.352 64.1769 9.088 64.1769 8.784C64.1769 8.28 64.0249 7.912 63.7209 7.68C63.4169 7.44 62.9449 7.32 62.3049 7.32H60.7209V10.248ZM58.6929 15V14.508C58.6929 14.436 58.7089 14.38 58.7409 14.34C58.7729 14.292 58.8209 14.264 58.8849 14.256L59.7849 14.064L59.9169 15H58.6929ZM59.9169 6.396L59.7849 7.332L58.8849 7.14C58.8209 7.124 58.7729 7.096 58.7409 7.056C58.7089 7.016 58.6929 6.96 58.6929 6.888V6.396H59.9169ZM67.1727 15V8.916H68.2407V15H67.1727ZM66.3087 15V14.508C66.3087 14.436 66.3247 14.38 66.3567 14.34C66.3887 14.292 66.4367 14.264 66.5007 14.256L67.4007 14.064L67.5327 15H66.3087ZM67.8807 15L68.0127 14.064L68.9127 14.256C68.9767 14.264 69.0247 14.292 69.0567 14.34C69.0887 14.38 69.1047 14.436 69.1047 14.508V15H67.8807ZM67.5327 8.916L67.4007 9.852L66.5007 9.66C66.4367 9.644 66.3887 9.616 66.3567 9.576C66.3247 9.536 66.3087 9.48 66.3087 9.408V8.916H67.5327ZM67.6887 7.764C67.4887 7.764 67.3127 7.688 67.1607 7.536C67.0087 7.384 66.9327 7.208 66.9327 7.008C66.9327 6.8 67.0087 6.62 67.1607 6.468C67.3127 6.316 67.4887 6.24 67.6887 6.24C67.8967 6.24 68.0767 6.316 68.2287 6.468C68.3807 6.62 68.4567 6.8 68.4567 7.008C68.4567 7.208 68.3807 7.384 68.2287 7.536C68.0767 7.688 67.8967 7.764 67.6887 7.764ZM70.4656 15V6.156H71.5336V15H70.4656ZM69.6016 15V14.508C69.6016 14.436 69.6176 14.38 69.6496 14.34C69.6816 14.292 69.7296 14.264 69.7936 14.256L70.6936 14.064L70.8256 15H69.6016ZM71.1736 15L71.3056 14.064L72.2056 14.256C72.2696 14.264 72.3176 14.292 72.3496 14.34C72.3816 14.38 72.3976 14.436 72.3976 14.508V15H71.1736ZM70.8256 6.156L70.6936 7.092L69.7936 6.9C69.7296 6.884 69.6816 6.856 69.6496 6.816C69.6176 6.776 69.6016 6.72 69.6016 6.648V6.156H70.8256ZM73.8172 15V6.156H74.8852V15H73.8172ZM72.9532 15V14.508C72.9532 14.436 72.9692 14.38 73.0012 14.34C73.0332 14.292 73.0812 14.264 73.1452 14.256L74.0452 14.064L74.1772 15H72.9532ZM74.5252 15L74.6572 14.064L75.5572 14.256C75.6212 14.264 75.6692 14.292 75.7012 14.34C75.7332 14.38 75.7492 14.436 75.7492 14.508V15H74.5252ZM74.1772 6.156L74.0452 7.092L73.1452 6.9C73.0812 6.884 73.0332 6.856 73.0012 6.816C72.9692 6.776 72.9532 6.72 72.9532 6.648V6.156H74.1772Z"
                        fill="#C99E5A"
                      />
                      <path
                        d="M18.2353 12.339H18.6667C19.2953 12.339 19.6093 12.339 19.8047 12.1435C20 11.948 20 11.6338 20 11.0047V10.3375C20 9.0793 20 8.45084 19.6093 8.05989C19.2187 7.66895 18.5907 7.66895 17.3333 7.66895H10.6667C9.40933 7.66895 8.78133 7.66895 8.39067 8.05989C8 8.45084 8 9.0793 8 10.3375V11.6718C8 11.9861 8 12.1435 8.09733 12.2416C8.19533 12.339 8.35333 12.339 8.66667 12.339H9.76467"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                      />
                      <path
                        d="M17.998 7.66859V6.92139C17.998 6.2489 17.998 5.91266 17.8674 5.65581C17.7523 5.42972 17.5686 5.24591 17.3427 5.13076C17.086 5 16.75 5 16.078 5H11.918C11.246 5 10.91 5 10.6534 5.13076C10.4275 5.24591 10.2438 5.42972 10.1287 5.65581C9.99805 5.91266 9.99805 6.2489 9.99805 6.92139V7.66859M9.99805 16.5457V11.0043C9.99805 10.3752 9.99805 10.061 10.1934 9.86551C10.3887 9.67004 10.7027 9.67004 11.3314 9.67004H16.6647C17.2934 9.67004 17.6074 9.67004 17.8027 9.86551C17.998 10.061 17.998 10.3752 17.998 11.0043V16.5457C17.998 16.7572 17.998 16.8626 17.9287 16.9126C17.8594 16.9626 17.7594 16.9293 17.5594 16.8626L16.1034 16.3769C16.0514 16.3595 16.0254 16.3502 15.998 16.3502C15.9707 16.3502 15.9447 16.3595 15.8927 16.3769L14.1034 16.9733C14.0514 16.9907 14.0254 17 13.998 17C13.9707 17 13.9447 16.9907 13.8927 16.9733L12.1034 16.3769C12.0514 16.3595 12.0254 16.3502 11.998 16.3502C11.9707 16.3502 11.9447 16.3595 11.8927 16.3769L10.4367 16.8626C10.2367 16.9293 10.1367 16.9626 10.0674 16.9126C9.99805 16.8626 9.99805 16.7572 9.99805 16.5457Z"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                      />
                      <path
                        d="M12.6699 12.3389H14.6699M12.6699 14.3403H15.6699"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showBill && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-[360px] rounded-xl shadow-lg p-5 font-['Aleo'] relative">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-[#4A3936] font-medium cursor-pointer">
                    <button
                      title="showBill"
                      onClick={() => setShowBill(false)}
                      className="w-[12px] h-[22px]"
                    >
                      <svg
                        width="12"
                        height="22"
                        viewBox="0 0 12 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          fill="#4A3936"
                        />
                        <path
                          d="M10.2783 22C10.0528 22 9.82943 21.9527 9.62109 21.8604C9.4126 21.7679 9.22305 21.6317 9.06348 21.4609L0.505859 12.3018C0.345648 12.1316 0.218655 11.9291 0.131836 11.7061C0.0449954 11.483 4.81931e-05 11.2436 0 11.002C0 10.7601 0.0449486 10.5201 0.131836 10.2969C0.218671 10.0739 0.345642 9.87134 0.505859 9.70117L9.06348 0.541992C9.22253 0.370347 9.41163 0.233622 9.62012 0.140625C9.82858 0.0476665 10.0525 4.31617e-05 10.2783 0C10.5041 0 10.7281 0.0477222 10.9365 0.140625C11.1451 0.233624 11.335 0.370298 11.4941 0.541992C11.6544 0.71215 11.7813 0.914709 11.8682 1.1377C11.9551 1.36092 12 1.60095 12 1.84277C12 2.08448 11.955 2.32375 11.8682 2.54688C11.7814 2.7699 11.6544 2.97238 11.4941 3.14258L4.13477 11.002L11.4941 18.8604C11.8162 19.2053 11.9971 19.6735 11.9971 20.1611C11.997 20.4024 11.9525 20.6413 11.8662 20.8643C11.7799 21.0873 11.6535 21.2902 11.4941 21.4609C11.1719 21.8059 10.7341 22 10.2783 22Z"
                          stroke="#EFECE4"
                        />
                      </svg>
                    </button>

                    <svg
                      width="28"
                      height="14"
                      viewBox="0 0 28 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.872 14V1.058H6.102C7.098 1.058 7.938 1.184 8.622 1.436C9.318 1.676 9.84 2.048 10.188 2.552C10.548 3.056 10.728 3.692 10.728 4.46C10.728 4.892 10.632 5.3 10.44 5.684C10.26 6.056 9.996 6.386 9.648 6.674C9.3 6.95 8.862 7.172 8.334 7.34C9.258 7.532 9.954 7.874 10.422 8.366C10.902 8.846 11.142 9.482 11.142 10.274C11.142 11.042 10.95 11.702 10.566 12.254C10.194 12.806 9.666 13.238 8.982 13.55C8.298 13.85 7.488 14 6.552 14H1.872ZM3.834 12.452H6.516C7.416 12.452 8.088 12.254 8.532 11.858C8.976 11.462 9.198 10.916 9.198 10.22C9.198 9.584 8.976 9.086 8.532 8.726C8.088 8.354 7.416 8.168 6.516 8.168H3.834V12.452ZM3.834 6.8H6.012C6.6 6.8 7.098 6.722 7.506 6.566C7.914 6.398 8.226 6.158 8.442 5.846C8.658 5.534 8.766 5.15 8.766 4.694C8.766 3.962 8.55 3.428 8.118 3.092C7.686 2.756 7.014 2.588 6.102 2.588H3.834V6.8ZM0.558 14V13.172C0.558 13.052 0.588 12.956 0.648 12.884C0.708 12.812 0.798 12.764 0.918 12.74L2.16 12.47L2.376 14H0.558ZM2.376 1.058L2.16 2.588L0.918 2.318C0.798 2.294 0.708 2.246 0.648 2.174C0.588 2.102 0.558 2.006 0.558 1.886V1.058H2.376ZM13.4899 14V4.838H15.2899V14H13.4899ZM12.1759 14V13.172C12.1759 13.052 12.2059 12.956 12.2659 12.884C12.3259 12.812 12.4159 12.764 12.5359 12.74L13.7779 12.47L13.9939 14H12.1759ZM14.7679 14L14.9839 12.47L16.2439 12.74C16.3519 12.764 16.4359 12.812 16.4959 12.884C16.5559 12.956 16.5859 13.052 16.5859 13.172V14H14.7679ZM13.9939 4.838L13.7779 6.368L12.5359 6.098C12.4159 6.074 12.3259 6.026 12.2659 5.954C12.2059 5.882 12.1759 5.786 12.1759 5.666V4.838H13.9939ZM14.3719 3.236C14.0479 3.236 13.7599 3.116 13.5079 2.876C13.2679 2.636 13.1479 2.354 13.1479 2.03C13.1479 1.694 13.2679 1.406 13.5079 1.166C13.7599 0.913999 14.0479 0.788 14.3719 0.788C14.7079 0.788 14.9959 0.913999 15.2359 1.166C15.4879 1.406 15.6139 1.694 15.6139 2.03C15.6139 2.354 15.4879 2.636 15.2359 2.876C14.9959 3.116 14.7079 3.236 14.3719 3.236ZM18.6754 14V0.698H20.4754V14H18.6754ZM17.3614 14V13.172C17.3614 13.052 17.3914 12.956 17.4514 12.884C17.5114 12.812 17.6014 12.764 17.7214 12.74L18.9634 12.47L19.1794 14H17.3614ZM19.9534 14L20.1694 12.47L21.4294 12.74C21.5374 12.764 21.6214 12.812 21.6814 12.884C21.7414 12.956 21.7714 13.052 21.7714 13.172V14H19.9534ZM19.1794 0.698L18.9634 2.228L17.7214 1.958C17.6014 1.934 17.5114 1.886 17.4514 1.814C17.3914 1.742 17.3614 1.646 17.3614 1.526V0.698H19.1794ZM23.9313 14V0.698H25.7313V14H23.9313ZM22.6173 14V13.172C22.6173 13.052 22.6473 12.956 22.7073 12.884C22.7673 12.812 22.8573 12.764 22.9773 12.74L24.2193 12.47L24.4353 14H22.6173ZM25.2093 14L25.4253 12.47L26.6853 12.74C26.7933 12.764 26.8773 12.812 26.9373 12.884C26.9973 12.956 27.0273 13.052 27.0273 13.172V14H25.2093ZM24.4353 0.698L24.2193 2.228L22.9773 1.958C22.8573 1.934 22.7673 1.886 22.7073 1.814C22.6473 1.742 22.6173 1.646 22.6173 1.526V0.698H24.4353Z"
                        fill="#202224"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      width="85"
                      height="22"
                      viewBox="0 0 85 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.3"
                        y="0.3"
                        width="84.4"
                        height="21.4"
                        rx="3.7"
                        fill="#FCFDFD"
                        stroke="#C99E5A"
                        stroke-width="0.6"
                      />
                      <path
                        d="M27.26 15V6.396H29.816C30.504 6.396 31.084 6.5 31.556 6.708C32.036 6.916 32.4 7.22 32.648 7.62C32.896 8.012 33.02 8.492 33.02 9.06C33.02 9.612 32.888 10.092 32.624 10.5C32.368 10.908 32 11.224 31.52 11.448C31.04 11.672 30.472 11.784 29.816 11.784H28.436V15H27.26ZM28.436 10.86H29.816C30.24 10.86 30.604 10.788 30.908 10.644C31.212 10.492 31.444 10.284 31.604 10.02C31.772 9.748 31.856 9.428 31.856 9.06C31.856 8.516 31.684 8.092 31.34 7.788C31.004 7.476 30.496 7.32 29.816 7.32H28.436V10.86ZM26.396 15V14.508C26.396 14.436 26.412 14.38 26.444 14.34C26.476 14.292 26.524 14.264 26.588 14.256L27.488 14.064L27.62 15H26.396ZM27.62 6.396L27.488 7.332L26.588 7.14C26.524 7.124 26.476 7.096 26.444 7.056C26.412 7.016 26.396 6.96 26.396 6.888V6.396H27.62ZM28.076 15L28.208 14.064L29.108 14.256C29.172 14.264 29.22 14.292 29.252 14.34C29.284 14.38 29.3 14.436 29.3 14.508V15H28.076ZM34.5242 15V8.916H35.1362C35.2562 8.916 35.3402 8.94 35.3882 8.988C35.4362 9.028 35.4642 9.104 35.4722 9.216L35.5442 10.164C35.7522 9.74 36.0082 9.408 36.3122 9.168C36.6162 8.928 36.9762 8.808 37.3922 8.808C37.5602 8.808 37.7122 8.828 37.8482 8.868C37.9842 8.908 38.1082 8.96 38.2202 9.024L38.0882 9.828C38.0802 9.876 38.0562 9.912 38.0162 9.936C37.9842 9.96 37.9442 9.972 37.8962 9.972C37.8402 9.972 37.7322 9.956 37.5722 9.924C37.4122 9.884 37.2722 9.864 37.1522 9.864C36.7842 9.864 36.4722 9.972 36.2162 10.188C35.9682 10.404 35.7602 10.716 35.5922 11.124V15H34.5242ZM35.2322 15L35.3642 14.064L36.2642 14.256C36.3282 14.264 36.3762 14.292 36.4082 14.34C36.4402 14.38 36.4562 14.436 36.4562 14.508V15H35.2322ZM33.6602 15V14.508C33.6602 14.436 33.6762 14.38 33.7082 14.34C33.7402 14.292 33.7882 14.264 33.8522 14.256L34.7522 14.064L34.8842 15H33.6602ZM34.8842 8.916L34.7522 9.852L33.8522 9.66C33.7882 9.644 33.7402 9.616 33.7082 9.576C33.6762 9.536 33.6602 9.48 33.6602 9.408V8.916H34.8842ZM39.5867 15V8.916H40.6547V15H39.5867ZM38.7227 15V14.508C38.7227 14.436 38.7387 14.38 38.7707 14.34C38.8027 14.292 38.8507 14.264 38.9147 14.256L39.8147 14.064L39.9467 15H38.7227ZM40.2947 15L40.4267 14.064L41.3267 14.256C41.3907 14.264 41.4387 14.292 41.4707 14.34C41.5027 14.38 41.5187 14.436 41.5187 14.508V15H40.2947ZM39.9467 8.916L39.8147 9.852L38.9147 9.66C38.8507 9.644 38.8027 9.616 38.7707 9.576C38.7387 9.536 38.7227 9.48 38.7227 9.408V8.916H39.9467ZM40.1027 7.764C39.9027 7.764 39.7267 7.688 39.5747 7.536C39.4227 7.384 39.3467 7.208 39.3467 7.008C39.3467 6.8 39.4227 6.62 39.5747 6.468C39.7267 6.316 39.9027 6.24 40.1027 6.24C40.3107 6.24 40.4907 6.316 40.6427 6.468C40.7947 6.62 40.8707 6.8 40.8707 7.008C40.8707 7.208 40.7947 7.384 40.6427 7.536C40.4907 7.688 40.3107 7.764 40.1027 7.764ZM42.8797 15V8.916H43.5157C43.6757 8.916 43.7717 8.992 43.8037 9.144L43.8877 9.804C44.1517 9.508 44.4477 9.272 44.7757 9.096C45.1037 8.912 45.4797 8.82 45.9037 8.82C46.3517 8.82 46.7237 8.916 47.0197 9.108C47.3237 9.3 47.5517 9.572 47.7037 9.924C47.8637 10.268 47.9437 10.668 47.9437 11.124V15H46.8757V11.124C46.8757 10.668 46.7677 10.312 46.5517 10.056C46.3437 9.8 46.0237 9.672 45.5917 9.672C45.2797 9.672 44.9837 9.748 44.7037 9.9C44.4317 10.052 44.1797 10.26 43.9477 10.524V15H42.8797ZM42.0157 15V14.508C42.0157 14.436 42.0317 14.38 42.0637 14.34C42.0957 14.292 42.1437 14.264 42.2077 14.256L43.1077 14.064L43.2397 15H42.0157ZM43.5877 15L43.7197 14.064L44.6197 14.256C44.6837 14.264 44.7317 14.292 44.7637 14.34C44.7957 14.38 44.8117 14.436 44.8117 14.508V15H43.5877ZM47.5837 15L47.7157 14.064L48.6157 14.256C48.6797 14.264 48.7277 14.292 48.7597 14.34C48.7917 14.38 48.8077 14.436 48.8077 14.508V15H47.5837ZM43.2397 8.916L43.1077 9.852L42.2077 9.66C42.1437 9.644 42.0957 9.616 42.0637 9.576C42.0317 9.536 42.0157 9.48 42.0157 9.408V8.916H43.2397ZM51.5848 15.096C51.1048 15.096 50.7328 14.964 50.4688 14.7C50.2128 14.428 50.0848 14.04 50.0848 13.536V9.816H49.3528C49.2888 9.816 49.2328 9.796 49.1848 9.756C49.1448 9.716 49.1248 9.656 49.1248 9.576V9.156L50.1208 9.024L50.3728 7.152C50.3888 7.016 50.4688 6.948 50.6128 6.948H51.1528V9.036H52.8928V9.816H51.1528V13.464C51.1528 13.72 51.2128 13.912 51.3328 14.04C51.4608 14.16 51.6248 14.22 51.8248 14.22C51.9128 14.22 52.0088 14.196 52.1128 14.148C52.2168 14.1 52.3128 14.052 52.4008 14.004C52.4888 13.956 52.5528 13.932 52.5928 13.932C52.6488 13.932 52.6968 13.964 52.7368 14.028L53.0488 14.544C52.8648 14.712 52.6408 14.848 52.3768 14.952C52.1208 15.048 51.8568 15.096 51.5848 15.096ZM57.7053 15V6.396H60.4533C61.1173 6.396 61.6733 6.48 62.1213 6.648C62.5693 6.816 62.9053 7.068 63.1293 7.404C63.3613 7.732 63.4773 8.144 63.4773 8.64C63.4773 8.936 63.4133 9.212 63.2853 9.468C63.1653 9.724 62.9853 9.948 62.7453 10.14C62.5133 10.324 62.2213 10.468 61.8693 10.572C62.4933 10.7 62.9653 10.928 63.2853 11.256C63.6053 11.584 63.7653 12.016 63.7653 12.552C63.7653 13.056 63.6413 13.492 63.3933 13.86C63.1453 14.22 62.7973 14.5 62.3493 14.7C61.9013 14.9 61.3693 15 60.7533 15H57.7053ZM58.8693 14.076H60.7293C61.3533 14.076 61.8253 13.94 62.1453 13.668C62.4653 13.388 62.6253 13.004 62.6253 12.516C62.6253 12.076 62.4653 11.728 62.1453 11.472C61.8333 11.208 61.3613 11.076 60.7293 11.076H58.8693V14.076ZM58.8693 10.248H60.4053C60.8133 10.248 61.1573 10.192 61.4373 10.08C61.7253 9.96 61.9453 9.792 62.0973 9.576C62.2493 9.352 62.3253 9.088 62.3253 8.784C62.3253 8.28 62.1733 7.912 61.8693 7.68C61.5653 7.44 61.0933 7.32 60.4533 7.32H58.8693V10.248ZM56.8413 15V14.508C56.8413 14.436 56.8573 14.38 56.8893 14.34C56.9213 14.292 56.9693 14.264 57.0333 14.256L57.9333 14.064L58.0653 15H56.8413ZM58.0653 6.396L57.9333 7.332L57.0333 7.14C56.9693 7.124 56.9213 7.096 56.8893 7.056C56.8573 7.016 56.8413 6.96 56.8413 6.888V6.396H58.0653ZM65.3211 15V8.916H66.3891V15H65.3211ZM64.4571 15V14.508C64.4571 14.436 64.4731 14.38 64.5051 14.34C64.5371 14.292 64.5851 14.264 64.6491 14.256L65.5491 14.064L65.6811 15H64.4571ZM66.0291 15L66.1611 14.064L67.0611 14.256C67.1251 14.264 67.1731 14.292 67.2051 14.34C67.2371 14.38 67.2531 14.436 67.2531 14.508V15H66.0291ZM65.6811 8.916L65.5491 9.852L64.6491 9.66C64.5851 9.644 64.5371 9.616 64.5051 9.576C64.4731 9.536 64.4571 9.48 64.4571 9.408V8.916H65.6811ZM65.8371 7.764C65.6371 7.764 65.4611 7.688 65.3091 7.536C65.1571 7.384 65.0811 7.208 65.0811 7.008C65.0811 6.8 65.1571 6.62 65.3091 6.468C65.4611 6.316 65.6371 6.24 65.8371 6.24C66.0451 6.24 66.2251 6.316 66.3771 6.468C66.5291 6.62 66.6051 6.8 66.6051 7.008C66.6051 7.208 66.5291 7.384 66.3771 7.536C66.2251 7.688 66.0451 7.764 65.8371 7.764ZM68.6141 15V6.156H69.6821V15H68.6141ZM67.7501 15V14.508C67.7501 14.436 67.7661 14.38 67.7981 14.34C67.8301 14.292 67.8781 14.264 67.9421 14.256L68.8421 14.064L68.9741 15H67.7501ZM69.3221 15L69.4541 14.064L70.3541 14.256C70.4181 14.264 70.4661 14.292 70.4981 14.34C70.5301 14.38 70.5461 14.436 70.5461 14.508V15H69.3221ZM68.9741 6.156L68.8421 7.092L67.9421 6.9C67.8781 6.884 67.8301 6.856 67.7981 6.816C67.7661 6.776 67.7501 6.72 67.7501 6.648V6.156H68.9741ZM71.9656 15V6.156H73.0336V15H71.9656ZM71.1016 15V14.508C71.1016 14.436 71.1176 14.38 71.1496 14.34C71.1816 14.292 71.2296 14.264 71.2936 14.256L72.1936 14.064L72.3256 15H71.1016ZM72.6736 15L72.8056 14.064L73.7056 14.256C73.7696 14.264 73.8176 14.292 73.8496 14.34C73.8816 14.38 73.8976 14.436 73.8976 14.508V15H72.6736ZM72.3256 6.156L72.1936 7.092L71.2936 6.9C71.2296 6.884 71.1816 6.856 71.1496 6.816C71.1176 6.776 71.1016 6.72 71.1016 6.648V6.156H72.3256Z"
                        fill="#C99E5A"
                      />
                      <path
                        d="M18.2353 12.339H18.6667C19.2953 12.339 19.6093 12.339 19.8047 12.1435C20 11.948 20 11.6338 20 11.0047V10.3375C20 9.0793 20 8.45084 19.6093 8.05989C19.2187 7.66895 18.5907 7.66895 17.3333 7.66895H10.6667C9.40933 7.66895 8.78133 7.66895 8.39067 8.05989C8 8.45084 8 9.0793 8 10.3375V11.6718C8 11.9861 8 12.1435 8.09733 12.2416C8.19533 12.339 8.35333 12.339 8.66667 12.339H9.76467"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                      />
                      <path
                        d="M17.998 7.66859V6.92139C17.998 6.2489 17.998 5.91266 17.8674 5.65581C17.7523 5.42972 17.5686 5.24591 17.3427 5.13076C17.086 5 16.75 5 16.078 5H11.918C11.246 5 10.91 5 10.6534 5.13076C10.4275 5.24591 10.2438 5.42972 10.1287 5.65581C9.99805 5.91266 9.99805 6.2489 9.99805 6.92139V7.66859M9.99805 16.5457V11.0043C9.99805 10.3752 9.99805 10.061 10.1934 9.86551C10.3887 9.67004 10.7027 9.67004 11.3314 9.67004H16.6647C17.2934 9.67004 17.6074 9.67004 17.8027 9.86551C17.998 10.061 17.998 10.3752 17.998 11.0043V16.5457C17.998 16.7572 17.998 16.8626 17.9287 16.9126C17.8594 16.9626 17.7594 16.9293 17.5594 16.8626L16.1034 16.3769C16.0514 16.3595 16.0254 16.3502 15.998 16.3502C15.9707 16.3502 15.9447 16.3595 15.8927 16.3769L14.1034 16.9733C14.0514 16.9907 14.0254 17 13.998 17C13.9707 17 13.9447 16.9907 13.8927 16.9733L12.1034 16.3769C12.0514 16.3595 12.0254 16.3502 11.998 16.3502C11.9707 16.3502 11.9447 16.3595 11.8927 16.3769L10.4367 16.8626C10.2367 16.9293 10.1367 16.9626 10.0674 16.9126C9.99805 16.8626 9.99805 16.7572 9.99805 16.5457Z"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                      />
                      <path
                        d="M12.6699 12.3389H14.6699M12.6699 14.3403H15.6699"
                        stroke="#C99E5A"
                        stroke-width="0.7"
                        stroke-linecap="round"
                      />
                    </svg>

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 13V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V13M5 8L10 13M10 13L15 8M10 13V1"
                        stroke="#4D3E3B"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 1L1 6.5L7.5 9.5L14.5 4.5L9.5 11.5L12.5 18L18 1Z"
                        stroke="#4D3E3B"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Order Summary */}
                <svg
                  width="118"
                  height="15"
                  viewBox="0 0 118 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.128 12.128C5.28533 12.128 4.51733 11.984 3.824 11.696C3.14133 11.408 2.54933 11.0027 2.048 10.48C1.55733 9.968 1.17333 9.35467 0.896 8.64C0.618667 7.91467 0.48 7.12533 0.48 6.272C0.48 5.408 0.618667 4.61867 0.896 3.904C1.17333 3.18933 1.55733 2.57067 2.048 2.048C2.54933 1.52533 3.14133 1.12 3.824 0.832C4.51733 0.544 5.28533 0.4 6.128 0.4C6.97067 0.4 7.744 0.544 8.448 0.832C9.152 1.12 9.74933 1.52533 10.24 2.048C10.7413 2.57067 11.1253 3.18933 11.392 3.904C11.6587 4.61867 11.792 5.408 11.792 6.272C11.792 7.12533 11.6587 7.91467 11.392 8.64C11.1253 9.35467 10.7413 9.968 10.24 10.48C9.74933 11.0027 9.152 11.408 8.448 11.696C7.744 11.984 6.97067 12.128 6.128 12.128ZM6.128 10.768C6.97067 10.768 7.696 10.5867 8.304 10.224C8.912 9.86133 9.376 9.344 9.696 8.672C10.0267 7.98933 10.192 7.18933 10.192 6.272C10.192 5.35467 10.0267 4.56 9.696 3.888C9.376 3.20533 8.912 2.67733 8.304 2.304C7.696 1.93067 6.97067 1.744 6.128 1.744C5.296 1.744 4.576 1.93067 3.968 2.304C3.36 2.67733 2.89067 3.20533 2.56 3.888C2.22933 4.56 2.064 5.35467 2.064 6.272C2.064 7.18933 2.22933 7.984 2.56 8.656C2.89067 9.328 3.36 9.85067 3.968 10.224C4.576 10.5867 5.296 10.768 6.128 10.768ZM13.8656 12V3.888H14.6816C14.8416 3.888 14.9536 3.92 15.0176 3.984C15.0816 4.03733 15.119 4.13867 15.1296 4.288L15.2256 5.552C15.503 4.98667 15.8443 4.544 16.2496 4.224C16.655 3.904 17.135 3.744 17.6896 3.744C17.9136 3.744 18.1163 3.77067 18.2976 3.824C18.479 3.87733 18.6443 3.94667 18.7936 4.032L18.6176 5.104C18.607 5.168 18.575 5.216 18.5216 5.248C18.479 5.28 18.4256 5.296 18.3616 5.296C18.287 5.296 18.143 5.27467 17.9296 5.232C17.7163 5.17867 17.5296 5.152 17.3696 5.152C16.879 5.152 16.463 5.296 16.1216 5.584C15.791 5.872 15.5136 6.288 15.2896 6.832V12H13.8656ZM14.8096 12L14.9856 10.752L16.1856 11.008C16.271 11.0187 16.335 11.056 16.3776 11.12C16.4203 11.1733 16.4416 11.248 16.4416 11.344V12H14.8096ZM12.7136 12V11.344C12.7136 11.248 12.735 11.1733 12.7776 11.12C12.8203 11.056 12.8843 11.0187 12.9696 11.008L14.1696 10.752L14.3456 12H12.7136ZM14.3456 3.888L14.1696 5.136L12.9696 4.88C12.8843 4.85867 12.8203 4.82133 12.7776 4.768C12.735 4.71467 12.7136 4.64 12.7136 4.544V3.888H14.3456ZM22.6316 12.112C21.9703 12.112 21.4103 11.9413 20.9516 11.6C20.493 11.2587 20.1463 10.7787 19.9116 10.16C19.677 9.53067 19.5596 8.8 19.5596 7.968C19.5596 7.17867 19.6983 6.46933 19.9756 5.84C20.253 5.2 20.653 4.69333 21.1756 4.32C21.709 3.936 22.3383 3.744 23.0636 3.744C23.565 3.744 23.9916 3.82933 24.3436 4C24.6956 4.17067 25.0103 4.40533 25.2876 4.704V0.207999H26.7116V12H25.8636C25.6503 12 25.5223 11.8987 25.4796 11.696L25.3516 10.72C24.9996 11.136 24.5996 11.472 24.1516 11.728C23.7143 11.984 23.2076 12.112 22.6316 12.112ZM23.0956 10.96C23.565 10.96 23.9703 10.8533 24.3116 10.64C24.6636 10.4267 24.989 10.1227 25.2876 9.728V5.808C25.021 5.456 24.733 5.21067 24.4236 5.072C24.1143 4.93333 23.7676 4.864 23.3836 4.864C22.8823 4.864 22.4556 4.98667 22.1036 5.232C21.7516 5.46667 21.485 5.81867 21.3036 6.288C21.1223 6.74667 21.0316 7.30667 21.0316 7.968C21.0316 8.93867 21.197 9.68 21.5276 10.192C21.8583 10.704 22.381 10.96 23.0956 10.96ZM25.7676 0.207999L25.5916 1.456L24.3916 1.2C24.3063 1.17867 24.2423 1.14133 24.1996 1.088C24.157 1.03467 24.1356 0.959999 24.1356 0.863999V0.207999H25.7676ZM26.2316 12L26.4076 10.752L27.6076 11.008C27.693 11.0187 27.757 11.056 27.7996 11.12C27.8423 11.1733 27.8636 11.248 27.8636 11.344V12H26.2316ZM32.5723 12.112C31.7936 12.112 31.1109 11.936 30.5243 11.584C29.9483 11.232 29.5003 10.7307 29.1803 10.08C28.8603 9.42933 28.7003 8.66133 28.7003 7.776C28.7003 7.01867 28.8549 6.336 29.1643 5.728C29.4736 5.12 29.9109 4.64 30.4763 4.288C31.0523 3.936 31.7243 3.76 32.4923 3.76C33.1643 3.76 33.7509 3.90933 34.2523 4.208C34.7536 4.50667 35.1429 4.928 35.4203 5.472C35.7083 6.00533 35.8523 6.64533 35.8523 7.392C35.8523 7.616 35.8256 7.76533 35.7723 7.84C35.7296 7.91467 35.6389 7.952 35.5003 7.952H30.1083C30.1083 7.984 30.1083 8.02133 30.1083 8.064C30.1083 8.096 30.1083 8.128 30.1083 8.16C30.1616 9.056 30.4123 9.75467 30.8603 10.256C31.3083 10.7467 31.9163 10.992 32.6843 10.992C33.0149 10.992 33.3403 10.928 33.6603 10.8C33.9909 10.6613 34.2789 10.528 34.5243 10.4C34.7803 10.272 34.9616 10.208 35.0683 10.208C35.1856 10.208 35.2763 10.2507 35.3403 10.336L35.7403 10.864C35.5269 11.1413 35.2389 11.376 34.8763 11.568C34.5243 11.7493 34.1456 11.888 33.7403 11.984C33.3349 12.0693 32.9456 12.112 32.5723 12.112ZM30.1562 7.056H34.5723C34.5723 6.39467 34.3909 5.856 34.0283 5.44C33.6656 5.024 33.1643 4.816 32.5243 4.816C31.8309 4.816 31.2869 5.01333 30.8923 5.408C30.4976 5.80267 30.2523 6.352 30.1562 7.056ZM37.9906 12V3.888H38.8066C38.9666 3.888 39.0786 3.92 39.1426 3.984C39.2066 4.03733 39.244 4.13867 39.2546 4.288L39.3506 5.552C39.628 4.98667 39.9693 4.544 40.3746 4.224C40.78 3.904 41.26 3.744 41.8146 3.744C42.0386 3.744 42.2413 3.77067 42.4226 3.824C42.604 3.87733 42.7693 3.94667 42.9186 4.032L42.7426 5.104C42.732 5.168 42.7 5.216 42.6466 5.248C42.604 5.28 42.5506 5.296 42.4866 5.296C42.412 5.296 42.268 5.27467 42.0546 5.232C41.8413 5.17867 41.6546 5.152 41.4946 5.152C41.004 5.152 40.588 5.296 40.2466 5.584C39.916 5.872 39.6386 6.288 39.4146 6.832V12H37.9906ZM38.9346 12L39.1106 10.752L40.3106 11.008C40.396 11.0187 40.46 11.056 40.5026 11.12C40.5453 11.1733 40.5666 11.248 40.5666 11.344V12H38.9346ZM36.8386 12V11.344C36.8386 11.248 36.86 11.1733 36.9026 11.12C36.9453 11.056 37.0093 11.0187 37.0946 11.008L38.2946 10.752L38.4706 12H36.8386ZM38.4706 3.888L38.2946 5.136L37.0946 4.88C37.0093 4.85867 36.9453 4.82133 36.9026 4.768C36.86 4.71467 36.8386 4.64 36.8386 4.544V3.888H38.4706ZM51.3769 12.128C50.9715 12.128 50.5555 12.0907 50.1289 12.016C49.7129 11.952 49.3235 11.872 48.9609 11.776C48.6089 11.68 48.3262 11.5947 48.1129 11.52V10.096L49.3449 10.4C49.7822 10.56 50.1502 10.672 50.4489 10.736C50.7582 10.8 51.1102 10.832 51.5049 10.832C51.9849 10.832 52.3955 10.7467 52.7369 10.576C53.0889 10.4053 53.3609 10.1653 53.5529 9.856C53.7449 9.54667 53.8409 9.19467 53.8409 8.8C53.8409 8.42667 53.7609 8.12267 53.6009 7.888C53.4409 7.65333 53.2275 7.46667 52.9609 7.328C52.6942 7.17867 52.3955 7.056 52.0649 6.96C51.7449 6.85333 51.4142 6.74133 51.0729 6.624C50.6355 6.47467 50.2035 6.288 49.7769 6.064C49.3609 5.84 49.0195 5.54133 48.7529 5.168C48.4862 4.784 48.3529 4.27733 48.3529 3.648C48.3529 3.01867 48.4969 2.45867 48.7849 1.968C49.0835 1.47733 49.4995 1.09333 50.0329 0.815999C50.5662 0.538666 51.1955 0.4 51.9209 0.4C52.3795 0.4 52.8862 0.458666 53.4409 0.575999C54.0062 0.682666 54.5395 0.842666 55.0409 1.056V2.24L53.8249 2C53.4835 1.904 53.1422 1.82933 52.8009 1.776C52.4702 1.72267 52.1769 1.696 51.9209 1.696C51.2702 1.696 50.7529 1.86133 50.3689 2.192C49.9849 2.512 49.7929 2.928 49.7929 3.44C49.7929 3.888 49.9262 4.23467 50.1929 4.48C50.4702 4.72533 50.8169 4.92267 51.2329 5.072C51.6595 5.22133 52.0969 5.376 52.5449 5.536C53.0462 5.70667 53.5049 5.90933 53.9209 6.144C54.3369 6.37867 54.6675 6.688 54.9129 7.072C55.1689 7.44533 55.2969 7.94667 55.2969 8.576C55.2969 9.248 55.1369 9.856 54.8169 10.4C54.5075 10.9333 54.0595 11.3547 53.4729 11.664C52.8969 11.9733 52.1982 12.128 51.3769 12.128ZM53.7289 1.84L55.0409 2.24V3.696H54.3049C54.2195 3.696 54.1449 3.68 54.0809 3.648C54.0275 3.60533 53.9902 3.536 53.9689 3.44L53.7289 1.84ZM49.4249 10.496L48.1129 10.096V8.64H48.8489C48.9342 8.64 49.0089 8.66133 49.0729 8.704C49.1369 8.736 49.1742 8.8 49.1849 8.896L49.4249 10.496ZM59.9836 12.128C59.397 12.128 58.901 12 58.4956 11.744C58.0903 11.4773 57.781 11.1147 57.5676 10.656C57.365 10.1973 57.2636 9.664 57.2636 9.056V3.888H58.6876V9.056C58.6876 9.67467 58.8263 10.1547 59.1036 10.496C59.3916 10.8267 59.8236 10.992 60.3996 10.992C60.8156 10.992 61.205 10.896 61.5676 10.704C61.941 10.5013 62.2823 10.224 62.5916 9.872V3.888H64.0156V12H63.1676C62.9543 12 62.8263 11.8987 62.7836 11.696L62.6716 10.832C62.3196 11.216 61.925 11.5307 61.4876 11.776C61.0503 12.0107 60.549 12.128 59.9836 12.128ZM63.5356 12L63.7116 10.752L64.9116 11.008C64.997 11.0187 65.061 11.056 65.1036 11.12C65.1463 11.1733 65.1676 11.248 65.1676 11.344V12H63.5356ZM57.7436 3.888L57.5676 5.136L56.3676 4.88C56.2823 4.85867 56.2183 4.82133 56.1756 4.768C56.133 4.71467 56.1116 4.64 56.1116 4.544V3.888H57.7436ZM63.0716 3.888L62.8956 5.136L61.6956 4.88C61.6103 4.85867 61.5463 4.82133 61.5036 4.768C61.461 4.71467 61.4396 4.64 61.4396 4.544V3.888H63.0716ZM66.975 12V3.888H67.823C68.0363 3.888 68.1643 3.98933 68.207 4.192L68.319 5.024C68.6177 4.65067 68.9483 4.34667 69.311 4.112C69.6843 3.87733 70.1163 3.76 70.607 3.76C71.1617 3.76 71.6043 3.91467 71.935 4.224C72.2763 4.52267 72.5217 4.93333 72.671 5.456C72.895 4.88 73.2417 4.45333 73.711 4.176C74.191 3.89867 74.7083 3.76 75.263 3.76C76.127 3.76 76.7937 4.03733 77.263 4.592C77.7323 5.136 77.967 5.88267 77.967 6.832V12H76.543V6.832C76.543 6.20267 76.4043 5.72267 76.127 5.392C75.8497 5.06133 75.4443 4.896 74.911 4.896C74.4203 4.896 74.0043 5.072 73.663 5.424C73.3323 5.76533 73.167 6.23467 73.167 6.832V12H71.743V6.832C71.743 6.18133 71.6097 5.696 71.343 5.376C71.087 5.056 70.7083 4.896 70.207 4.896C69.855 4.896 69.5297 4.992 69.231 5.184C68.9323 5.376 68.655 5.632 68.399 5.952V12H66.975ZM65.823 12V11.344C65.823 11.248 65.8443 11.1733 65.887 11.12C65.9297 11.056 65.9937 11.0187 66.079 11.008L67.279 10.752L67.455 12H65.823ZM67.919 12L68.095 10.752L69.295 11.008C69.3803 11.0187 69.4443 11.056 69.487 11.12C69.5297 11.1733 69.551 11.248 69.551 11.344V12H67.919ZM72.687 12L72.863 10.752L74.063 11.008C74.1483 11.0187 74.2123 11.056 74.255 11.12C74.2977 11.1733 74.319 11.248 74.319 11.344V12H72.687ZM67.455 3.888L67.279 5.136L66.079 4.88C65.9937 4.85867 65.9297 4.82133 65.887 4.768C65.8443 4.71467 65.823 4.64 65.823 4.544V3.888H67.455ZM77.487 12L77.663 10.752L78.863 11.008C78.9483 11.0187 79.0123 11.056 79.055 11.12C79.0977 11.1733 79.119 11.248 79.119 11.344V12H77.487ZM80.9281 12V3.888H81.7761C81.9895 3.888 82.1175 3.98933 82.1601 4.192L82.2721 5.024C82.5708 4.65067 82.9015 4.34667 83.2641 4.112C83.6375 3.87733 84.0695 3.76 84.5601 3.76C85.1148 3.76 85.5575 3.91467 85.8881 4.224C86.2295 4.52267 86.4748 4.93333 86.6241 5.456C86.8481 4.88 87.1948 4.45333 87.6641 4.176C88.1441 3.89867 88.6615 3.76 89.2161 3.76C90.0801 3.76 90.7468 4.03733 91.2161 4.592C91.6855 5.136 91.9201 5.88267 91.9201 6.832V12H90.4961V6.832C90.4961 6.20267 90.3575 5.72267 90.0801 5.392C89.8028 5.06133 89.3975 4.896 88.8641 4.896C88.3735 4.896 87.9575 5.072 87.6161 5.424C87.2855 5.76533 87.1201 6.23467 87.1201 6.832V12H85.6961V6.832C85.6961 6.18133 85.5628 5.696 85.2961 5.376C85.0401 5.056 84.6615 4.896 84.1601 4.896C83.8081 4.896 83.4828 4.992 83.1841 5.184C82.8855 5.376 82.6081 5.632 82.3521 5.952V12H80.9281ZM79.7761 12V11.344C79.7761 11.248 79.7975 11.1733 79.8401 11.12C79.8828 11.056 79.9468 11.0187 80.0321 11.008L81.2321 10.752L81.4081 12H79.7761ZM81.8721 12L82.0481 10.752L83.2481 11.008C83.3335 11.0187 83.3975 11.056 83.4401 11.12C83.4828 11.1733 83.5041 11.248 83.5041 11.344V12H81.8721ZM86.6401 12L86.8161 10.752L88.0161 11.008C88.1015 11.0187 88.1655 11.056 88.2081 11.12C88.2508 11.1733 88.2721 11.248 88.2721 11.344V12H86.6401ZM81.4081 3.888L81.2321 5.136L80.0321 4.88C79.9468 4.85867 79.8828 4.82133 79.8401 4.768C79.7975 4.71467 79.7761 4.64 79.7761 4.544V3.888H81.4081ZM91.4401 12L91.6161 10.752L92.8161 11.008C92.9015 11.0187 92.9655 11.056 93.0081 11.12C93.0508 11.1733 93.0721 11.248 93.0721 11.344V12H91.4401ZM96.1293 12.128C95.7026 12.128 95.3186 12.048 94.9773 11.888C94.6359 11.7173 94.3639 11.472 94.1613 11.152C93.9586 10.832 93.8573 10.4373 93.8573 9.968C93.8573 9.648 93.9426 9.344 94.1133 9.056C94.2946 8.75733 94.5826 8.49067 94.9773 8.256C95.3719 8.032 95.8839 7.84533 96.5133 7.696C97.1533 7.54667 97.9319 7.46133 98.8493 7.44V6.816C98.8493 6.18667 98.7106 5.712 98.4333 5.392C98.1666 5.06133 97.7719 4.896 97.2493 4.896C96.9719 4.896 96.6786 4.97067 96.3693 5.12C96.0706 5.25867 95.7933 5.40267 95.5373 5.552C95.2813 5.69067 95.0786 5.76 94.9293 5.76C94.8333 5.76 94.7479 5.73333 94.6733 5.68C94.6093 5.62667 94.5559 5.56267 94.5133 5.488L94.2573 5.04C94.7053 4.60267 95.1853 4.27733 95.6973 4.064C96.2199 3.85067 96.7959 3.744 97.4253 3.744C98.0333 3.744 98.5453 3.872 98.9613 4.128C99.3773 4.384 99.6919 4.74133 99.9053 5.2C100.129 5.65867 100.241 6.19733 100.241 6.816V12H99.6173C99.4786 12 99.3666 11.9787 99.2813 11.936C99.1959 11.8933 99.1373 11.8027 99.1053 11.664L98.9453 10.912C98.5186 11.296 98.0919 11.5947 97.6653 11.808C97.2386 12.0213 96.7266 12.128 96.1293 12.128ZM96.5453 11.12C97.0253 11.12 97.4466 11.024 97.8093 10.832C98.1719 10.64 98.5186 10.3733 98.8493 10.032V8.352C98.2946 8.36267 97.7933 8.40533 97.3453 8.48C96.8973 8.544 96.5133 8.64 96.1933 8.768C95.8839 8.88533 95.6439 9.04 95.4733 9.232C95.3133 9.41333 95.2333 9.63733 95.2333 9.904C95.2333 10.3307 95.3559 10.64 95.6013 10.832C95.8573 11.024 96.1719 11.12 96.5453 11.12ZM99.7613 12L99.9373 10.752L101.137 11.008C101.223 11.0187 101.287 11.056 101.329 11.12C101.372 11.1733 101.393 11.248 101.393 11.344V12H99.7613ZM103.194 12V3.888H104.01C104.17 3.888 104.282 3.92 104.346 3.984C104.41 4.03733 104.447 4.13867 104.458 4.288L104.554 5.552C104.831 4.98667 105.172 4.544 105.578 4.224C105.983 3.904 106.463 3.744 107.018 3.744C107.242 3.744 107.444 3.77067 107.626 3.824C107.807 3.87733 107.972 3.94667 108.122 4.032L107.946 5.104C107.935 5.168 107.903 5.216 107.85 5.248C107.807 5.28 107.754 5.296 107.69 5.296C107.615 5.296 107.471 5.27467 107.258 5.232C107.044 5.17867 106.858 5.152 106.698 5.152C106.207 5.152 105.791 5.296 105.45 5.584C105.119 5.872 104.842 6.288 104.618 6.832V12H103.194ZM104.138 12L104.314 10.752L105.514 11.008C105.599 11.0187 105.663 11.056 105.706 11.12C105.748 11.1733 105.77 11.248 105.77 11.344V12H104.138ZM102.042 12V11.344C102.042 11.248 102.063 11.1733 102.106 11.12C102.148 11.056 102.212 11.0187 102.298 11.008L103.498 10.752L103.674 12H102.042ZM103.674 3.888L103.498 5.136L102.298 4.88C102.212 4.85867 102.148 4.82133 102.106 4.768C102.063 4.71467 102.042 4.64 102.042 4.544V3.888H103.674ZM111.016 14.752L112.488 11.52L109.144 3.888H110.376C110.504 3.888 110.6 3.92 110.664 3.984C110.738 4.048 110.792 4.11733 110.824 4.192L112.984 9.296C113.016 9.37067 113.053 9.47733 113.096 9.616C113.138 9.75467 113.176 9.88267 113.208 10C113.229 9.91467 113.25 9.83467 113.272 9.76C113.293 9.68533 113.32 9.61067 113.352 9.536C113.384 9.45067 113.416 9.36533 113.448 9.28L115.544 4.192C115.576 4.10667 115.629 4.03733 115.704 3.984C115.789 3.92 115.874 3.888 115.96 3.888H117.096L112.584 14.4C112.541 14.5067 112.482 14.592 112.408 14.656C112.333 14.72 112.221 14.752 112.072 14.752H111.016ZM110.168 4.288V3.888H111.368V4.288H110.168ZM115.128 4.288V3.888H116.328V4.288H115.128ZM110.264 3.888L110.088 5.136L108.888 4.88C108.802 4.85867 108.738 4.82133 108.696 4.768C108.653 4.71467 108.632 4.64 108.632 4.544V3.888H110.264ZM112.264 3.888V4.544C112.264 4.64 112.242 4.71467 112.2 4.768C112.157 4.82133 112.093 4.85867 112.008 4.88L110.808 5.136L110.632 3.888H112.264ZM115.608 3.888L115.432 5.136L114.232 4.88C114.146 4.85867 114.082 4.82133 114.04 4.768C113.997 4.71467 113.976 4.64 113.976 4.544V3.888H115.608ZM117.608 3.888V4.544C117.608 4.64 117.586 4.71467 117.544 4.768C117.501 4.82133 117.437 4.85867 117.352 4.88L116.152 5.136L115.976 3.888H117.608Z"
                    fill="black"
                  />
                </svg>

                <p className="text-sm text-black mb-3">
                  Order Number: {selectedOrder.id}
                </p>

                {/* Items List in Columns */}
                <div className="grid grid-cols-3 text-sm text-bold mb-2">
                  <span>{selectedOrder.name}</span>
                  <span className="text-center">01</span>
                  <span className="text-right">₹{selectedOrder.price}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-[#C99E5A] my-2"></div>

                {/* Calculations in Columns */}
                <div className="grid grid-cols-3 text-sm text-semibold mb-2">
                  <span className="font-medium">Total</span>
                  <span></span>
                  <span className="text-right">₹{selectedOrder.price}</span>

                  <span className="font-medium">GST</span>
                  <span className="text-center">10%</span>
                  <span className="text-right">
                    ₹{(selectedOrder.price * 0.1).toFixed(0)}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-[#C99E5A] my-2"></div>

                {/* Final Total */}
                <div className="flex justify-between font-semibold text-base text-black">
                  <span>Total Bill</span>
                  <span>₹{(selectedOrder.price * 1.1).toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Count outside box */}
          <div className="text-right text-black-500 mt-2 pr-2 text-md font-extrabold">
            {filteredOrders.length} of {orders.length} items
          </div>
        </div>
      </div>
    </div>
  );
}
