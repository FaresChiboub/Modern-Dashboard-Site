"use client";
import {
  Mail,
  MapPin,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  LinkIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Widget } from "@uploadcare/react-widget";
import Image from "next/image";

export default function ProfilePage() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen,nextImage,prevImage]);

  const handleUpload = (fileInfo) => {
    setImages((prev) => [...prev, fileInfo.cdnUrl]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#1e3a8a] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8 mt-64">
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
            <div className="relative group">
              <div
                onClick={() => images.length && setIsModalOpen(true)}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-100 transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
              >
                {images.length > 0 ? (
                  <Image
                    src={images[images.length - 1]}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              <Widget
                publicKey="f7c2dae855a003494c4f"
                onChange={handleUpload}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sarah Anderson
            </h1>
            <p className="text-gray-600">Senior Product Designer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Mail className="w-5 h-5" />
                <span>sarah.anderson@example.com</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <LinkIcon className="w-5 h-5" />
                <a
                  href="https://sarahanderson.design"
                  className="hover:underline"
                >
                  sarahanderson.design
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                Passionate product designer with 8+ years of experience creating
                user-centered digital experiences. Specialized in UI/UX design,
                design systems, and creative direction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative">
              <Image
                src={images[currentImageIndex]} // Current image in the modal
                alt="Gallery image"
                className="w-full rounded-lg"
                width={600} // Example width
                height={400} // Example height
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
