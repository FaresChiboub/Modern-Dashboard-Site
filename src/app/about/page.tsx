import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src="/banner.jpg" 
          alt="About Us"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg">
              We are passionate about creating incredible experiences on the
              web. With a focus on innovation, we build user-centric solutions
              that help businesses grow and succeed.
            </p>
          </div>
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-400 to-cyan-500 mb-4 bg-clip-text text-transparent mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8">
          Our mission is to help businesses and individuals succeed online by
          providing cutting-edge web development solutions, optimized for
          performance, security, and user experience.
        </p>

        <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-400 to-cyan-500 mb-4 bg-clip-text text-transparent mb-6">What We Do</h2>
        <p className="text-lg text-gray-700 mb-8">
          We specialize in building modern, scalable, and responsive websites
          and applications. Whether it's an e-commerce store, corporate
          website, or a custom-built web app, we bring your vision to life with
          attention to detail and the latest technologies.
        </p>

        <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-400 to-cyan-500 mb-4 bg-clip-text text-transparent mb-6">Lorem Ipsum</h2>
        <p className="text-lg text-gray-700 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
          lacinia arcu eget nulla. Nulla vitae massa eu nisl tempus convallis
          quis ac lectus. Donec odio urna, euismod in, auctor ut, sollicitudin
          ac, orci. Donec laoreet nonummy augue. Morbi purus libero, faucibus
          adipiscing, commodo quis, gravida id, est. Vivamus a ante congue,
          imperdiet eros. Sed dapibus, ligula et lacinia, risus elit posuere
          odio, et tincidunt ipsum metus sit amet enim.
        </p>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold bg-gradient-to-tl from-blue-500 to-black bg-clip-text text-transparent mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/images/user11.png" 
                alt="Team Member 1"
                className="w-24 h-24 rounded-full mx-auto mb-4"
                width={96}
                height={96}
              />
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/user2.png" // Replace with your own image
                alt="Team Member 2"
                className="w-24 h-24 rounded-full mx-auto mb-4"
                width={96}
                height={96}
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/user4.png" // Replace with your own image
                alt="Team Member 3"
                className="w-24 h-24 rounded-full mx-auto mb-4"
                width={96}
                height={96}
              />
              <h3 className="text-xl font-semibold text-gray-800">Sara Lee</h3>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
