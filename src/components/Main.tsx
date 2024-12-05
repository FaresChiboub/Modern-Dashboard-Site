"use client";
import Image from "next/image";
import {
  CheckCircle,
  BarChart2,
  Clock,
  Users,
  Mail,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
export default function Main() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("/api/newsletterRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to subscribe");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  }
  const benefits = [
    "Weekly data insights and analysis trends",
    "Exclusive dashboard templates and tutorials",
    "Early access to new features and updates",
    "Data visualization best practices and tips",
  ];
  const features = [
    {
      icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
      title: "Real-time Analytics",
      description:
        "Get instant insights with live data updates and dynamic visualizations.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Quick Setup",
      description:
        "Set up your dashboard in minutes with our intuitive drag-and-drop interface.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with built-in sharing and commenting features.",
    },
  ];
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      company: "TechCorp",
      image: "/images/user4.png",
      content:
        "This dashboard solution has transformed how we analyze and present data. The real-time updates are game-changing.",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      image: "/images/user1.png",
      content:
        "The intuitive interface and powerful features have made our team's workflow so much more efficient.",
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "DataDrive",
      image: "/images/user7.png",
      content:
        "We've seen a 40% increase in productivity since implementing this dashboard solution.",
    },
  ];
  return (
    <div className="bg-white py-4 lg:py-32">
      <div className="mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Powerful Features for Data-Driven Teams
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your data into actionable insights with our comprehensive
            dashboard solution. Built for teams who demand power and simplicity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl transform -rotate-1"></div>
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <Image
              className="h-auto w-full rounded-2xl shadow-2xl"
              src={"/dashboards-banner.jpg"}
              alt="New Dashboard Preview"
              width={900}
              height={300}
            />
          </div>
          <div className="absolute -right-4 -bottom-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-4 text-white transform rotate-3">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-blue-800 to-cyan-400 bg-clip-text text-transparent">
            Trusted by Data Teams Everywhere
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={90}
                    height={90}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="relative overflow-hidden bg-gray-50 py-16 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50"></div>
          <div className="relative mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Stay Ahead of the Curve
                  </span>
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join our newsletter and get the latest insights on data
                  analytics, dashboard design, and team productivity delivered
                  straight to your inbox.
                </p>

                <ul className="mt-8 space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                  <div className="bg-white shadow-lg rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full text-black bg-slate-100 p-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        {status === "loading" ? (
                          "Subscribing..."
                        ) : (
                          <>
                            <Mail className="h-5 w-5 mr-2" />
                            Subscribe to Newsletter
                          </>
                        )}
                      </button>
                    </form>

                    {status === "success" && (
                      <div className="mt-4 rounded-lg bg-green-50 p-4">
                        <div className="flex">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              Successfully subscribed! Check your email for
                              confirmation.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="mt-4 rounded-lg bg-red-50 p-4">
                        <div className="flex">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">
                              Oops! Something went wrong. Please try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <p className="mt-4 text-center text-sm text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Choose the Perfect Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Select the best plan for your team&apos;s needs. All plans include
              our core features with different levels of capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Basic Plan */}
            <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
                <p className="mt-2 text-gray-600">
                  Perfect for getting started
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">Up to 5 team members</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">5 dashboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">Daily data updates</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="relative p-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="bg-yellow-400 text-gray-900 text-sm font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Premium</h3>
                <p className="mt-2 text-blue-100">Best for growing teams</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-blue-100">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Up to 20 team members</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Unlimited dashboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Real-time updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Priority support</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="relative p-8  text-black rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="mt-2">For large organizations</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 " />
                  <span className="">Unlimited team members</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 " />
                  <span className="">Custom analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 " />
                  <span className="">Unlimited dashboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 " />
                  <span className="">24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 " />
                  <span className="">Custom integrations</span>
                </li>
              </ul>

              <button className="w-full py-3 px-4 rounded-lg border-2 border-blue-400 bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
