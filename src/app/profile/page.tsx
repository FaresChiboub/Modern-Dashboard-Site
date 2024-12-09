"use client";
import Loading from "@/components/loading/loading";
import { UserFormContext } from "@/context/UserFormContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
interface objEntriesState {
  image: string | null;
  upload: boolean;
  success: string;
  error: string;
}
const ProfilePage: React.FC = () => {
  const [objInput, setObjInput] = useState<objEntriesState>({
    image: null,
    upload: false,
    success: "",
    error: "",
  });
  // Reset success and error messages after 3 seconds
  useEffect(() => {
    if (objInput.success || objInput.error) {
      const timeout = setTimeout(() => {
        setObjInput((prev) => ({
          ...prev,
          success: "",
          error: "",
        }));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [objInput.success, objInput.error]);
  const context = useContext(UserFormContext);
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { updateProfileImage } = context;

  // Handle the image preview and upload
  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate file type
    const imgMemeType = /\.(jpe?g|png|gif)$/i.test(file.name);
    if (imgMemeType) {
      // Start the upload process
      setObjInput((prev) => ({
        ...prev,
        image: null,
        upload: true,
        success: "",
        error: "",
      }));

      const reader = new FileReader();
      //Successful upload
      reader.onload = () => {
        setTimeout(() => {
          setObjInput((prev) => ({
            ...prev,
            image: reader.result as string,
            upload: false,
            success: "Image uploaded successfully!",
            error: "",
          }));
          const uploadedImage = reader.result as string;
          updateProfileImage(uploadedImage);
        }, 2000);
      };
      //Failed upload
      reader.onerror = () => {
        setTimeout(() => {
          setObjInput((prev) => ({
            ...prev,
            image: null,
            upload: false,
            success: "",
            error: "Failed to upload image. Please try again.",
          }));
        }, 2000);
      };

      reader.readAsDataURL(file);
    } else {
      //Invalid file type
      setTimeout(() => {
        setObjInput((prev) => ({
          ...prev,
          image: null,
          success: "",
          error: "Invalid file type. Please upload a JPG, PNG, or GIF ⚠️",
          upload: false,
        }));
      }, 2000);
    }
  }

  const picture = objInput.image;
  const uploadingProcess = "Uploading...";

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
        className="w-[200px] bg-blue-500 text-white rounded-sm"
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
        onClick={() => updateProfileImage(objInput.image as string)}
        className="border bg-green-500 mt-8 text-white text-sm font-bold px-5 py-1"
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
