import React from "react";
import Image from "next/image";
export default function Hero() {
  const images = [
    "/images/user1.png",
    "/images/user2.png",
    "/images/user3.png",
    "/images/user4.png",
  ];
  return (
    <div className="relative overflow-hidden bg-gray-50 pt-16 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
      <div className="relative mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Content Section */}
          <div className="items-center flex flex-col lg:items-start justify-center">
            <h1 className="text-4xl lg:text-start text-center font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-fade-in py-5 mt-32">
              Transform Your Data Into Insights
            </h1>
            <p className="mt-6 text-lg text-center lg:text-start text-gray-600">
              Create powerful, interactive dashboards in minutes. Monitor your
              metrics, analyze trends, and make data-driven decisions with our
              intuitive dashboard platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                Get Started Free
              </button>
              <button className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {images.map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8  rounded-full ring-2 ring-white"
                  >
                    <Image
                      className="h-full w-full rounded-full object-cover"
                      src={i}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Trusted by 10,000+ data professionals
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative">
              <Image
                className="h-[26rem] rounded-2xl shadow-md  lg:mt-32 mx-auto object-cover"
                src="/hero.jpg"
                alt="robot pic"
                width={700}
                height={700}
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 h-40 w-40 animate-blob bg-purple-100 opacity-20 blur-3xl filter"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 animate-blob animation-delay-2000 bg-blue-100 opacity-20 blur-3xl filter"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
