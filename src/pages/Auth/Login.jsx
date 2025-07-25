import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import PasswordInput from "../../components/inputs/PasswordInput";
import { loginValidationSchema } from "../../validators/loginValidator";
import { useDispatch, useSelector } from "react-redux";
import { useApiResponse } from "../../hooks/ApiResponse";
import { userLogin } from "../../app/redux/thunk/auth.thunk";

const Login = () => {
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    input: "",
    password: "",
  });

  // function
  const onChangeHandler = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await loginValidationSchema.validate(loginForm, { abortEarly: false });
      dispatch(userLogin(loginForm));
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
          <h1 className="text-2xl font-medium capitalize">login</h1>
          <h2 className="text-sm">
            Rista helps you connect and share with the people in your life.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <TextInput
            id="login-input"
            name="input"
            label="Username or email"
            value={loginForm.input}
            onChange={onChangeHandler}
            placeholder="username or email"
            error={errors.input}
          />
          <PasswordInput
            id="login-password"
            name="password"
            label="Password"
            value={loginForm.password}
            onChange={onChangeHandler}
            placeholder="password"
            error={errors.password}
          />

          <Link
            className="text-xs text-primary hover:underline w-full text-end"
            to={"/auth/forgot-password"}
          >
            forgot password?
          </Link>

          <SubmitButton disabled={loading} label="Login" />

          <span className="text-xs mt-2 pl-2">
            Don't have account?{" "}
            <Link
              to={"/auth/signup"}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
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

export default Login;
