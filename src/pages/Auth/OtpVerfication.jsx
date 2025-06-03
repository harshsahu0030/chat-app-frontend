import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import SubmitButton from "../../components/buttons/SubmitButton";
import NumberInput from "../../components/inputs/NumberInput";
import { otpValidationSchema } from "../../validators/otpValidator";

const OtpVerfication = () => {
  const [errors, setErrors] = useState({});

  const [otpForm, setOtpForm] = useState({
    otp: "",
  });

  // function
  const onChangeHandler = (e) => {
    setOtpForm({ ...otpForm, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await otpValidationSchema.validate(otpForm, { abortEarly: false });
      console.log(otpForm);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <section className="h-full w-full flex justify-center py-10">
      <div className="w-full sm:w-[70%] xl:w-[30%] h-fit flex flex-col gap-2 p-5 border rounded-sm border-surface">
        {/* top  */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium capitalize">vesendrify yourself</h1>
          <h2 className="text-sm">Provide us the otp  to your email.</h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <NumberInput
            id="otp-otp"
            name="otp"
            label="OTP Number"
            value={otpForm.otp}
            onChange={onChangeHandler}
            placeholder="OTP"
            error={errors.otp}
          />

          <SubmitButton label="Submit" />

          <span className="text-xs mt-2">
            Already have account?
            <Link
              to={"/auth/signup"}
              className="text-primary font-medium hover:underline pl-2"
            >
              Login Now
            </Link>
          </span>
        </form>

        <hr className="my-2 text-text" />

        {/* bottom */}
        <ul className="flex w-full gap-4 justify-center flex-wrap">
          {authenticationLinks?.map((item, index) => (
            <li
              key={index}
              className="text-xs capitalize hover:scale-95 transition-all"
            >
              <Link to={item?.url}>{item?.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OtpVerfication;
