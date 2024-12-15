"use client";
import { Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import postData from "./id-posts.json";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Post-related types
interface Section {
  title: string;
  content: string;
  quote: string;
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface RelatedPost {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface Post {
  id: string | number;
  title: string;
  image: string;
  category: string;
  date: string;
  author: Author;
  content: {
    introduction: string;
    sections: Section[];
  };
  relatedPosts: RelatedPost[];
  excerpt?: string;
}

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);

  // Unwrap the params using React.use() hook
  const { id } = useParams() as { id: string };

  useEffect(() => {
    // Find the post based on the id from the URL
    const foundPost = postData.find((post) => post.id.toString() === id);
    setPost(foundPost as Post | null);
  }, [id]);

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-center text-gray-600 mt-12">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft size={20} />
                Back to Blog
              </Link>
              <span className="-translate-y-2 px-3 py-1 text-sm font-medium ml-2 bg-blue-600 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                  width={70}
                  height={70}
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-m text-slate-700 mb-8">
            {post.content.introduction}
          </p>

          {post.content.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-300 to-cyan-700 mb-4 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <p className="mb-6 text-black">{section.content}</p>
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700">
                {section.quote}
              </blockquote>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 my-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white">
            <Share2 size={20} />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full  bg-blue-400 hover:bg-blue-500 text-white">
            <Bookmark size={20} />
            Save
          </button>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h3 className="font-bold text-xl bg-gradient-to-tl from-blue-300 to-cyan-700 mb-4 bg-clip-text text-transparent">
                About {post.author.name}
              </h3>
              <p className="text-gray-600">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-300 to-cyan-700 mb-4 bg-clip-text text-transparent">
            Related post
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {post.relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="group block bg-gradient-to-tl from-blue-300 to-cyan-700 mb-4 bg-clip-text text-transparent bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${relatedPost.id}`} passHref>
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-medium text-black">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 group-hover:text-blue-500 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
