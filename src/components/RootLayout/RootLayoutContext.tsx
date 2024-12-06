"use client";
import UserFormContextProvider from "@/context/UserFormContext";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../loading/loading";
import { useEffect, useState } from "react";

export default function RootLayoutContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLoading, setShowLoading] = useState(true);
  const { status: sessionStatus } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    // Check if the session is loading
    if (sessionStatus === "loading") {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 1800); 
    }
    return () => clearTimeout(timer);
  }, [sessionStatus]);

  if (sessionStatus === "loading" || showLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <main>
      <UserFormContextProvider>
        {pathname !== "/login" &&
          pathname !== "/register" &&
          pathname !== "/verify" &&
          pathname !== "/dashboard" && <Navbar />}
        {children}
        {pathname !== "/login" &&
          pathname !== "/register" &&
          pathname !== "/verify" &&
          pathname !== "/dashboard" && <Footer />}
      </UserFormContextProvider>
    </main>
  );
}
