"use client";
import React from "react";
import ThemeButton from "../ui/ThemeButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-2 h-14 w-full flex flex-row justify-around items-center  fixed  bg-inherit">
      <strong className="text-4xl font-extrabold">Form</strong>
      <div className="flex flex-row space-x-10 items-center">
        <ThemeButton />
      </div>
    </div>
  );
};

export default Navbar;
