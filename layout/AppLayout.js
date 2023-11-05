"use client";

import { NavbarX } from "@/components/Navbar";
import LoginComponent from "@/components/LoginComponent";

import { Toaster } from "@/components/ui/toaster";

import checkAuth from "@/hooks/checkAuth";

const AppLayout = ({ children }) => {
  const { user, loading } = checkAuth();
  return (
    <>
      <NavbarX />
      <Toaster />
      {loading ? null : !user ? (
        <>
          <LoginComponent />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AppLayout;
