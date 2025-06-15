"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import MenuNewOrderFlow from "./MenuNewOrderFlow";

interface NewOrderFlowProps {
  restaurantId: string;
  tableId: string;
  onClose: () => void;
  onOrderConfirm: (items: any[]) => void;
}

const NewOrderFlow: React.FC<NewOrderFlowProps> = ({
  restaurantId,
  tableId,
  onClose,
  onOrderConfirm,
}) => {
  const [step, setStep] = useState<"menu" | "cart">("menu");

  return (
    <div className="fixed inset-0 bg-[#F5F1EB] z-50">
      <MenuNewOrderFlow
        restaurantId={restaurantId}
        tableId={tableId}
        onClose={onClose}
        onOrderConfirm={onOrderConfirm}
      />
    </div>
  );
};

export default NewOrderFlow;
