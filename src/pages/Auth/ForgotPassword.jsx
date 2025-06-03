import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { forgotvalidationSchema } from "../../validators/forgotValidator";

const ForgotPassword = () => {
  const [errors, setErrors] = useState({});

  const [forgotForm, setForgotForm] = useState({
    email: "",
  });

  // function
  const onChangeHandler = (e) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await forgotvalidationSchema.validate(forgotForm, { abortEarly: false });
      console.log(forgotForm);
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
          <h1 className="text-2xl font-medium capitalize">forgot password</h1>
          <h2 className="text-sm">
            Provide us your email to reset your password.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <TextInput
            id="forgot-email"
            name="email"
            label="Email"
            value={forgotForm.email}
            onChange={onChangeHandler}
            placeholder="Email"
            error={errors.email}
          />

          <SubmitButton label="Submit" />

          <span className="text-xs mt-2">
            Remeber your password?
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

export default ForgotPassword;
