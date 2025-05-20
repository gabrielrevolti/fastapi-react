import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Layout = () => {
  return (
    <>
      <main className="containerLayout">
        <Header />
        <div className="containerFlexItems">
        <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;