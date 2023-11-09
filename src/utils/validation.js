import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup
        .string()
        .required("Name is required.")
        .min(3, "Name need atleast 3 characters.")
        .max(16, "Name have to be under 16 characters."),
    email: yup
        .string()
        .email("Please put a valid email address.")
        .required("Please put a valid address email."),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password have to be between 6 and 128 characters")
        .max(128, "Password have to be between 6 and 128 characters"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password.")
        .oneOf([yup.ref("password"), null], "Password must match"),
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .email("Please put a valid email address.")
        .required("Please put a valid address email."),
    password: yup.string().required("Password is required"),
});

export const updateSchema = yup.object({
    name: yup
        .string()
        .required("Name is required.")
        .min(3, "Name need atleast 3 characters.")
        .max(16, "Name have to be under 16 characters."),
    pictureUrl: yup.string().url()
});

export const emailPasswordSchema = yup.object({
    email: yup
        .string()
        .email("Please put a valid email address.")
        .required("An address email is required."),
})

export const resetPasswordSchema = yup.object({
    email: yup
        .string()
        .email("Please put a valid email address.")
        .required("An address email is required."),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password have to be between 6 and 128 characters")
        .max(128, "Password have to be between 6 and 128 characters"),
    confirm: yup
        .string()
        .required("Please confirm your password.")
        .oneOf([yup.ref("password"), null], "Password must match"),
})

export const changePasswordSchema = yup.object({
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password have to be between 6 and 128 characters")
        .max(128, "Password have to be between 6 and 128 characters"),
    newPassword: yup
        .string()
        .required("A new password is required")
        .min(6, "Password have to be between 6 and 128 characters")
        .max(128, "Password have to be between 6 and 128 characters")
        .notOneOf([yup.ref('password'), null], 'Your new password have to be different from the actual one.'),
    confirmNewPassword: yup
        .string()
        .required("Please confirm your new password.")
        .oneOf([yup.ref("newPassword"), null], "Password must match"),
})
