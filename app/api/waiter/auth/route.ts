import { NextRequest, NextResponse } from 'next/server';

// Mock waiter users
const mockUsers = [
  {
    id: 'W001',
    email: 'waiter1@example.com',
    password: 'password123',
    name: 'John Waiter',
    restaurantId: '123456',
    role: 'waiter',
  },
  {
    id: 'W002',
    email: 'waiter2@example.com',
    password: 'password123',
    name: 'Jane Waiter',
    restaurantId: '123456',
    role: 'waiter',
  },
  {
    id: 'M001',
    email: 'manager@example.com',
    password: 'password123',
    name: 'Restaurant Manager',
    restaurantId: '123456',
    role: 'manager',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // In a real application, you would verify credentials against a database
    // and use proper password hashing
    const user = mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return user data without sensitive information
    const { password: _, ...userData } = user;
    
    return NextResponse.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}