import { object, string } from "yup";

//errorHandling
export const loginValidationSchema = object({
  input: string().strict().trim().required("This field is required"),

  password: string().required("Password is required").trim(),
});
