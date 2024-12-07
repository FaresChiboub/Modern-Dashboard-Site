"use client";
import React, { MouseEventHandler, useEffect } from "react";

const TestPage = () => {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_ID;
  if (!recaptchaSiteKey) {
    throw new Error("Failed to load Environment Variable !");
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(recaptchaSiteKey, { action: "submit" })
        .then((token: string) => {
          console.log(token);
          fetch("/api/recaptchaRoute", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        });
    });
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => "recaptcha script loaded successfully";
    script.onerror = () => "recaptcha script failed to load";
  }, [recaptchaSiteKey]);
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        className="bg-blue-500 text-white border py-1 px-5 rounded-md"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default TestPage;
