import React, { useState, useEffect } from 'react';
import {
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
} from 'lucide-react';

const SIDEBAR_ICON_SIZE = 40;
const SIDEBAR_ICON_COLOR = "#F1EBE6";
const SIDEBAR_ICON_GAP = 12;

// Sidebar icons as custom SVGs (Figma-accurate for icon 4: open book with bookmark)
const SidebarIconsFigma = [
  // 1. User
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <circle cx="14" cy="10" r="4.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M6.2 21c.1-3.2 3.3-5.2 7.8-5.2 4.5 0 7.7 2 7.8 5.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  // 2. Chart line
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <rect x="5.5" y="5.5" width="17" height="17" rx="4.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M8.7 18.2 13 13l3.2 3.2 4.1-4.9" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 3. Table/stand with "legs" (curve/thigh connection to center line)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="9.5" rx="7.3" ry="2.8" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <path d="M14 12.2v7" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 17.8c-1.5 1.2-2.2 2.2-2.2 2.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M14 17.8c1.5 1.2 2.2 2.2 2.2 2.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M11.8 20.4v2.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16.2 20.4v2.1" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  // 4. Book with bookmark (Figma-accurate, open book with center line and bookmark tab)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      {/* Book body */}
      <rect x="6.8" y="7.6" width="14.4" height="12.8" rx="2.2"
        stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.7" />
      {/* Bookmark tab */}
      <path d="M14 7.6v6.1l2-1 2 1V7.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* Book center fold */}
      <path d="M14 7.6v12.8" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  // 5. Hex with bars
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <path d="M14 5.6 22 10.6v6.8l-8 5-8-5v-6.8L14 5.6Z" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <rect x="11" y="13" width="2" height="4" rx="1" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="15" y="10" width="2" height="7" rx="1" fill={SIDEBAR_ICON_COLOR}/>
    </svg>
  ),
  // 6. Clipboard with check
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      <rect x="8.2" y="6.7" width="11.6" height="16.1" rx="2.2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      <rect x="11" y="4.3" width="6" height="3.2" rx="1.6" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.5"/>
      <path d="m11.5 15.5 2.5 2.5 4-5" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 7. Analytics (Figma-accurate layered bar chart)
  () => (
    <svg width={SIDEBAR_ICON_SIZE} height={SIDEBAR_ICON_SIZE} viewBox="0 0 28 28" fill="none">
      {/* Main chart base */}
      <rect x="5.5" y="5.5" width="17" height="17" rx="2.5" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.8"/>
      {/* Bars on main chart */}
      <rect x="9.5" y="10.5" width="2" height="8" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="12.5" y="13.5" width="2" height="5" fill={SIDEBAR_ICON_COLOR}/>
      <rect x="15.5" y="11.5" width="2" height="7" fill={SIDEBAR_ICON_COLOR}/>
      {/* Overlapping layer - smaller rectangle shifted */}
      <rect x="7.5" y="7.5" width="13" height="13" rx="2" stroke={SIDEBAR_ICON_COLOR} strokeWidth="1.2" opacity="0.6"/>
    </svg>
  ),
];
const BellIcon = ({ unreadCount }) => (
  <svg width={36} height={33} viewBox="0 0 36 33" fill="none" style={{ position: 'relative', display: "block" }}>
    <ellipse cx="18" cy="5" rx="5.5" ry="3.2" fill="#3A2102" />
    <path d="M28 18V13C28 8.477 23.523 4 18 4C12.477 4 8 8.477 8 13V18L5 23V24.5H31V23L28 18Z"
      stroke="#3A2102" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#3A2102" />
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

const NotificationArrow = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    style={{ display: 'block' }}
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

const ExternalIcon = () => (
  // Standard external link icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="#2d1101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="15 3 21 3 21 9" stroke="#2d1101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="10" x2="21" y1="14" y2="3" stroke="#2d1101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const initialNotifications = [
  {
    id: 1,
    icon: <PackageCheck size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Your order of potatoes (10kg) has been confirmed',
    // Figma: Tue 10 Jun 4:25PM
    dateObj: new Date('2025-06-10T16:25:00'),
    unread: true, // Now unread
  },
  {
    id: 2,
    icon: <Clock size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Tomatoes will arrive at your location by 10:00pm Today',
    // Figma: Mon 9 Jun 4:20PM
    dateObj: new Date('2025-06-09T16:20:00'),
    unread: true, // Now unread
  },
  {
    id: 3,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Salary due in 5 days',
    // Figma: Sun 8 Jun 3:45PM
    dateObj: new Date('2025-06-08T15:45:00'),
    unread: false, // Now read
  },
  {
    id: 4,
    icon: <AlertTriangle size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: 'Bell Pepper is out of stock! Reorder',
    // Figma: Tue 3 Jun 2:30PM
    dateObj: new Date('2025-06-03T14:30:00'),
    unread: false,
  },
  {
    id: 5,
    icon: <Users size={32} strokeWidth={1.5} className="text-[#c0a591]" />,
    text: '   Heavy rush with 120+ customers',
    // Figma: Sat 10 May 1:25PM
    dateObj: new Date('2025-05-10T13:25:00'),
    unread: true, // Now unread
  },
];

function formatDayDate(dateObj) {
  const d = dateObj;
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  let hour = d.getHours();
  const min = d.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${dayName} ${day} ${month} ${hour}:${min}${ampm}`;
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
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  let hour = d.getHours();
  const min = d.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'AM' : 'PM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${dayName} ${day} ${month} ${hour}:${min}${ampm}`;
}

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationPanel, setShowNotificationPanel] = useState(true);
  const [filter, setFilter] = useState('all');
  const [logoError, setLogoError] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  // Figma current time: Tue 10 Jun 12:30AM
  const [currentTimeObj, setCurrentTimeObj] = useState(new Date('2025-06-10T00:30:00'));
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const logoSrc = "/Screenshot 2025-06-07 171759.png";

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
    // Mark as read when clicked
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
    // Reference date for filtering now based on Figma's "current time"
    const now = new Date('2025-06-10T00:30:00'); // Consistent with Figma top right date
    const notificationDate = new Date(n.dateObj);

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

  // Sidebar icons vertical centering with equal bezels
  const sidebarIconCount = SidebarIconsFigma.length;
  const SIDEBAR_TOP_MARGIN = 160;
  const SIDEBAR_BOTTOM_MARGIN = 160;
  const barHeight = window.innerHeight - SIDEBAR_TOP_MARGIN - SIDEBAR_BOTTOM_MARGIN;
  const iconsTotalHeight = sidebarIconCount * SIDEBAR_ICON_SIZE + (sidebarIconCount - 1) * SIDEBAR_ICON_GAP;
  const equalBezelPadding = Math.max((barHeight - iconsTotalHeight) / 2, 0);

  // Live unread count for bell
  const unreadCount = notifications.filter(n => n.unread).length;

  // Notification block bezels
  // Reduced top bezel, block sits a bit lower overall.
  const notificationBlockMarginTop = 120; // reduced for shorter top bezel
  const notificationBlockMarginBottom = 16; // small bottom bezel
  const notificationButtonTop = 77; // adjust to match block position
  const notificationBlockPaddingBottom = 24; // compact bottom inside center block
  const fiveOfFiveBottom = 14; // move "5 of 5" further down for clear separation

  return (
    <div className="flex h-screen bg-[#F0EBDE] overflow-hidden" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Sidebar - brown with light pink tint, equal bezels */}
      <div className="flex flex-col items-center"
        style={{
          width: 60,
          background: "#b3878b",
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          minHeight: barHeight,
          marginTop: SIDEBAR_TOP_MARGIN,
          marginBottom: SIDEBAR_BOTTOM_MARGIN,
          position: 'fixed',
          left: 0,
          zIndex: 10,
          // Adjusted boxShadow for the subtle shadow line
          boxShadow: '2px 0 8px 0 rgba(180,140,80,0.2)', // Shadow to the right for the "line"
          justifyContent: "flex-start",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            paddingTop: equalBezelPadding,
            paddingBottom: equalBezelPadding,
            gap: SIDEBAR_ICON_GAP,
            height: '100%',
            justifyContent: 'center',
          }}
        >
          {SidebarIconsFigma.map((IconComp, idx) => (
            <span key={idx} className="flex items-center justify-center" style={{
              width: SIDEBAR_ICON_SIZE, height: SIDEBAR_ICON_SIZE
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
      <div className="flex-1 flex flex-col relative" style={{ marginLeft: 60 }}>
        {/* Top right: Date/time, then bell */}
        <div
          className="flex flex-col items-end"
          style={{
            position: 'fixed',
            top: 20, /* Moved up */
            right: 40, /* Moved right */
            zIndex: 30,
            alignItems: 'flex-end'
          }}
        >
          <span
            className="font-medium"
            style={{
              color: '#7B3F00',
              fontSize: 22, /* Made smaller */
              fontFamily: 'Calibri, Arial, sans-serif',
              marginBottom: 5,
              letterSpacing: 0.2
            }}
          >
            {fancyTimeStr}
          </span>
          <div className="relative cursor-pointer mt-1" onClick={toggleNotificationPanel}>
            <BellIcon unreadCount={unreadCount} />
          </div>
        </div>

        {/* <Notifications button */}
        {showNotificationPanel && (
          <button
            className="flex items-center gap-0 cursor-pointer transition-all duration-300"
            style={{
              color: '#3A2102',
              background: 'transparent',
              fontWeight: 400,
              letterSpacing: 0.1,
              fontFamily: 'Times New Roman, Times, serif',
              top: notificationButtonTop,
              left: 24,
              zIndex: 22,
              border: 'none',
              padding: 0,
              fontSize: 26,
              outline: 'none',
              borderRadius: 8,
              position: 'absolute',
              transition: 'top 0.2s'
            }}
            onClick={toggleNotificationPanel}
          >
            <NotificationArrow />
            <span style={{
              fontFamily: 'Times New Roman, Times, serif',
              color: '#3A2102',
              fontWeight: 400,
              paddingLeft: 2
            }}>
              Notifications
            </span>
          </button>
        )}

        {/* Notification Section Block */}
        <div
          className={`
            w-[calc(93vw-72px + 20px)] xl:w-[1400px]
            flex flex-col
            transition-opacity duration-300
            ${showNotificationPanel
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
            }
            border border-[#ede6dd]
          `}
          style={{
            margin: `${notificationBlockMarginTop}px 0 ${notificationBlockMarginBottom}px 24px`,
            background: '#fcfaf8',
            borderRadius: 18,
            position: "relative",
            overflow: 'hidden',
            paddingBottom: notificationBlockPaddingBottom,
            boxShadow: '0 5px 25px 5px rgba(180,140,80,0.15)',
          }}
        >
          {/* Section Content */}
          <div className="flex flex-col">
            {/* Section 1: Search and Filter */}
            <div
              className="flex justify-between items-center pb-3 gap-4 flex-wrap px-7 pt-6"
              style={{
                // MODIFIED SHADOW LINE HERE
                boxShadow: '0 5px 12px -2px rgba(180, 140, 80, 0.3)', /* Fades downwards, thicker, less wide at edges */
                borderBottom: 'none'
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-[#fcfaf8] text-base px-4 py-2 rounded-md border border-[#7B3F00] w-[230px] text-[#7B3F00]"
                style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
              />
              <div className="relative flex items-center gap-3 ml-auto">
                <div
                  className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-[#fcfaf8] text-[#7B3F00] cursor-pointer text-base"
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
                <div
                  className="flex items-center border border-[#7B3F00] rounded-md px-4 py-2 bg-[#fcfaf8] text-[#7B3F00] text-base"
                  style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
                >
                  <Clock size={18} className="mr-2" />
                  {filter !== 'all' ? filter : 'All'}
                </div>
              </div>
            </div>

            {/* Section 2: Tabs and Actions */}
            <div
              className="flex justify-between items-center pb-2 pt-1 px-7"
              style={{
                boxShadow: 'inset 0 -1.5px 0 0 #e1d3c2', /* Subtle crisp line for separation */
                borderBottom: 'none'
              }}
            >
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
            <div className="overflow-y-auto" style={{ paddingBottom: 0, minHeight: 0 }}>
              {filteredNotifications.length === 0 && (
                <div className="text-center text-gray-400 text-lg py-10" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>No notifications found.</div>
              )}
              {filteredNotifications.map((n, idx) => (
                <div
                  key={n.id}
                  onClick={e => handleNotificationClick(n.id, n.unread, n.text, e)}
                  onDoubleClick={e => handleNotificationDoubleClick(n.id, n.unread, n.text, e)}
                  className={`
                    flex items-center justify-between p-3 transition duration-200 cursor-pointer relative
                    ${selectedNotifications.includes(n.id) && selectionMode ? 'ring-2 ring-[#7B3F00] ring-inset' : ''}
                  `}
                  style={{
                    minHeight: 60,
                    background: selectedNotifications.includes(n.id) && selectionMode
                      ? '#f9ede3' // Selected background
                      : n.unread
                        ? '#F7F2EB' // Darker background for unread
                        : '#fcfaf8', // Original background for read
                    borderBottom: '1.7px solid #e1d3c2',
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
                      <div className="text-[15px] text-[#473326] font-normal mt-1" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>{/* Changed text color to dark brown */}
                        {n.dateDay}
                      </div>
                    </div>
                  </div>
                  {/* External link clickable button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); alert(`Navigating to external link for notification: ${n.text}`); }}
                    className="ml-3 flex items-center p-2 rounded-full hover:bg-gray-100 transition duration-150"
                    title="View details"
                    style={{
                      marginRight: 16,
                      marginLeft: 8,
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <ExternalIcon />
                  </button>
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

        {/* Bottom right: X of Y items - outside main block */}
        <div
          style={{
            position: 'fixed',
            right: 52,
            bottom: fiveOfFiveBottom,
            fontFamily: 'Calibri, Arial, sans-serif',
            fontSize: 13,
            color: '#000000',
            fontWeight: 400,
            textAlign: 'right',
            zIndex: 99,
            background: 'transparent',
            letterSpacing: '0.03em',
            pointerEvents: 'none'
          }}
        >
          {filteredNotifications.length} of {notifications.length} items
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