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

  // Style constants
  const fontSize = 23;
  const tabColor = "#4D3E3B";
  const underlineColor = "#C99E5A"; // Orange/gold color for active tab underline
  const lineColor = "#d4b591"; // Lighter brown/beige for the full-width line
  const underlineHeight = 2; // Height of the active tab underline
  const tabLineWidth = 1021; // Total width for the tab row and full line
  const tabGap = 28; // px gap between tabs

  return (
    <div className="ml-[60px] min-h-screen bg-[#f5f1eb] p-6 font-['Inter']">
      <div className="relative" style={{ width: tabLineWidth, height: 37, marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: 29,
            whiteSpace: "nowrap",
            position: "relative",
            zIndex: 1,
            justifyContent: "flex-start",
            gap: `${tabGap}px`, // Enforce exact 28px gap between tabs
          }}
        >
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: activeTab === idx ? 550 : 750,
                fontSize,
                lineHeight: "100%",
                letterSpacing: 0,
                color: tabColor,
                height: 29,
                outline: "none",
                display: "inline-block",
                background: "none",
                border: "none",
                padding: 0,
                verticalAlign: "middle",
                position: "relative",
                textAlign: "center",
                cursor: "pointer",
                // Reduced and softened shadow for active tab
                textShadow: activeTab === idx
                  ? "0 1.5px 4px rgba(0,0,0,0.269)"
                  : "none"
              }}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
              {activeTab === idx && (
                // Container for the custom-shaped underline
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    // Position the underline slightly *above* the bottom of the tab text,
                    // to ensure it sits above the main line as per the Figma image.
                    bottom: -0.2, // This can be adjusted based on exact desired gap to main line
                    width: "100%",
                    height: underlineHeight, // Base height
                    background: underlineColor, // Solid color for now
                    borderRadius: 0, // Ensure sharp corners for the main underline
                  }}
                >
                  {/* Visual approximation of the 1:2 ratio rounded part and extending thin line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: underlineHeight,
                      width: `calc(100% - ${underlineHeight / 2}px)`, // Adjust width to make space for rounded end
                      backgroundColor: underlineColor,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      height: underlineHeight,
                      width: underlineHeight, // Create a square to round
                      backgroundColor: underlineColor,
                      borderRadius: `0 ${underlineHeight / 2}px ${underlineHeight / 2}px 0`, // Only round the right end
                    }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Full-width bottom line */}
        <div
          style={{
            // Position it exactly at the bottom of the tab container, sharp ends
            top: 29, // Still at the bottom of the 29px high button area
            left: 0,
            width: tabLineWidth,
            borderBottom: `2px solid ${lineColor}`,
            position: "absolute",
            zIndex: 0,
            borderRadius: 0,
          }}
        />
      </div>
      {/* Tab Content */}
      {activeTab === 0 && <StockStatusTab />}
      {activeTab === 1 && <StockManagementTab />}
      {activeTab === 2 && <PurchaseManagementTab />}
      {activeTab === 3 && <InhouseOperationsTab />}
      {activeTab === 4 && <WastageTab onBack={() => setActiveTab(0)} />}
    </div>
  );
}