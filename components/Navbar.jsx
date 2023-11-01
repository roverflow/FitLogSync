import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import checkAuth from "@/hooks/checkAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NavData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Your programs",
    link: "/your-programs",
  },
  {
    title: "Create",
    link: "/create-program",
  },
  {
    title: "Profile",
    link: "/profile",
    mobile: true,
  },
  {
    title: "Logout",
    mobile: true,
    button: true,
  },
];

export const NavbarX = () => {
  const { logOut } = UserAuth();
  const { user } = checkAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [showSubMenu, setShowSubMenu] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSubmenu = (title) => {
    if (showSubMenu === title) {
      setShowSubMenu("");
    } else {
      setShowSubMenu(title);
    }
  };

  return (
    <>
      <div
        className={`z-50 w-full bg-white shadow-sm border-b-[2px] ${
          showMobileMenu ? "h-[100vh]" : "h-[8vh]"
        } bg-opacity-30 backdrop-blur-xl backdrop-filter`}
      >
        <nav className="w-full h-full flex flex-col justify-center items-center">
          <div className="container flex justify-between xl:px-36">
            <div>
              <Link href="/" className="flex items-center py-2">
                <h2 className="cursor-pointer titillium-web font-bold py-2 text-3xl">
                  <span className="text-blue-500">f</span>it
                  <span className="text-blue-500">l</span>og
                </h2>
              </Link>
            </div>
            {user && (
              <>
                <div className="hidden items-center gap-6 md:gap-12 lg:flex">
                  {NavData.map((nav, i) => {
                    if (nav.mobile) return null;
                    return (
                      <Link
                        href={nav.link}
                        className="relative group/menu py-2 text-blue-500 font-semibold hover:text-blue-700 hover:border-b-2"
                        key={i}
                      >
                        <div className="flex cursor-pointer items-center justify-between gap-1">
                          <span className="text-base">{nav.title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="hidden items-center justify-between gap-3 lg:flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="inline-flex hover:bg-gray-100 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        <svg
                          className=" h-4 w-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <Link href={`/profile`}>
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onSelect={handleSignOut}
                        className="cursor-pointer text-red-500"
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center lg:hidden">
                  <button
                    className="rounded-full bg-blue-500 px-4 py-2 text-white font-bold"
                    onClick={() => setShowMobileMenu((val) => !val)}
                  >
                    {showMobileMenu ? "Close" : "Menu"}
                  </button>
                </div>
              </>
            )}
          </div>
          {user && (
            <div
              className={`mobile-menu z-30 ${
                showMobileMenu ? "" : "hidden"
              } h-screen w-full p-6`}
            >
              {NavData.map((nav, i) => {
                if (nav.button)
                  return (
                    <button
                      className="mt-2 w-full bg-red-500 p-2 text-white rounded hover:bg-red-600"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  );
                return (
                  <div className="mb-3 border-b border-gray-600 py-2" key={i}>
                    <>
                      <div className="flex cursor-pointer items-center justify-between gap-1 font-bold">
                        <Link
                          href={nav.link}
                          className="text-base"
                          onClick={() => setShowMobileMenu((val) => !val)}
                        >
                          {nav.title}
                        </Link>
                      </div>
                    </>
                  </div>
                );
              })}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
