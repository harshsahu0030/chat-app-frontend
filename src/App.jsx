import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticated, Authentication, Layout } from "./Layout";

//auth
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Signup = lazy(() => import("./pages/Auth/Signup.jsx"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword.jsx"));

//authenticated
const Home = lazy(() => import("./pages/Authenticated/Home.jsx"));
const Chat = lazy(() => import("./pages/Authenticated/Chat.jsx"));
const Group = lazy(() => import("./pages/Authenticated/Group.jsx"));

//all
const About = lazy(() => import("./pages/All/About.jsx"));
const Contact = lazy(() => import("./pages/All/Contact.jsx"));
const Help = lazy(() => import("./pages/All/Help.jsx"));
const Privacy = lazy(() => import("./pages/All/Privacy.jsx"));
const Terms = lazy(() => import("./pages/All/Terms.jsx"));
const Blog = lazy(() => import("./pages/All/Blog.jsx"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authenticated />,
      errorElement: "Error",
      lazy,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/chat/:chatId",
          element: <Chat />,
        },
        {
          path: "/group",
          element: <Group />,
        },
      ],
    },

    //all
    {
      path: "/",
      element: <Layout />,
      errorElement: "Error",
      lazy,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "privacy",
          element: <Privacy />,
        },
        {
          path: "terms",
          element: <Terms />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
      ],
    },

    {
      path: "/",
      element: <Authentication />,
      errorElement: "Error",
      lazy,
      children: [
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/signup",
          element: <Signup />,
        },
        {
          path: "auth/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "auth/reset-password/:token",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <div>
      <Suspense fallback={"loading"}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
