import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    console.log("Hola aquiii");
    const { email, code } = await request.json();

    // Obtener el registro actual
    const result = await sql`
      SELECT code, attempts FROM verification_codes_rs
      WHERE email = ${email} AND expires_at > NOW() ;
    `;

    if (result.rows.length === 0) {
      return Response.json(
        { valid: false, message: "Código  no encontrado o caducado" },
        { status: 400 },
      );
    }

    const record = result.rows[0];

    const expiresAt = new Date(record.expires_at); // Convierte el timestamp a Date
    const now = new Date(); // Obtiene la fecha y hora actual
    if (expiresAt < now) {
      await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      return Response.json(
        {
          valid: false,
          message: "Su codigo caduco, reenvie nuevamente",
        },
        { status: 429 }, // 429 Too Many Requests
      );
    }

    // Verificar si ha excedido los intentos
    if (record.attempts >= 3) {
      await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      return Response.json(
        {
          valid: false,
          message:
            "Has excedido el número máximo de intentos. Reenvie nuevamente",
        },
        { status: 429 }, // 429 Too Many Requests
      );
    }
    console.log(record.code);
    console.log(code);
    // Verificar el código
    if (Number(record.code) === Number(code)) {
      // await sql`
      //   DELETE FROM verification_codes_rs
      //   WHERE email = ${email} ;
      // `;
      return Response.json({ valid: true, message: "Codigo Correcto" });
    } else {
      // Código incorrecto - incrementar intentos
      await sql`
        UPDATE verification_codes_rs
        SET attempts = attempts + 1
        WHERE email = ${email};
      `;

      const attemptsLeft = 2 - record.attempts; // Porque ya sumamos 1
      const message =
        attemptsLeft > 0
          ? `Código incorrecto. Te quedan ${attemptsLeft} intentos.`
          : "Último intento fallido. Reenvie nuevamente";

      if (message === "Último intento fallido. Reenvie nuevamente") {
        await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      }
      return Response.json({ valid: false, message: message }, { status: 400 });
    }
  } catch (error) {
    console.error("Error en la función POST:", error);
    // Verificar si 'error' es una instancia de Error para extraer más información
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    const errorStack =
      error instanceof Error
        ? error.stack
        : "No hay información de stack disponible";

    return Response.json(
      { message: errorMessage, stack: errorStack },
      { status: 500 },
    );
  }
}
