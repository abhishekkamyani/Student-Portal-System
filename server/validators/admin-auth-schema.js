const { z } = require("zod");

const adminAuthSchema = z.object({
  adminID: z
    .string({ required_error: "Admin ID is required" })
    .refine((value) => /^\d{3}-\d{2}-\d{4}$/.test(value), {
      message: "CMS ID must be in the format '###-##-####'",
    }),
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length must be at least 8 characters"),
  // phoneNumber: z
  //   .string({ required_error: "Phone number is required" })
  //   .refine((value) => /^03\d{2}-\d{3}-\d{4}$/.test(value), {
  //     message: "Invalid phone number format, must be 03##-###-####",
  //   }),
  role: z.string({ required_error: "Role is required" }),
});

module.exports = adminAuthSchema;
