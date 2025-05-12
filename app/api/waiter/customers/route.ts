import { NextRequest, NextResponse } from 'next/server';

// Mock customer data
const mockCustomers = {
  "01": { name: "Walk-in Customer", phone: "" },
  "03": { name: "Mohan Pyare", phone: "9219531234" },
  "04": { name: "", phone: "" },
  "05": { name: "Ram Singh", phone: "9249331234" },
  "08": { name: "Aman Verma", phone: "9876543210" },
  "09": { name: "Priya Sharma", phone: "9765432109" },
  "10": { name: "", phone: "" },
  "12": { name: "Raj Kumar", phone: "9087654321" },
};

export async function GET(request: NextRequest) {
  // Get table ID from query parameters
  const searchParams = request.nextUrl.searchParams;
  const tableId = searchParams.get('tableId');

  if (!tableId) {
    return NextResponse.json({ error: 'Table ID is required' }, { status: 400 });
  }

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real application, you would fetch customer data from a database
    // For now, return mock data for the specific table
    const customer = mockCustomers[tableId as keyof typeof mockCustomers] || { name: "", phone: "" };
    
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, name, phone } = body;
    
    if (!tableId) {
      return NextResponse.json({ error: 'Table ID is required' }, { status: 400 });
    }
    
    // In a real application, you would update customer data in a database
    // For now, just return success
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({ 
      success: true,
      data: { name, phone }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer data' }, { status: 500 });
  }
}