import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

import {roles, people, users, sales, categories, products, stock, detail_sale_products} from '../lib/placeholder-data';

const client = await db.connect();

async function seedRoles() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS roles (
      role_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedRoles = await Promise.all(
    roles.map(async (role) => {
      return client.sql`
        INSERT INTO roles (role_id, role_name)
        VALUES (${role.role_id}, ${role.role_name})
        ON CONFLICT (role_id) DO NOTHING;
      `;

    }),
  );

  return insertedRoles;
}

async function seedPeople() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS people (
      person_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dni CHAR(8) NOT NULL,
      person_name VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL)
  `;

  const insertedPeople = await Promise.all(
    people.map(async (person) => {
      return client.sql`
        INSERT INTO people (person_id, dni, person_name, lastname)
        VALUES (${person.person_id}, ${person.dni}, ${person.person_name},${person.lastname})
        ON CONFLICT (person_id) DO NOTHING;
      `;

    }),
  );

  return insertedPeople;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role_id UUID NOT NULL, 
      person_id UUID NOT NULL, 
      user_name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      date_register TIMESTAMP NOT NULL,
      CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
      CONSTRAINT fk_people FOREIGN KEY (person_id) REFERENCES people(person_id)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (user_id, role_id, person_id, user_name, password, date_register)
        VALUES (${user.user_id}, ${user.role_id}, ${user.person_id}, ${user.user_name}, ${hashedPassword}, ${user.date_register.toISOString()})
        ON CONFLICT (user_id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedSales() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sales (
      sale_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      method VARCHAR(50)  NOT NULL,
      date_register TIMESTAMP NOT NULL,
      total NUMERIC(10,2) NOT NULL,
      CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
  `;

  const insertedSales = await Promise.all(
    sales.map(
      (sale) => client.sql`
        INSERT INTO sales (sale_id, user_id, method, date_register, total)
        VALUES (${sale.sale_id},${sale.user_id}, ${sale.method}, ${sale.date_register.toISOString()}, ${sale.total})
        ON CONFLICT (sale_id) DO NOTHING;
      `,
    ),
  );

  return insertedSales;
}

async function seedCategories() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS categories(
    category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
  );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      (category) => client.sql`
      INSERT INTO categories (category_id, category_name)
      VALUES (${category.category_id}, ${category.category_name})
      ON CONFLICT (category_id) DO NOTHING
      `
    )
  );
  return insertedCategories
}

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      date TIMESTAMP NOT NULL,
      CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (product_id, category_id, product_name, image_url, price, date)
        VALUES (${product.product_id}, ${product.category_id},${product.product_name}, ${product.image_url},${product.price},${product.date.toISOString()})
        ON CONFLICT (product_id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedStock() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS stock(
    stock_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    date_register TIMESTAMP NOT NULL,
    CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products(product_id)
  );
  `;

  const insertedStock = await Promise.all(
    stock.map((st) => client.sql`
      INSERT INTO stock (stock_id,product_id,quantity,date_register)
      VALUES (${st.stock_id}, ${st.product_id}, ${st.quantity},${st.date_register.toISOString()} )
      ON CONFLICT (stock_id) DO NOTHING
      `
    )
  );
  return insertedStock
}

async function seedDetail_Sale_Products() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
  CREATE TABLE IF NOT EXISTS detail_sale_products(
    sale_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_sale FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
    CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products(product_id)
  );
  `;

  const inserteDetail_Sale_Products = await Promise.all(
    detail_sale_products.map((dsp) => client.sql`
      INSERT INTO detail_sale_products (sale_id, product_id, quantity)
      VALUES (${dsp.sale_id}, ${dsp.product_id}, ${dsp.quantity} )
      `
    )
  );
  return inserteDetail_Sale_Products
}

export async function GET() {

  try {
    await client.sql`BEGIN`;
    await seedRoles();
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
