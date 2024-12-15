"use client";
import { Mail, MapPin, ChevronRight } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800/80 to-cyan-500/80 backdrop-blur-md text-gray-300">
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 text-white md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 px-6 ml-12">
          {/* Left section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  className="h-12 w-9"
                  src="/logo.png"
                  alt="DF Logo"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
            <p className="mb-4 text-white">
              Crafting powerful dashboards for modern businesses
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                network="linkedin"
                url="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "35px", height: "35px" }}
              />
              <SocialIcon
                network="twitter"
                url="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "35px", height: "35px" }}
              />
              <SocialIcon
                network="github"
                url="https://www.github.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "35px", height: "35px" }}
              />
            </div>
          </div>

          {/* Middle section - Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Contact", "Blog"].map((item, index) => (
                <li key={item}>
                  <Link
                    href={["/about", "/career", "/contact", "/blog"][index]}
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity -ml-5 mr-1"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle section - Products */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {["Dashboard", "Analytics", "Integration", "Documentation"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors flex items-center group"
                    >
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity -ml-5 mr-1"
                      />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right section - Contact Us */}
          <div id="contact">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={20} className="mr-2" />
                <a
                  href="ac327info@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  contact@AC.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span>Our Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyan-300 py-4">
          <div className="text-center text-slate-100 text-sm sm:text-base">
            © {new Date().getFullYear()} AC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
