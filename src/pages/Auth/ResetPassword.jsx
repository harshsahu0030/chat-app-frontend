import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { resetValidationSchema } from "../../validators/resetValidator";
import { useDispatch, useSelector } from "react-redux";
import { useApiResponse } from "../../hooks/ApiResponse";
import { userResetPassword } from "../../app/redux/thunk/auth.thunk";

const ResetPassword = () => {
  const { token } = useParams();
  //redux
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);

  //state
  const [errors, setErrors] = useState({});

  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // function
  const onChangeHandler = (e) => {
    setResetForm({ ...resetForm, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await resetValidationSchema.validate(resetForm, { abortEarly: false });
      dispatch(userResetPassword({ token, resetForm }));
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  //api response
  useApiResponse({ message, error, navigation: "/" });

  return (
    <section className="h-full w-full flex justify-center py-10">
      <div className="w-full sm:w-[70%] xl:w-[30%] h-fit flex flex-col gap-2 p-5 border rounded-sm border-surface">
        {/* top  */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium capitalize">reset password</h1>
          <h2 className="text-sm">
            Rista helps you connect and share with the people in your life.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <TextInput
            id="reset-password"
            name="password"
            label="Password"
            value={resetForm.password}
            onChange={onChangeHandler}
            placeholder="Password"
            error={errors.password}
          />

          <TextInput
            id="reset-confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={resetForm.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />

          <SubmitButton disabled={loading} label="Submit" />

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

export default ResetPassword;
