"use client";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import React from "react";
import { useEffect } from "react";
const Homepage = () => {
  useEffect(() => {
    // If redirected from the login/register page, reload the page
    const redirectedFromLoginOrRegister =
      window.location.search.includes("redirected=true");
    if (redirectedFromLoginOrRegister) {
      window.location.reload();
    }
  }, []);
  return (
    <div className="">
      <div className="h-full">
        <Hero />
      </div>
      <div className="h-full">
        <Main />
      </div>
    </div>
  );
};

export default Homepage;
