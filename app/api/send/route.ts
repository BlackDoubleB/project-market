import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const tempCodeStorage: { [email: string]: number } = {};

export async function POST(request: Request) {
  try {
    let code: number = Math.floor(1000 + Math.random() * 9000);
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [(await request.json()).email],
      subject: "Esto es una prueba",
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
