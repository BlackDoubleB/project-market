import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

import {role, people, users, sales, categories, products, stock, detail_sale_products} from '../lib/placeholder-data';

const client = await db.connect();

async function seedRole() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS role (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedRole = await Promise.all(
    role.map(async (rol) => {
      return client.sql`
        INSERT INTO role (id, name)
        VALUES (${rol.id}, ${rol.name})
        ON CONFLICT (id) DO NOTHING;
      `;

    }),
  );

  return insertedRole;
}

async function seedPeople() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS people (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dni CHAR(8) NOT NULL,
      people_name VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      date_register TIMESTAMP  NOT NULL)
  `;

  const insertedPeople = await Promise.all(
    people.map(async (person) => {
      return client.sql`
        INSERT INTO people (id, dni, people_name, lastname,date_register)
        VALUES (${person.id}, ${person.dni}, ${person.people_name},${person.lastname},${person.date_register.toISOString()})
        ON CONFLICT (id) DO NOTHING;
      `;

    }),
  );

  return insertedPeople;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      id_role UUID NOT NULL, 
      id_people UUID NOT NULL, 
      user_name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      date_login TIMESTAMP  NOT NULL,
      CONSTRAINT fk_role FOREIGN KEY (id_role) REFERENCES role(id),
      CONSTRAINT fk_people FOREIGN KEY (id_people) REFERENCES people(id)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, id_role, id_people, user_name, password, date_login)
        VALUES (${user.id}, ${user.id_role}, ${user.id_people}, ${user.user_name}, ${hashedPassword}, ${user.date_login.toISOString()})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedSales() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sales (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      id_user UUID NOT NULL,
      method VARCHAR(50)  NOT NULL,
      date TIMESTAMP NOT NULL,
      total NUMERIC(10,2) NOT NULL,
      CONSTRAINT fk_users FOREIGN KEY (id_user) REFERENCES users(id)
    );
  `;

  const insertedSales = await Promise.all(
    sales.map(
      (sale) => client.sql`
        INSERT INTO sales (id, id_user, method, date, total)
        VALUES (${sale.id},${sale.id_user}, ${sale.method}, ${sale.date.toISOString()}, ${sale.total})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSales;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS categories(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
      INSERT INTO categories (id, name)
      VALUES (${category.id}, ${category.name})
      ON CONFLICT (id) DO NOTHING
      `
    )
  );
  return insertedCategories
}

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      id_category UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      date TIMESTAMP NOT NULL,
      CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES categories(id)
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (id, id_category, name, image_url, price, date)
        VALUES (${product.id}, ${product.id_category},${product.name}, ${product.image_url},${product.price},${product.date.toISOString()})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedStock() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS stock(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id_product UUID NOT NULL,
    quantity INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT fk_products FOREIGN KEY (id_product) REFERENCES products(id)
  );
  `;

  const insertedStock = await Promise.all(
    stock.map((st) => client.sql`
      INSERT INTO stock (id,id_product,quantity,date)
      VALUES (${st.id}, ${st.id_product}, ${st.quantity},${st.date.toISOString()} )
      ON CONFLICT (id) DO NOTHING
      `
    )
  );
  return insertedStock
}

async function seedDetail_Sale_Products() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS detail_sale_products(
    id_sale UUID NOT NULL,
    id_product UUID NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_sale FOREIGN KEY (id_sale) REFERENCES sales(id),
    CONSTRAINT fk_products FOREIGN KEY (id_product) REFERENCES products(id)
  );
  `;

  const inserteDetail_Sale_Products = await Promise.all(
    detail_sale_products.map((dsp) => client.sql`
      INSERT INTO detail_sale_products (id_sale, id_product, quantity)
      VALUES (${dsp.id_sale}, ${dsp.id_product}, ${dsp.quantity} )
      `
    )
  );
  return inserteDetail_Sale_Products
}

export async function GET() {

  try {
    await client.sql`BEGIN`;
    await seedRole();
    await seedPeople();
    await seedUsers();
    await seedCategories();
    await seedProducts();
    await seedSales();
    await seedDetail_Sale_Products();
    await seedStock();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error('Error during database seeding:', error);
    const errorMessage = (error as Error).message;
    return Response.json({ message: 'Error during database seeding', error: errorMessage }, { status: 500 });
   
  } finally {
    client.release(); 
  }
}
