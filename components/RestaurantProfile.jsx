"use client";
import React, { useState } from "react";

// Figma-accurate pen SVG (used for all blocks, with custom size)
function PenIcon({ size = 22 }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

const eyeIcon = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <ellipse cx="10" cy="10" rx="7.5" ry="5" stroke="#4B3937" strokeWidth="1.1"/>
    <circle cx="10" cy="10" r="2.5" stroke="#4B3937" strokeWidth="1.1"/>
  </svg>
);
const eyeSlashIcon = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <ellipse cx="10" cy="10" rx="7.5" ry="5" stroke="#4B3937" strokeWidth="1.1"/>
    <circle cx="10" cy="10" r="2.5" stroke="#4B3937" strokeWidth="1.1"/>
    <line x1="4" y1="16" x2="16" y2="4" stroke="#4B3937" strokeWidth="1.1"/>
  </svg>
);

// Avatar icon
const profileIcon = (
  <svg width="54" height="54" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="13" r="10" stroke="#4B3937" strokeWidth="2.1" />
    <circle cx="14" cy="10" r="4" stroke="#4B3937" strokeWidth="1.6" />
    <path d="M7 20c.5-4.2 4.1-4.5 7-4.5s6.5 1.3 7 3.5" stroke="#4B3937" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function RestaurantProfile() {
  // Editable states for input fields
  const [restaurantEmail, setRestaurantEmail] = useState("smartcafe@twc.com");
  const [restaurantPassword, setRestaurantPassword] = useState("twcthebest");
  const [restaurantNumber, setRestaurantNumber] = useState("921953****");
  const [ownerName, setOwnerName] = useState("Shetty Anna");
  const [ownerEmail, setOwnerEmail] = useState("annashetty@gmail.com");
  const [ownerNumber, setOwnerNumber] = useState("921953****");
  const [showPassword, setShowPassword] = useState(false);

  // Pen icon shadow style (grey shadow, consistent for all pens)
  const penShadowStyle = {
    boxShadow: "0 4px 18px 0 rgba(130,130,130,0.17)",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "transparent",
      fontFamily: "Calibri, Arial, sans-serif"
    }}>
      {/* Page Title */}
      <div style={{
        marginTop: 65,
        marginLeft: 90,
        fontFamily: "Georgia, Times New Roman, serif",
        fontWeight: 600,
        fontSize: 28,
        color: "#4B3937",
        letterSpacing: "0.02em"
      }}>
        Restaurant’s Profile
      </div>

      {/* Main White Box Boundary */}
      <div style={{
        margin: "27px auto 0 auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 30px 0 rgba(110, 85, 60, 0.13)",
        padding: "30px 32px 36px 32px",
        width: 1360,
        maxWidth: "95vw",
        display: "flex",
        flexDirection: "row",
        gap: 28,
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
        {/* Block 1: Restaurant Info & Reviews */}
        <div style={{
          background: "#fff",
          borderRadius: 15,
          boxShadow: "0 4px 20px 0 rgba(140,110,70,0.07)",
          minWidth: 310,
          maxWidth: 310,
          flex: "0 0 310px",
          padding: "18px 14px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          color: "#4B3937"
        }}>
          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: 13, position: "relative" }}>
            <div style={{ position: "relative" }}>
              {profileIcon}
              {/* Figma-accurate Pen with shadow */}
              <span style={{
                position: "absolute",
                right: -16,
                bottom: -8,
                zIndex: 2,
                width: 36,
                height: 36,
                ...penShadowStyle
              }}>
                <PenIcon size={24} />
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: "Georgia, Times New Roman, serif",
                fontWeight: 600,
                fontSize: 21,
                color: "#4B3937"
              }}>
                Smart Cafe
              </div>
              <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#FFA726", fontSize: 19 }}>★★★★★</span>
                <span style={{ marginLeft: 3, color: "#4B3937", fontWeight: 600, fontSize: 16 }}>5</span>
              </div>
            </div>
          </div>
          {/* Restaurant Reviews */}
          <div style={{
            background: "#fff",
            border: "1.2px solid #B0B0B0",
            borderRadius: 12,
            padding: "11px 11px 0 11px",
            marginTop: 3,
            position: "relative",
            minHeight: 120,
            overflow: "hidden",
            color: "#4B3937"
          }}>
            {/* fade effect bottom */}
            <div style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              height: "25%",
              background: "linear-gradient(to top, #00000040 0%, rgba(255,255,255,0) 100%)",
              opacity: 0.7,
              zIndex: 2,
              pointerEvents: "none"
            }}/>
            <div style={{
              fontWeight: 600,
              color: "#4B3937",
              fontSize: 15.2,
              marginBottom: 7,
              fontFamily: "Georgia, Times New Roman, serif"
            }}>
              Restaurant Reviews
            </div>
            <div style={{ zIndex: 1, position: "relative" }}>
              <div style={{ marginBottom: 7 }}>
                <span style={{ fontWeight: 600, color: "#4B3937" }}>Komal</span>
                <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>★★★★★</span>
                <span style={{ marginLeft: 2, color: "#4B3937", fontWeight: 500, fontSize: 13 }}>5</span>
                <div style={{
                  color: "#4B3937",
                  fontSize: 13.5,
                  marginTop: 3,
                  fontWeight: 400,
                  letterSpacing: 0.01
                }}>
                  Hey, the food served at this restaurant was absolutely incredible. I loved the vibe and ambience😊
                </div>
              </div>
              <div>
                <span style={{ fontWeight: 600, color: "#4B3937" }}>Sarthak</span>
                <span style={{ marginLeft: 8, color: "#FFA726", fontSize: 15 }}>★★★★★</span>
                <span style={{ marginLeft: 2, color: "#4B3937", fontWeight: 500, fontSize: 13 }}>5</span>
                <div style={{
                  color: "#4B3937",
                  fontSize: 13.5,
                  marginTop: 3,
                  fontWeight: 400,
                  letterSpacing: 0.01
                }}>
                  Hey, the food served at this restaurant was absolutely incredible. I loved the vibe and ambience😊
                </div>
              </div>
            </div>
            <div style={{
              textAlign: "right",
              color: "#b9b4ab",
              fontSize: 13,
              marginTop: 4,
              cursor: "pointer",
              zIndex: 3,
              position: "relative"
            }}>
              View more
            </div>
          </div>
        </div>
        {/* Block 2 & 3: Details Cards */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 24,
          justifyContent: "center",
          alignItems: "stretch"
        }}>
          {/* Restaurant's Details */}
          <div style={{
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
            alignItems: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontFamily: "Georgia, Times New Roman, serif",
              fontSize: 17,
              color: "#4B3937",
              position: "relative",
              width: "100%",
              justifyContent: "space-between"
            }}>
              <span>Restaurant's Details</span>
              <span style={{
                cursor: "pointer",
                width: 34,
                height: 34,
                ...penShadowStyle
              }}>
                <PenIcon size={20} />
              </span>
            </div>
            <div style={{ marginTop: 5, width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Restaurant’s Email Id</label>
              <input
                value={restaurantEmail}
                onChange={e => setRestaurantEmail(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 6,
                  fontSize: 15,
                  color: "#4B3937",
                  padding: "7px 9px",
                  marginBottom: 4,
                  fontFamily: "Calibri, Arial, sans-serif"
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  value={restaurantPassword}
                  type={showPassword ? "text" : "password"}
                  onChange={e => setRestaurantPassword(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1.2px solid #B0B0B0",
                    background: "#fff",
                    borderRadius: 6,
                    fontSize: 15,
                    color: "#4B3937",
                    padding: "7px 32px 7px 9px",
                    marginBottom: 4,
                    fontFamily: "Calibri, Arial, sans-serif"
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
                    padding: 2
                  }}
                  onClick={() => setShowPassword(s => !s)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? eyeSlashIcon : eyeIcon}
                </span>
                <span style={{
                  position: "absolute",
                  right: 7,
                  top: "100%",
                  fontSize: 10.2,
                  color: "#bdbdbd",
                  fontWeight: 500,
                  marginTop: 0
                }}>
                  Change Password
                </span>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Restaurant’s Number</label>
              <input
                value={restaurantNumber}
                onChange={e => setRestaurantNumber(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 6,
                  fontSize: 15,
                  color: "#4B3937",
                  padding: "7px 9px",
                  marginBottom: 4,
                  fontFamily: "Calibri, Arial, sans-serif"
                }}
              />
            </div>
          </div>
          {/* Owner's Details */}
          <div style={{
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
            alignItems: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontFamily: "Georgia, Times New Roman, serif",
              fontSize: 17,
              color: "#4B3937",
              position: "relative",
              width: "100%",
              justifyContent: "space-between"
            }}>
              <span>Owner’s Details</span>
              <span style={{
                cursor: "pointer",
                width: 34,
                height: 34,
                ...penShadowStyle
              }}>
                <PenIcon size={20} />
              </span>
            </div>
            <div style={{ marginTop: 5, width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Owner’s Name</label>
              <input
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 6,
                  fontSize: 15,
                  color: "#4B3937",
                  padding: "7px 9px",
                  marginBottom: 4,
                  fontFamily: "Calibri, Arial, sans-serif"
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Owner’s Email Id</label>
              <input
                value={ownerEmail}
                onChange={e => setOwnerEmail(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 6,
                  fontSize: 15,
                  color: "#4B3937",
                  padding: "7px 9px",
                  marginBottom: 4,
                  fontFamily: "Calibri, Arial, sans-serif"
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <label style={{
                fontWeight: 500,
                fontSize: 13.5,
                color: "#4B3937",
                display: "block",
                marginBottom: 3
              }}>Owner’s Number</label>
              <input
                value={ownerNumber}
                onChange={e => setOwnerNumber(e.target.value)}
                style={{
                  width: "100%",
                  border: "1.2px solid #B0B0B0",
                  background: "#fff",
                  borderRadius: 6,
                  fontSize: 15,
                  color: "#4B3937",
                  padding: "7px 9px",
                  marginBottom: 4,
                  fontFamily: "Calibri, Arial, sans-serif"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}