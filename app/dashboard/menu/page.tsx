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
  description: string;
  cost: number;
  category: string;
}

export default function FetchMenuItems() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const { totalOrderCount, pendingOrderCount } = useOrders();
  const _completedOrderCount = totalOrderCount - pendingOrderCount;
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- this is needed for search input
  const [isVegOnly, setIsVegOnly] = useState(false);
  const router = useRouter();

  const categories = [
    "Starters",
    "Drinks",
    "Desserts",
    "Main Course",
    "All Items",
  ];

  const [_currentDate, setCurrentDate] = useState("");

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
              cost: 80,
              description:
                "Crispy rice crepe stuffed with spicy potato filling.",
              time: "09:00 AM",
              staffName: "Ramesh",
              customerDetails: "Amit Shah/ 9876543210",
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
              cost: 20,
              description:
                "Refreshing lemon soda with a hint of salt and cumin.",
              time: "09:15 AM",
              staffName: "Suresh",
              customerDetails: "Nikita Mehta/ 9988776655",
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
              cost: 110,
              description:
                "Aromatic basmati rice cooked with mixed vegetables and spices.",
              time: "10:00 AM",
              staffName: "Anjali",
              customerDetails: "Raj Patel/ 9123456789",
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
              cost: 60,
              description: "Rich and creamy tomato soup with croutons.",
              time: "10:30 AM",
              staffName: "Mahesh",
              customerDetails: "Sneha Rao/ 9012345678",
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
              cost: 90,
              description: "Tender chicken in creamy tomato gravy with butter.",
              time: "11:00 AM",
              staffName: "Kavita",
              customerDetails: "Deepak Sharma/ 9898989898",
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
              cost: 70,
              description:
                "Spicy chickpeas curry served with fried fluffy bread.",
              time: "11:45 AM",
              staffName: "Pooja",
              customerDetails: "Meena Desai/ 9765432100",
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
              cost: 90,
              description:
                "Vanilla and chocolate ice cream with syrup and nuts.",
              time: "12:30 PM",
              staffName: "Rohit",
              customerDetails: "Arjun Kapoor/ 9543217890",
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
              cost: 55,
              description: "Grilled sandwich with fresh veggies and cheese.",
              time: "01:00 PM",
              staffName: "Neha",
              customerDetails: "Pallavi Joshi/ 9001234567",
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
            cost: 80,
            description: "Crispy rice crepe stuffed with spicy potato filling.",
            time: "09:00 AM",
            staffName: "Ramesh",
            customerDetails: "Amit Shah/ 9876543210",
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
            cost: 20,
            description: "Refreshing lemon soda with a hint of salt and cumin.",
            time: "09:15 AM",
            staffName: "Suresh",
            customerDetails: "Nikita Mehta/ 9988776655",
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
            cost: 110,
            description:
              "Aromatic basmati rice cooked with mixed vegetables and spices.",
            time: "10:00 AM",
            staffName: "Anjali",
            customerDetails: "Raj Patel/ 9123456789",
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
            cost: 60,
            description: "Rich and creamy tomato soup with croutons.",
            time: "10:30 AM",
            staffName: "Mahesh",
            customerDetails: "Sneha Rao/ 9012345678",
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
            cost: 90,
            description: "Tender chicken in creamy tomato gravy with butter.",
            time: "11:00 AM",
            staffName: "Kavita",
            customerDetails: "Deepak Sharma/ 9898989898",
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
            cost: 70,
            description:
              "Spicy chickpeas curry served with fried fluffy bread.",
            time: "11:45 AM",
            staffName: "Pooja",
            customerDetails: "Meena Desai/ 9765432100",
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
            cost: 90,
            description: "Vanilla and chocolate ice cream with syrup and nuts.",
            time: "12:30 PM",
            staffName: "Rohit",
            customerDetails: "Arjun Kapoor/ 9543217890",
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
            cost: 55,
            description: "Grilled sandwich with fresh veggies and cheese.",
            time: "01:00 PM",
            staffName: "Neha",
            customerDetails: "Pallavi Joshi/ 9001234567",
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
      {/* Today's Overview */}
      <div className="flex w-full min-h-screen bg-[#F4F0E8]">
        {/* Main Content */}
        <div className="ml-[60px] w-full px-6">
          {/* Controls above box */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[#4b2e2e]">
              <h2
                className="font-[500] text-[25px]"
                style={{ fontFamily: "Aleo, serif" }}
              >
                Restaurant&apos;s Menu
              </h2>
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
                title="Filter by category"
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

              <div
                onClick={() => router.push("/dashboard/menu/add")}
                className="cursor-pointer"
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_3859_4182)">
                    <circle cx="27" cy="25" r="20.5" stroke="#B39793" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.8333 15.8333C28.8333 15.3471 28.6402 14.8808 28.2964 14.537C27.9525 14.1932 27.4862 14 27 14C26.5138 14 26.0475 14.1932 25.7036 14.537C25.3598 14.8808 25.1667 15.3471 25.1667 15.8333V23.1667H17.8333C17.3471 23.1667 16.8808 23.3598 16.537 23.7036C16.1932 24.0475 16 24.5138 16 25C16 25.4862 16.1932 25.9525 16.537 26.2964C16.8808 26.6402 17.3471 26.8333 17.8333 26.8333H25.1667V34.1667C25.1667 34.6529 25.3598 35.1192 25.7036 35.463C26.0475 35.8068 26.5138 36 27 36C27.4862 36 27.9525 35.8068 28.2964 35.463C28.6402 35.1192 28.8333 34.6529 28.8333 34.1667V26.8333H36.1667C36.6529 26.8333 37.1192 26.6402 37.463 26.2964C37.8068 25.9525 38 25.4862 38 25C38 24.5138 37.8068 24.0475 37.463 23.7036C37.1192 23.3598 36.6529 23.1667 36.1667 23.1667H28.8333V15.8333ZM17.6887 2.84427C18.2103 2.25803 18.9178 1.92868 19.6554 1.92868C20.3931 1.92868 21.1005 2.25803 21.6221 2.84427C22.1437 3.43051 22.4368 4.22563 22.4368 5.0547C22.4368 5.88377 22.1437 6.67889 21.6221 7.26513L20.2858 8.76702L16.3524 4.34617L17.6887 2.84427ZM15.1397 5.70925L19.0731 10.1301L8.11857 22.4422C7.694 22.919 7.16312 23.2586 6.58158 23.4254L2.17817 24.6979L3.31032 19.7488C3.45798 19.0948 3.76027 18.4979 4.18517 18.0213L15.1397 5.70925Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_3859_4182"
                      x="0"
                      y="0"
                      width="54"
                      height="54"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_3859_4182"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3859_4182"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md ">
              <table className="min-w-full bg-white text-center text-xl">
                {" "}
                {/* increased from text-sm to text-base */}
                <thead className="text-[#4b2e2e] font-medium">
                  {" "}
                  {/* changed font-large (invalid) to font-medium */}
                  <tr className="border-b border-[#e0d5cc] bg-transparent">
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Description</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Veg/Non-Veg</th>
                    <th className="py-2 px-4">Cost</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Edit</th>
                  </tr>
                </thead>
                <tbody className="text-[#4b2e2e] font-medium">
                  {" "}
                  {/* added font-medium to match header */}
                  {filteredOrders.map((order, i) => (
                    <tr key={i} className="border-b border-[#f5e9e2]">
                      <td className="py-3 px-4">
                        <div
                          className="overflow-hidden shadow"
                          style={{
                            borderRadius: "12px",
                            width: "69px",
                            height: "53px",
                          }}
                        >
                          <img
                            src="https://www.shutterstock.com/image-photo/paneer-tikka-kabab-red-sauce-260nw-423525136.jpg"
                            alt="Paneer Tikka"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.name}</td>
                      <td className="py-3 px-4">{order.description}</td>
                      <td className="py-3 px-4">{order.category}</td>
                      <td className="py-3 px-4">
                        {order.isVeg ? "Veg" : "Non-Veg"}
                      </td>

                      <td className="py-3 px-4">{order.cost}</td>
                      <td className="py-3 px-4">{order.price}</td>
                      <td className="py-3 px-4">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/dashboard/menu/edit/${order.id}`)
                          }
                        >
                          <svg
                            width="25"
                            height="27"
                            viewBox="0 0 25 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.8349 1.48119C22.4175 1.01163 21.9219 0.63912 21.3763 0.384967C20.8308 0.130815 20.246 0 19.6554 0C19.0649 0 18.4801 0.130815 17.9345 0.384967C17.389 0.63912 16.8933 1.01163 16.476 1.48119L2.97239 16.6582C2.3314 17.3798 1.87411 18.2812 1.64811 19.2687L0.155718 25.7969C0.118709 25.9593 0.120034 26.1298 0.159563 26.2914C0.199091 26.4531 0.275456 26.6004 0.381116 26.7188C0.486777 26.8371 0.618079 26.9225 0.762057 26.9664C0.906036 27.0103 1.05771 27.0112 1.20211 26.9691L7.00871 25.2937C7.88764 25.0405 8.68986 24.5265 9.33135 23.8053L22.8349 8.62821C23.2527 8.15909 23.5841 7.60203 23.8103 6.98886C24.0364 6.37569 24.1528 5.71845 24.1528 5.0547C24.1528 4.39095 24.0364 3.73371 23.8103 3.12054C23.5841 2.50738 23.2527 1.95031 22.8349 1.48119ZM17.6887 2.84427C18.2103 2.25803 18.9178 1.92868 19.6554 1.92868C20.3931 1.92868 21.1005 2.25803 21.6221 2.84427C22.1437 3.43051 22.4368 4.22563 22.4368 5.0547C22.4368 5.88377 22.1437 6.67889 21.6221 7.26513L20.2858 8.76702L16.3524 4.34617L17.6887 2.84427ZM15.1397 5.70925L19.0731 10.1301L8.11857 22.4422C7.694 22.919 7.16312 23.2586 6.58158 23.4254L2.17817 24.6979L3.31032 19.7488C3.45798 19.0948 3.76027 18.4979 4.18517 18.0213L15.1397 5.70925Z"
                              fill="black"
                            />
                          </svg>
                        </div>
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
