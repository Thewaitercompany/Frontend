"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ClipboardList,
  Bell,
  X,
  ArrowLeft,
} from "lucide-react";
import TableGrid from "@/components/waiter-table/TableGrid";
import { Button } from "@/components/ui/button";

// Dummy pending orders data
const dummyPendingOrders = [
  {
    orderNo: "123456",
    time: "09:50am",
    tableNo: "01",
    items: [
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
      },
    ],
    status: "pending",
  },
];

// Mock data for tables (same as before)
const mockTables = [
  {
    id: "01",
    number: "01",
    status: "occupied" as const,
    capacity: "2/4",
    runningBill: 250,
  },
  { id: "02", number: "02", status: "available" as const, capacity: "0/4" },
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
  { id: "06", number: "06", status: "available" as const, capacity: "0/6" },
  { id: "07", number: "07", status: "available" as const, capacity: "0/4" },
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
  { id: "11", number: "11", status: "available" as const, capacity: "0/4" },
  {
    id: "12",
    number: "12",
    status: "booked" as const,
    capacity: "4/4",
    runningBill: 450,
  },
];

export default function WaiterDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;

  const [tables, setTables] = useState(mockTables);
  const [filteredTables, setFilteredTables] = useState(mockTables);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"receive" | "pending">("receive");
  const [showReceiveOrderModal, setShowReceiveOrderModal] = useState(false);
  const [showPendingOrdersPage, setShowPendingOrdersPage] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(dummyPendingOrders);
  const [customerForm, setCustomerForm] = useState({
    mobile: "",
    name: "",
    people: "",
  });
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showTableDetail, setShowTableDetail] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Filtering logic
  React.useEffect(() => {
    let filtered = tables;
    if (searchQuery) {
      filtered = filtered.filter((table) =>
        table.number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter((table) => table.status === filterStatus);
    }
    setFilteredTables(filtered);
  }, [tables, searchQuery, filterStatus]);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleFilterClick = (status: string) => {
    setFilterStatus(status === filterStatus ? null : status);
    setIsFilterMenuOpen(false);
  };

  // Handle receive order - Updated to open modal
  const handleReceiveOrder = () => {
    setShowReceiveOrderModal(true);
  };

  // Handle pending orders - show as full page
  const handlePendingOrders = () => {
    setShowPendingOrdersPage(true);
  };

  // Handle customer form submit
  const handleCustomerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReceiveOrderModal(false);
    setCustomerForm({ mobile: "", name: "", people: "" });
  };

  // Handle serving an item
  const handleServeItem = (orderNo: string, itemId: string) => {
    setPendingOrders((prevOrders) =>
      prevOrders
        .map((order) => {
          if (order.orderNo === orderNo) {
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

  // Handle table click
  const handleTableClick = (table: any) => {
    setSelectedTable(table.id);
    setShowTableDetail(true);
  };

  // Get table data by id
  const getTableData = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (!table) return null;

    // Mock customer data for demonstration
    const customerData =
      table.status === "occupied" || table.status === "booked"
        ? {
            name: table.id === "03" ? "Mohan Pyare" : "Ram Singh",
            mobile: table.id === "03" ? "921953****" : "924933****",
            people: table.capacity.split("/")[0],
          }
        : null;

    // Mock order data
    const orderData = table.runningBill
      ? {
          orders: [
            {
              id: "123455",
              time: "09:41am",
              items: [
                {
                  name: "Rajma Chawal",
                  price: 130,
                  quantity: 1,
                  special: "Extra spices, don't add dhaniya",
                },
                {
                  name: "Crispy Fries",
                  price: 60,
                  quantity: 2,
                  special: "without mayonnaise",
                },
              ],
            },
            {
              id: "123456",
              time: "09:50am",
              items: [
                {
                  name: "Chicken Nuggets",
                  price: 80,
                  quantity: 1,
                  special: "without mayonnaise",
                },
                {
                  name: "Crispy Fries",
                  price: 60,
                  quantity: 1,
                  special: "without mayonnaise",
                },
              ],
            },
          ],
          total: table.runningBill,
          gst: Math.round(table.runningBill * 0.1),
        }
      : null;

    return { table, customer: customerData, orders: orderData };
  };

  // If showing table details
  if (showTableDetail && selectedTable) {
    const tableData = getTableData(selectedTable);
    if (!tableData) return null;

    const { table, customer, orders } = tableData;

    return (
      <div className="min-h-screen bg-[#F5F1EB]">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowTableDetail(false)} className="p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">Table summary</span>
          </div>
          {orders && (
            <div className="text-xs text-gray-500">
              View order related details, take orders or finish billing.
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            {/* Customer Info */}
            {customer && (
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">
                      {customer.mobile}
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
                      <span>👥</span>
                      <span>{customer.people}/4</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🕘</span>
                      <span>09:41am</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {orders && (
              <div className="space-y-4">
                {orders.orders.map((order) => (
                  <div key={order.id} className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">
                        Order No.: {order.id}
                      </span>
                      <span className="text-sm text-gray-500">
                        🕘 {order.time}
                      </span>
                    </div>

                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 mb-3">
                        <img
                          src="/placeholder.svg"
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            *{item.special}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">x{item.quantity}</div>
                          <div className="text-sm font-medium">
                            ₹ {item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Bill Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span>₹ {orders.total - orders.gst}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Type</span>
                    <span>Present</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST</span>
                    <span>10%</span>
                    <span>₹ {orders.gst}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Amount Payable</span>
                    <span>₹ {orders.total}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      // Navigate to menu/order page for this table
                      router.push(
                        `/waiter-table/${restaurantId}/table-details/${table.id}/menu`
                      );
                    }}
                    className="flex-1 bg-[#B39793] hover:bg-[#A08783] text-white"
                  >
                    Take Order
                  </Button>
                  <Button
                    onClick={() => {
                      // Handle finish billing
                      setShowTableDetail(false);
                    }}
                    className="flex-1 bg-[#B39793] hover:bg-[#A08783] text-white"
                  >
                    Finish Billing
                  </Button>
                </div>
              </div>
            )}

            {/* Empty state for available tables */}
            {!customer && (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  Table {table.number} is available
                </div>
                <Button
                  onClick={() => {
                    setShowTableDetail(false);
                    setShowReceiveOrderModal(true);
                  }}
                  className="bg-[#B39793] hover:bg-[#A08783] text-white"
                >
                  Receive Order
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#B39793] text-white p-4 rounded-lg mx-4 max-w-sm">
              <p className="text-sm mb-4">
                View order related details, take orders or finish billing.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setShowTooltip(false)}
                  variant="outline"
                  className="text-[#B39793] border-white bg-white"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (showPendingOrdersPage) {
    return (
      <div className="min-h-screen bg-[#F5F1EB]">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <button
            onClick={() => setShowPendingOrdersPage(false)}
            className="p-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="text-sm font-medium">
              Pending orders ({pendingOrders.length})
            </span>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-4 pb-6 mt-6">
          {pendingOrders.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No pending orders
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.orderNo}>
                  {order.items.map((item) => (
                    <div
                      key={`${order.orderNo}-${item.id}`}
                      className="bg-white rounded-lg p-4 mb-3 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-medium text-gray-800">
                          Order No.: {order.orderNo}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>🕘</span>
                            <span>{order.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>🍽️</span>
                            <span>Table no. {order.tableNo}</span>
                          </div>
                        </div>
                      </div>

                      {/* Item Details */}
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
                        <Button
                          onClick={() =>
                            handleServeItem(order.orderNo, item.id)
                          }
                          className="bg-[#B39793] hover:bg-[#A08783] text-white px-6 py-2 rounded-lg text-sm"
                        >
                          Served
                        </Button>
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
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-[#F5F1EB] pb-24">
      {/* Top Navigation Tabs */}
      <div className="px-4 pt-4 pb-2 bg-[#F5F1EB]">
        <div className="flex gap-2 w-full">
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors border flex items-center justify-center gap-2 ${
              activeTab === "receive"
                ? "border-[#B39793] bg-white text-[#B39793]"
                : "border-gray-200 bg-white text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("receive");
              handleReceiveOrder(); // Open modal when clicking receive order tab
            }}
          >
            <ClipboardList className="h-4 w-4" />
            Receive order
          </button>
          <button
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors border flex items-center justify-center gap-2 relative ${
              activeTab === "pending"
                ? "border-[#B39793] bg-white text-[#B39793]"
                : "border-gray-200 bg-white text-gray-700"
            }`}
            onClick={handlePendingOrders}
          >
            <ClipboardList className="h-4 w-4" />
            Pending orders ({pendingOrders.length})
          </button>
        </div>
      </div>

      {/* Table Grid */}
      <TableGrid
        tables={filteredTables}
        restaurantId={restaurantId}
        onTableClick={handleTableClick}
      />

      {/* Receive Order Modal */}
      {showReceiveOrderModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-medium">
                Enter Customer&apos;s Mobile Number
              </h2>
              <button
                onClick={() => setShowReceiveOrderModal(false)}
                aria-label="Close customer form"
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
              <Button
                type="submit"
                className="w-full bg-[#B39793] hover:bg-[#A08783] text-white"
                aria-label="Receive order"
              >
                Receive Order
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
