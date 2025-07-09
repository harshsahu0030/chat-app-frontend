import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import TextInput from "../../components/inputs/TextInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { signupValidationSchema } from "../../validators/signupValidator";
import { useDispatch, useSelector } from "react-redux";
import { useApiResponse } from "../../hooks/ApiResponse";
import { userRegister } from "../../app/redux/thunk/auth.thunk";

const Signup = () => {
  //redux
  const dispatch = useDispatch();
  const { message, loading, error } = useSelector((state) => state.auth);

  // state
  const [errors, setErrors] = useState({});
  const [signupForm, setsignupForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // function
  const onChangeHandler = (e) => {
    setsignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await signupValidationSchema.validate(signupForm, { abortEarly: false });
      dispatch(userRegister(signupForm));
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
          <h1 className="text-2xl font-medium capitalize">SignUp</h1>
          <h2 className="text-xs">
            Rista helps you connect and share with the people in your life.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <TextInput
            id="signup-name"
            name="name"
            label="Name"
            value={signupForm.name}
            onChange={onChangeHandler}
            placeholder="Name"
            error={errors.name}
          />
          <TextInput
            id="signup-email"
            name="email"
            label="Email"
            value={signupForm.email}
            onChange={onChangeHandler}
            placeholder="Email"
            error={errors.email}
          />
          <TextInput
            id="signup-username"
            name="username"
            label="Username"
            value={signupForm.username}
            onChange={onChangeHandler}
            placeholder="Username"
            error={errors.username}
          />
          <PasswordInput
            id="signup-password"
            name="password"
            label="Password"
            value={signupForm.password}
            onChange={onChangeHandler}
            placeholder="password"
            error={errors.password}
          />
          <SubmitButton disabled={loading} label="Submit" />

          <span className="text-xs mt-2">
            Already have account?{" "}
            <Link
              to={"/auth/login"}
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

export default Signup;
