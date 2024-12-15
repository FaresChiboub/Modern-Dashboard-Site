"use client";
import React from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { UserFormContext } from "@/context/UserFormContext";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const context = useContext(UserFormContext);
  if (!context) {
    return <div>...Loading</div>;
  }

  const {
    handleSubmitLogin,
    handleChange,
    inputData,
    redirectToRegister,
    showPassword,
    handleShowPassword,
  } = context;
  return (
    <div className=" bg-slate-100 w-full h-screen flex flex-col smScreen:flex-row justify-center overflow-hidden">
      {/* Left side */}
      <div className="md:w-[65%] px-5 h-screen flex flex-col justify-center">
        <div className="flex flex-col gap-3 text-center ">
          <h1 className="w-full text-5xl md:w-[90%] mx-auto text-slate-900 font-bold py-3 leading-[4rem]">
            Login to Your Account
          </h1>
          <p className="text-slate-700">Login using social networks</p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center mt-4 gap-3">
            <SocialIcon
              network="google"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={() => signIn("google")}
            />
            <SocialIcon
              network="github"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={() => signIn("github")}
            />
          </div>

          {/* OR Divider */}
          <div className="flex justify-center items-center mt-4">
            <hr className="border-t-1 border-slate-300 mx-2 w-[20%]" />
            <span className=" text-slate-400 font-bold"> OR</span>
            <hr className="border-t-1 border-slate-300 mx-2 w-[20%]" />
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmitLogin}>
            <div className="flex flex-col gap-4 w-[70%] mx-auto">
              <input
                id="email"
                value={inputData.email}
                type="email"
                onChange={handleChange}
                placeholder="Email"
                className="bg-white rounded-xl py-2 px-5 w-full text-black"
              />
              <div className="relative">
                <input
                  id="password"
                  value={inputData.password}
                  onChange={handleChange}
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  className=" rounded-xl py-2 px-5 w-full bg-white text-black"
                />
                <div
                  className="absolute right-3 top-[27%] cursor-pointer text-slate-500"
                  onClick={() => handleShowPassword("password")}
                >
                  {showPassword.password ? (
                    <Eye className="h-5" />
                  ) : (
                    <EyeOff className="h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button className="bg-blue-400 text-white py-2 px-5 my-5 mx-auto w-[20%] transition-all duration-300 hover:bg-blue-500 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="colorWave flex flex-col text-white bg-cover bg-center justify-center items-center gap-5 w-full md:w-[35%] sm:w-full h-screen  animate-gradient">
        <div className="flex flex-col justify-center gap-1 py-5 px-2">
          <Image src="/logo.png" alt="AC Logo" width={60} height={60} />
        </div>
        <h1 className="text-4xl font-bold py-3">New Here?</h1>
        <h3 className="leading-[2rem] px-2 text-center text-xl">
          Sign up and discover a great amount of new opportunities!
        </h3>
        <button
          onClick={redirectToRegister}
          className=" rounded-md bg-white  text-black py-2 px-5 w-1/2 hover:bg-purple-500 hover:text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
