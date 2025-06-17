import { NextRequest, NextResponse } from 'next/server';

// Mock data for tables (same as in the dashboard page)
const mockTables = [
  { id: "01", number: "01", status: "occupied", capacity: "2/4", runningBill: 250 },
  { id: "02", number: "02", status: "available", capacity: "0/4" },
  { id: "03", number: "03", status: "booked", capacity: "4/4", runningBill: 550 },
  { id: "04", number: "04", status: "occupied", capacity: "2/4", runningBill: 170 },
  { id: "05", number: "05", status: "booked", capacity: "6/6", runningBill: 1250 },
  { id: "06", number: "06", status: "available", capacity: "0/6" },
  { id: "07", number: "07", status: "available", capacity: "0/4" },
  { id: "08", number: "08", status: "booked", capacity: "6/6", runningBill: 750 },
  { id: "09", number: "09", status: "booked", capacity: "4/6", runningBill: 150 },
  { id: "10", number: "10", status: "occupied", capacity: "2/4", runningBill: 280 },
  { id: "11", number: "11", status: "available", capacity: "0/4" },
  { id: "12", number: "12", status: "booked", capacity: "4/4", runningBill: 450 },
];

export async function GET(request: NextRequest) {
  // Get restaurant ID from query parameters
  const searchParams = request.nextUrl.searchParams;
  const restaurantId = searchParams.get('restaurantId');

  // In a real application, you would fetch tables from a database based on restaurantId
  // For now, return mock data
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json(mockTables);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, status } = body;
    
    if (!tableId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // In a real application, you would update the table in a database
    // For now, just return success
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update table' }, { status: 500 });
  }
}