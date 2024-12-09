import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const context = useContext(UserFormContext);
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { user, handleLogout } = context;

  function navigateToRegister() {
    router.push("/register");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800/80 to-cyan-500/80 z-50  backdrop-blur-2xl shadow-sm">
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
                        src={user?.image || "img.png"}
                        alt="user image"
                        width={40}
                        height={40}
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-gray-600 hover:text-gray-900 bg-white ">
                    <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                      Profile
                    </DropdownMenuItem>
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
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
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
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md">
          {session && (
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
                  <DropdownMenuItem className="cursor-pointer hover:bg-blue-500 hover:text-white ">
                    Profile
                  </DropdownMenuItem>
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
                  <DropdownMenuLabel onClick={handleLogout}>
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Other links */}
          <Link
            href="#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Features
          </Link>
          <Link
            href="#solutions"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Solutions
          </Link>
          <Link
            href="#pricing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            About
          </Link>

          {!session && (
            <button
              onClick={navigateToRegister}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
