import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Phone, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface TableDetailProps {
  id: string;
  number: string;
  status: "occupied" | "available" | "booked";
  capacity: string;
  runningBill?: number;
  customer?: {
    name: string;
    phone: string;
  };
  orderItems?: OrderItem[];
  onStatusChange: (newStatus: "occupied" | "available" | "booked") => void;
  onCustomerUpdate: (customerData: { name: string; phone: string }) => void;
  onNewOrder: () => void;
  restaurantId: string;
}

const TableDetail: React.FC<TableDetailProps> = ({
  id,
  number,
  status,
  capacity,
  runningBill = 0,
  customer = { name: "", phone: "" },
  orderItems = [],
  onStatusChange,
  onCustomerUpdate,
  onNewOrder,
  restaurantId,
}) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(customer);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "available":
        return "bg-green-100 text-green-700 border-green-300";
      case "booked":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "occupied":
        return "Occupied";
      case "available":
        return "Available";
      case "booked":
        return "Booked";
      default:
        return status;
    }
  };

  const getCapacityText = (capacity: string) => {
    const [current, total] = capacity.split("/");
    return `${current} out of ${total} seats occupied`;
  };

  const handleStatusUpdate = async (
    newStatus: "occupied" | "available" | "booked"
  ) => {
    if (status === newStatus) return;

    setIsUpdating(true);
    try {
      // In a real application, you would make an API call to update the table
      // Example:
      // const response = await fetch(`https://backend-axu7.onrender.com/tables/${id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onStatusChange(newStatus);
    } catch (error) {
      console.error("Error updating table status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCustomerSave = () => {
    onCustomerUpdate(customerData);
    setIsEditingCustomer(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="font-medium text-lg">Table {number}</div>
          <div
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
              status
            )}`}
          >
            {getStatusText(status)}
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          {getCapacityText(capacity)}
        </div>

        {runningBill > 0 && (
          <div className="font-medium">
            Running Bill:{" "}
            <span className="text-[#B39793]">₹ {runningBill}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium mb-3">Update Status</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => handleStatusUpdate("available")}
            disabled={status === "available" || isUpdating}
            className={`${
              status === "available"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"
            }`}
            variant="outline"
          >
            Available
          </Button>
          <Button
            onClick={() => handleStatusUpdate("occupied")}
            disabled={status === "occupied" || isUpdating}
            className={`${
              status === "occupied"
                ? "bg-amber-100 text-amber-700 border-amber-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-amber-50"
            }`}
            variant="outline"
          >
            Occupied
          </Button>
          <Button
            onClick={() => handleStatusUpdate("booked")}
            disabled={status === "booked" || isUpdating}
            className={`${
              status === "booked"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
            }`}
            variant="outline"
          >
            Booked
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Customer Information</h3>
          {!isEditingCustomer && (
            <Button
              onClick={() => setIsEditingCustomer(true)}
              variant="outline"
              size="sm"
              className="text-[#B39793] border-[#B39793] hover:bg-[#B39793] hover:text-white"
            >
              Edit
            </Button>
          )}
        </div>

        {isEditingCustomer ? (
          <>
            <div className="space-y-3 mb-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <Input
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Phone
                </label>
                <Input
                  value={customerData.phone}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCustomerSave}
                className="bg-[#B39793] hover:bg-[#a08884] text-white flex-1"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setCustomerData(customer);
                  setIsEditingCustomer(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div>
            {customer.name ? (
              <>
                <div className="flex items-center mb-1 text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-600" />
                  {customer.name}
                </div>
                {customer.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-600" />
                    {customer.phone}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-sm italic">
                No customer information
              </div>
            )}
          </div>
        )}
      </div>

      {status !== "available" && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Current Order</h3>
            <Button
              onClick={onNewOrder}
              size="sm"
              className="bg-[#B39793] hover:bg-[#a08884] text-white"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> New Order
            </Button>
          </div>

          {orderItems.length > 0 ? (
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="ml-2 flex-shrink-0">x{item.quantity}</div>
                    </div>
                    <div className="text-[#B39793]">₹ {item.price}</div>
                    {item.special && (
                      <div className="text-sm text-gray-500 italic">
                        *{item.special}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t mt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ₹{" "}
                    {orderItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">No active order</div>
          )}
        </div>
      )}

      {/* If the table is available, show button to create new order and change status */}
      {status === "available" && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <Button
            onClick={() => {
              handleStatusUpdate("occupied");
              onNewOrder();
            }}
            className="w-full py-6 bg-[#B39793] hover:bg-[#a08884] text-white"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Order & Occupy Table
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableDetail;
