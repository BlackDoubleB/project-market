import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    let code: number = Math.floor(1000 + Math.random() * 9000);
    const { email } = await request.json();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await sql`
      INSERT INTO verification_codes_rs (email, code, expires_at)
      VALUES (${email}, ${code}, ${expiresAt.toISOString()})
    `;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Codigo de verficación",
      react: EmailTemplate({ code }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
