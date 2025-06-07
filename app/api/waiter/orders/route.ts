import { NextRequest, NextResponse } from 'next/server';

// Mock data for orders
const mockOrders = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:50am",
    status: "pending",
    items: [
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise"
      },
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise"
      }
    ]
  },
  {
    id: "123455",
    tableNumber: "03",
    time: "09:41am",
    status: "served",
    items: [
      {
        id: "3",
        name: "Rajma Chawal",
        price: 130,
        quantity: 1,
        image: "/placeholder.svg",
        special: "Extra spices, don't add dhania"
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg",
        special: "without mayonnaise"
      }
    ]
  },
  {
    id: "123454",
    tableNumber: "05",
    time: "09:35am",
    status: "completed",
    items: [
      {
        id: "4",
        name: "Butter Naan",
        price: 25,
        quantity: 4,
        image: "/placeholder.svg"
      },
      {
        id: "5",
        name: "Paneer Butter Masala",
        price: 180,
        quantity: 1,
        image: "/placeholder.svg",
        special: "extra butter"
      },
      {
        id: "6",
        name: "Jeera Rice",
        price: 90,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  // Get restaurant ID from query parameters
  const searchParams = request.nextUrl.searchParams;
  const restaurantId = searchParams.get('restaurantId');
  const orderId = searchParams.get('orderId');
  const tableId = searchParams.get('tableId');
  const status = searchParams.get('status');

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // If orderId is provided, return that specific order
    if (orderId) {
      const order = mockOrders.find(o => o.id === orderId);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }
    
    // Filter orders based on tableId and status if provided
    let filteredOrders = [...mockOrders];
    
    if (tableId) {
      filteredOrders = filteredOrders.filter(o => o.tableNumber === tableId);
    }
    
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    return NextResponse.json(filteredOrders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, items } = body;
    
    if (!tableId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // In a real application, you would create an order in a database
    // For now, just return a mock order ID
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newOrderId = Math.floor(Math.random() * 1000000).toString();
    
    return NextResponse.json({ 
      success: true, 
      orderId: newOrderId,
      message: 'Order created successfully' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;
    
    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // In a real application, you would update the order in a database
    // For now, just return success
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}