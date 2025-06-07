"use client";
import { MdTableRestaurant, MdChair } from 'react-icons/md'; // Material Design Table icon
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ClipboardList,
  X,
  Bell,
  Users,
  Phone,
  Clock,
  Star,
} from "lucide-react";

interface Table {
  id: string;
  number: string;
  status: "occupied" | "available" | "booked";
  capacity: string;
  runningBill?: number;
}

interface Customer {
  name: string;
  phone: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  isVeg: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
  special?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface Order {
  id: string;
  tableNumber: string;
  time: string;
  items: OrderItem[];
}

interface CustomerForm {
  mobile: string;
  name: string;
  people: string;
}

// Mock data matching the screenshots
const mockTables: Table[] = [
  {
    id: "01",
    number: "01",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 250,
  },
  {
    id: "02",
    number: "02",
    status: "available" as const,
    capacity: "0/4",
  },
  {
    id: "03",
    number: "03",
    status: "booked" as const,
    capacity: "4/4",
    runningBill: 550,
  },
  {
    id: "04",
    number: "04",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 170,
  },
  {
    id: "05",
    number: "05",
    status: "booked" as const,
    capacity: "6/6",
    runningBill: 1250,
  },
  {
    id: "06",
    number: "06",
    status: "available" as const,
    capacity: "0/6",
  },
  {
    id: "07",
    number: "07",
    status: "available" as const,
    capacity: "0/4",
  },
  {
    id: "08",
    number: "08",
    status: "booked" as const,
    capacity: "6/6",
    runningBill: 750,
  },
  {
    id: "09",
    number: "09",
    status: "booked" as const,
    capacity: "4/6",
    runningBill: 150,
  },
  {
    id: "10",
    number: "10",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 280,
  },
  {
    id: "11",
    number: "11",
    status: "available" as const,
    capacity: "0/4",
  },
  {
    id: "12",
    number: "12",
    status: "booked" as const,
    capacity: "4/4",
    runningBill: 450,
  },
];

const mockCustomers: Record<string, Customer> = {
  "01": { name: "Walk-in Customer", phone: "" },
  "03": { name: "Mohan Pyare", phone: "921953****" },
  "05": { name: "Ram Singh", phone: "924933****" },
  "08": { name: "Customer Name", phone: "9876543210" },
  "09": { name: "Priya Sharma", phone: "9765432109" },
  "10": { name: "Customer Name", phone: "9123456789" },
  "12": { name: "Raj Kumar", phone: "9087654321" },
};

const mockPendingOrders = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:50am",
    items: [
      {
        id: "1",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
      {
        id: "2",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
  },
];

const TableChairIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Table top */}
    <rect x="4" y="6" width="16" height="4" rx="1" ry="1" />
    {/* Table legs */}
    <line x1="4" y1="10" x2="4" y2="18" />
    <line x1="20" y1="10" x2="20" y2="18" />
    {/* Chair seat */}
    <rect x="8" y="14" width="6" height="4" rx="1" ry="1" />
    {/* Chair back */}
    <line x1="8" y1="14" x2="8" y2="18" />
  </svg>
);


const mockMenuItems = [
  {
    id: "1",
    name: "Crispy fries",
    price: 60,
    image: "/placeholder.svg",
    description: "Crispy, golden-brown fries served piping hot",
    rating: 4.1,
    isVeg: true,
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 80,
    image: "/placeholder.svg",
    description: "Crispy, golden-brown nuggets",
    rating: 4.2,
    isVeg: false,
  },
];

// Main Dashboard Component
const WaiterDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [pendingOrders, setPendingOrders] =
    useState<Order[]>(mockPendingOrders);
  const [showReceiveOrderModal, setShowReceiveOrderModal] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    mobile: "",
    name: "",
    people: "",
  });

  // Table Grid Component
  const TableGrid = () => {
    const getStatusColor = (status: Table["status"], capacity: string) => {
      const isPartiallyOccupied =
        capacity &&
        capacity.includes("/") &&
        parseInt(capacity.split("/")[0]) > 0 &&
        parseInt(capacity.split("/")[0]) < parseInt(capacity.split("/")[1]);

      switch (status) {
        case "occupied":
          return isPartiallyOccupied
            ? "border-yellow-400 border-2 border-dashed"
            : "border-orange-300 border-2";
        case "available":
          return "border-yellow-400 border-2";
        case "booked":
          return "border-red-300 border-2";
        default:
          return "border-gray-300 border-2";
      }
    };

    const hasPendingOrder = (tableId: string) => tableId === "01";

    return (
      <div className="bg-white rounded-lg p-3 mx-4 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          {mockTables.map((table) => (
            <div
              key={table.id}
              onClick={() => handleTableClick(table)}
              className={`relative bg-white ${getStatusColor(table.status, table.capacity)} 
                p-2 rounded-lg shadow-sm flex flex-col items-start cursor-pointer 
                transition-transform active:scale-95 min-h-[100px] w-full`}
            >
              {/* {hasPendingOrder(table.id) && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold border border-white z-10">
                  !
                </span>
              )} */}

              <div className="mb-1 font-bold text-gray-800 text-base">
                {table.number}
              </div>

              {table.runningBill ? (
                <div className="text-center mb-1 flex-1 flex flex-col justify-center px-1 w-full">
                  <div className="text-[10px] text-gray-600 mb-1 leading-tight">
                    Running Bill
                  </div>
                  <div className="text-xs font-bold text-gray-800">
                    ₹ {table.runningBill}
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-gray-500 mb-1 text-center flex-1 flex items-center justify-center px-1 w-full">
                  <span className="leading-tight">No active order</span>
                </div>
              )}

              <div className="flex items-center gap-1 mt-auto text-[10px] text-gray-600 w-full justify-start">
                <Users className="w-2.5 h-2.5" />
                {/* <TableChairIcon className="w-6 h-6 text-gray-600" /> */}

                <span>{table.capacity}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-4 text-xs px-2">

          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-white border-2 border-orange-300 border-dotted rounded-sm inline-block"></span>
            <span className="text-gray-600 text-xs">
              Selected Seat Occupied
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-white border-2 border-yellow-400 rounded-sm inline-block"></span>
            <span className="text-gray-600 text-xs">Table Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-white border-2 border-red-300 rounded-sm inline-block"></span>
            <span className="text-gray-600 text-xs">Table Booked</span>
          </div>
        </div>
      </div>
    );
  };

  // Pending Orders View
  const PendingOrdersView = () => (
    <div className="min-h-screen bg-[#F5F1EB]">
      <div className="bg-white px-4 py-3 flex items-center border-b">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="p-1"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium ml-2">Pending orders (1)</span>
      </div>

      <div className="px-4 pb-6 mt-6">
        {pendingOrders.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No pending orders
          </div>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id}>
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="bg-white rounded-lg p-4 mb-3 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-medium text-gray-800">
                        Order No.: {order.id}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{order.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🍽️</span>
                          <span>Table no. {order.tableNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          ₹ {item.price}
                        </div>
                        <div className="text-sm text-gray-600">
                          x{item.quantity}
                        </div>
                        {item.special && (
                          <div className="text-xs italic text-gray-500 mt-1">
                            *{item.special}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleServeItem(order.id, item.id)}
                        className="bg-[#B39793] hover:bg-[#A08783] text-white px-6 py-2 rounded-lg text-sm"
                      >
                        Served
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Table Summary View
  const TableSummaryView = () => {
    const table = selectedTable;
    const customer = table ? mockCustomers[table.id] : undefined;

    return (
      <div className="min-h-screen bg-[#F5F1EB]">
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="p-1"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">Table summary</span>
          </div>
          {showTooltips && (
            <div className="text-xs text-gray-500">
              View order related details, take orders or finish billing.
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            {customer && table && (
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                    <div className="text-sm text-gray-500">
                      Order Id: 1234567890
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <span>🍽️</span>
                      <span>Table no. {table.number}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="w-3 h-3" />
                      <span>{table.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>09:41am</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mock Order Items */}
            {table?.runningBill && (
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">
                      Order No.: 123455
                    </span>
                    <span className="text-sm text-gray-500">🕘 09:41am</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/placeholder.svg"
                      alt="Rajma Chawal"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Rajma Chawal</div>
                      <div className="text-xs text-gray-500">
                        *Extra spices, don&apos;t add dhania
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">x1</div>
                      <div className="text-sm font-medium">₹ 130</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/placeholder.svg"
                      alt="Crispy Fries"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Crispy Fries</div>
                      <div className="text-xs text-gray-500">
                        *without mayonnaise
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">x2</div>
                      <div className="text-sm font-medium">₹ 120</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">
                      Order No.: 123456
                    </span>
                    <span className="text-sm text-gray-500">🕘 09:50am</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-500 text-sm">!</span>
                    <img
                      src="/placeholder.svg"
                      alt="Chicken Nuggets"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Chicken Nuggets</div>
                      <div className="text-xs text-gray-500">
                        *without mayonnaise
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">x1</div>
                      <div className="text-sm font-medium">₹ 80</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-500 text-sm">!</span>
                    <img
                      src="/placeholder.svg"
                      alt="Crispy Fries"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Crispy Fries</div>
                      <div className="text-xs text-gray-500">
                        *without mayonnaise
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">x1</div>
                      <div className="text-sm font-medium">₹ 60</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span>₹ 390</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Type</span>
                    <span>Present</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST</span>
                    <span>10%</span>
                    <span>₹ 39</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Amount Payable</span>
                    <span>₹ 429</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-[#B39793] hover:bg-[#A08783] text-white py-3 rounded-md font-medium">
                    Take Order
                  </button>
                  <button className="flex-1 bg-[#B39793] hover:bg-[#A08783] text-white py-3 rounded-md font-medium">
                    Finish Billing
                  </button>
                </div>
              </div>
            )}

            {!customer && !table?.runningBill && table && (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  Table {table.number} is available
                </div>
                <button
                  onClick={() => {
                    setCurrentView("dashboard");
                    setShowReceiveOrderModal(true);
                  }}
                  className="bg-[#B39793] hover:bg-[#A08783] text-white px-6 py-2 rounded-md"
                >
                  Receive Order
                </button>
              </div>
            )}
          </div>
        </div>

        {showTooltips && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#B39793] text-white p-4 rounded-lg mx-4 max-w-sm">
              <p className="text-sm mb-4">
                View order related details, take orders or finish billing.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowTooltips(false)}
                  className="text-[#B39793] border border-white bg-white px-3 py-1 rounded text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // New Order Flow
  const NewOrderFlow = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    const addToCart = (item: MenuItem) => {
      setCartItems((prev) => {
        const existing = prev.find((cartItem) => cartItem.id === item.id);
        if (existing) {
          return prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [
            ...prev,
            { ...item, quantity: 1, special: "without mayonnaise" },
          ];
        }
      });
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (showCart) {
      return (
        <div className="fixed inset-0 bg-[#F5F1EB] z-50">
          <div className="bg-white p-4 shadow-sm flex items-center border-b">
            <button
              onClick={() => setShowCart(false)}
              className="mr-3"
              aria-label="Go back to menu"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="font-medium">View Cart</h2>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm mb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">₹{item.price}</div>
                    {item.special && (
                      <div className="text-xs italic text-gray-500">
                        *{item.special}
                      </div>
                    )}
                  </div>
                  <span className="font-medium">x{item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t p-4">
            <button
              onClick={() => {
                setCurrentView("tableSummary");
                setShowCart(false);
              }}
              className="w-full bg-[#B39793] text-white py-3 rounded-lg"
            >
              Accept Order
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-[#F5F1EB] z-50">
        <div className="bg-white p-4 shadow-sm flex items-center border-b">
          <button
            onClick={() => setCurrentView("tableSummary")}
            className="mr-3"
            aria-label="Go back to table summary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search dishes"
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none"
            />
          </div>
          <button className="ml-3 px-3 py-1 rounded-full text-xs border bg-gray-100 text-gray-700">
            Veg Only
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {mockMenuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg mb-3 flex p-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[15px] font-medium text-gray-900">
                      {item.name}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-black stroke-none" />
                      <span className="text-xs text-gray-500 ml-0.5">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <span className="text-[13px] text-gray-900">
                      ₹ {item.price}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 mt-1 leading-snug">
                    {item.description}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 px-4 py-1 bg-[#B29792] text-[13px] text-black rounded-md hover:bg-[#a08884]"
                  >
                    Add
                  </button>
                </div>
                <div className="w-[135px] h-[125px] relative self-center ml-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-t p-4">
          <button
            onClick={() => setShowCart(true)}
            className="w-full py-3 bg-[#B39793] text-white rounded-lg"
          >
            View Cart ({totalItems} items)
          </button>
        </div>
      </div>
    );
  };

  // Event Handlers
  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setCurrentView("tableSummary");
  };

  const handleServeItem = (orderId: string, itemId: string) => {
    setPendingOrders((prevOrders) =>
      prevOrders
        .map((order) => {
          if (order.id === orderId) {
            const updatedItems = order.items.filter(
              (item) => item.id !== itemId
            );
            return { ...order, items: updatedItems };
          }
          return order;
        })
        .filter((order) => order.items.length > 0)
    );
  };

  const handleReceiveOrder = () => {
    setShowReceiveOrderModal(true);
  };

  const handleCustomerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowReceiveOrderModal(false);
    setCustomerForm({ mobile: "", name: "", people: "" });
  };

  // Main Dashboard View
  const DashboardView = () => (
    <div className="min-h-screen bg-[#F5F1EB] pb-24">
      {/* Navigation Tabs */}
      <div className="px-4 pt-4 pb-2 bg-[#F5F1EB]">
  <div className="flex gap-2 w-full">
    <button
      className="flex-1 py-3 rounded-lg text-sm font-medium border border-[#C69F59] bg-white text-gray-700 flex items-center justify-center gap-2"
      onClick={handleReceiveOrder}
    >
      <img src="/ro.svg" alt="Receive Order" className="h-4 w-4" />
      Receive order
    </button>
    <button
      className="flex-1 py-3 rounded-lg text-sm font-medium border border-[#C69F59] bg-white text-gray-700 flex items-center justify-center gap-2 relative"
      onClick={() => setCurrentView("pendingOrders")}
    >
      {pendingOrders.length > 0 && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full"></span>
      )}

      <img src="/po.svg" alt="Pending Orders" className="h-4 w-4" />
      Pending orders{" "}
      <span className={pendingOrders.length > 0 ? "text-red-500" : "text-gray-700"}>
        ({pendingOrders.length})
      </span>
    </button>
  </div>
</div>


      {/* Table Grid */}
      <TableGrid />

      {/* Tooltips */}
      {showTooltips && (
        <>
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#B39793] text-white p-4 rounded-lg mx-4 max-w-sm">
              <p className="text-sm mb-4">
                View tables by occupancy: click table to receive orders,
                summary, and billing.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowTooltips(false)}
                  className="text-[#B39793] border border-white bg-white px-3 py-1 rounded text-sm"
                >
                  Skip
                </button>
                <button
                  onClick={() => setShowTooltips(false)}
                  className="text-white border border-white px-3 py-1 rounded text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Receive Order Modal */}
      {showReceiveOrderModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">
                Enter Customer&apos;s Mobile Number
              </h2>
              <span className="text-xs text-gray-500">🍽️ Table no. 02</span>
              <button
                onClick={() => setShowReceiveOrderModal(false)}
                className="p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCustomerFormSubmit} className="p-4 space-y-4">
              <div>
                <input
                  value={customerForm.mobile}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, mobile: e.target.value })
                  }
                  placeholder="+91"
                  className="w-full border rounded-md px-3 py-2 mb-2"
                />
              </div>
              <div>
                <input
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, name: e.target.value })
                  }
                  placeholder="Enter Customer's Name"
                  className="w-full border rounded-md px-3 py-2 mb-2"
                />
              </div>
              <div>
                <input
                  value={customerForm.people}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, people: e.target.value })
                  }
                  placeholder="Enter Number of people"
                  className="w-full border rounded-md px-3 py-2"
                  type="number"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#B39793] hover:bg-[#A08783] text-white py-3 rounded-md"
              >
                Receive Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Render based on current view
  switch (currentView) {
    case "pendingOrders":
      return <PendingOrdersView />;
    case "tableSummary":
      return <TableSummaryView />;
    case "newOrder":
      return <NewOrderFlow />;
    default:
      return <DashboardView />;
  }
};

export default WaiterDashboard;
