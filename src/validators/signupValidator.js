import { object, string } from "yup";

//errorHandling
export const signupValidationSchema = object({
  fullName: string().trim().required("Full Name is required"),

  username: string()
    .strict()
    .trim()
    .lowercase("Username should be in lowercase")
    .matches(/^(\S+$)/g, "* This field cannot contain only blankspaces")
    .min(3, "* Username must be at least 3 characters")
    .required("Username is Required"),

  email: string().trim().required("Email is Required"),

  password: string()
    .required("Password is required")
    .trim()

    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});
