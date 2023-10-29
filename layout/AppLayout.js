"use client";

import Navbar from "@/components/Navbar";
import LoginComponent from "@/components/LoginComponent";

import checkAuth from "@/hooks/checkAuth";

const AppLayout = ({ children }) => {
  const { user, loading } = checkAuth();

  return (
    <>
      <Navbar />
      {loading ? null : !user ? <LoginComponent /> : <>{children}</>}
    </>
  );
};

export default AppLayout;
