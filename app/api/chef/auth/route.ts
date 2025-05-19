import { NextRequest, NextResponse } from 'next/server';

// Mock chef users
const mockUsers = [
  {
    id: 'C001',
    email: 'chef1@example.com',
    password: 'password123',
    name: 'Head Chef',
    restaurantId: '123456',
    role: 'chef',
  },
  {
    id: 'C002',
    email: 'chef2@example.com',
    password: 'password123',
    name: 'Sous Chef',
    restaurantId: '123456',
    role: 'chef',
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