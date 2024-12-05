"use client";
import { useState } from "react";
import { Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import posts from "./posts.json";

export default function BlogGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <main className="mt-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="block">
              <article className="bg-white rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                <div className="relative flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-62 object-cover"
                    width={300}
                    height={300}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-grow">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-5 line-clamp-3 text-base leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 gap-5">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="font-medium">{post.author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <time dateTime={post.date} className="font-medium">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center text-slate-300  gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow-md text-slate-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 font-black rounded-full ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                } font-medium shadow-md transition-colors duration-200`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow-md text-slate-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </main>
  );
}
