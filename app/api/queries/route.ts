import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    console.log("📩 Recibido email:", email);

    const result = await sql`
      SELECT id FROM users WHERE LOWER(email) = LOWER(${email}) LIMIT 1
    `;

    console.log("🔍 Resultado de consulta:", result.rows);

    return NextResponse.json(
      {
        exists: result.rows.length > 0,
        message:
          result.rows.length > 0
            ? "Email already registered"
            : "Email available",
        user_id: result.rows[0]?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "❌ Error en /api/queries:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
