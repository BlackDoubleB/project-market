'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from "next-auth";
import bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  productId: z.string({
    invalid_type_error: 'Please select a product.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  method: z.enum(['cash', 'card'], {
    invalid_type_error: 'Please select an sale method.',
  }),
  date: z.string(),
});

const FormSchemaUser = z.object({
  // Campos de la tabla 'role'
  role_id: z.string({
    invalid_type_error: 'Please select a role.',
  }),
  //campos de la tabla user
  user_name: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  // Campos de la tabla 'people'
  person_name: z.string().min(1, 'Name is required'),
  dni: z.string().min(1, 'DNI is required'),
  lastname: z.string().min(1, 'Last Name is required'),
});

const FormSchemaRole = z.object({
  role_name: z.string().min(1, 'role name is required'),
});


const FormSchemaCategory = z.object({
  category_name: z.string().min(1, 'category name is required'),
});


export type State = {
  errors?: {
    productId?: string[];
    categoryId?: string[];
    amount?: string[];
    method?: string[];
  };
  message?: string | null;
};

export type StateUser = {
  errors?: {
    role_id?: string[];
    person_name?: string[];
    dni?: string[];
    lastname?: string[]
    user_name?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type StateRole = {
  errors?: {
    role_name?: string[];
  };
  message?: string | null;
};

export type StateCategory = {
  errors?: {
    category_name?: string[];
  };
  message?: string | null;
};


export async function createUser(prevState: StateUser, formData: FormData) {
  const validatedFields = FormSchemaUser.safeParse({
    role_id: formData.get('role_id'),
    person_name: formData.get('person_name'),
    dni: formData.get('dni'),
    lastname: formData.get('lastname'),
    user_name: formData.get('user_name'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { role_id, person_name, dni, lastname, user_name, password } = validatedFields.data;

  try {
    const resultPeople = await sql`
      INSERT INTO people (dni, person_name, lastname)
      VALUES (${dni}, ${person_name}, ${lastname})
      RETURNING person_id
      `;

    const person_id = resultPeople.rows[0]?.person_id;
    const hashedPassword = await bcrypt.hash(password, 10)
    const date_register = new Date();

    await sql`
      INSERT INTO users (role_id, person_id, user_name, password, date_register)
      VALUES (${role_id}, ${person_id}, ${user_name}, ${hashedPassword},${date_register.toISOString()})
    `;

  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return {
      message: 'Database Error: Failed to Create User.',
      error: error
    };
  }
  revalidatePath('/login/create');
  redirect('/login');
}

export async function createRole(prevState: StateRole, formData: FormData) {
  const validatedFields = FormSchemaRole.safeParse({
    role_name: formData.get('role_name')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Role.',
    };
  }

  const { role_name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO roles (role_name)
      VALUES (${role_name})
    `;

  } catch (error) {
    console.error("❌ Error al crear rol:", error);
    return {
      message: 'Database Error: Failed to Create Rol.',
      error: error
    };
  }
  revalidatePath('/dashboard/roles');
  redirect('/dashboard/roles');
}

export async function createCategory(prevState: StateCategory, formData: FormData) {
  const validatedFields = FormSchemaCategory.safeParse({
    category_name: formData.get('category_name')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Field. Failed to Create Category.',
    };
  }

  const { category_name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO categories (category_name)
      VALUES (${category_name})
    `;

  } catch (error) {
    console.error("❌ Error al crear categoria:", error);
    return {
      message: 'Database Error: Failed to Create Category.',
      error: error
    };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function createSale(prevState: State, formData: FormData) {
  const validatedFields = CreateSale.safeParse({
    productId: formData.get('productId'),
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
    method: formData.get('method'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sale.',
    };
  }

  const { productId, categoryId, amount, method } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO sales (product_id, category_id, amount, method, date)
      VALUES (${productId},${categoryId}, ${amountInCents}, ${method}, ${date})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Sale.`, error
    };
  }
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
}

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    productId: formData.get('productId')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { productId } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (product_id,)
      VALUES (${productId})
    `;
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Product.`, error
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

// Use Zod to update the expected types
const UpdateSale = FormSchema.omit({ id: true, date: true });

export async function updateSale(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateSale.safeParse({
    productId: formData.get('productId'),
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
    method: formData.get('method'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sale.',
    };
  }

  const { productId, categoryId, amount, method } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE sales
      SET product_id = ${productId},category_id = ${categoryId}, amount = ${amountInCents}, method = ${method}
      WHERE id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Sale.' };


  }
  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');
}

export async function updateRole(
  id: string,
  prevState: StateRole,
  formData: FormData,
) {
  const validatedFields = FormSchemaRole.safeParse({
    role_name: formData.get('role_name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Roles.',
    };
  }

  const { role_name } = validatedFields.data;

  try {
    await sql`
      UPDATE roles
      SET role_name = ${role_name}
      WHERE role_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Role.' };
  }
  revalidatePath('/dashboard/roles');
  redirect('/dashboard/roles');
}

export async function updateCategory(
  id: string,
  prevState: StateCategory,
  formData: FormData,
) {
  const validatedFields = FormSchemaCategory.safeParse({
    category_name: formData.get('category_name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Categories.',
    };
  }

  const { category_name } = validatedFields.data;

  try {
    await sql`
      UPDATE categories
      SET category_name = ${category_name}
      WHERE category_id = ${id}
    `;
  } catch {
    return { message: 'Database Error: Failed to Update Categories.' };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteSale(id: string) {
  await sql`DELETE FROM sales WHERE id = ${id}`;
  revalidatePath('/dashboard/sales');
}

export async function deleteRole(id: string) {
  await sql`DELETE FROM roles WHERE role_id = ${id}`;
  revalidatePath('/dashboard/roles');
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    return true; // Indica que la eliminación fue exitosa
  } catch (error) {
    console.error('Error deleting category:', error);
    return false; // Indica que hubo un error
  }
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard/products');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}