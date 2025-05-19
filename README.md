# Waiter Table Management System

A modern, mobile-first restaurant management system built with Next.js that enables restaurant staff to efficiently manage tables, orders, and customer information.

## 🚀 Features

- **Table Management**
  - Real-time table status monitoring (available, occupied, booked)
  - Detailed table information and customer tracking
  - Interactive table grid interface

- **Order Management**
  - Create and track orders for each table
  - Real-time order status updates (pending, served, completed)
  - Comprehensive order history and filtering

- **Staff Interface**
  - Secure staff authentication
  - Mobile-optimized interface
  - Intuitive navigation system

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14 with TypeScript
  - TailwindCSS for styling
  - Mobile-first responsive design
  - Server-side rendering for optimal performance

- **Backend**
  - Next.js API routes
  - TypeScript for type safety
  - RESTful API architecture

## 📱 Application Routes

### Authentication
- `/waiter-table/login` - Staff login page

### Dashboard & Tables
- `/waiter-table/[restaurantId]/dashboard` - Main dashboard with table overview
- `/waiter-table/[restaurantId]/table-details/[tableId]` - Individual table management
- `/waiter-table/[restaurantId]/table-details/[tableId]/new-order` - New order creation

### Orders
- `/waiter-table/[restaurantId]/orders` - Order management dashboard
- `/waiter-table/[restaurantId]/orders/[orderId]` - Detailed order view

## 🧩 Core Components

### Authentication
- `WaiterLoginForm` - Secure staff authentication interface

### Navigation
- `WaiterNav` - Top navigation bar
- `WaiterFooterNav` - Mobile-optimized bottom navigation

### Table Management
- `TableGrid` - Interactive table status display
- `TableDetail` - Comprehensive table information view

### Order Management
- `OrderList` - Order overview with filtering
- `OrderDetail` - Detailed order information
- `OrderNew` - New order creation interface

## 🔌 API Endpoints

### Authentication
- `POST /api/waiter/auth` - Staff authentication

### Table Management
- `GET /api/waiter/tables` - Fetch table information
- `PUT /api/waiter/tables/[tableId]` - Update table status

### Order Management
- `GET /api/waiter/orders` - Fetch orders
- `POST /api/waiter/orders` - Create new order
- `PUT /api/waiter/orders/[orderId]` - Update order status

### Menu & Customers
- `GET /api/waiter/menu` - Fetch menu items
- `GET /api/waiter/customers` - Fetch customer information

## 🚀 Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔮 Future Enhancements

- Real-time updates using WebSocket integration
- Integrated payment processing system
- Advanced reservation management
- Kitchen display system (KDS) integration
- Staff performance analytics
- Customer feedback and rating system
- Inventory management integration
- Reporting and analytics dashboard

## 📝 Development Notes

- Currently using mock data for development
- Production integration with restaurant backend systems pending
- Mobile-first approach ensures optimal performance on all devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.