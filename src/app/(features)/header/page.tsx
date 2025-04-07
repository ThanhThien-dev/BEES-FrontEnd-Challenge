"use client";
import React from "react";
import { useState, useEffect } from "react";
import Switch from "./toggle";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center mb-8">
      {isDarkMode ? (
        <Link href="/">
          <div className="relative flex items-center gap-x-2 mb-4 pt-8 text-white cursor-pointer">
            <Image
              alt="icon bees"
              src="icon-bees.svg"
              width={50}
              height={30}
              priority
            />

            <div className="hidden md:block bg-white w-[1px] h-6 text-white line"></div>

            <Image
              alt="icon bee"
              src="text-bee.svg"
              width={87}
              height={31}
              className="hidden md:block"
              priority
            />
          </div>
        </Link>
      ) : (
        <Link href="/">
          <div className="">
            <Image
              src="/logo.png"
              alt="BEES Group Logo"
              width={160}
              height={80}
              priority
            />
          </div>
        </Link>
      )}
      <Switch checked={isDarkMode} onChange={handleToggleDarkMode} />
    </div>
  );
};

export default Header;
