import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .min(3, "Name need atleast 3 characters.")
    .max(16, "Name have to be under 16 characters."),
  email: yup
    .string().email("Please put a valid email address.")
    .required("Please put a valid address email."),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password have to be between 6 and 128 characters")
    .max(128, "Password have to be between 6 and 128 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.").oneOf([yup.ref('password'), null], 'Password must match'),
  
});
