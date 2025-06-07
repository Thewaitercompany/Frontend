import React, { useState, useEffect } from 'react';
import {
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
} from 'lucide-react';

// Sidebar icons as custom SVGs, matching your Figma image (Image 9)
// Each icon is a React component, order as in the image (top to bottom)
const SidebarIconsFigma = [
  // 1. User - Added a circle around the person icon
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke="#F1EBE6" strokeWidth="1.8"/> {/* Outer circle */}
      <circle cx="14" cy="10" r="4.2" stroke="#F1EBE6" strokeWidth="1.8"/> {/* Original head */}
      <path d="M6.2 21c.1-3.2 3.3-5.2 7.8-5.2 4.5 0 7.7 2 7.8 5.2" stroke="#F1EBE6" strokeWidth="1.8" strokeLinecap="round"/> {/* Original body */}
    </svg>
  ),
  // 2. Chart line
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5.5" y="5.5" width="17" height="17" rx="4.1" stroke="#F1EBE6" strokeWidth="1.8"/>
      <path d="M8.7 18.2 13 13l3.2 3.2 4.1-4.9" stroke="#F1EBE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 3. Table/stand
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="9.5" rx="7.3" ry="2.8" stroke="#F1EBE6" strokeWidth="1.8"/>
      <path d="M14 12.2v5.2m0 5.2v-3.6" stroke="#F1EBE6" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  // 4. Envelope/Document with lines
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6.2" y="7.5" width="15.6" height="13" rx="2.2" stroke="#F1EBE6" strokeWidth="1.8"/>
      <path d="M6.2 10.1l7.8 5.2 7.8-5.2" stroke="#F1EBE6" strokeWidth="1.8"/>
      <path d="M9.8 16.2h8.4" stroke="#F1EBE6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // 5. Hex with bars
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5.6 22 10.6v6.8l-8 5-8-5v-6.8L14 5.6Z" stroke="#F1EBE6" strokeWidth="1.8"/>
      <rect x="11" y="13" width="2" height="4" rx="1" fill="#F1EBE6"/>
      <rect x="15" y="10" width="2" height="7" rx="1" fill="#F1EBE6"/>
    </svg>
  ),
  // 6. Clipboard with check - Adjusted viewBox and path for better centering
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="8.2" y="6.7" width="11.6" height="16.1" rx="2.2" stroke="#F1EBE6" strokeWidth="1.8"/>
      <rect x="11" y="4.3" width="6" height="3.2" rx="1.6" stroke="#F1EBE6" strokeWidth="1.5"/>
      {/* Adjusted tick mark path for better centering */}
      <path d="m11.5 15.5 2.5 2.5 4-5" stroke="#F1EBE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 7. Bar chart/analytics - Updated to match the new image
  () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5.5" y="5.5" width="17" height="17" rx="2.5" stroke="#F1EBE6" strokeWidth="1.8"/>
      <rect x="9.5" y="10.5" width="2" height="8" fill="#F1EBE6"/>
      <rect x="12.5" y="13.5" width="2" height="5" fill="#F1EBE6"/>
      <rect x="15.5" y="11.5" width="2" height="7" fill="#F1EBE6"/>
    </svg>
  ),
];


// Notification External icon
const ExternalIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    style={{
      display: 'block',
      color: '#4A3C36',
    }}
  >
    <rect x="4.2" y="1.2" width="16" height="14" rx="2" stroke="#4A3C36" strokeWidth="2"/>
    <path d="M13 4.5H17.5V9" stroke="#4A3C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 4.5L10 12" stroke="#4A3C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const initialNotifications = [
  {
    id: 1,
    icon: <PackageCheck size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Your order of potatoes (10kg) has been confirmed',
    dateObj: new Date(),
    unread: true,
  },
  {
    id: 2,
    icon: <Clock size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Tomatoes will arrive at your location by 10:00pm Today',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 1)),
    unread: true,
  },
  {
    id: 3,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Salary due in 5 days',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 2)),
    unread: true,
  },
  {
    id: 4,
    icon: <AlertTriangle size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Bell Pepper is out of stock! Reorder',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 7)),
    unread: false,
  },
  {
    id: 5,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: '  Heavy rush with 120+ customers',
    dateObj: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    unread: false,
  },
];

function formatDayDate(dateObj) {
  const d = dateObj;
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';
  return `${dayName} ${day}${suffix} ${month}`;
}
function formatTime(dateObj) {
  let hour = dateObj.getHours();
  const min = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min}${ampm}`;
}
function formatFancyDate(d) {
  return `${formatDayDate(d)} ${formatTime(d)}`;
}

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationPanel, setShowNotificationPanel] = useState(true);
  const [filter, setFilter] = useState('all');
  const [logoError, setLogoError] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [currentTimeObj, setCurrentTimeObj] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Use state for logoSrc and handle errors gracefully
  const [logoSrc, setLogoSrc] = useState(null);
  useEffect(() => {
    try {
      setLogoSrc(require('./Screenshot 2025-06-07 171759.png'));
    } catch (err) {
      setLogoError(true);
    }
  }, []);

  useEffect(() => {
    setNotifications(
      initialNotifications.map(n => ({
        ...n,
        time: formatTime(n.dateObj),
        dateDay: formatDayDate(n.dateObj),
        dateObj: n.dateObj
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeObj(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fancyTimeStr = formatFancyDate(currentTimeObj);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
    setSelectionMode(false);
  };

  const handleNotificationClick = (id, unread, text, e) => {
    if (selectionMode) {
      setSelectedNotifications(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
      return;
    }
    setActiveDropdown(id);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownTimeout(setTimeout(() => setActiveDropdown(null), 2000));
  };

  const handleNotificationDoubleClick = (id, unread, text, e) => {
    setSelectionMode(true);
    setSelectedNotifications([id]);
    setActiveDropdown(null);
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedNotifications([]);
  };

  const filterByDate = n => {
    const now = new Date();
    const notificationDate = new Date(n.dateObj);
    const diff = (now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24);

    switch (filter) {
      case 'Today': return notificationDate.toDateString() === now.toDateString();
      case 'Yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return notificationDate.toDateString() === yesterday.toDateString();
      case 'ThisWeek':
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
        startOfWeek.setHours(0, 0, 0, 0);
        return notificationDate.getTime() >= startOfWeek.getTime();
      case 'ThisMonth':
        return notificationDate.getMonth() === now.getMonth() && notificationDate.getFullYear() === now.getFullYear();
      default: return true;
    }
  };

  const filteredNotifications = notifications.filter(n =>
    n.text.toLowerCase().includes(searchTerm.toLowerCase()) && filterByDate(n)
  );

  const handleSelectAll = () => {
    const unreadFilteredIds = filteredNotifications.filter(n => n.unread).map(n => n.id);
    if (selectedNotifications.length === unreadFilteredIds.length && unreadFilteredIds.every(id => selectedNotifications.includes(id))) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(unreadFilteredIds);
    }
  };

  const toggleNotificationPanel = () => {
    setShowNotificationPanel(prev => !prev);
    setSelectionMode(false);
    setSelectedNotifications([]);
  };

  return (
    <div className="flex h-screen bg-[#F0EBDE] overflow-hidden" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Sidebar - Increased width */}
      <div className="flex flex-col items-center"
        style={{
          width: 60, // Increased width for the brown bar
          background: "#bfa99a",
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28,
          minHeight: "calc(100vh - 140px - 120px)",
          marginTop: 140,
          marginBottom: 120,
          position: 'fixed',
          left: 0,
          zIndex: 10,
          boxShadow: '0 1px 8px 0 rgba(200,170,140,0.04)'
        }}
      >
        <div className="flex flex-col items-center gap-4 mt-2" style={{ paddingTop: '10px' }}>
          {SidebarIconsFigma.map((IconComp, idx) => (
            <span key={idx} className="my-1 flex items-center justify-center" style={{
              width: 36, height: 36
            }}>
              <IconComp />
            </span>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20,
        width: 400,
        height: 130,
        display: 'flex',
        alignItems: 'flex-start',
        pointerEvents: 'none'
      }}>
        {logoSrc && !logoError && (
          <img
            src={logoSrc}
            alt="Smart Cafe Logo"
            className="object-contain"
            style={{
              maxHeight: 130,
              maxWidth: 400,
              width: 'auto',
              height: 'auto',
              display: 'block'
            }}
          />
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative" style={{ marginLeft: 60 /* Adjusted margin for wider sidebar */ }}>
        {/* Top right: Date/time, then bell */}
        <div
          className="flex flex-col items-end"
          style={{
            position: 'fixed',
            top: 28,
            right: 60,
            zIndex: 30,
            alignItems: 'flex-end'
          }}
        >
          <span
            className="font-medium"
            style={{
              color: '#7B3F00',
              fontSize: 26,
              fontFamily: 'Calibri, Arial, sans-serif',
              marginBottom: 5,
              letterSpacing: 0.2
            }}
          >
            {fancyTimeStr}
          </span>
          <div className="relative cursor-pointer mt-1" onClick={toggleNotificationPanel}>
            {/* Solid black bell */}
            <svg width={34} height={34} viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16V11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11V16L2 18V19H20V18L18 16Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22C9.55228 22 10 21.5523 10 21H8C8 21.5523 8.44772 22 9 22Z" fill="black"/>
              <path d="M15 22C15.5523 22 16 21.5523 16 21H14C14 21.5523 14.4477 22 15 22Z" fill="black"/>
            </svg>
            {notifications.some(n => n.unread) && (
              <span className="absolute -top-1.5 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
            )}
          </div>
        </div>

        {/* Notification Button / Toggle Panel - Repositioned and resized */}
        {showNotificationPanel && (
          <button
            className="text-black font-bold flex items-center gap-1 cursor-pointer transition-all duration-300 hover:text-[#7B3F00] absolute"
            style={{
              fontWeight: 700,
              letterSpacing: 0.1,
              fontFamily: 'Calibri, Arial, sans-serif',
              top: 100, // Adjusted top position to be above the panel
              left: 24, // Adjusted left position to be on the edge of the panel - Changed from 72 to 24
              zIndex: 22,
              background: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: 26, // Increased font size
              outline: 'none',
            }}
            onClick={toggleNotificationPanel}
          >
            <svg
              width="30" // Increased SVG width
              height="30" // Increased SVG height
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <path d="M15 18L9 12L15 6" />
            </svg>
            Notification
          </button>
        )}

        {/* Notification Section Block - Shortened width and adjusted margin */}
        <div
          className={`
            bg-white
            w-[calc(93vw-72px)] xl:w-[1380px] /* Shortened width */
            flex flex-col
            transition-opacity duration-300
            ${showNotificationPanel
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
            }
            border border-[#ede6dd]
          `}
          style={{
            margin: "140px 0 20px 24px", /* Adjusted left margin to align with button */
            background: '#fff',
            borderRadius: 18,
            position: "relative",
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Section Content */}
          <div className="flex flex-col h-full">
            {/* Section 1: Search and Filter */}
            <div className="flex justify-between items-center border-b pb-3 gap-4 flex-wrap px-7 pt-7">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-white text-base px-4 py-2 rounded-md border border-[#7B3F00] w-[230px] text-[#7B3F00]"
                style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
              />
              <div className="relative flex items-center gap-3 ml-auto">
                <div
                  className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-white text-[#7B3F00] cursor-pointer text-base"
                  onClick={() => setShowFilterDropdown(prev => !prev)}
                  style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
                >
                  Search by Filter <span className="ml-1">▾</span>
                </div>
                {showFilterDropdown && (
                  <div className="absolute top-12 right-0 bg-white border border-[#7B3F00] shadow z-10">
                    {['Today', 'Yesterday', 'ThisWeek', 'ThisMonth', 'All'].map(opt => (
                      <div
                        key={opt}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base text-[#7B3F00]"
                        style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
                        onClick={() => { setFilter(opt); setShowFilterDropdown(false); }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-white text-[#7B3F00] text-base" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
                  <Clock size={18} className="mr-2" />
                  {filter !== 'all' ? filter : 'Today'}
                </div>
              </div>
            </div>

            {/* Section 2: Tabs and Actions */}
            <div className="flex justify-between items-center border-b pb-2 pt-2 px-7">
              <div className="flex items-center gap-8 font-semibold text-[#7B3F00]">
                <span className="text-black" style={{ fontFamily: 'Calibri, Arial, sans-serif', fontSize: '1.38rem' }}>
                  All <span className="text-red-500">({notifications.length})</span>
                </span>
                <span className="text-gray-500" style={{ fontFamily: 'Calibri, Arial, sans-serif', fontSize: '1.13rem' }}>
                  Unread({notifications.filter(n => n.unread).length})
                </span>
              </div>
              <div className="flex items-center gap-8">
                <button className="text-base text-gray-600 hover:underline" style={{ fontFamily: 'Calibri, Arial, sans-serif' }} onClick={markAllAsRead}>
                  Mark all as read
                </button>
                <button
                  className={`p-3 rounded-full border border-[#e1d3c2] shadow transition duration-300`}
                  style={{
                    color: selectedNotifications.length > 0 ? '#fff' : '#bfa99a',
                    background: selectedNotifications.length > 0 ? '#7B3F00' : '#f7f4ef',
                    borderColor: selectedNotifications.length > 0 ? '#7B3F00' : '#e1d3c2',
                    cursor: selectedNotifications.length > 0 ? 'pointer' : 'not-allowed',
                    opacity: selectedNotifications.length > 0 ? 1 : 0.5
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
            <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '1px' }}>
              {filteredNotifications.length === 0 && (
                <div className="text-center text-gray-400 text-lg py-10" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>No notifications found.</div>
              )}
              {filteredNotifications.map(n => (
                <div
                  key={n.id}
                  onClick={e => handleNotificationClick(n.id, n.unread, n.text, e)}
                  onDoubleClick={e => handleNotificationDoubleClick(n.id, n.unread, n.text, e)}
                  className={`
                    flex items-center justify-between p-3 border-t border-[#e1d3c2] transition duration-200 cursor-pointer relative
                    ${n.unread ? 'bg-[#f6f2ec]' : 'bg-white'} hover:bg-gray-200 group
                    ${selectedNotifications.includes(n.id) && selectionMode ? 'ring-2 ring-[#7B3F00] ring-inset' : ''}
                  `}
                  style={{
                    minHeight: 60,
                    background: selectedNotifications.includes(n.id) && selectionMode
                      ? '#f9ede3'
                      : n.unread
                        ? '#f6f2ec'
                        : '#fff',
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
                      <div className="text-[16.5px] text-[#473326] font-[400]" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>{n.text}</div>
                      <div className="text-[15px] text-[#bfa99a] font-normal mt-1" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
                        {n.dateDay} | {n.time}
                      </div>
                    </div>
                  </div>
                  {/* Figma-correct External/Open icon */}
                  <span
                    className="ml-3 flex items-center"
                    style={{
                      marginRight: 16,
                      marginLeft: 8,
                      height: "100%",
                      alignItems: "center",
                      display: "flex"
                    }}
                  >
                    <ExternalIcon />
                  </span>
                  {/* Dropdown for message */}
                  {activeDropdown === n.id && (
                    <div style={{
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
                      fontFamily: 'Calibri, Arial, sans-serif',
                      zIndex: 99,
                      animation: "fadeIn 0.15s"
                    }}>
                      <span style={{ fontWeight: 600, color: "#7B3F00" }}>Here is the message:</span>
                      <div style={{ fontWeight: 400, marginTop: 5, color: "#3d3126" }}>
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
                  cursor: "pointer"
                }}
                onClick={exitSelectionMode}
                title="Exit selection mode"
              >
                Exit selection mode
              </div>
            )}
          </div>
        </div>

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
              textAlign: "center"
            }}
          >
            Dashboard is empty for now.
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
