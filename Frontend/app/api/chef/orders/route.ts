import { NextRequest, NextResponse } from 'next/server';

// Mock data for orders
const mockPendingOrders = [
  {
    id: "123456",
    tableNumber: "01",
    time: "09:41am",
    status: "pending",
    items: [
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
        prepared: true
      },
      {
        id: "2",
        name: "Chicken Nuggets",
        price: 80,
        quantity: 1,
        image: "/placeholder.svg",
        special: "without mayonnaise",
        prepared: false
      }
    ]
  },
  {
    id: "123455",
    tableNumber: "03",
    time: "09:35am",
    status: "pending",
    items: [
      {
        id: "3",
        name: "Rajma Chawal",
        price: 130,
        quantity: 1,
        image: "/placeholder.svg",
        special: "Extra spices, don't add dhania",
        prepared: false
      },
      {
        id: "1",
        name: "Crispy Fries",
        price: 60,
        quantity: 2,
        image: "/placeholder.svg",
        special: "without mayonnaise",
        prepared: true
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  // Get restaurant ID from query parameters
  const searchParams = request.nextUrl.searchParams;
  const restaurantId = searchParams.get('restaurantId');
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status') || 'pending';

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // If orderId is provided, return that specific order
    if (orderId) {
      const order = mockPendingOrders.find(o => o.id === orderId);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }
    
    // Filter orders based on status if provided
    let filteredOrders = [...mockPendingOrders];
    
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
    const { action, orderId, itemId } = body;
    
    if (!orderId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // In a real application, you would update the order in a database
    // For now, just return success message based on the action
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (action) {
      case 'accept':
        return NextResponse.json({ 
          success: true, 
          message: `Order ${orderId} accepted` 
        });
      
      case 'reject':
        return NextResponse.json({ 
          success: true, 
          message: `Order ${orderId} rejected` 
        });
      
      case 'prepare':
        if (!itemId) {
          return NextResponse.json({ error: 'Item ID is required for prepare action' }, { status: 400 });
        }
        
        return NextResponse.json({ 
          success: true, 
          message: `Item ${itemId} in order ${orderId} marked as prepared` 
        });
      
      case 'serve':
        if (!itemId) {
          return NextResponse.json({ error: 'Item ID is required for serve action' }, { status: 400 });
        }
        
        return NextResponse.json({ 
          success: true, 
          message: `Item ${itemId} in order ${orderId} marked as served` 
        });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process order action' }, { status: 500 });
  }
}