// "use client";

// import React, { useState } from "react";
// import { ChefHat } from "lucide-react";
// import Image from "next/image";

// interface OrderItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   special?: string;
//   prepared?: boolean;
// }

// interface PendingOrder {
//   id: string;
//   tableNumber: string;
//   time: string;
//   items: OrderItem[];
// }

// interface PendingOrdersListProps {
//   orders: PendingOrder[];
//   onMarkPrepared: (orderId: string, itemId: string) => void;
// }

// const PendingOrdersList: React.FC<PendingOrdersListProps> = ({
//   orders,
//   onMarkPrepared,
// }) => {
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

//   const toggleExpandOrder = (orderId: string) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//   };

//   const handleMarkPrepared = (orderId: string, itemId: string) => {
//     onMarkPrepared(orderId, itemId);
//   };

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-10 bg-white rounded-lg shadow-sm">
//         <ChefHat className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//         <p className="text-gray-500">No pending orders at the moment</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           className="bg-white rounded-lg shadow-sm overflow-hidden"
//         >
//           <div
//             className="p-4 border-b flex justify-between items-center cursor-pointer"
//             onClick={() => toggleExpandOrder(order.id)}
//           >
//             <div>
//               <div className="font-medium">Order No: {order.id}</div>
//               <div className="text-sm text-gray-600">
//                 Table no. {order.tableNumber} • {order.time}
//               </div>
//             </div>
//             <div className="text-sm font-medium bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
//               {order.items.filter((item) => !item.prepared).length} items
//             </div>
//           </div>

//           {expandedOrderId === order.id && (
//             <div className="p-4 space-y-3">
//               {order.items.map((item) => (
//                 <div
//                   key={`${order.id}-${item.id}`}
//                   className="flex items-center gap-3"
//                 >
//                   <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
//                     <Image
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       fill
//                       className="object-cover"
//                       sizes="56px"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <div className="font-medium">{item.name}</div>
//                         <div className="text-sm text-gray-500">
//                           x{item.quantity}
//                         </div>
//                         {item.special && (
//                           <div className="text-sm text-amber-600 italic">
//                             *{item.special}
//                           </div>
//                         )}
//                       </div>
//                       {item.prepared ? (
//                         <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm">
//                           Prepared
//                         </div>
//                       ) : (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleMarkPrepared(order.id, item.id);
//                           }}
//                           className="px-3 py-1.5 bg-[#9D8480] text-white rounded-md text-sm"
//                         >
//                           Prepared
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PendingOrdersList;"use client";
"use client";

import React from "react";
import { Clock, X, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
  prepared?: boolean;
}

interface PendingOrder {
  id: string;
  tableNumber: string;
  time: string;
  items: OrderItem[];
}

interface PendingOrdersListProps {
  orders: PendingOrder[];
  onMarkPrepared: (orderId: string, itemId: string) => void;
  onCancelItem: (orderId: string, itemId: string) => void;
  onBack?: () => void; // Optional back button handler
}

const PendingOrdersList: React.FC<PendingOrdersListProps> = ({
  orders,
  onMarkPrepared,
  onCancelItem,
  onBack,
}) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <div className="text-gray-500">No pending orders at the moment</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F0E7] min-h-screen p-4 relative pb-20">
      {/* Header: Back + Pending Orders */}
      <div className="flex justify-between items-center mb-4">
        <button
  onClick={onBack}
  className="flex items-center text-[#5C4033] font-bold text-lg"
>
  <span className="mr-2 text-3xl leading-none">&lt;</span>
  
</button>



        <button className="bg-[#9D8480] text-white px-4 py-2 rounded-md shadow-md font-semibold">
          Pending orders ({orders.length})
        </button>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm mb-6 p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 text-gray-700 font-semibold">
            <span>Order No.: {order.id}</span>
            <span className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" /> {order.time}
            </span>
            <span className="text-sm">Table no: {order.tableNumber}</span>
          </div>

          {/* Items */}
          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={`${order.id}-${item.id}`}
                className="flex items-start gap-4 border-b pb-4 last:border-none"
              >
                {/* Item Image */}
                <div className="w-16 h-16 rounded-md overflow-hidden relative flex-shrink-0 border">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-base">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-600">x{item.quantity}</div>
                  {item.special && (
                    <div className="text-sm italic text-amber-600 mt-1">
                      {item.special}
                    </div>
                  )}
                </div>

                {/* X and Prepared buttons aligned vertically */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onCancelItem(order.id, item.id)}
                    className="text-black hover:text-gray-700"
                    aria-label="Cancel item"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {item.prepared ? (
                    <div className="px-4 py-1.5 bg-[#9D8480] text-white rounded-md text-sm font-medium">
                      Prepared
                    </div>
                  ) : (
                    <button
                      onClick={() => onMarkPrepared(order.id, item.id)}
                      className="px-4 py-1.5 bg-[#9D8480] text-white rounded-md text-sm font-medium hover:opacity-90"
                    >
                      Prepared
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-6 py-3 shadow-md">
        <button className="flex flex-col items-center text-gray-600">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l2-2 4 4 8-8 4 4v6H3z" />
          </svg>
          Dashboard
        </button>
        <button className="flex flex-col items-center text-[#9D8480] font-semibold">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="#9D8480"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          Orders
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          Logout
        </button>
      </footer>
    </div>
  );
};

export default PendingOrdersList;
