import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth(); 

 
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("acceso correcto");
  return NextResponse.next(); 
}

export const config = {
  matcher: "/dashboard/:path*",
};
