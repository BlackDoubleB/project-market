"use server";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth(); // Verifica la sesión en el servidor
  return NextResponse.json({ session });
}
