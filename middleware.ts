import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("auth")

  // If trying to access menu pages (except login) and not logged in, redirect to login
  if (request.nextUrl.pathname.startsWith("/menu") && !request.nextUrl.pathname.includes("/login") && !isLoggedIn) {
    const tableId = request.nextUrl.pathname.split("/")[2] || "1"
    return NextResponse.redirect(new URL(`/menu/login?tableId=${tableId}`, request.url))
  }

  // If already logged in and trying to access login page, redirect to menu
  if (request.nextUrl.pathname === "/menu/login" && isLoggedIn) {
    const tableId = request.nextUrl.searchParams.get("tableId") || "1"
    return NextResponse.redirect(new URL(`/menu/${tableId}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/menu/:path*"],
}

