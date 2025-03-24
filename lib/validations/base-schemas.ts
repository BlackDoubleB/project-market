import { z } from "zod";

export const FormSchemaUser = z.object({
  role_id: z
    .string({
      required_error: "Please select a Role.",
      invalid_type_error: "Please select a valid Role.",
    })
    .nonempty("Please select a Role."),
  user_name: z.string().min(1, "Username is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  person_name: z.string().min(1, "Name is required"),
  dni: z.string().min(1, "DNI is required"),
  lastname: z.string().min(1, "Last Name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const FormSchemaRole = z.object({
  role_name: z.string().min(1, "role name is required"),
});

export const FormSchemaCategory = z.object({
  category_name: z.string().min(1, "category name is required"),
});

export const FormSchemaProduct = z.object({
  product_name: z.string().min(1, "product name is required"),
  category_id: z.string({
    invalid_type_error: "Please select a category.",
  }),
  image_url: z.string().min(1, "image is required"),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
});

export const FormSchemaStock = z.object({
  quantity: z.coerce.number().gt(0, { message: "Please enter an number" }),
  product_id: z.string({ invalid_type_error: "Please select a product." }),
});

export const productSchema = z.object({
  product_id: z.string().min(1, "Debes seleccionar un producto"), // Asegúrate de que product_id no esté vacío
  quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
});

export const FormSchemaSale = z.object({
  products: z.array(productSchema),
  method: z.string().min(1, "Debes seleccionar un methodo"),
});
