import { object, string } from "yup";

//errorHandling
export const otpValidationSchema = object({
  otp: string().required("OTP is required").trim().strict(),
});
