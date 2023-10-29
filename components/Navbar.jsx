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

const Navbar = () => {
  const { logOut } = UserAuth();
  const { user } = checkAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full shadow-sm border-b-[2px]">
      <header className="bg-white flex justify-between items-center w-[92%] mx-auto container">
        <Link href={`/`}>
          <h2 className="cursor-pointer titillium-web font-bold py-4 text-3xl">
            <span className="text-blue-500">f</span>it
            <span className="text-blue-500">l</span>og
          </h2>
        </Link>
        {/* <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="hover:text-gray-500" href="#">
                Products
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Solution
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Resource
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Developers
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div> */}

        <div className="flex items-center gap-2">
          {!user ? null : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:r0:"
                  data-state="closed"
                >
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
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={handleSignOut}
                  className="cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
                <Link href={`/profile`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
