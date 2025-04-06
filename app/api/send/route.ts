import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";
import { FormSchemaUserRoute } from "@/lib/validations/base-schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    let code: number = Math.floor(1000 + Math.random() * 9000);
    const { email, action } = await request.json();
    const expiresAt = new Date(Date.now() + 10 * 60 * 100);

    // Validar con Zod en caso de registro de usuario
    if (action === "create-user") {
      const emailSchema = FormSchemaUserRoute.pick({ email: true });
      const result = await emailSchema.safeParseAsync({ email });
      console.log("primer if");
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log("segundo if");
        return Response.json({ error: errors }, { status: 400 });
      }
    }

    // Validar con Zod en caso de reseteo de contraseña
    if (action === "resset-password") {
      const result = await sql`
      SELECT FROM users
      WHERE email = ${email} ;`;
      if (result.rows.length === 0) {
        return Response.json({ error: "Email not found" }, { status: 400 });
      }
    }

    // Buscar si ya existe un código de verificación para el email proporcionado
    const { rows: search } = await sql`
      SELECT * FROM verification_codes_rs WHERE email = ${email}
    `;

    if (search.length > 0) {
      await sql`
      DELETE FROM verification_codes_rs
      WHERE email = ${email} ;
    `;
    }
    //Insertar un nuevo registro
    await sql`
        INSERT INTO verification_codes_rs (email, code, expires_at)
        VALUES (${email}, ${code}, ${expiresAt.toISOString()})
      `;

    const { data, error } = await resend.emails.send({
      from: "Market <onboarding@resend.dev>",
      to: [email],
      subject: "Codigo de verficación",
      react: await EmailTemplate({ code }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
