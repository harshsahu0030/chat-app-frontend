import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";
import NavigateBoxSkeleton from "./components/skeletons/NavigateBoxSkeleton";
import AdminHeader from "./components/Admin/AdminHeader";
import { useSelector } from "react-redux";
import PageLoader from "./components/Loader/PageLoader";
import { SocketProvider } from "./Socket";

const LeftAsides = lazy(() =>
  import("./components/Asides").then((module) => ({
    default: module.LeftAsides,
  }))
);
const RightAsides = lazy(() =>
  import("./components/Asides").then((module) => ({
    default: module.RightAsides,
  }))
);

export const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-bg text-text overflow-hidden">
      <header className="h-[8vh] md:h-[5vh] xl:h-[8vh] bg-surface w-full px-2 md:px-4">
        <Header />
      </header>

      <main className="w-full h-fullw-full h-[calc(100vh-8vh)] md:h-[calc(100vh-5vh)] xl:h-[calc(100vh-8vh)] py-2 px-4">
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export const Authentication = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <PageLoader />;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-bg text-text overflow-hidden">
      <header className="h-[8vh] md:h-[5vh] xl:h-[8vh] bg-surface w-full px-2 md:px-4">
        <Header />
      </header>

      <main className="w-full h-fullw-full h-[calc(100vh-8vh)] md:h-[calc(100vh-5vh)] xl:h-[calc(100vh-8vh)] py-2 px-4">
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export const Authenticated = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <SocketProvider>
      <div className="min-h-screen w-full bg-bg text-text overflow-hidden">
        <header className="h-[8vh] sm:h-[10vh] md:h-[5vh] xl:h-[8vh] bg-surface w-full px-2 md:px-4">
          <Header />
        </header>

        <nav className="h-[8vh] w-full fixed left-0 bottom-0 bg-surface sm:hidden px-2 md:px-4">
          <Navbar />
        </nav>

        <main className="w-full grid grid-cols-12 grid-rows-1 gap-5 h-[calc(100vh-8vh)] sm:h-[calc(100vh-10vh)] md:h-[calc(100vh-5vh)] xl:h-[calc(100vh-8vh)] pb-[10vh] sm:pb-0 py-2 px-4">
          {/* left  */}
          <div className="relative h-full w-full hidden xl:flex xl:col-span-3 p-2">
            <Suspense
              fallback={
                <section className="flex flex-col gap-2 w-full">
                  <NavigateBoxSkeleton count={4} />
                </section>
              }
            >
              <LeftAsides />
            </Suspense>
          </div>

          {/* center  */}
          <div className="h-full w-full col-span-12 sm:col-span-8 xl:col-span-6 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface flex justify-center">
            <div className="w-full xl:w-[70%]">
              <Outlet />
            </div>
          </div>

          {/* right  */}
          <div className="relative h-full w-full hidden sm:flex sm:col-span-4 xl:col-span-3 p-2">
            <Suspense
              fallback={
                <section className="flex flex-col gap-2 w-full">
                  <NavigateBoxSkeleton count={4} />
                </section>
              }
            >
              <RightAsides />
            </Suspense>
          </div>
        </main>
      </div>
    </SocketProvider>
  );
};
