import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const result = await sql`
      SELECT code, attempts FROM verification_codes_rs
      WHERE email = ${email} AND expires_at > NOW() ;
    `;

    if (result.rows.length === 0) {
      return Response.json(
        { valid: false, message: "Code not found or expired." },
        { status: 400 },
      );
    }

    const record = result.rows[0];

    const expiresAt = new Date(record.expires_at); 
    const now = new Date(); 
    if (expiresAt < now) {
      await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      return Response.json(
        {
          valid: false,
          message: "Your code has expired, please resend it again.",
        },
        { status: 429 },
      );
    }

    if (record.attempts >= 3) {
      await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      return Response.json(
        {
          valid: false,
          message:
            "You have exceeded the maximum number of attempts. Please try again.",
        },
        { status: 429 },
      );
    }

    if (Number(record.code) === Number(code)) {
      return Response.json({ valid: true, message: "Correct Code" });
    } else {
      await sql`
        UPDATE verification_codes_rs
        SET attempts = attempts + 1
        WHERE email = ${email};
      `;

      const attemptsLeft = 2 - record.attempts; // Porque ya sumamos 1
      const message =
        attemptsLeft > 0
          ? `Incorrect code. You have left ${attemptsLeft} attempts.`
          : "Last attempt failed. Please try again.";

      if (message === "Last attempt failed. Please try again.") {
        await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
      }
      return Response.json({ valid: false, message: message }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in POST function:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack =
      error instanceof Error ? error.stack : "No stack information available";

    return Response.json(
      { message: errorMessage, stack: errorStack },
      { status: 500 },
    );
  }
}
