"use client";
import React, { useContext, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
import { UserFormContext } from "@/context/UserFormContext";

const VerifyPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const context = useContext(UserFormContext);
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { handleLogout } = context;

  // State to track OTP input as a single string (6 digits)

  // Validate OTP: should be a numeric 6-digit number
  const validateOtp = (otpCode: string) => {
    const otpNumber = Number(otpCode);
    return (
      otpCode.length === 6 &&
      !isNaN(otpNumber) &&
      otpNumber >= 100000 &&
      otpNumber <= 999999
    );
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOtp = e.target.value;
    // Ensure only numbers are entered and the length doesn't exceed 6
    if (/^\d{0,6}$/.test(newOtp)) {
      setOtp(newOtp);
    }
  };

  async function handleSubmit() {
    if (!validateOtp(otp)) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        action: <ToastAction altText="Error">Error</ToastAction>,
      });
      return;
    }

    try {
      const response = await fetch("/api/verifyRouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          variant: "default",
          title: "Account Verified Successfully",
          description: "Account Verified and Ready",
          style: {
            backgroundColor: "#3B82F6",
            color: "white",
          },
          action: <ToastAction altText="Verified">Verified</ToastAction>,
        });
        router.replace("/");
      } else if (data.error) {
        toast({
          variant: "destructive",
          title: "Error: Failed to verify Account",
          description: "Wrong Verification Code. Try another.",
          action: <ToastAction altText="Error">Error</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while verifying your email.",
        action: <ToastAction altText="Error">Error</ToastAction>,
      });
    }
  }

  return (
    <div className="h-screen bg-white text-2xl text-black font-bold flex justify-center items-center flex-col">
      <h1 className="text-black py-10">Enter Verification Code</h1>
      <div className="py-4">
        {/* Custom input area for OTP */}
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
          className="h-16 w-64 text-3xl bg-black text-white text-center border-2 border-gray-300 rounded-lg"
          placeholder="Enter OTP"
          inputMode="numeric"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="text-sm border rounded-lg mt-6 px-11 py-3 bg-blue-500 text-white"
        type="button"
      >
        Submit
      </button>
      <div className=" border-x-2 px-5 border-y-2 border-dotted border-black flex flex-col py-3 items-center justify-center mt-12">
        <p className="py-3 text-sm ml-5">
          Can&apos;t access Verification code ?
        </p>
        <button
          onClick={handleLogout}
          className="text-sm border rounded-lg  px-11 py-3 bg-red-500 text-white"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
