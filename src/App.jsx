import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin, Authenticated, Authentication, Layout } from "./Layout";
import PageLoader from "./components/Loader/PageLoader.jsx";
import Error from "./pages/Error.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userLoad } from "./app/redux/thunk/auth.thunk.js";

//auth
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Signup = lazy(() => import("./pages/Auth/Signup.jsx"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword.jsx"));
const VerifyUser = lazy(() => import("./pages/Auth/VerifyUser.jsx"));

//authenticated
const Home = lazy(() => import("./pages/Authenticated/Home.jsx"));
const Chat = lazy(() => import("./pages/Authenticated/Chat.jsx"));
const Group = lazy(() => import("./pages/Authenticated/Group.jsx"));
const Search = lazy(() => import("./pages/Authenticated//Search.jsx"));
const Chats = lazy(() => import("./pages/Authenticated/Chats.jsx"));
const Friends = lazy(() => import("./pages/Authenticated/Friends.jsx"));
const FriendsRequest = lazy(() =>
  import("./pages/Authenticated/FriendsRequest.jsx")
);
const Profile = lazy(() => import("./pages/Authenticated/Profile.jsx"));
const Notifications = lazy(() =>
  import("./pages/Authenticated/Notifications.jsx")
);
const Bookmarks = lazy(() => import("./pages/Authenticated/Bookmarks.jsx"));
const UpdateProfile = lazy(() =>
  import("./pages/Authenticated/UpdateProfile.jsx")
);
const CreateGroup = lazy(() => import("./pages/Authenticated/CreateGroup.jsx"));

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
      element: <Authentication />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "auth/signup",
          element: <Signup />,
        },
        {
          path: "verify/:token",
          element: <VerifyUser />,
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
  ]);

  const authenticatedRoute = createBrowserRouter([
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
          path: "/groups",
          element: <Group />,
        },
        {
          path: "/groups/create",
          element: <CreateGroup />,
        },
        {
          path: "/users",
          element: <Search />,
        },
        {
          path: "/users/:id",
          element: <Profile />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/chats/:id",
          element: <Chat />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/friends/request",
          element: <FriendsRequest />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/user/update/:id",
          element: <UpdateProfile />,
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
  ]);

  //redux
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  //useEffect
  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  if (loading) return <PageLoader />;

  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider
          router={isAuthenticated ? authenticatedRoute : router}
        />
      </Suspense>
    </div>
  );
};

export default App;
