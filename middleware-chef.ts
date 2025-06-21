import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function chefMiddleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("chefAuth");

  // If trying to access chef pages (except login) and not logged in, redirect to login
  if (
    request.nextUrl.pathname.startsWith("/chef") && 
    !request.nextUrl.pathname.includes("/login") && 
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/chef/login", request.url));
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (
    request.nextUrl.pathname === "/chef/login" && 
    isLoggedIn
  ) {
    // Get restaurant ID from cookies or use a default
    const chefData = request.cookies.get("chefData")?.value;
    let restaurantId = "123456"; // Default fallback
    
    if (chefData) {
      try {
        const parsedData = JSON.parse(chefData);
        restaurantId = parsedData.restaurantId || restaurantId;
      } catch (error) {
        console.error("Error parsing chefData cookie:", error);
      }
    }
    
    return NextResponse.redirect(new URL(`/chef/${restaurantId}/dashboard`, request.url));
  }

  return NextResponse.next();
}

// Update the middleware.ts file to include this middleware for chef routes
// Example:
// 
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { waiterMiddleware } from "./middleware-waiter";
// import { chefMiddleware } from "./middleware-chef";
//
// export function middleware(request: NextRequest) {
//   // Check if the request is for chef routes
//   if (request.nextUrl.pathname.startsWith("/chef")) {
//     return chefMiddleware(request);
//   }
//
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
//   matcher: ["/menu/:path*", "/waiter-table/:path*", "/chef/:path*"],
// };