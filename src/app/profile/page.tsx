"use client";
import Loading from "@/components/loading/loading";
import { UploadImageContext } from "@/context/UploadImageContext";
import React from "react";

const ProfilePage: React.FC = () => {
  const context = React.useContext(UploadImageContext);
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const {
    updateProfileImage,
    picture,
    uploadingProcess,
    objInput,
    handleImageUpload,
  } = context;
  return (
    <div className="h-screen bg-white flex justify-center items-center gap-7 flex-col">
      {/* Image Preview Section */}
      <div
        className={`h-80 w-80 bg-slate-200 flex items-center justify-center opacity-100 rounded-[50%] 
            ${picture ? "opacity-100" : "opacity-50"} 
            transition-opacity duration-1000 ease-in-out`}
        style={{
          backgroundImage: picture ? `url(${picture})` : "",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!picture && <span className="text-gray-400 text-xl">No Image</span>}
      </div>

      {/* Uploading Message */}
      {objInput.upload && (
        <span
          className={`transition-opacity duration-1800 ease-in-out text-blue-500 font-bold flex items-center justify-center 
            opacity-100 `}
        >
          {uploadingProcess}
        </span>
      )}

      {/* File Input */}
      <input
        type="file"
        className="w-[250px] bg-black rounded-md flex text-md file:py-2 file:px-4 file:mr-4 file:border-0 file:text-white file:bg-blue-500 file:rounded-md file:cursor-pointer"
        onChange={handleImageUpload}
      />

      {/* Success and Error Messages with Keyframes */}
      {objInput.success && (
        <div className="message success">
          <span className="text-green-500 font-bold flex items-center justify-center">
            {objInput.success}
          </span>
        </div>
      )}

      {objInput.error && (
        <div className="message error">
          <span className="text-red-500 font-bold flex items-center justify-center">
            {objInput.error}
          </span>
        </div>
      )}
      <button
        disabled={objInput.image ? false : true}
        onClick={() => updateProfileImage(objInput.image as string)}
        className={`${
          !objInput.image
            ? "border bg-gray-300 mt-8 text-white text-sm font-bold px-5 py-1 cursor-not-allowed rounded-md"
            : "border bg-green-900 mt-8 rounded-md text-white text-sm font-bold px-5 py-1"
        }`}
      >
        Set Profile Image
      </button>

      {/* Keyframes CSS */}
      <style jsx>{`
        /* Keyframes for fade-in */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        /* Keyframes for fade-out */
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
          }
        }

        /* Success Message Fade-In Animation */
        .message.success {
          animation: fadeIn 1s ease-in-out, fadeOut 5s ease-in-out forwards;
        }

        /* Error Message Fade-In Animation */
        .message.error {
          animation: fadeIn 1s ease-in-out, fadeOut 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
