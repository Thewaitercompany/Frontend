import { useState, useEffect } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://qr-customer-sj9m.onrender.com/orders");
      const data = await response.json();

      const formattedOrders = data.flatMap((order: any) =>
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
          status: order.status || "Unknown", // Assuming order.status exists
        })) || []
      );

      // Count pending orders
      const pendingCount = formattedOrders.filter((order: any) => order.status.toLowerCase() === "pending").length;


      setOrders(formattedOrders);
      setTotalOrderCount(formattedOrders.length);
      setPendingOrderCount(pendingCount);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return { orders, totalOrderCount, pendingOrderCount, refreshOrders: fetchOrders };
}
