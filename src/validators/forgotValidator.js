import { object, string } from "yup";

//errorHandling
export const forgotvalidationSchema = object({
  email: string().strict().trim().required("Email field is required"),
});
