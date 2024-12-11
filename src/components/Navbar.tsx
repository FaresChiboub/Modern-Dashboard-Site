"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { UserFormContext } from "@/context/UserFormContext";
import Loading from "./loading/loading";
import { AvatarFallback } from "@radix-ui/react-avatar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  const context = useContext(UserFormContext);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setIsAnimating(true);
    }
  };

  const { user, handleLogout } = context;

  function navigateToRegister() {
    router.push("/register");
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800/80 to-cyan-500/80 z-50  backdrop-blur-2xl shadow-sm`}>
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  className="h-20 w-20"
                  src="/logo.png"
                  alt="AF Logo"
                  width={40}
                  height={40}
                />
              </Link>

              <span className="px-1 text-2xl font-bold text-white"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/blog"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </Link>
            <Link
              href="/dashboard"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="#contact"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <button
                onClick={navigateToRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            ) : (
              <>
                <span className="text-white">
                  Welcome,{" "}
                  {user?.username
                    ? user.username
                        .split(" ")
                        .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
                        .join(" ")
                    : "Guest"}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <Image
                        className="cursor-pointer"
                        src={user?.image || "/user.png"}
                        alt="user image"
                        width={40}
                        height={40}
                      />
                      <AvatarFallback>CV</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-gray-600 hover:text-gray-900 bg-white ">
                    <Link href={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/blog">
                      <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white  ">
                        Blog
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-blue-500 hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen
            ? "block animate-slideIn"
            : isAnimating
            ? "animate-slideOut"
            : "hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3 ml-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <Image
                    src={user?.image || "/user.png"}
                    alt="user image"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                  />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <Link href={"/profile"}>
                  <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/blog">
                  <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                    Blog
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuLabel
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Other links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/blog"
              className="text-white bg-blue-500  hover:bg-blue-400 text-center px-3 py-2 rounded-md text-sm font-bold mt-1"
            >
              Blogs
            </Link>
            <Link
              href="/dashboard"
              className="text-white bg-blue-500 hover:bg-blue-400 text-center px-3 py-2 rounded-md text-sm font-bold mt-1"
            >
              Dashboard
            </Link>
            <Link
              href="#contact"
              className="text-white bg-blue-500 hover:bg-blue-400 text-center px-3 py-2 rounded-md text-sm font-bold mt-1"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-white bg-blue-500 hover:bg-blue-400 text-center px-3 py-2 rounded-md text-sm font-bold mt-1"
            >
              About
            </Link>
            {path !== "/" && (
              <Link
                href="/"
                className="text-white bg-blue-500 hover:bg-blue-400 text-center px-3 py-2 rounded-md text-sm font-bold mt-1"
              >
                Home
              </Link>
            )}
          </div>
          {!user && !session && (
            <button
              onClick={navigateToRegister}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .animate-slideIn {
            animation: slideIn 0.9s ease-in-out forwards;
          }

          .animate-slideOut {
            animation: slideOut 0.7s ease-in-out forwards;
          }

          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateY(-200%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideOut {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-100%);
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
