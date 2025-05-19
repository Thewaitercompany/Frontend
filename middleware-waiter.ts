import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function waiterMiddleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("waiterAuth");

  // If trying to access waiter pages (except login) and not logged in, redirect to login
  if (
    request.nextUrl.pathname.startsWith("/waiter-table") && 
    !request.nextUrl.pathname.includes("/login") && 
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/waiter-table/login", request.url));
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (
    request.nextUrl.pathname === "/waiter-table/login" && 
    isLoggedIn
  ) {
    // Get restaurant ID from cookies or use a default
    const waiterData = request.cookies.get("waiterData")?.value;
    let restaurantId = "123456"; // Default fallback
    
    if (waiterData) {
      try {
        const parsedData = JSON.parse(waiterData);
        restaurantId = parsedData.restaurantId || restaurantId;
      } catch (error) {
        console.error("Error parsing waiterData cookie:", error);
      }
    }
    
    return NextResponse.redirect(new URL(`/waiter-table/${restaurantId}/dashboard`, request.url));
  }

  return NextResponse.next();
}

// Update the middleware.ts file to include this middleware for waiter table routes
// Example:
// 
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { waiterMiddleware } from "./middleware-waiter";
//
// export function middleware(request: NextRequest) {
//   // Check if the request is for waiter table routes
//   if (request.nextUrl.pathname.startsWith("/waiter-table")) {
//     return waiterMiddleware(request);
//   }
//
//   // Your existing middleware logic for other routes
//   // ...
//
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: ["/menu/:path*", "/waiter-table/:path*"],
// };