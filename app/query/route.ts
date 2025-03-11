import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

async function seedQuery(client: any) {
  try {
    // Insertar en la tabla `people`
    const resultPeople = await client.sql`
      INSERT INTO people (dni, person_name, lastname)
      VALUES (${"77502004"}, ${"juana"}, ${"rojas"})
      RETURNING person_id
    `;

    // Obtener el `person_id` generado
    const person_id = resultPeople.rows[0]?.person_id;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash("Carisita2023@@", 10);

    // Obtener la fecha actual
    const date_register = new Date();

    // Insertar en la tabla `users`
    await client.sql`
      INSERT INTO users (role_id, person_id, user_name, password, date_register, email)
      VALUES (${"4b051099-947b-4c7a-88ec-9d6d2ee63426"}, ${person_id}, ${"juana"}, ${hashedPassword}, ${date_register.toISOString()}, ${"juana@gmail.com"})
    `;

    return {
      message: "Usuario creado exitosamente",
      person_id: person_id,
    };
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    throw error; // Lanzar el error para manejarlo en la función GET
  }
}

export async function GET() {
  const client = await sql.connect(); // Conectar a la base de datos

  try {
    await client.query("BEGIN"); // Iniciar transacción

    // Ejecutar la función de inserción
    const result = await seedQuery(client);

    await client.query("COMMIT"); // Confirmar transacción

    return Response.json(result); // Retornar el resultado
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir transacción en caso de error
    console.error("Error durante la inserción:", error);
    const errorMessage = (error as Error).message;
    return Response.json(
      { message: "Error durante la inserción", error: errorMessage },
      { status: 500 },
    );
  } finally {
    client.release(); // Liberar la conexión del cliente
  }
}
