import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import path from "path";
import bcrypt from "bcryptjs";

const role = ["ADMIN", "USER", "DOCTOR", "STAFF"];

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role === "ADMIN"
    ) {
      return NextResponse.next();
    }

    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token.role === "USER"
    ) {
      return NextResponse.next();
    }

    if (
      req.nextUrl.pathname.startsWith("/doctor") &&
      req.nextauth.token.role === "DOCTOR"
    ) {
      return NextResponse.next();
    }

    if (
      req.nextUrl.pathname.startsWith("/staff") &&
      req.nextauth.token.role === "STAFF"
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/doctor/:path*", "/staff/:path*"],
};
