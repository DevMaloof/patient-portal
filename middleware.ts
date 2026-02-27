// /middleware.ts (Restaurant)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Read your custom cookie manually
  const customToken = req.cookies.get("maloof_restaurant_session")?.value;

  // Try to decode using NextAuth (JWT)
  const token =
    (await getToken({ req, raw: true, cookieName: "maloof_restaurant_session" })) ||
    customToken;

  // If no token → redirect to login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
