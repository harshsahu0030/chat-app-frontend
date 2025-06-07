import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticated, Authentication, Layout } from "./Layout";
import PageLoader from "./components/Loader/PageLoader.jsx";
import Error from "./pages/Error.jsx";

//auth
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Signup = lazy(() => import("./pages/Auth/Signup.jsx"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword.jsx"));
const OtpVerfication = lazy(() => import("./pages/Auth/OtpVerfication.jsx"));

//authenticated
const Home = lazy(() => import("./pages/Authenticated/Home.jsx"));
const Chat = lazy(() => import("./pages/Authenticated/Chat.jsx"));
const Group = lazy(() => import("./pages/Authenticated/Group.jsx"));
const Search = lazy(() => import("./pages/Authenticated//Search.jsx"));
const Chats = lazy(() => import("./pages/Authenticated/Chats.jsx"));
const Friends = lazy(() => import("./pages/Authenticated/Friends.jsx"));
const Profile = lazy(() => import("./pages/Authenticated/Profile.jsx"));
const Notifications = lazy(() =>
  import("./pages/Authenticated/Notifications.jsx")
);
const Bookmarks = lazy(() => import("./pages/Authenticated/Bookmarks.jsx"));

//all
const About = lazy(() => import("./pages/Shared/About.jsx"));
const Contact = lazy(() => import("./pages/Shared/Contact.jsx"));
const Help = lazy(() => import("./pages/Shared/Help.jsx"));
const Privacy = lazy(() => import("./pages/Shared/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Shared/Terms.jsx"));
const Blog = lazy(() => import("./pages/Shared/Blog.jsx"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authenticated />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/group",
          element: <Group />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/chats/:chatId",
          element: <Chat />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/:id",
          element: <Profile />,
        },
        {
          path: "/bookmarks",
          element: <Bookmarks />,
        },
      ],
    },

    //all
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
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
      errorElement: <Error />,
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
          path: "auth/signup/otp-verfication/:token",
          element: <OtpVerfication />,
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
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
