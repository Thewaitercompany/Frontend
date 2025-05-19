# Waiter Table Management System

This section provides a mobile-first interface for restaurant staff to manage tables, orders, and customer information.

## Overview

The waiter table management system allows restaurant staff to:

- View the status of all tables (available, occupied, booked)
- Manage table status and customer information
- Create and track orders for each table
- View order details and update order status (pending, served, completed)

## Routes

- `/waiter-table/login` - Staff login page
- `/waiter-table/[restaurantId]/dashboard` - Main dashboard showing table status
- `/waiter-table/[restaurantId]/table-details/[tableId]` - Details for a specific table
- `/waiter-table/[restaurantId]/table-details/[tableId]/new-order` - Create a new order for a table
- `/waiter-table/[restaurantId]/orders` - View and filter all orders
- `/waiter-table/[restaurantId]/orders/[orderId]` - View details for a specific order

## Components

- `WaiterLoginForm` - Login form for restaurant staff
- `WaiterNav` - Top navigation bar for the waiter interface
- `WaiterFooterNav` - Bottom navigation bar with main section links
- `TableGrid` - Grid display of restaurant tables with status indicators
- `TableDetail` - Detailed view of a single table with customer and order information
- `OrderList` - List of orders with filtering and status indicators
- `OrderDetail` - Detailed view of a single order with status management
- `OrderNew` - Interface for creating a new order with menu item selection

## API Endpoints

- `/api/waiter/auth` - Staff authentication
- `/api/waiter/tables` - Table management
- `/api/waiter/orders` - Order management
- `/api/waiter/menu` - Menu items
- `/api/waiter/customers` - Customer information

## Mock Data

Currently using mock data for development purposes. In production, this would be integrated with the restaurant's backend systems.

## Future Enhancements

- Real-time updates of table and order status
- Integrated payment processing
- Reservation management
- Kitchen display system integration
- Staff performance metrics
- Customer feedback collection

## Tech Stack

- Next.js with TypeScript
- TailwindCSS for styling
- Server-side API routes for backend functionality
- Mobile-first responsive design