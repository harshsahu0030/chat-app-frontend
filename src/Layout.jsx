import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";

export const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-bg text-text px-4">
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export const Authentication = () => {
  let authenticated = false;

  if (!authenticated) {
    return (
      <div className="min-h-screen w-full bg-bg text-text px-4">
        <header className="h-15 md:h-20 w-full py-2">
          <Header />
        </header>

        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export const Authenticated = () => {
  let authenticated = false;

  if (authenticated) {
    return (
      <div className="min-h-screen w-full bg-bg text-text px-4">
        <header></header>
        <div className="w-full h-full">
          <nav></nav>
          <main className="w-full h-full">
            <Outlet />
          </main>
          <aside></aside>
        </div>
        <footer></footer>
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
