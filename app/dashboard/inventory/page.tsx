"use client";
import React, { useState } from "react";
import StockStatusTab from "./StockStatusTab";
import StockManagementTab from "./StockManagementTab";
import PurchaseManagementTab from "./PurchaseManagementTab";
import InhouseOperationsTab from "./InhouseOperationsTab";
import WastageTab from "./WastageTab";

const TABS = [
  "Stock Status",
  "Stock Management",
  "Purchase Management",
  "Inhouse Operations",
  "Wastage",
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="ml-[60px] min-h-screen bg-[#f5f1eb] p-6">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#e5e0d8] mb-4">
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium transition-colors ${
              activeTab === idx
                ? "border-b-2 border-[#b39793] text-[#4e3e3b]"
                : "text-[#4e3e3b]/70"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && <StockStatusTab />}
      {activeTab === 1 && <StockManagementTab />}
      {activeTab === 2 && <PurchaseManagementTab />}
      {activeTab === 3 && <InhouseOperationsTab />}
      {activeTab === 4 && <WastageTab />}
    </div>
  );
}
