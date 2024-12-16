"use client";
import React, {
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { Eye, EyeOff } from "lucide-react";
import { UserFormContext } from "@/context/UserFormContext";
import { signIn } from "next-auth/react";
import { zxcvbnAsync } from "@zxcvbn-ts/core";
import PasswordMeter from "../password-meter/PasswordMeter";
import { ZxcvbnResult } from "@zxcvbn-ts/core";



// Custom hook for password strength
const usePasswordStrength = (password: string) => {
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    if (deferredPassword) {
      zxcvbnAsync(deferredPassword).then((response) => setResult(response));
    }
  }, [deferredPassword]);

  return result;
};

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

  // Call the hook to get the password strength
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = usePasswordStrength(inputData.password);
  const score = result?.score ?? 0;
  const passwordStrengthScore = inputData.password ? score : null;

  return (
    <div className="w-full h-screen flex flex-col smScreen:flex-row items-center overflow-hidden bg-slate-100 text-white">
      {/* Left side */}

      <div className="flex flex-col bg-cover bg-center justify-center items-center gap-5 w-full md:w-[35%] sm:w-full h-screen colorWave animate-gradient">
        <div className="flex items-center justify-center gap-1 py-5">
          <Image src="/logo.png" alt="AC Logo" width={60} height={60} />
        </div>
        <h1 className="text-4xl font-bold py-3">One Of Us?</h1>
        <h3 className="leading-[2rem] px-2 text-center text-xl">
          If you already have an account, just sign in. We&apos;ve missed you!
        </h3>
        <button
          onClick={redirectToLogin}
          className="rounded-md bg-white text-black py-2 px-5 w-1/2 hover:bg-purple-500 hover:text-white"
        >
          Sign In
        </button>
      </div>

      {/* Right side */}
      <div className="md:w-[65%] px-5 h-screen flex flex-col justify-center">
        <div className="flex flex-col gap-3  text-center">
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
            <span className="text-slate-400 font-bold"> OR</span>
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
                required
                placeholder="Name"
                className="z-50 rounded-xl py-2 px-5 w-full text-black bg-white"
              />
              <input
                value={inputData.email}
                onChange={handleChange}
                id="email"
                required
                type="email"
                placeholder="Email"
                className="z-50 rounded-xl py-2 px-5 w-full text-black bg-white"
              />
              <div className="relative flex flex-col items-center">
                {/* Password */}
                <input
                  value={inputData.password}
                  onChange={handleChange}
                  id="password"
                  required
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  className="z-50 rounded-xl py-2 px-5 w-full text-black bg-white"
                />

                {/* Toggle Password Visibility */}
                <div
                  onClick={() => handleShowPassword("password")}
                  className=" z-50 absolute right-3 top-[26%] cursor-pointer text-slate-400"
                >
                  {showPassword.password ? (
                    <Eye className="h-5" />
                  ) : (
                    <EyeOff className="h-5" />
                  )}
                </div>
              </div>
              {/* Password Meter */}
              {inputData.password && (
                <div className="z-50">
                  <PasswordMeter score={passwordStrengthScore} />
                </div>
              )}
              <div className="relative flex items-center">
                {/* Confirm Password */}
                <input
                  value={inputData.confirmPassword}
                  id="confirmPassword"
                  onChange={handleChange}
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className={`z-50 flex items-center rounded-xl py-2 px-5 w-full bg-white ${
                    !isPasswordMatch ? "text-black" : "text-red-500"
                  }`}
                />
                <div
                  className={`z-50 absolute top-12 right-0 text-sm ${
                    isPasswordMatch ? "text-red-500" : "text-[#4B9CD3]"
                  }`}
                >
                  {inputData.confirmPassword.length < 4 ? (
                    ""
                  ) : isPasswordMatch ? (
                    <span className="border rounded-md bg-red-700 px-2 text-white flex items-center gap-2 font-bold text-[10px]">
                      Password don&apos;t match ⚠️
                    </span>
                  ) : (
                    <span className="border bg-green-700 rounded-md font-bold flex items-center gap-2 text-[10px] text-white px-3">
                      Password Match
                    </span>
                  )}
                </div>
                <div
                  onClick={() => handleShowPassword("confirmPassword")}
                  className="z-50 absolute right-3 top-[25%] cursor-pointer text-slate-400"
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
              className={`${
                !isPasswordMatch
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-slate-300 text-grey cursor-not-allowed"
              } py-2 px-5 my-12 mx-auto w-1/3 transition-all duration-300 rounded-md`}
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
