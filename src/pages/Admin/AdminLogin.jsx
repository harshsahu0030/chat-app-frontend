import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authenticationLinks } from "../../data/linksData";
import TextInput from "../../components/inputs/TextInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import PasswordInput from "../../components/inputs/PasswordInput";
import { loginValidationSchema } from "../../validators/loginValidator";

const AdminLogin = () => {
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
      console.log(loginForm);
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
          <h1 className="text-2xl font-medium capitalize">Admin login</h1>
          <h2 className="text-sm">
            Rista helps you connect and share with the people in your life.
          </h2>
        </div>

        <hr className="my-2 text-surface" />

        {/* center  */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <TextInput
            id="admin-input"
            name="input"
            label="Username or email"
            value={loginForm.input}
            onChange={onChangeHandler}
            placeholder="username or email"
            error={errors.input}
          />
          <PasswordInput
            id="admin-password"
            name="password"
            label="Password"
            value={loginForm.password}
            onChange={onChangeHandler}
            placeholder="password"
            error={errors.password}
          />

          <SubmitButton label="Login" />
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

export default AdminLogin;
