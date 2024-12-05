"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { Eye, EyeOff, ThumbsUp } from "lucide-react";
import { UserFormContext } from "@/context/UserFormContext";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const context = useContext(UserFormContext);
  if (!context) {
    return <div>...Loading</div>;
  }
  const {
    handleSubmitRegister,
    handleChange,
    inputData,
    isPasswordMatch,
    handleShowPassword,
    showPassword,
    redirectToLogin,
  } = context;
  return (
    <div className=" w-full h-screen flex flex-col smScreen:flex-row items-center overflow-hidden bg-slate-100 text-white">
      {/* Left side */}
      <div className="  flex flex-col bg-cover bg-center justify-center items-center gap-5 w-full md:w-[35%] sm:w-full h-screen colorWave animate-gradient">
        <h1 className="text-4xl font-bold py-3">One Of Us?</h1>
        <h3 className="leading-[2rem] px-2 text-center text-xl">
          If you already have an account, just sign in. We&apos;ve missed you!
        </h3>
        <button
          onClick={redirectToLogin}
          className=" rounded-md bg-white  text-black py-2 px-5 w-1/2 hover:bg-purple-500 hover:text-white"
        >
          Sign In
        </button>
      </div>

      {/* Right side */}
      <div className="md:w-[65%] px-5 h-screen">
        <div className="flex items-center gap-1 py-5">
          <Image src="/logo.png" alt="AF Logo" width={30} height={30} />
          <h1 className="text-xl text-slate-500 font-bold">AF</h1>
        </div>
        <div className="flex flex-col gap-3 mt-32 text-center">
          <h1 className="w-full text-5xl md:w-[90%] mx-auto text-slate-900 font-bold py-3 leading-[4rem]">
            Create Free Account
          </h1>
          <p className="text-slate-700">Sign up using social networks</p>

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
            <hr className="border-t-1 border-slate-400 mx-2 w-[20%]" />
            <span className=" text-slate-400 font-bold"> OR</span>
            <hr className="border-t-1 border-slate-400 mx-2 w-[20%]" />
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmitRegister}>
            <div className="flex flex-col gap-3 w-[70%] mx-auto">
              <input
                value={inputData.username}
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="Name"
                className="rounded-xl py-2 px-5 w-full text-black bg-white"
              />
              <input
                value={inputData.email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Email"
                className=" rounded-xl py-2 px-5 w-full text-black bg-white"
              />
              <div className="relative">
                <input
                  value={inputData.password}
                  onChange={handleChange}
                  id="password"
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  className={` rounded-xl py-2 px-5 w-full text-black bg-white `}
                />

                <div
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-3 top-[26%] cursor-pointer text-slate-400"
                >
                  {showPassword.password ? (
                    <Eye className="h-5" />
                  ) : (
                    <EyeOff className="h-5" />
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  value={inputData.confirmPassword}
                  id="confirmPassword"
                  onChange={handleChange}
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`flex items-center rounded-xl py-2 px-5 w-full bg-white  ${
                    !isPasswordMatch ? "text-black" : "text-red-500"
                  }`}
                />
                <div
                  className={`absolute top-[27%] text-sm right-[10%] ${
                    isPasswordMatch ? "text-red-500" : "text-[#4B9CD3]"
                  }`}
                >
                  {inputData.confirmPassword.length < 4 ? (
                    ""
                  ) : isPasswordMatch ? (
                    <span className="flex items-center gap-2">
                      Password do not match ⚠️
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-green-700 px-3">
                      Password match{" "}
                      <ThumbsUp className="h-5" color="#32CD32" />
                    </span>
                  )}
                </div>
                <div
                  onClick={() => handleShowPassword("confirmPassword")}
                  className="absolute right-3 top-[26%] cursor-pointer text-slate-400"
                >
                  {showPassword.confirmPassword ? (
                    <Eye className="h-5" />
                  ) : (
                    <EyeOff className="h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isPasswordMatch}
              className={` ${
                !isPasswordMatch
                  ? "bg-blue-400  text-white  hover:bg-blue-500"
                  : "bg-slate-300  text-grey cursor-not-allowed"
              } py-2 px-5 my-12 mx-auto w-1/3 transition-all duration-300 rounded-md `}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
