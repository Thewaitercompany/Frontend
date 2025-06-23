"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";
import {
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

// NotificationArrow (unchanged, as it's a presentational SVG)
const NotificationArrow: React.FC = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ display: "block" }}
    aria-label="Back to notifications"
  >
    <polyline
      points="24,8 12,18 24,28"
      stroke="#3A2102"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ExternalIcon (unchanged, as it's a presentational SVG)
const ExternalIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="External link"
  >
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      stroke="#2d1101"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="15 3 21 3 21 9"
      stroke="#2d1101"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="10"
      x2="21"
      y1="14"
      y2="3"
      stroke="#2d1101"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Notification = {
  id: number;
  icon: React.ReactNode;
  text: string;
  dateObj: Date;
  time?: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    icon: <PackageCheck size={32} strokeWidth={1.5} color="#c0a591" />,
    text: "Your order of potatoes (10kg) has been confirmed",
    dateObj: new Date("2025-06-10T16:25:00"),
    unread: true,
  },
  {
    id: 2,
    icon: <Clock size={32} strokeWidth={1.5} color="#c0a591" />,
    text: "Tomatoes will arrive at your location by 10:00pm Today",
    dateObj: new Date("2025-06-09T16:20:00"),
    unread: true,
  },
  {
    id: 3,
    icon: <Users size={32} strokeWidth={1.5} color="#c0a591" />,
    text: "Salary due in 5 days",
    dateObj: new Date("2025-06-08T15:45:00"),
    unread: false,
  },
  {
    id: 4,
    icon: <AlertTriangle size={32} strokeWidth={1.5} color="#c0a591" />,
    text: "Bell Pepper is out of stock! Reorder",
    dateObj: new Date("2025-06-03T14:30:00"),
    unread: false,
  },
  {
    id: 5,
    icon: <Users size={32} strokeWidth={1.5} color="#c0a591" />,
    text: "   Heavy rush with 120+ customers",
    dateObj: new Date("2025-05-10T13:25:00"),
    unread: true,
  },
];

function formatTime(dateObj: Date): string {
  let hour = dateObj.getHours();
  const min = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min}${ampm}`;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" },
  { label: "ThisWeek", value: "ThisWeek" },
  { label: "ThisMonth", value: "ThisMonth" },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const filterButtonRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    return () => {
      if (dropdownTimeout) clearTimeout(dropdownTimeout);
    };
  }, [dropdownTimeout]);

  useEffect(() => {
    setNotifications(
      initialNotifications.map((n) => ({
        ...n,
        time: formatTime(n.dateObj),
        dateObj: n.dateObj,
      }))
    );
  }, []);

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
    setSelectionMode(false);
  };

  const handleNotificationClick = (
    id: number,
    unread: boolean,
    text: string,
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (selectionMode) {
      setSelectedNotifications((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return;
    }
    setActiveDropdown(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownTimeout(
      setTimeout(() => setActiveDropdown(null), 2000) as ReturnType<
        typeof setTimeout
      >
    );
  };

  const handleNotificationDoubleClick = (
    id: number,
    unread: boolean,
    text: string,
    e: MouseEvent<HTMLDivElement>
  ) => {
    setSelectionMode(true);
    setSelectedNotifications([id]);
    setActiveDropdown(null);
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedNotifications([]);
  };

  const filterByDate = (n: Notification): boolean => {
    const now = new Date("2025-06-10T00:30:00"); // For demo/testing; use `new Date()` in production
    const notificationDate = new Date(n.dateObj);

    switch (filter) {
      case "Today":
        return notificationDate.toDateString() === now.toDateString();
      case "Yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return notificationDate.toDateString() === yesterday.toDateString();
      case "ThisWeek":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(
          now.getDay() === 0
            ? now.getDate() - 6
            : now.getDate() - (now.getDay() - 1)
        );
        startOfWeek.setHours(0, 0, 0, 0);
        return notificationDate.getTime() >= startOfWeek.getTime();
      case "ThisMonth":
        return (
          notificationDate.getMonth() === now.getMonth() &&
          notificationDate.getFullYear() === now.getFullYear()
        );
      default:
        return true;
    }
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.text.toLowerCase().includes(searchTerm.toLowerCase()) && filterByDate(n)
  );

  const notificationBlockMarginBottom = 16;
  const notificationButtonLeft = 90;
  const notificationBlockPaddingBottom = 24;
  const fiveOfFiveBottom = 14;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        fontFamily: "Calibri, Arial, sans-serif",
        overflow: "hidden",
        width: "100vw",
        position: "relative",
      }}
    >
      {/* Notification Section Block */}
      <div
        style={{
          margin: `140px 0 ${notificationBlockMarginBottom}px 25px`,
          background: "#fcfaf8",
          borderRadius: 18,
          position: "relative",
          overflow: "hidden",
          paddingBottom: notificationBlockPaddingBottom,
          boxShadow: "0 5px 25px 5px rgba(180,140,80,0.15)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100vw - 100px)",
          maxWidth: 1400,
          border: "1px solid #ede6dd",
          display: "flex",
          flexDirection: "column",
          opacity: 1,
          pointerEvents: "auto",
        }}
      >
        {/* Section Content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Section 1: Search and Filter */}
          <div
            style={{
              boxShadow: "0 5px 12px -2px rgba(180, 140, 80, 0.3)",
              borderBottom: "none",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "0.75rem",
              gap: "1rem",
              flexWrap: "wrap",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              paddingTop: "1.5rem",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              style={{
                fontFamily: "Calibri, Arial, sans-serif",
                background: "#fcfaf8",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #7B3F00",
                width: 230,
                color: "#7B3F00",
              }}
              aria-label="Search notifications"
            />
            <div
              style={{
                position: "relative",
                overflow: "visible",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginLeft: "auto",
              }}
            >
              <div
                ref={filterButtonRef}
                onClick={() => setShowFilterDropdown((prev) => !prev)}
                style={{
                  fontFamily: "Calibri, Arial, sans-serif",
                  position: "relative",
                  zIndex: 99,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #7B3F00",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 1rem",
                  background: "#fcfaf8",
                  color: "#7B3F00",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                aria-label="Open filter options"
              >
                Search by Filter <span style={{ marginLeft: 4 }}>▾</span>
                {showFilterDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      minWidth: "100%",
                      background: "#fff",
                      border: "1.5px solid #7B3F00",
                      boxShadow: "0 2px 16px 2px #e2d5c0",
                      zIndex: 2000,
                      borderRadius: 6,
                      marginTop: 4,
                    }}
                  >
                    {filterOptions.map((opt) => (
                      <div
                        key={opt.value}
                        style={{
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          fontFamily: "Calibri, Arial, sans-serif",
                          fontSize: "1rem",
                          color: "#7B3F00",
                        }}
                        onClick={() => {
                          setFilter(opt.value);
                          setShowFilterDropdown(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #7B3F00",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 1rem",
                  background: "#fcfaf8",
                  color: "#7B3F00",
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: "1rem",
                }}
              >
                <Clock size={18} style={{ marginRight: 8 }} />
                {filterOptions.find((opt) => opt.value === filter)?.label ||
                  "All"}
              </div>
            </div>
          </div>

          {/* Section 2: Tabs and Actions */}
          <div
            style={{
              boxShadow: "inset 0 -1.5px 0 0 #e1d3c2",
              borderBottom: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "0.5rem",
              paddingTop: "0.25rem",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                fontWeight: 600,
                color: "#7B3F00",
              }}
            >
              <span
                style={{
                  color: "#000",
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: "1.38rem",
                }}
              >
                All{" "}
                <span style={{ color: "#ef4444" }}>
                  ({notifications.length})
                </span>
              </span>
              <span
                style={{
                  color: "#6b7280",
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: "1.13rem",
                }}
              >
                Unread({notifications.filter((n) => n.unread).length})
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <button
                style={{
                  fontFamily: "Calibri, Arial, sans-serif",
                  fontSize: "1rem",
                  color: "#4b5563",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={markAllAsRead}
                aria-label="Mark all as read"
              >
                Mark all as read
              </button>
              <button
                style={{
                  padding: "0.75rem",
                  borderRadius: "100vw",
                  border: "1px solid",
                  borderColor:
                    selectedNotifications.length > 0 ? "#7B3F00" : "#e1d3c2",
                  boxShadow: "0 1px 2px 0 #e1d3c2",
                  color: selectedNotifications.length > 0 ? "#fff" : "#bfa99a",
                  background:
                    selectedNotifications.length > 0 ? "#7B3F00" : "#f7f4ef",
                  cursor:
                    selectedNotifications.length > 0
                      ? "pointer"
                      : "not-allowed",
                  opacity: selectedNotifications.length > 0 ? 1 : 0.5,
                  transition: "all 0.3s",
                }}
                onClick={deleteSelected}
                disabled={selectedNotifications.length === 0}
                title={
                  selectedNotifications.length === 0
                    ? "Select notification(s) to delete"
                    : "Delete selected"
                }
                aria-label="Delete selected notifications"
              >
                <Trash2 size={22} />
              </button>
            </div>
          </div>

          {/* Section 3: Notifications List (Scrollable) */}
          <div
            style={{
              overflowY: "auto",
              paddingBottom: 0,
              minHeight: 0,
              maxHeight: 500,
            }}
          >
            {filteredNotifications.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "1.125rem",
                  padding: "2.5rem 0",
                  fontFamily: "Calibri, Arial, sans-serif",
                }}
              >
                No notifications found.
              </div>
            )}
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={(e) =>
                  handleNotificationClick(n.id, n.unread, n.text, e)
                }
                onDoubleClick={(e) =>
                  handleNotificationDoubleClick(n.id, n.unread, n.text, e)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  transition: "background 0.2s",
                  cursor: "pointer",
                  position: "relative",
                  minHeight: 60,
                  background:
                    selectedNotifications.includes(n.id) && selectionMode
                      ? "#f9ede3"
                      : n.unread
                      ? "#F7F2EB"
                      : "#fcfaf8",
                  borderBottom: "1.7px solid #e1d3c2",
                  boxSizing: "border-box",
                }}
                aria-label={`Notification: ${n.text}`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      color: "#7B3F00",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {n.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "16.5px",
                        color: "#473326",
                        fontWeight: 400,
                        fontFamily: "Calibri, Arial, sans-serif",
                      }}
                    >
                      {n.text}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "#473326",
                        fontWeight: 400,
                        marginTop: 4,
                        fontFamily: "Calibri, Arial, sans-serif",
                      }}
                    >
                      {n.time}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(
                      `Navigating to external link for notification: ${n.text}`
                    );
                  }}
                  title="View details"
                  aria-label={`View details for ${n.text}`}
                  style={{
                    marginRight: 16,
                    marginLeft: 8,
                    height: "100%",
                    alignItems: "center",
                    display: "flex",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                    borderRadius: "100vw",
                    padding: "0.5rem",
                    transition: "background 0.15s",
                  }}
                >
                  <ExternalIcon />
                </button>
                {activeDropdown === n.id && (
                  <div
                    style={{
                      position: "absolute",
                      left: 80,
                      top: "100%",
                      marginTop: 8,
                      minWidth: 280,
                      background: "#fff",
                      border: "1px solid #d7cabe",
                      borderRadius: 12,
                      boxShadow: "0 4px 18px 0 rgba(180,140,80,0.12)",
                      padding: "18px 22px",
                      color: "#473326",
                      fontSize: 16,
                      fontFamily: "Calibri, Arial, sans-serif",
                      zIndex: 99,
                      animation: "fadeIn 0.15s",
                    }}
                    aria-live="polite"
                  >
                    <span style={{ fontWeight: 600, color: "#7B3F00" }}>
                      Here is the message:
                    </span>
                    <div
                      style={{
                        fontWeight: 400,
                        marginTop: 5,
                        color: "#3d3126",
                      }}
                    >
                      {n.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {selectionMode && (
            <div
              style={{
                position: "absolute",
                top: 5,
                right: 40,
                zIndex: 100,
                background: "#fff9ed",
                border: "1px solid #e1d3c2",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 15,
                color: "#7B3F00",
                boxShadow: "0 2px 8px 0 rgba(180,140,80,0.07)",
                cursor: "pointer",
              }}
              onClick={exitSelectionMode}
              title="Exit selection mode"
              aria-label="Exit selection mode"
            >
              Exit selection mode
            </div>
          )}
        </div>
      </div>

      {/* Bottom right: X of Y items */}
      <div
        style={{
          position: "fixed",
          right: 52,
          bottom: fiveOfFiveBottom,
          fontFamily: "Calibri, Arial, sans-serif",
          fontSize: 13,
          color: "#000000",
          fontWeight: 400,
          textAlign: "right",
          zIndex: 99,
          background: "transparent",
          letterSpacing: "0.03em",
          pointerEvents: "none",
        }}
      >
        {filteredNotifications.length} of {notifications.length} items
      </div>
    </div>
  );
};

export default NotificationsPage;
