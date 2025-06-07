import React, { useState, useEffect } from 'react';
import {
  Bell,
  Trash2,
  PackageCheck,
  Clock,
  AlertTriangle,
  Users,
  Home,
  FileText,
  PieChart,
  Settings,
  User,
  Share2
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    icon: <PackageCheck size={20} />,
    text: 'Your order of potatoes (10kg) has been confirmed',
    dateObj: new Date(),
    unread: true,
  },
  {
    id: 2,
    icon: <Clock size={20} />,
    text: 'Tomatoes will arrive at your location by 10:00pm today',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 1)),
    unread: true,
  },
  {
    id: 3,
    icon: <Users size={20} />,
    text: 'Salary due in 5 days',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 2)),
    unread: true,
  },
  {
    id: 4,
    icon: <AlertTriangle size={20} />,
    text: 'Bell Pepper is out of stock! Reorder',
    dateObj: new Date(new Date().setDate(new Date().getDate() - 7)),
    unread: false,
  },
  {
    id: 5,
    icon: <Users size={20} />,
    text: 'Heavy rush with 120+ customers',
    dateObj: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    unread: false,
  },
];

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationPanel, setShowNotificationPanel] = useState(true);
  const [filter, setFilter] = useState('all');
  const [logoError, setLogoError] = useState(false);

  let logoSrc;
  try {
    logoSrc = require('./Screenshot 2025-06-07 171759.png');
  } catch (err) {
    logoSrc = null;
  }

  useEffect(() => {
    const updated = initialNotifications.map((n) => {
      const time = n.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = n.dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      return { ...n, time, date };
    });
    setNotifications(updated);
  }, []);

  const toggleSelection = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selected.includes(n.id)));
    setSelected([]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const currentFullDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
  });

  const filterByDate = (notif) => {
    const now = new Date();
    const notifDate = new Date(notif.dateObj);
    const diffTime = now - notifDate;
    const diffDays = diffTime / (1000 * 3600 * 24);

    switch (filter) {
      case 'today':
        return notifDate.toDateString() === now.toDateString();
      case 'yesterday':
        return diffDays <= 1;
      case 'thisWeek':
        return diffDays <= 7;
      case 'thisMonth':
        return notifDate.getMonth() === now.getMonth() && notifDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    n.text.toLowerCase().includes(searchTerm.toLowerCase()) && filterByDate(n)
  );

  return (
    <div className="flex h-screen bg-[#F0EBDE] font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-20 bg-[#a97c63] flex justify-center items-center">
        <div className="flex flex-col space-y-6 rounded-xl bg-[#a97c63] p-3">
          {[Home, FileText, PieChart, Settings, User].map((Icon, idx) => (
            <button key={idx} className="w-12 h-20 flex items-center justify-center rounded-md bg-[#b08b68] hover:bg-[#9c6f45]">
              <Icon size={20} className="text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          {/* Logo or fallback text */}
          {!logoError && logoSrc ? (
            <img
              src={logoSrc}
              alt="Smart Cafe Logo"
              onError={() => setLogoError(true)}
              className="h-20 mt-[-20px] ml-[-10px]"
            />
          ) : (
            <div className="text-xl font-bold text-[#8B4513] ml-[-10px] mt-[-10px]">Smart Cafe</div>
          )}

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{currentFullDate}</span>
            <div className="relative cursor-pointer" onClick={() => setShowNotificationPanel(true)}>
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
              )}
            </div>
          </div>
        </div>

        {showNotificationPanel && (
          <h2
            className="text-2xl font-bold text-[#8B4513] mb-2 cursor-pointer transition-transform duration-700 hover:underline ml-36"
            onClick={() => setShowNotificationPanel(false)}
          >
            &lt;Notification
          </h2>
        )}

        <div className={`transition-all duration-700 ${showNotificationPanel ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto min-h-[75vh]">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-md font-semibold">
                  All {unreadCount > 0 ? <span className="text-red-500">({unreadCount})</span> : <span className="text-gray-400">(0)</span>}
                </h1>
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#e1cfc1] text-black text-sm px-3 py-1 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-[#e1cfc1] text-black text-sm px-3 py-1 rounded-md focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                </select>
                <button className="text-sm text-gray-600 hover:underline" onClick={markAllAsRead}>Mark all as read</button>
                {selected.length > 0 && (
                  <button className="text-gray-600 hover:text-gray-800" onClick={deleteSelected}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-center justify-between p-3 border-t border-[#e1cfc1] transition duration-200 ${notif.unread ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(notif.id)}
                    onChange={() => toggleSelection(notif.id)}
                    className="accent-pink-500"
                  />
                  <div className="text-gray-700">{notif.icon}</div>
                  <div>
                    <div className="text-base text-gray-800">{notif.text}</div>
                    <div className="text-sm text-gray-500">{notif.date} | {notif.time}</div>
                  </div>
                </div>
                <Share2 size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {!showNotificationPanel && (
          <div className="flex justify-center items-center h-[75vh] text-gray-500 text-xl font-semibold">
            Dashboard is empty for now.
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
