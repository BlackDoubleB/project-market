import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth(); // Verifica si el usuario está autenticado

  // Si no hay sesión, redirige al login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("acceso correcto");
  return NextResponse.next(); // Si está autenticado, permite el acceso
}

export const config = {
  matcher: "/dashboard/:path*",
};
