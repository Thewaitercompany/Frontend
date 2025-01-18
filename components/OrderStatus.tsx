'use client';

import React from 'react';

interface OrderStatusProps {
  orderId: string;
  cookName: string;
  currentStatus: 'preparing' | 'delivering' | 'delivered';
}

const OrderStatus: React.FC<OrderStatusProps> = ({ cookName, currentStatus }) => {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-[0.3rem] top-3 bottom-0 w-[2px] bg-[#4E3E3B]" />
      
      {/* Preparing */}
      <div className="relative mb-16">
        <div className={`absolute left-[-0.25rem] top-1.5 w-3 h-3 rounded-full ${
          currentStatus === 'preparing' ? 'bg-[#4E3E3B]' : 'border-2 border-[#4E3E3B] bg-white'
        }`} />
        <p className="text-[15px] text-[#4E3E3B] font-serif">
          Your order is being prepared by {cookName}
        </p>
      </div>

      {/* On the way */}
      <div className="relative mb-16">
        <div className={`absolute left-[-0.25rem] top-1.5 w-3 h-3 rounded-full ${
          currentStatus === 'delivering' ? 'bg-[#4E3E3B]' : 'border-2 border-[#4E3E3B] bg-white'
        }`} />
        <p className="text-[15px] text-[#4E3E3B] font-serif">
          On it&apos;s way to your table!
        </p>
      </div>

      {/* Delivered */}
      <div className="relative">
        <div className={`absolute left-[-0.25rem] top-1.5 w-3 h-3 rounded-full ${
          currentStatus === 'delivered' ? 'bg-[#4E3E3B]' : 'border-2 border-[#4E3E3B] bg-white'
        }`} />
        <p className="text-[15px] text-[#4E3E3B] font-serif">
          Delivered
        </p>
      </div>
    </div>
  );
};

export default OrderStatus;

