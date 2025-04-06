"use server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function getUserFromDb(email: string, password: string) {
  try {
    const data = await sql`
      SELECT 
      users.id,
      users.password,
      users.email
      FROM users WHERE email = ${email}`;

    console.log("data", data);

    const ps = data.rows[0].password;
    const isMatch = await bcrypt.compare(password, ps);
    if (!isMatch) {
      console.log("Invalid credentials from auth");
      return { message: "Invalid credentials from auth" };
    }
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to fetch User" };
  }
}
