"use server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function getUserFromDb(email: string, password: string) {
  try {
    const data = await sql`
      SELECT 
      users.password,
      users.email
      FROM users WHERE email = ${email}`;

    const ps = data.rows[0].password;
    const isMatch = await bcrypt.compare(password, ps);
    if (!isMatch) {
      throw new Error("Credenciales inválidas.");
    }
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest sales.");
  }
}
