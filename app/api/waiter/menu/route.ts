import { NextRequest, NextResponse } from 'next/server';

// Mock menu items data
const mockMenuItems = [
  {
    id: "1",
    name: "Crispy Fries",
    price: 60,
    image: "/placeholder.svg",
    category: "Starters",
    isVeg: true,
    description: "Crispy, golden-brown fries served piping hot with a sprinkle of salt."
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 80,
    image: "/placeholder.svg",
    category: "Starters",
    isVeg: false,
    description: "Bite-sized pieces of chicken meat that are typically breaded and deep-fried."
  },
  {
    id: "3",
    name: "Rajma Chawal",
    price: 130,
    image: "/placeholder.svg",
    category: "Main Course",
    isVeg: true,
    description: "Classic North Indian dish of kidney beans curry served with steamed rice."
  },
  {
    id: "4",
    name: "Butter Naan",
    price: 25,
    image: "/placeholder.svg",
    category: "Breads",
    isVeg: true,
    description: "Soft and fluffy Indian bread with a rich buttery flavor."
  },
  {
    id: "5",
    name: "Paneer Butter Masala",
    price: 180,
    image: "/placeholder.svg",
    category: "Main Course",
    isVeg: true,
    description: "Soft paneer cubes cooked in a rich and creamy tomato-based gravy."
  },
  {
    id: "6",
    name: "Jeera Rice",
    price: 90,
    image: "/placeholder.svg",
    category: "Rice",
    isVeg: true,
    description: "Fragrant basmati rice cooked with cumin seeds and mild spices."
  },
  {
    id: "7",
    name: "Cold Coffee",
    price: 70,
    image: "/placeholder.svg",
    category: "Beverages",
    isVeg: true,
    description: "Refreshing cold coffee with a hint of sweetness and topped with whipped cream."
  },
  {
    id: "8",
    name: "Masala Chai",
    price: 30,
    image: "/placeholder.svg",
    category: "Beverages",
    isVeg: true,
    description: "Traditional Indian tea with a blend of aromatic spices."
  }
];

export async function GET(request: NextRequest) {
  // Get restaurant ID from query parameters
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const isVeg = searchParams.get('isVeg');

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real application, you would fetch menu items from a database based on restaurantId
    // For now, filter the mock data based on query parameters
    let filteredItems = [...mockMenuItems];
    
    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    if (isVeg === 'true') {
      filteredItems = filteredItems.filter(item => item.isVeg);
    }
    
    return NextResponse.json(filteredItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}