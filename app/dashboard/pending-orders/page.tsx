"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useOrders } from "@/hooks/useOrders";
import { ChevronLeft, Search, Bell } from "lucide-react";
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

export default function PendingOrders() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const { totalOrderCount, pendingOrderCount } = useOrders();
  const completedOrderCount = totalOrderCount - pendingOrderCount;
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);
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
              id: "ORD101",
              name: "Masala Dosa",
              quantity: 2,
              price: 120,
              time: "09:00 AM",
              staffName: "Ramesh",
              customerDetails: "Amit Shah, 9876543210",
              tableNo: "3",
              orderStatus: "Served",
              isVeg: true,
              category: "Main Course",
            },
            {
              id: "ORD102",
              name: "Lemon Soda",
              quantity: 1,
              price: 50,
              time: "09:15 AM",
              staffName: "Suresh",
              customerDetails: "Nikita Mehta, 9988776655",
              tableNo: "4",
              orderStatus: "Preparing",
              isVeg: true,
              category: "Drinks",
            },
            {
              id: "ORD103",
              name: "Veg Biryani",
              quantity: 1,
              price: 160,
              time: "10:00 AM",
              staffName: "Anjali",
              customerDetails: "Raj Patel, 9123456789",
              tableNo: "1",
              orderStatus: "Served",
              isVeg: true,
              category: "Main Course",
            },
            {
              id: "ORD104",
              name: "Tomato Soup",
              quantity: 2,
              price: 90,
              time: "10:30 AM",
              staffName: "Mahesh",
              customerDetails: "Sneha Rao, 9012345678",
              tableNo: "6",
              orderStatus: "Pending",
              isVeg: true,
              category: "Starters",
            },
            {
              id: "ORD105",
              name: "Butter Chicken",
              quantity: 3,
              price: 120,
              time: "11:00 AM",
              staffName: "Kavita",
              customerDetails: "Deepak Sharma, 9898989898",
              tableNo: "5",
              orderStatus: "Preparing",
              isVeg: false,
              category: "Main Course",
            },
            {
              id: "ORD106",
              name: "Chole Bhature",
              quantity: 1,
              price: 100,
              time: "11:45 AM",
              staffName: "Pooja",
              customerDetails: "Meena Desai, 9765432100",
              tableNo: "7",
              orderStatus: "Served",
              isVeg: true,
              category: "Main Course",
            },
            {
              id: "ORD107",
              name: "Ice Cream Sundae",
              quantity: 2,
              price: 140,
              time: "12:30 PM",
              staffName: "Rohit",
              customerDetails: "Arjun Kapoor, 9543217890",
              tableNo: "2",
              orderStatus: "Served",
              isVeg: true,
              category: "Desserts",
            },
            {
              id: "ORD108",
              name: "Grilled Sandwich",
              quantity: 1,
              price: 85,
              time: "01:00 PM",
              staffName: "Neha",
              customerDetails: "Pallavi Joshi, 9001234567",
              tableNo: "8",
              orderStatus: "Pending",
              isVeg: true,
              category: "Main Course",
            },
          ];
          setOrders(sampleOrders);
          return;
        }

        const formattedOrders: Order[] = data.flatMap(
          (order: any) =>
            order.items?.map((item: any) => ({
              id: item._id,
              image: item.image || "/default.png",
              name: item.name,
              price: item.price,
              date: new Date(order.createdAt).toLocaleDateString(),
              time: new Date(order.createdAt).toLocaleTimeString(),
              tableNo: order.tableNumber,
              contactDetails: order.phoneNumber || "Unknown",
              category: item.category || "Uncategorized",
            })) || []
        );
        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);

        const fallbackOrders = [
          {
            id: "ORD101",
            name: "Masala Dosa",
            quantity: 2,
            price: 120,
            time: "09:00 AM",
            staffName: "Ramesh",
            customerDetails: "Amit Shah, 9876543210",
            tableNo: "3",
            orderStatus: "Served",
            isVeg: true,
            category: "Main Course",
          },
          {
            id: "ORD102",
            name: "Lemon Soda",
            quantity: 1,
            price: 50,
            time: "09:15 AM",
            staffName: "Suresh",
            customerDetails: "Nikita Mehta, 9988776655",
            tableNo: "4",
            orderStatus: "Preparing",
            isVeg: true,
            category: "Drinks",
          },
          {
            id: "ORD103",
            name: "Veg Biryani",
            quantity: 1,
            price: 160,
            time: "10:00 AM",
            staffName: "Anjali",
            customerDetails: "Raj Patel, 9123456789",
            tableNo: "1",
            orderStatus: "Served",
            isVeg: true,
            category: "Main Course",
          },
          {
            id: "ORD104",
            name: "Tomato Soup",
            quantity: 2,
            price: 90,
            time: "10:30 AM",
            staffName: "Mahesh",
            customerDetails: "Sneha Rao, 9012345678",
            tableNo: "6",
            orderStatus: "Pending",
            isVeg: true,
            category: "Starters",
          },
          {
            id: "ORD105",
            name: "Butter Chicken",
            quantity: 3,
            price: 120,
            time: "11:00 AM",
            staffName: "Kavita",
            customerDetails: "Deepak Sharma, 9898989898",
            tableNo: "5",
            orderStatus: "Preparing",
            isVeg: false,
            category: "Main Course",
          },
          {
            id: "ORD106",
            name: "Chole Bhature",
            quantity: 1,
            price: 100,
            time: "11:45 AM",
            staffName: "Pooja",
            customerDetails: "Meena Desai, 9765432100",
            tableNo: "7",
            orderStatus: "Served",
            isVeg: true,
            category: "Main Course",
          },
          {
            id: "ORD107",
            name: "Ice Cream Sundae",
            quantity: 2,
            price: 140,
            time: "12:30 PM",
            staffName: "Rohit",
            customerDetails: "Arjun Kapoor, 9543217890",
            tableNo: "2",
            orderStatus: "Served",
            isVeg: true,
            category: "Desserts",
          },
          {
            id: "ORD108",
            name: "Grilled Sandwich",
            quantity: 1,
            price: 85,
            time: "01:00 PM",
            staffName: "Neha",
            customerDetails: "Pallavi Joshi, 9001234567",
            tableNo: "8",
            orderStatus: "Pending",
            isVeg: true,
            category: "Main Course",
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
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesVegOnly = !isVegOnly || order.isVeg;

    return matchesCategory && matchesSearch && matchesVegOnly;
  });

  return (
    <div className="min-h-screen bg-[#f5f1eb] font-['Calibri'] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[80px] bg-[#f5f1eb] px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3 text-xl font-bold">
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
          <h2 className="text-xl font-extrabold">
            {new Date()
              .toLocaleString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace(",", "")}
          </h2>
        </div>
      </header>

      {/* Today's Overview */}
      <div className="flex w-full min-h-screen bg-[#F4F0E8]">
        {/* Main Content */}
        <div className="ml-[60px] w-full pt-[90px] px-6">
          {/* Controls above box */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#4b2e2e]">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-[25px] h-[25px]"
                title="Back to Dashboard"
                aria-label="Back to Dashboard"
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
              <h2 className="text-xl font-medium font-black">Pending Orders</h2>
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-[#b3978b] rounded px-2 py-1 text-xl font-extrabold bg-white text-sm text-[#8c6c6a] h-[36px] w-[160px]"
                title="Select Category"
                aria-label="Select Category"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* <div className="relative">
                <FontAwesomeIcon icon={faBell} className="text-black text-2xl h-[25px]" />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-semibold">
                    1
                  </span>
                </div>    */}
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
            <div className="overflow-x-auto rounded-md ">
              <table className="min-w-full bg-white text-base text-center text-xl font-extrabold">
                {" "}
                {/* increased from text-sm to text-base */}
                <thead className="text-[#4b2e2e] font-medium">
                  {" "}
                  {/* changed font-large (invalid) to font-medium */}
                  <tr className="border-b border-[#e0d5cc] bg-transparent">
                    <th className="py-2 px-4">Order Id</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Time</th>
                    <th className="py-2 px-4">Staff Name</th>
                    <th className="py-2 px-4">Customer Details</th>
                    <th className="py-2 px-4">Table No.</th>
                    <th className="py-2 px-4">Order Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#4b2e2e] font-medium">
                  {" "}
                  {/* added font-medium to match header */}
                  {filteredOrders.map((order, i) => (
                    <tr key={i} className="border-b border-[#f5e9e2]">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.name}</td>
                      <td className="py-3 px-4">{order.quantity}</td>
                      <td className="py-3 px-4">{order.price}</td>
                      <td className="py-3 px-4">{order.time}</td>
                      <td className="py-3 px-4">{order.staffName}</td>
                      <td className="py-3 px-4">{order.customerDetails}</td>
                      <td className="py-3 px-4">{order.tableNo}</td>
                      <td
                        className={`py-3 px-4 font-medium ${
                          order.orderStatus === "Served"
                            ? "text-green-600"
                            : order.orderStatus === "Preparing"
                            ? "text-yellow-600"
                            : order.orderStatus === "Pending"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {order.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Count outside box */}
          <div className="text-right text-black-500 mt-2 pr-2 text-md font-extrabold">
            {filteredOrders.length} of {orders.length} items
          </div>
        </div>
      </div>
    </div>
  );
}
