"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
  RefObject,
} from "react";
import {
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";

// Bell icon (with red badge)
const BellIcon: React.FC<{ unreadCount: number }> = ({ unreadCount }) => (
  <svg
    width={36}
    height={33}
    viewBox="0 0 36 33"
    fill="none"
    style={{ position: "relative", display: "block" }}
  >
    <ellipse cx="18" cy="5" rx="5.5" ry="3.2" fill="#3A2102" />
    <path
      d="M28 18V13C28 8.477 23.523 4 18 4C12.477 4 8 8.477 8 13V18L5 23V24.5H31V23L28 18Z"
      stroke="#3A2102"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#3A2102"
    />
    <circle cx="18" cy="29" r="2.7" fill="#3A2102" />
    {unreadCount > 0 && (
      <g>
        <circle
          cx="30.5"
          cy="7.5"
          r="7"
          fill="#d82c2c"
          stroke="#fff"
          strokeWidth="2"
        />
        <text
          x="30.5"
          y="7.5"
          textAnchor="middle"
          alignmentBaseline="middle"
          dominantBaseline="middle"
          fontFamily="Calibri, Arial, sans-serif"
          fontWeight="bold"
          fontSize="12"
          fill="#fff"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {unreadCount}
        </text>
      </g>
    )}
  </svg>
);

const NotificationArrow: React.FC = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ display: "block" }}
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

const ExternalIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
    icon: <PackageCheck size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: "Your order of potatoes (10kg) has been confirmed",
    dateObj: new Date("2025-06-10T16:25:00"),
    unread: true,
  },
  {
    id: 2,
    icon: <Clock size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: "Tomatoes will arrive at your location by 10:00pm Today",
    dateObj: new Date("2025-06-09T16:20:00"),
    unread: true,
  },
  {
    id: 3,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: "Salary due in 5 days",
    dateObj: new Date("2025-06-08T15:45:00"),
    unread: false,
  },
  {
    id: 4,
    icon: <AlertTriangle size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: "Bell Pepper is out of stock! Reorder",
    dateObj: new Date("2025-06-03T14:30:00"),
    unread: false,
  },
  {
    id: 5,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
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

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const filterButtonRef = useRef<HTMLDivElement | null>(null);

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
      setTimeout(() => setActiveDropdown(null), 2000) as ReturnType<typeof setTimeout>
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
    const now = new Date("2025-06-10T00:30:00");
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
          now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
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

  const unreadCount = notifications.filter((n) => n.unread).length;

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
      {/* Top right: bell */}
      <div
        style={{
          position: "fixed",
          top: 70,
          right: 40,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 17,
        }}
      >
        <div
          className="relative cursor-pointer"
          onClick={() => setShowNotificationPanel((v) => !v)}
          style={{ marginTop: 3 }}
        >
          <BellIcon unreadCount={unreadCount} />
        </div>
      </div>

      {/* <Notifications button */}
      {showNotificationPanel && (
        <button
          className="flex items-center gap-0 cursor-pointer transition-all duration-300"
          style={{
            color: "#3A2102",
            background: "transparent",
            fontWeight: 400,
            letterSpacing: 0.1,
            fontFamily: "Times New Roman, Times, serif",
            top: 97,
            left: notificationButtonLeft,
            zIndex: 22,
            border: "none",
            padding: 0,
            fontSize: 26,
            outline: "none",
            borderRadius: 8,
            position: "absolute",
            transition: "top 0.2s",
          }}
          onClick={() => setShowNotificationPanel(false)}
        >
          <NotificationArrow />
          <span
            style={{
              fontFamily: "Times New Roman, Times, serif",
              color: "#3A2102",
              fontWeight: 400,
              paddingLeft: 2,
            }}
          >
            Notifications
          </span>
        </button>
      )}
      {/* Notification Section Block */}
      {showNotificationPanel && (
        <div
          className={`
            w-[calc(93vw-72px + 20px)] xl:w-[1400px]
            flex flex-col
            transition-opacity duration-300
            opacity-100 pointer-events-auto
            border border-[#ede6dd]
          `}
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
          }}
        >
          {/* Section Content */}
          <div className="flex flex-col">
            {/* Section 1: Search and Filter */}
            <div
              className="flex justify-between items-center pb-3 gap-4 flex-wrap px-7 pt-6"
              style={{
                boxShadow: "0 5px 12px -2px rgba(180, 140, 80, 0.3)",
                borderBottom: "none",
                position: "relative",
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="bg-[#fcfaf8] text-base px-4 py-2 rounded-md border border-[#7B3F00] w-[230px] text-[#7B3F00]"
                style={{ fontFamily: "Calibri, Arial, sans-serif" }}
              />
              <div
                className="relative flex items-center gap-3 ml-auto"
                style={{ position: "relative", overflow: "visible" }}
              >
                <div
                  ref={filterButtonRef}
                  className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-[#fcfaf8] text-[#7B3F00] cursor-pointer text-base"
                  onClick={() => setShowFilterDropdown((prev) => !prev)}
                  style={{
                    fontFamily: "Calibri, Arial, sans-serif",
                    position: "relative",
                    zIndex: 99,
                  }}
                >
                  Search by Filter <span className="ml-1">▾</span>
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
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base text-[#7B3F00]"
                          style={{
                            fontFamily: "Calibri, Arial, sans-serif",
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
                  className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-[#fcfaf8] text-[#7B3F00] text-base"
                  style={{ fontFamily: "Calibri, Arial, sans-serif" }}
                >
                  <Clock size={18} className="mr-2" />
                  {filterOptions.find((opt) => opt.value === filter)?.label ||
                    "All"}
                </div>
              </div>
            </div>

            {/* Section 2: Tabs and Actions */}
            <div
              className="flex justify-between items-center pb-2 pt-1 px-7"
              style={{
                boxShadow: "inset 0 -1.5px 0 0 #e1d3c2",
                borderBottom: "none",
              }}
            >
              <div className="flex items-center gap-8 font-semibold text-[#7B3F00]">
                <span
                  className="text-black"
                  style={{
                    fontFamily: "Calibri, Arial, sans-serif",
                    fontSize: "1.38rem",
                  }}
                >
                  All{" "}
                  <span className="text-red-500">
                    ({notifications.length})
                  </span>
                </span>
                <span
                  className="text-gray-500"
                  style={{
                    fontFamily: "Calibri, Arial, sans-serif",
                    fontSize: "1.13rem",
                  }}
                >
                  Unread({notifications.filter((n) => n.unread).length})
                </span>
              </div>
              <div className="flex items-center gap-8">
                <button
                  className="text-base text-gray-600 hover:underline"
                  style={{ fontFamily: "Calibri, Arial, sans-serif" }}
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
                <button
                  className="p-3 rounded-full border border-[#e1d3c2] shadow transition duration-300"
                  style={{
                    color:
                      selectedNotifications.length > 0
                        ? "#fff"
                        : "#bfa99a",
                    background:
                      selectedNotifications.length > 0
                        ? "#7B3F00"
                        : "#f7f4ef",
                    borderColor:
                      selectedNotifications.length > 0
                        ? "#7B3F00"
                        : "#e1d3c2",
                    cursor:
                      selectedNotifications.length > 0
                        ? "pointer"
                        : "not-allowed",
                    opacity: selectedNotifications.length > 0 ? 1 : 0.5,
                  }}
                  onClick={deleteSelected}
                  disabled={selectedNotifications.length === 0}
                  title={
                    selectedNotifications.length === 0
                      ? "Select notification(s) to delete"
                      : "Delete selected"
                  }
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>

            {/* Section 3: Notifications List (Scrollable) */}
            <div
              className="overflow-y-auto"
              style={{
                paddingBottom: 0,
                minHeight: 0,
                maxHeight: 500,
              }}
            >
              {filteredNotifications.length === 0 && (
                <div
                  className="text-center text-gray-400 text-lg py-10"
                  style={{
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
                  className={`
                    flex items-center justify-between p-3 transition duration-200 cursor-pointer relative
                    ${
                      selectedNotifications.includes(n.id) && selectionMode
                        ? "ring-2 ring-[#7B3F00] ring-inset"
                        : ""
                    }
                  `}
                  style={{
                    minHeight: 60,
                    background:
                      selectedNotifications.includes(n.id) && selectionMode
                        ? "#f9ede3"
                        : n.unread
                        ? "#F7F2EB"
                        : "#fcfaf8",
                    borderBottom: "1.7px solid #e1d3c2",
                  }}
                >
                  <div className="flex items-center gap-5">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(n.id)}
                      readOnly
                      style={{ display: "none" }}
                    />
                    <div className="text-[#7B3F00] flex items-center">
                      {n.icon}
                    </div>
                    <div>
                      <div
                        className="text-[16.5px] text-[#473326] font-[400]"
                        style={{ fontFamily: "Calibri, Arial, sans-serif" }}
                      >
                        {n.text}
                      </div>
                      <div
                        className="text-[15px] text-[#473326] font-normal mt-1"
                        style={{ fontFamily: "Calibri, Arial, sans-serif" }}
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
                    className="ml-3 flex items-center p-2 rounded-full hover:bg-gray-100 transition duration-150"
                    title="View details"
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
              >
                Exit selection mode
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom right: X of Y items */}
      {showNotificationPanel && (
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
      )}

      {/* Dashboard Empty Message */}
      {!showNotificationPanel && (
        <div
          className="flex justify-center items-center w-full"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 32,
            color: "#bfa99a",
            fontWeight: 600,
            letterSpacing: 1.2,
            textAlign: "center",
          }}
        >
          {/* Just leave the bell */}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;