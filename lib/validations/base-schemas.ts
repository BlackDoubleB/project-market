import { z } from "zod";

export const FormSchemaUser = z.object({
  role_id: z
    .string({
      required_error: "Role is required",
      invalid_type_error: "Invalid Role",
    })
    .trim()
    .min(1, "Role is required."),
  user_name: z
    .string({ required_error: "User_name is required." })
    .trim()
    .min(1, "User Name is required"),
  password: z.string().superRefine((val, ctx) => {
    // 1. Si está vacío o es undefined
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required", // Solo este mensaje
      });
      return; // Detiene la validación aquí
    }

    // 2. Si es menor a 8 caracteres
    if (val.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
      });
      return;
    }

    // 3. Si excede 32 caracteres
    if (val.length > 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be less than 32 characters",
      });
      return;
    }
  }),
  person_name: z
    .string({
      required_error: "Person Name is required.",
      invalid_type_error: "Person Name must be a string.",
    })
    .trim()
    .min(1, "Person Name is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
  lastname: z
    .string()
    .trim()
    .min(1, "Lastname is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
  dni: z
    .string({
      required_error: "DNI is required.",
      invalid_type_error: "DNI must be a string.",
    })
    .trim()
    .min(1, "DNI is required") // Si está vacío, solo se muestra este mensaje.
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^\d+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "DNI must contain only numbers",
        });
      }
    }),

  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .min(1, "Email is required")
    .superRefine((val, ctx) => {
      if (val === "") return; // Si está vacío, ya se mostró el error en .min(1)

      // Validación personalizada del email
      if (!/^\S+@\S+\.\S+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email", // Solo se muestra si el anterior pasó
        });
      }
    }),
});

export const FormSchemaRole = z.object({
  role_name: z
    .string({
      required_error: "Role name is required.",
      invalid_type_error: "Role name be a string.",
    })
    .trim()
    .min(1, "role name is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
});

export const FormSchemaCategory = z.object({
  category_name: z
    .string({
      required_error: "Category is required.",
      invalid_type_error: "Category be a string.",
    })
    .trim()
    .min(1, "Category is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
});

export const FormSchemaProduct = z.object({
  product_name: z
    .string({
      required_error: "Product is required.",
      invalid_type_error: "Product be a string.",
    })
    .trim()
    .min(1, "Product is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),

  category_id: z.string({
    required_error: "Category is required.",
    invalid_type_error: "Category be a string.",
  }),
  image_url: z.string().trim().min(1, "image is required"),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
});

export const FormSchemaStock = z.object({
  quantity: z.coerce.number().gt(0, { message: "Please enter an number" }),
  product_id: z
    .string({
      required_error: "Product is required.",
      invalid_type_error: "Product must be a string.",
    })
    .trim()
    .min(1, "Product is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
});

export const productSchema = z.object({
  product_id: z.string().min(1, "Debes seleccionar un producto"), // Asegúrate de que product_id no esté vacío
  quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
});

export const FormSchemaSale = z.object({
  products: z.array(productSchema),
  method: z
    .string({
      required_error: "Method is required.",
      invalid_type_error: "Method must be a string.",
    })
    .trim()
    .min(1, "Method is required")
    .superRefine((val, ctx) => {
      if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should only contain letters",
        });
      }
    }),
});
