"use client";
import React, { useState } from "react";

// Figma-accurate pen SVG (used for all blocks, with custom size)
function PenIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
        stroke="#4B3937"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        stroke="#4B3937"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

const profileIcon = (
  <svg width="54" height="54" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="13" r="10" stroke="#4B3937" strokeWidth="2.1" />
    <circle cx="14" cy="10" r="4" stroke="#4B3937" strokeWidth="1.6" />
    <path
      d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5"
      stroke="#4B3937"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const eyeIcon = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <ellipse
      cx="10"
      cy="10"
      rx="7.5"
      ry="5"
      stroke="#4B3937"
      strokeWidth="1.1"
    />
    <circle cx="10" cy="10" r="2.5" stroke="#4B3937" strokeWidth="1.1" />
  </svg>
);
const eyeSlashIcon = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <ellipse
      cx="10"
      cy="10"
      rx="7.5"
      ry="5"
      stroke="#4B3937"
      strokeWidth="1.1"
    />
    <circle cx="10" cy="10" r="2.5" stroke="#4B3937" strokeWidth="1.1" />
    <line x1="4" y1="16" x2="16" y2="4" stroke="#4B3937" strokeWidth="1.1" />
  </svg>
);

// --- Figma-accurate SVG for Restaurant Staff icons ---
const DropdownIcon = ({ color = "#4B3937" }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// New Staff Performance Icon with image inside a circle
const StaffPerformanceIcon = ({
  onClick,
  imageUrl,
  circleColor = "#D5D5D5",
  size = 40,
}: {
  onClick: () => void;
  imageUrl: string;
  circleColor?: string;
  size?: number;
}) => (
  <button
    onClick={onClick}
    style={{
      background: circleColor,
      border: `1.2px solid ${circleColor}`, // Changed border to match circleColor
      borderRadius: "50%",
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
      overflow: "hidden", // Ensure image doesn't overflow
      padding: 0, // Remove default button padding
      flexShrink: 0, // Prevent shrinking on smaller screens
    }}
  >
    <img
      src={imageUrl}
      alt="Staff Performance"
      style={{
        width: "60%", // Make image very small inside the circle
        height: "60%", // Make image very small inside the circle
        objectFit: "contain",
        borderRadius: "50%", // Keep image circular if needed
      }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "https://placehold.co/24x24/D5D5D5/000000?text=SP";
      }}
    />
  </button>
);

const PlusIcon = ({ color = "#4B3937" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const RightArrowIcon = ({ color = "#4B3937" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const LeftArrowIcon = ({ color = "#4B3937" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const CheckboxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#66bb6a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0  0 1 2-2h11"></path>
  </svg>
);

// --- COMPONENTS ---

function RestaurantInfoCard() {
  const penShadowStyle: React.CSSProperties = {
    boxShadow: "0 4px 18px 0 rgba(130,130,130,0.17)",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 14px 14px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        color: "#4B3937",
        minHeight: 100,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          {profileIcon}
          <span
            style={{
              position: "absolute",
              right: -16,
              bottom: -8,
              zIndex: 2,
              width: 36,
              height: 36,
              ...penShadowStyle,
            }}
            aria-label="Edit Profile"
            tabIndex={0}
            role="button"
          >
            <PenIcon size={24} />
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Georgia', serif", // Use Georgia for headings
              fontWeight: 600,
              fontSize: 21,
              color: "#4B3937",
            }}
          >
            Smart Cafe
          </div>
          <div
            style={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "#FFA726", fontSize: 19 }}>★★★★★</span>
            <span
              style={{
                marginLeft: 3,
                color: "#4B3937",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantReviewsCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "13px 14px 10px 14px", // compact but still enough for content
        display: "flex",
        flexDirection: "column",
        gap: 7,
        color: "#4B3937",
        minHeight: 198, // visible but not oversized
        maxHeight: 120,
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: "#4B3937",
          fontSize: 15.5,
          marginBottom: 3,
          fontFamily: "'Georgia', serif", // Use Georgia for headings
        }}
      >
        Restaurant Reviews
      </div>
      <div style={{ zIndex: 1, position: "relative" }}>
        <div style={{ marginBottom: 2 }}>
          <span style={{ fontWeight: 600, color: "#4B3937" }}>Komal</span>
          <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>
            ★★★★★
          </span>
          <span
            style={{
              marginLeft: 2,
              color: "#4B3937",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            5
          </span>
          <div
            style={{
              color: "#4B3937",
              fontSize: 13.1,
              marginTop: 1,
              fontWeight: 400,
              letterSpacing: 0.01,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.36,
              maxWidth: 260,
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
            }}
          >
            Hey, the food served at this restaurant was absolutely incredible. I
            loved the vibe and ambience😊
          </div>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: "#4B3937" }}>Sarthak</span>
          <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>
            ★★★★★
          </span>
          <span
            style={{
              marginLeft: 2,
              color: "#4B3937",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            5
          </span>
          <div
            style={{
              color: "#4B3937",
              fontSize: 13.1,
              marginTop: 1,
              fontWeight: 400,
              letterSpacing: 0.01,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.36,
              maxWidth: 260,
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
            }}
          >
            Hey, the food served at this restaurant was absolutely incredible. I
            loved the vibe and ambience😊
          </div>
        </div>
      </div>
      {/* fade effect bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          height: 36,
          background:
            "linear-gradient(to top, #00000040 0%, rgba(255,255,255,0) 100%)",
          opacity: 0.7,
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          textAlign: "right",
          color: "#b9b4ab",
          fontSize: 13,
          marginTop: -25,
          cursor: "pointer",
          zIndex: 3,
          position: "relative",
          fontFamily: "'Inter', sans-serif", // Use Inter for body text
        }}
      >
        View more
      </div>
    </div>
  );
}

function RestaurantDetailsCard({
  restaurantEmail,
  setRestaurantEmail,
  restaurantPassword,
  setRestaurantPassword,
  restaurantNumber,
  setRestaurantNumber,
  showPassword,
  setShowPassword,
  penShadowStyle,
}: {
  restaurantEmail: string;
  setRestaurantEmail: (v: string) => void;
  restaurantPassword: string;
  setRestaurantPassword: (v: string) => void;
  restaurantNumber: string;
  setRestaurantNumber: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  penShadowStyle: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 17px 14px 17px",
        minWidth: 0,
        width: "50%",
        maxWidth: 390,
        flex: "1 1 0%",
        display: "flex",
        flexDirection: "column",
        gap: 11,
        color: "#4B3937",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          fontFamily: "'Georgia', serif", // Use Georgia for headings
          fontSize: 17,
          color: "#4B3937",
          position: "relative",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span>Restaurant&apos;s Details</span>
        <span
          style={{
            cursor: "pointer",
            width: 34,
            height: 34,
            ...penShadowStyle,
          }}
          aria-label="Edit Restaurant Details"
          tabIndex={0}
          role="button"
        >
          <PenIcon size={20} />
        </span>
      </div>
      <div style={{ marginTop: 5, width: "100%" }}>
        <label
          htmlFor="restaurant-email"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Restaurant&apos;s Email Id
        </label>
        <input
          id="restaurant-email"
          value={restaurantEmail}
          onChange={(e) => setRestaurantEmail(e.target.value)}
          style={{
            width: "100%",
            border: "1.2px solid #B0B0B0",
            background: "#fff",
            borderRadius: 6,
            fontSize: 15,
            color: "#4B3937",
            padding: "7px 9px",
            marginBottom: 4,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <label
          htmlFor="restaurant-password"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="restaurant-password"
            value={restaurantPassword}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setRestaurantPassword(e.target.value)}
            style={{
              width: "100%",
              border: "1.2px solid #B0B0B0",
              background: "#fff",
              borderRadius: 6,
              fontSize: 15,
              color: "#4B3937",
              padding: "7px 32px 7px 9px",
              marginBottom: 4,
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 7,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 1.5px 5px rgba(130,130,130,0.17)",
              padding: 2,
            }}
            onClick={() => setShowPassword((s) => !s)}
            title={showPassword ? "Hide Password" : "Show Password"}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            tabIndex={0}
            role="button"
          >
            {showPassword ? eyeSlashIcon : eyeIcon}
          </span>
          <span
            style={{
              position: "absolute",
              right: 7,
              top: "100%",
              fontSize: 10.2,
              color: "#bdbdbd",
              fontWeight: 500,
              marginTop: 0,
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
            }}
          >
            Change Password
          </span>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <label
          htmlFor="restaurant-number"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Restaurant&apos;s Number
        </label>
        <input
          id="restaurant-number"
          value={restaurantNumber}
          onChange={(e) => setRestaurantNumber(e.target.value)}
          style={{
            width: "100%",
            border: "1.2px solid #B0B0B0",
            background: "#fff",
            borderRadius: 6,
            fontSize: 15,
            color: "#4B3937",
            padding: "7px 9px",
            marginBottom: 4,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        />
      </div>
    </div>
  );
}

function OwnerDetailsCard({
  ownerName,
  setOwnerName,
  ownerEmail,
  setOwnerEmail,
  ownerNumber,
  setOwnerNumber,
  penShadowStyle,
}: {
  ownerName: string;
  setOwnerName: (v: string) => void;
  ownerEmail: string;
  setOwnerEmail: (v: string) => void;
  ownerNumber: string;
  setOwnerNumber: (v: string) => void;
  penShadowStyle: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 17px 14px 17px",
        minWidth: 0,
        width: "50%",
        maxWidth: 390,
        flex: "1 1 0%",
        display: "flex",
        flexDirection: "column",
        gap: 11,
        color: "#4B3937",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          fontFamily: "'Georgia', serif", // Use Georgia for headings
          fontSize: 17,
          color: "#4B3937",
          position: "relative",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span>Owner&apos;s Details</span>
        <span
          style={{
            cursor: "pointer",
            width: 34,
            height: 34,
            ...penShadowStyle,
          }}
          aria-label="Edit Owner Details"
          tabIndex={0}
          role="button"
        >
          <PenIcon size={20} />
        </span>
      </div>
      <div style={{ marginTop: 5, width: "100%" }}>
        <label
          htmlFor="owner-name"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Owner&apos;s Name
        </label>
        <input
          id="owner-name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={{
            width: "100%",
            border: "1.2px solid #B0B0B0",
            background: "#fff",
            borderRadius: 6,
            fontSize: 15,
            color: "#4B3937",
            padding: "7px 9px",
            marginBottom: 4,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <label
          htmlFor="owner-email"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Owner&apos;s Email Id
        </label>
        <input
          id="owner-email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          style={{
            width: "100%",
            border: "1.2px solid #B0B0B0",
            background: "#fff",
            borderRadius: 6,
            fontSize: 15,
            color: "#4B3937",
            padding: "7px 9px",
            marginBottom: 4,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <label
          htmlFor="owner-number"
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            color: "#4B3937",
            display: "block",
            marginBottom: 3,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        >
          Owner&apos;s Number
        </label>
        <input
          id="owner-number"
          value={ownerNumber}
          onChange={(e) => setOwnerNumber(e.target.value)}
          style={{
            width: "100%",
            border: "1.2px solid #B0B0B0",
            background: "#fff",
            borderRadius: 6,
            fontSize: 15,
            color: "#4B3937",
            padding: "7px 9px",
            marginBottom: 4,
            fontFamily: "'Inter', sans-serif", // Use Inter for body text
          }}
        />
      </div>
    </div>
  );
}

// New Cook Card Component
const COOK_CARD_WIDTH = 225;
const COOK_CARD_HEIGHT = 245; // Reduced slightly
const CARD_GAP = 20;

function CookCard({ clickable = false, onClick = () => undefined }) {
  const cardStyle: React.CSSProperties = {
    background: "#F1EEE7",
    borderRadius: 15,
    boxShadow: "0 40px 29px 0 rgba(140,110,70,0.07)",
    border: "none",
    padding: "18px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#4B3937",
    textAlign: "center",
    width: COOK_CARD_WIDTH,
    height: COOK_CARD_HEIGHT,
    flexShrink: 0,
    cursor: clickable ? "pointer" : "default",
    position: "relative",
    boxSizing: "border-box",
  };

  return (
    <div style={cardStyle} onClick={clickable ? onClick : undefined}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 28 28"
        fill="none"
        style={{ marginBottom: "8px" }}
      >
        <circle cx="14" cy="13" r="10" stroke="#4B3937" strokeWidth="2.1" />
        <circle cx="14" cy="10" r="4" stroke="#4B3937" strokeWidth="1.6" />
        <path
          d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5"
          stroke="#4B3937"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          fontWeight: 600,
          fontSize: 18,
          fontFamily: "'Georgia', serif",
        }}
      >
        Cook
      </div>
      <div
        style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}
      >
        <span style={{ color: "#FFA726", fontSize: 15 }}>★★★★★</span>
        <span
          style={{
            marginLeft: 0,
            color: "#4B3937",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          5
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 14.5,
          lineHeight: 1.4,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ fontWeight: 500 }}>
          Name: <span style={{ fontWeight: 400 }}>Mr Cook</span>
        </div>
        <div style={{ fontWeight: 500 }}>
          Contact No.: <span style={{ fontWeight: 400 }}>9878xxxxxx</span>
        </div>
        <div style={{ fontWeight: 500 }}>
          Salary Due: <span style={{ fontWeight: 400 }}>28th Mar, 25</span>
        </div>
      </div>
      {clickable && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 238, 221, 0.3)", // light transparent overlay on hover/click
            borderRadius: 15,
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

// Component for a single row of scrolling Cook cards
function CookRow({ scrollOffset, containerWidth, onCookClick }) {
  const totalCooksPerRow = 7;
  const actualContentWidth =
    totalCooksPerRow * (COOK_CARD_WIDTH + CARD_GAP) - CARD_GAP;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: containerWidth,
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        height: COOK_CARD_HEIGHT + 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: actualContentWidth,
          transform: `translateX(-${scrollOffset}px)`,
          transition: "transform 0.5s ease-in-out",
          gap: CARD_GAP,
          paddingBottom: 10,
        }}
      >
        {Array.from({ length: totalCooksPerRow }).map((_, index) => (
          <CookCard
            key={`cook-${index}`}
            clickable={true}
            onClick={() => onCookClick()}
          />
        ))}
      </div>
    </div>
  );
}

// New Modal Component for adding staff
function AddStaffModal({ isOpen, onClose, onAddStaff, onViewStaffProfile }) {
  if (!isOpen) return null;

  const modalProfileIcon = (
    <svg width="100" height="100" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="13" r="10" stroke="#4B3937" strokeWidth="2.1" />
      <circle cx="14" cy="10" r="4" stroke="#4B3937" strokeWidth="1.6" />
      <path
        d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5"
        stroke="#4B3937"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const closeIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4B3937"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  // Figma accurate input and label styles for the modal
  const inputStyle = {
    width: "100%",
    border: "1.2px solid #B0B0B0",
    background: "#fff", // Input background from Figma image is white
    borderRadius: 6,
    fontSize: 15,
    color: "#4B3937",
    padding: "7px 9px",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle = {
    fontWeight: 500,
    fontSize: 13.5,
    color: "#4B3937",
    display: "block",
    marginBottom: 3,
    fontFamily: "'Inter', sans-serif",
  };

  // Figma accurate button styles for the modal
  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontFamily: "'Inter', sans-serif",
    border: "none",
    boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)", // Consistent shadow for buttons
  };

  // Style for the inner white blocks within the modal
  const innerBlockStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 10, // Slightly less rounded than modal
    boxShadow: "0 4px 15px rgba(140,110,70,0.05)", // Lighter shadow for inner blocks
    padding: "15px 20px", // Adjusted padding for inner blocks
    boxSizing: "border-box",
    flexGrow: 1, // Allow blocks to fill available space
    minHeight: 250, // Reduced minHeight slightly
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff", // Modal background color
          borderRadius: 15,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          padding: "30px",
          width: "90%",
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          color: "#4B3937",
          position: "relative",
          maxHeight: "85vh", // Added to help vertical shortening
          overflowY: "auto", // Add scroll if content overflows
        }}
      >
        {/* Header row with Staff's Profile title and Add Staff button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            width: "100%", // Ensure it spans full width
          }}
        >
          <h2
            onClick={onViewStaffProfile} // Make the title clickable
            style={{
              margin: 0,
              fontFamily: "'Georgia', serif",
              fontWeight: 600,
              fontSize: 22,
              color: "#4B3937",
              cursor: "pointer", // Indicate clickable
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4B3937"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Staff&apos;s Profile
          </h2>
          {/* Add Staff button positioned absolutely */}
          <button
            onClick={onAddStaff}
            style={{
              ...buttonStyle,
              background: "#C99E5A", // Figma-accurate brown for "Add Staff"
              color: "#fff", // White text
              padding: "8px 18px",
              fontSize: 15,
              position: "absolute", // Position absolutely for top-right corner
              top: "20px",
              right: "20px",
              zIndex: 10,
            }}
          >
            Add Staff
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20, // Gap between the two main columns
            width: "100%",
            // Removed borderRight from this div and applied to inner blocks
          }}
        >
          {/* Left Column - Profile Picture & Add Name/Designation */}
          <div
            style={{
              ...innerBlockStyle, // Apply inner block styling
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
              minHeight: 250, // Reduced minHeight slightly
              justifyContent: "center", // Center content vertically
            }}
          >
            <div style={{ position: "relative" }}>
              {modalProfileIcon}
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  background: "transparent",
                  borderRadius: "50%",
                  padding: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #66bb6a",
                }}
              >
                <PlusIcon color="#66bb6a" />
              </span>
            </div>
            {/* Changed these to plain text, no input boxes */}
            <div
              style={{
                fontSize: 18, // Increased font size
                color: "#000",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Add name
            </div>
            <div
              style={{
                fontSize: 18, // Increased font size
                color: "#000",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
              }}
            >
              Add Designation
            </div>
          </div>

          {/* Right Column - Personal Information */}
          <div
            style={{
              ...innerBlockStyle, // Apply inner block styling
              flex: 2, // Take more space
              display: "flex",
              flexDirection: "column",
              gap: 15, // Gap between rows of inputs
            }}
          >
            <div
              style={{
                fontFamily: "'Georgia', serif",
                fontWeight: 600,
                fontSize: 18,
                color: "#4B3937",
                marginBottom: 5,
                textAlign: "left", // Ensure left alignment
              }}
            >
              Personal Information
            </div>
            {/* Email Id - Full width */}
            <div style={{ width: "100%" }}>
              <label style={labelStyle}>Email Id</label>
              <input type="email" style={inputStyle} placeholder="Email Id" />
            </div>
            {/* Contact Number & Joining Date - Two columns */}
            <div style={{ display: "flex", gap: 15, width: "100%" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Contact Number</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Contact Number"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Joining Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  placeholder="Joining Date"
                />{" "}
                {/* type="date" for calendar */}
              </div>
            </div>
            {/* Salary & Salary Due Date - Two columns */}
            <div style={{ display: "flex", gap: 15, width: "100%" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary</label>
                <input type="text" style={inputStyle} placeholder="Salary" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Salary due date</label>
                <input type="text" style={inputStyle} placeholder="DD" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// New component for the Restaurant Staff Section (including search, filter, and scrolling cards)
function RestaurantStaffSection() {
  const totalCooksPerRow = 7;
  const visibleCooks = 5;
  const scrollAmount = (COOK_CARD_WIDTH + CARD_GAP) * 2;
  const containerInnerWidth =
    visibleCooks * (COOK_CARD_WIDTH + CARD_GAP) - CARD_GAP;
  const maxScrollOffset =
    (totalCooksPerRow - visibleCooks) * (COOK_CARD_WIDTH + CARD_GAP);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  // Modified: isPlusIconActive now controls the color of the plus icon *and* its background
  const [isPlusIconActive, setIsPlusIconActive] = useState(false);

  const handleRightArrowClick = () => {
    setScrollOffset((prevOffset) =>
      Math.min(prevOffset + scrollAmount, maxScrollOffset)
    );
  };

  const handleLeftArrowClick = () => {
    setScrollOffset((prevOffset) => Math.max(prevOffset - scrollAmount, 0));
  };

  const handleOpenAddStaffModal = () => {
    setShowAddStaffModal(true);
    setIsPlusIconActive(true); // Plus icon active (green) when modal opens
  };

  const handleCloseAddStaffModal = () => {
    setShowAddStaffModal(false);
    setIsPlusIconActive(false); // Plus icon inactive (default color) when modal closes
  };

  const handleAddStaff = () => {
    console.log("Add Staff clicked!");
    // Add staff logic here if needed
    handleCloseAddStaffModal(); // Close modal after adding staff
  };

  const handleViewStaffProfile = () => {
    window.location.href =
      "http://localhost:3000/dashboard/restaurantprofile/staffprofile";
    handleCloseAddStaffModal(); // Close modal when navigating
  };

  const handleCookCardClick = () => {
    window.location.href =
      "http://localhost:3000/dashboard/restaurantprofile/staffprofile";
  };

  const outlineColor = "#B39793"; // Color for outlines and text

  const showLeftArrow = scrollOffset > 0;
  const showRightArrow = scrollOffset < maxScrollOffset;

  const fadeColorStart = "rgba(0,0,0,0.6)";
  const fadeColorEnd = "rgba(255,255,255,0)";
  const rightFadeGradient = `linear-gradient(to left, ${fadeColorStart} 0%, ${fadeColorEnd} 100%)`;
  const leftFadeGradient = `linear-gradient(to right, ${fadeColorStart} 0%, ${fadeColorEnd} 100%)`;

  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 30,
        marginRight: "auto",
        marginLeft: 180,
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 30px 0 rgba(110, 85, 60, 0.13)",
        padding: "30px 32px 30px 32px",
        width: 1250,
        maxWidth: "95vw",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      {/* Search and Staff Filter Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 1180,
          padding: "0 10px",
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            border: `1.2px solid ${outlineColor}`,
            borderRadius: 8,
            padding: "8px 12px",
            flexGrow: 1,
            marginRight: 20,
            maxWidth: 350,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={outlineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 8 }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              outline: "none",
              fontSize: 16,
              color: outlineColor,
              width: "100%",
              background: "transparent",
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
            }}
          />
        </div>

        {/* Restaurant Staff Dropdown & Icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <button
            style={{
              background: "#fff",
              border: `1.2px solid ${outlineColor}`,
              borderRadius: 8,
              padding: "8px 15px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              color: outlineColor,
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif", // Use Inter for body text
              boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
            }}
          >
            Restaurant Staff <DropdownIcon color={outlineColor} />
          </button>
          {/* Updated StaffPerformanceIcon */}
          <StaffPerformanceIcon
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/dashboard/restaurantprofile/staffperformance")
            }
            imageUrl="/2bb6ca406cd027d513b3c1deffef4da8a234c4d0.png"
            circleColor="#D5D5D5"
            size={40}
          />
          {/* PlusIcon with conditional background and icon color */}
          <button
            onClick={handleOpenAddStaffModal}
            style={{
              background: "#fff", // Always white background
              border: `1.2px solid ${outlineColor}`,
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
              transition: "background-color 0.3s ease",
            }}
          >
            {/* PlusIcon color is green when active, else outlineColor */}
            <PlusIcon color={isPlusIconActive ? "#66bb6a" : outlineColor} />
          </button>
        </div>
      </div>

      {/* Container for both CookRows and the single arrow */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1180,
          height: COOK_CARD_HEIGHT * 2 + CARD_GAP,
          display: "flex",
          flexDirection: "column",
          gap: CARD_GAP,
          justifyContent: "space-around",
          boxSizing: "border-box",
        }}
      >
        {/* Top Cook Cards Row */}
        <CookRow
          scrollOffset={scrollOffset}
          containerWidth={containerInnerWidth}
          onCookClick={handleCookCardClick}
        />

        {/* Bottom Cook Cards Row */}
        <CookRow
          scrollOffset={scrollOffset}
          containerWidth={containerInnerWidth}
          onCookClick={handleCookCardClick}
        />

        {/* Left Arrow */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 70,
            background: leftFadeGradient,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            pointerEvents: showLeftArrow ? "auto" : "none",
            opacity: showLeftArrow ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            zIndex: 15,
          }}
        >
          <button 
            title="Left Arrow"
            onClick={handleLeftArrowClick}
            style={{
              background: "#ffeedd",
              border: `1.2px solid ${outlineColor}`,
              borderRadius: "50%",
              width: 45,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
              marginLeft: 10,
            }}
          >
            <LeftArrowIcon color={outlineColor} />
          </button>
        </div>

        {/* Right Arrow */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 70,
            background: rightFadeGradient,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pointerEvents: showRightArrow ? "auto" : "none",
            opacity: showRightArrow ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            zIndex: 15,
          }}
        >
          <button
            title="Right Arrow"
            onClick={handleRightArrowClick}
            style={{
              background: "#ffeedd",
              border: `1.2px solid ${outlineColor}`,
              borderRadius: "50%",
              width: 45,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(110, 85, 60, 0.09)",
              marginRight: 10,
            }}
          >
            <RightArrowIcon color={outlineColor} />
          </button>
        </div>
      </div>
      <AddStaffModal
        isOpen={showAddStaffModal}
        onClose={handleCloseAddStaffModal}
        onAddStaff={handleAddStaff}
        onViewStaffProfile={handleViewStaffProfile}
      />
    </div>
  );
}

function MembershipPlanCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 17px 14px 17px",
        minWidth: 0,
        flex: "1 1 0%",
        maxWidth: 290,
        display: "flex",
        flexDirection: "column",
        gap: 15,
        color: "#4B3937",
        alignItems: "flex-start",
        boxSizing: "border-box",
        position: "relative",
        minHeight: 250,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontFamily: "'Georgia', serif", // Heading font
          fontSize: 17,
          color: "#4B3937",
          marginBottom: 5,
        }}
      >
        Membership Plan
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        {/* Waiter Company Logo */}
        <img
          src="/Screenshot 2025-06-07 171759.png"
          alt="Waiter Company Logo"
          style={{
            width: 700,
            height: "auto",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/70x40/cccccc/000000?text=Logo";
          }}
        />
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#4B3937",
          marginTop: 0,
          fontFamily: "'Inter', sans-serif", // Body font
        }}
      >
        Membership Plan Name:{" "}
        <span style={{ fontWeight: 400 }}>Yearly Saver</span>
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#4B3937",
          marginTop: 2,
          fontFamily: "'Inter', sans-serif", // Body font
        }}
      >
        Ending On: <span style={{ fontWeight: 400 }}>25th December, 2025</span>
      </div>
      <div
        style={{
          marginTop: "auto",
          fontSize: 13,
          color: "#b9b4ab",
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif", // Body font
        }}
      >
        For further queries contact 9897******
      </div>
    </div>
  );
}

function TaxInformationCard() {
  const [gstNumber, setGstNumber] = useState("xxxxxxxxxx");
  const [taxOnFood, setTaxOnFood] = useState("18%");
  const [serviceTax, setServiceTax] = useState("5%");

  const inputStyle = {
    width: "100%",
    border: "1.2px solid #B0B0B0",
    background: "#fff",
    borderRadius: 6,
    fontSize: 15,
    color: "#4B3937",
    padding: "7px 9px",
    fontFamily: "'Inter', sans-serif", // Body font
    marginBottom: 8,
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 17px 14px 17px",
        minWidth: 0,
        flex: "1 1 0%",
        maxWidth: 290,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        color: "#4B3937",
        alignItems: "flex-start",
        boxSizing: "border-box",
        minHeight: 250,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontFamily: "'Georgia', serif", // Heading font
          fontSize: 17,
          color: "#4B3937",
          marginBottom: 5,
        }}
      >
        Tax Information
      </div>
      <label htmlFor="gst-number" style={{ display: "none" }}>
        GST Number
      </label>
      <input
        id="gst-number"
        type="text"
        placeholder="GST Number"
        value={gstNumber}
        onChange={(e) => setGstNumber(e.target.value)}
        style={inputStyle}
      />
      <label htmlFor="tax-on-food" style={{ display: "none" }}>
        Tax on Food
      </label>
      <input
        id="tax-on-food"
        type="text"
        placeholder="Tax on Food"
        value={taxOnFood}
        onChange={(e) => setTaxOnFood(e.target.value)}
        style={inputStyle}
      />
      <label htmlFor="service-tax" style={{ display: "none" }}>
        Service Tax
      </label>
      <input
        id="service-tax"
        type="text"
        placeholder="Service Tax"
        value={serviceTax}
        onChange={(e) => setServiceTax(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

function KotCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "18px 17px 10px 17px",
        minWidth: 0,
        flex: "1 1 auto",
        maxWidth: 290,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        color: "#4B3937",
        alignItems: "flex-start",
        boxSizing: "border-box",
        position: "relative",
        minHeight: 140, // Adjusted minHeight
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontFamily: "'Georgia', serif", // Heading font
            fontSize: 17,
            color: "#4B3937",
          }}
        >
          KOT
        </div>
        <CheckboxIcon />
      </div>
      <div
        style={{
          fontSize: 14.5,
          lineHeight: 1.4,
          color: "#888",
          marginTop: 5,
          marginBottom: 0, // No extra bottom margin (bezzel fix)
          fontFamily: "'Inter', sans-serif", // Body font
        }}
      >
        &quot;KOT stands for Kitchen Order Ticket. It&apos;s a paper or digital
        list of a customer&apos;s order that&apos;s sent to the kitchen.&quot;
      </div>
    </div>
  );
}

function FoodDeliveryPlatformsBox() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
        padding: "14px 15px 1px 17px", // Reduced top and bottom padding
        minWidth: 0,
        flex: "1 1 auto",
        maxWidth: 290,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: 30, // Adjusted minHeight
      }}
    >
      <img
        src="/Screenshot 2025-06-21 075010.png"
        alt="Food Delivery Platforms"
        style={{
          width: 1000,
          height: "auto",
          borderRadius: 10,
          objectFit: "contain",
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/200x100/ffffff/000000?text=Platforms";
        }}
      />
    </div>
  );
}

// --- MAIN PAGE ---

export default function RestaurantProfilePage() {
  // Editable states for input fields for the first block
  const [restaurantEmail, setRestaurantEmail] =
    useState<string>("smartcafe@twc.com");
  const [restaurantPassword, setRestaurantPassword] =
    useState<string>("twcthebest");
  const [restaurantNumber, setRestaurantNumber] = useState<string>("921953**");
  const [ownerName, setOwnerName] = useState<string>("Shetty Anna");
  const [ownerEmail, setOwnerEmail] = useState<string>("annashetty@gmail.com");
  const [ownerNumber, setOwnerNumber] = useState<string>("921953**");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Pen icon shadow style (grey shadow, consistent for all pens)
  const penShadowStyle: React.CSSProperties = {
    boxShadow: "0 4px 18px 0 rgba(130,130,130,0.17)",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Content for the first main white box boundary (Restaurant Profile)
  const restaurantProfileBlock = (
    <div
      style={{
        marginTop: 27,
        marginBottom: 0,
        marginRight: "auto",
        marginLeft: 180, // Main block's left margin
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 30px 0 rgba(110, 85, 60, 0.13)",
        padding: "30px 32px 36px 32px",
        width: 1250,
        maxWidth: "95vw",
        display: "flex",
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Block 1 and 2: Profile & Restaurant Reviews as separate cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          minWidth: 310,
          maxWidth: 310,
          flex: "0 0 310px",
        }}
      >
        <RestaurantInfoCard />
        <RestaurantReviewsCard />
      </div>
      {/* Block 3 & 4: Details Cards */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <RestaurantDetailsCard
          restaurantEmail={restaurantEmail}
          setRestaurantEmail={setRestaurantEmail}
          restaurantPassword={restaurantPassword}
          setRestaurantPassword={setRestaurantPassword}
          restaurantNumber={restaurantNumber}
          setRestaurantNumber={setRestaurantNumber}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          penShadowStyle={penShadowStyle}
        />
        <OwnerDetailsCard
          ownerName={ownerName}
          setOwnerName={setOwnerName}
          ownerEmail={ownerEmail}
          setOwnerEmail={setOwnerEmail}
          ownerNumber={ownerNumber}
          setOwnerNumber={setOwnerNumber}
          penShadowStyle={penShadowStyle}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F7F4EF", // Main page background color from Figma
        fontFamily: "'Inter', sans-serif", // Default font for the entire page
      }}
    >
      {/* Removed Navigation "Back to Dashboard" Button */}
      {/* Page Title */}
      <div
        style={{
          marginTop: 30,
          marginLeft: 195,
          fontFamily: "'Georgia', serif", // Heading font
          fontWeight: 600,
          fontSize: 28,
          color: "#4B3937",
          letterSpacing: "0.02em",
        }}
      >
        Restaurant&apos;s Profile
      </div>

      {/* First Main White Box Boundary (Restaurant Profile) */}
      {restaurantProfileBlock}

      {/* Restaurant Staff Section with two rows of cooks */}
      <RestaurantStaffSection />

      {/* Combined Row for Membership, Tax Info, KOT, and Food Delivery Platforms */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 30,
          marginRight: "auto",
          marginLeft: 180,
          width: 1250,
          maxWidth: "95vw",
          display: "flex",
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
          alignItems: "stretch",
          boxSizing: "border-box",
        }}
      >
        <MembershipPlanCard />
        <TaxInformationCard />
        <KotCard />
        <FoodDeliveryPlatformsBox />
      </div>
    </div>
  );
}
