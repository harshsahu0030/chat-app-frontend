import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

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
  let authenticated = true;

  if (!authenticated) {
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
  } else {
    return <Navigate to="/" />;
  }
};

export const Authenticated = () => {
  let authenticated = true;

  if (authenticated) {
    return (
      <div className="min-h-screen w-full bg-bg text-text overflow-hidden">
        <header className="h-[8vh] md:h-[5vh] xl:h-[8vh] bg-surface w-full px-2 md:px-4">
          <Header />
        </header>

        <nav className="h-[8vh] w-full fixed left-0 bottom-0 bg-surface sm:hidden px-2 md:px-4">
          <Navbar />
        </nav>

        <main className="w-full grid grid-cols-12 grid-rows-1 gap-5 h-[calc(100vh-8vh)] md:h-[calc(100vh-5vh)] xl:h-[calc(100vh-8vh)] py-2 px-4">
          {/* left  */}
          <div className="relative h-full w-full hidden xl:flex xl:col-span-3 p-2">
            <div className="absolute top-0 left-0 h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface">
              left
            </div>
          </div>

          {/* center  */}
          <div className="h-full w-full col-span-12 sm:col-span-8 xl:col-span-6 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface">
            <Outlet />
          </div>

          {/* right  */}
          <div className="relative h-full w-full hidden sm:flex sm:col-span-4 xl:col-span-3 p-2">
            <div className="absolute top-0 left-0 h-full w-full overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-bg hover:[&::-webkit-scrollbar-thumb]:bg-surface">
              right
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

const Admin = () => {
  return (
    <div className="min-h-screen h-screen w-full bg-bg text-text px-4">
      <header></header>
      <div className="w-full h-full">
        <nav></nav>

        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
      <footer></footer>
    </div>
  );
};
