// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Clock, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface OrderItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   special?: string;
// }

// interface OrderCardProps {
//   orderId: string;
//   tableNumber: string;
//   time: string;
//   items: OrderItem[];
//   onAccept: () => void;
//   onReject: () => void;
//   onMarkPrepared: (itemId: string) => void;
//   showActions?: boolean;
//   isPrepared?: boolean;
// }

// const OrderCard: React.FC<OrderCardProps> = ({
//   orderId,
//   tableNumber,
//   time,
//   items,
//   onAccept,
//   onReject,
//   onMarkPrepared,
//   showActions = true,
//   isPrepared = false,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [confirmReject, setConfirmReject] = useState(false);

//   const handleAccept = async () => {
//     setLoading(true);
//     try {
//       await onAccept();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     setLoading(true);
//     try {
//       await onReject();
//     } finally {
//       setLoading(false);
//       setConfirmReject(false);
//     }
//   };

//   const handleMarkPrepared = async (itemId: string) => {
//     setLoading(true);
//     try {
//       await onMarkPrepared(itemId);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       <div className="p-4 border-b">
//         <div className="flex justify-between items-center mb-2">
//           <div className="font-medium">Order No: {orderId}</div>
//           <div className="flex items-center">
//             <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
//             <span className="text-sm text-gray-500">{time}</span>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600">Table no. {tableNumber}</div>
//       </div>

//       {/* If in confirm reject state, show confirmation modal */}
//       {confirmReject && (
//         <div className="p-4 bg-gray-50 border-b">
//           <p className="text-center mb-3">Cancel order?</p>
//           <div className="flex items-center justify-center gap-3">
//             <Button
//               onClick={() => setConfirmReject(false)}
//               variant="outline"
//               className="flex-1"
//               disabled={loading}
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleReject}
//               className="flex-1 bg-[#B39793] hover:bg-[#a08884] text-white"
//               disabled={loading}
//             >
//               Confirm
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className="p-4">
//         {items.map((item) => (
//           <div
//             key={`${orderId}-${item.id}`}
//             className="flex items-center gap-3 mb-3 last:mb-0"
//           >
//             <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
//               <Image
//                 src={item.image || "/placeholder.svg"}
//                 alt={item.name}
//                 fill
//                 className="object-cover"
//                 sizes="48px"
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <div className="font-medium">{item.name}</div>
//                   <div className="text-sm text-gray-500">
//                     ₹ {item.price} x{item.quantity}
//                   </div>
//                   {item.special && (
//                     <div className="text-sm text-amber-600 italic">
//                       *{item.special}
//                     </div>
//                   )}
//                 </div>
//                 {isPrepared && (
//                   <Button
//                     onClick={() => handleMarkPrepared(item.id)}
//                     className="ml-2 bg-[#9D8480] text-white px-3 py-1.5 rounded-md text-sm"
//                     disabled={loading}
//                   >
//                     Prepared
//                   </Button>
//                 )}
//               </div>
//             </div>
//             <X
//               className="h-5 w-5 text-red-500 cursor-pointer"
//               onClick={() => setConfirmReject(true)}
//             />
//           </div>
//         ))}
//       </div>

//       {showActions && (
//         <div className="p-4 bg-gray-50 border-t">
//           <Button
//             onClick={handleAccept}
//             className="w-full bg-[#9D8480] text-white py-2.5 rounded-md"
//             disabled={loading}
//           >
//             Accept Order
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderCard;


"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  special?: string;
}

interface OrderCardProps {
  orderId: string;
  tableNumber: string;
  time: string;
  items: OrderItem[];
  onAccept: () => void;
  onReject: () => void;
  onMarkPrepared: (itemId: string) => void;
  showActions?: boolean;
  isPrepared?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  tableNumber,
  time,
  items,
  onAccept,
  onReject,
  onMarkPrepared,
  showActions = true,
  isPrepared = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await onAccept();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await onReject();
    } finally {
      setLoading(false);
      setConfirmReject(false);
    }
  };

  const handleMarkPrepared = async (itemId: string) => {
    setLoading(true);
    try {
      await onMarkPrepared(itemId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f7f5] rounded-lg shadow p-4 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-[#333]">
          Order No: {orderId}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {time}
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <span className="font-medium text-gray-700">Table no:</span> {tableNumber}
      </div>

      {/* Confirm Reject Modal */}
      {confirmReject && (
        <div className="p-3 bg-[#f0eaea] rounded-md border mb-3">
          <p className="text-center mb-2 text-sm font-medium text-red-600">Cancel order?</p>
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setConfirmReject(false)}
              variant="outline"
              className="text-sm px-3"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3"
              disabled={loading}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Items Table Format */}
      <div className="hidden sm:grid grid-cols-6 font-semibold text-sm border-b pb-2 text-gray-700">
        <div>Action</div>
        <div>Image</div>
        <div>Name</div>
        <div>Qty</div>
        <div>Special</div>
        
      </div>


      {items.map((item) => (
        <div
          key={`${orderId}-${item.id}`}
          className="relative grid grid-cols-1 sm:grid-cols-6 items-start gap-2 sm:gap-0 py-3 border-b last:border-0 text-sm"
        >
          {/* Cancel Icon on Top-Right for Mobile */}
          <X
            className="absolute top-1 right-1 sm:static h-4 w-4 text-red-500 cursor-pointer"
            onClick={() => setConfirmReject(true)}
          />

          {/* Image */}
          <div className="flex sm:block items-center">
            <div className="w-12 h-12 relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
          </div>

          {/* Name */}
          <div className="truncate text-gray-800">{item.name}</div>

          {/* Quantity */}
          <div>{item.quantity}</div>

          {/* Special */}
          <div className="text-amber-600 italic">{item.special || "-"}</div>

          {/* Action */}
          <div className="flex items-center gap-2 sm:justify-start justify-end">
            {isPrepared && (
              <Button
                onClick={() => handleMarkPrepared(item.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs rounded"
                disabled={loading}
              >
                Prepared
              </Button>
            )}
          </div>
        </div>
      ))}


      {showActions && (
        <div className="pt-4">
          <Button
            onClick={handleAccept}
            className="w-full bg-[#9D8480] hover:bg-[#8c766f] text-white text-sm py-2 rounded"
            disabled={loading}
          >
            Accept Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
