import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <main className="containerLayout">
        <Header />
        <div className="containerFlexItems">
        <Outlet />
        </div>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            pauseOnFocusLoss={false}
            hideProgressBar={false}
            pauseOnHover={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable
            theme="colored"
          />
      </main>
    </>
  );
};

export default Layout;