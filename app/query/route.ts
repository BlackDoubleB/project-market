// import { sql } from "@vercel/postgres";
//
// async function seedVerificationCodes(client) {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   try {
//     await client.sql`
//     CREATE TABLE IF NOT EXISTS verification_codes_rs (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       code INT NOT NULL,
//       created_at TIMESTAMPTZ DEFAULT NOW(),
//       expires_at TIMESTAMPTZ NOT NULL
//     );
//   `;
//     return {
//       message: "Tabla creada exitosamente",
//     };
//   } catch (error) {
//     console.error("❌ Error al crear usuario:", error);
//     throw error;
//   }
// }
//
// export async function GET() {
//   const client = await sql.connect();
//
//   try {
//     await client.query("BEGIN");
//
//     const result = await seedVerificationCodes(client);
//
//     await client.query("COMMIT");
//
//     return Response.json(result);
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("Error durante la inserción:", error);
//     const errorMessage = (error as Error).message;
//     return Response.json(
//       { message: "Error durante la inserción", error: errorMessage },
//       { status: 500 },
//     );
//   } finally {
//     client.release();
//   }
// }
