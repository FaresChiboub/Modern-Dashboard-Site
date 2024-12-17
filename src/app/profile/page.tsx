"use client";
import Loading from "@/components/loading/loading";
import { UploadImageContext } from "@/context/UploadImageContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const context = React.useContext(UploadImageContext);
  if (!context) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const capitalizeName = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";
  return (
    <div>
      <div className="flex flex-wrap bg-white gap-4 text-black mx-auto justify-center items-center w-full">
        {/* Form Section */}
        <div className="w-full md:w-[48%] p-4">
          <div className="max-w-lg mx-auto">
            <div className="mb-4">
              <form>
                <div className="flex flex-col items-center mb-5">
                  <div className="relative w-36 h-36 mb-4">
                    <Image
                      src={session?.user?.image || "/user.png"}
                      alt="Profile Picture"
                      className="rounded-full"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-1">{capitalizeName}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block font-bold text-slate-600 py-1"
                    >
                      Firstname
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="w-full p-2 border rounded-md bg-white"
                      placeholder={capitalizeName.split(" ")[0]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block font-bold text-slate-600 py-1"
                    >
                      Lastname
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      className="w-full p-2 border rounded-md bg-white"
                      placeholder={capitalizeName.split(" ")[1] || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-bold text-slate-600 py-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border rounded-md bg-white"
                      placeholder={session?.user?.email || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block font-bold text-slate-600 py-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border rounded-md bg-white"
                      placeholder="P.O. Box 464, 5975 Eget Avenue"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-2">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="old-password"
                        className="block font-bold text-slate-600 py-1"
                      >
                        Old Password
                      </label>
                      <input
                        type="password"
                        id="old-password"
                        className="w-full p-2 border rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block font-bold text-slate-600 py-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="w-full p-2 border rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block font-bold text-slate-600 py-1"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="w-full p-2 border rounded-md bg-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Image Section - Hidden on Mobile */}
        <div className="hidden md:block w-[48%] h-screen relative">
          <Image
            src="/settings.jpg"
            alt="Settings Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
