import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    // Obtener el código almacenado
    const result = await sql`
      SELECT code FROM verification_codes_rs
      WHERE email = ${email}
      AND code = ${code}
      AND expires_at > NOW();
    `;

    if (result.rows.length > 0) {
      // Código válido
      return Response.json({ valid: true });
    } else {
      // Código inválido o expirado
      return Response.json({ valid: false }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
//
// Puedes configurar un trabajo periódico (cron job) para eliminar los códigos expirados de la tabla verification_codes. Por ejemplo:
//
//     sql
// Copy
// DELETE FROM verification_codes WHERE expires_at < NOW();
//O bien, puedes ejecutar esta consulta cada vez que verificas un código para mantener la tabla limpia.
