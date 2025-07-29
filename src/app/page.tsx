import Image from "next/image";
import { Laptop, Users, BrainCircuit } from "lucide-react";
import { CardSpotlightDemo } from "@/components/card-spotlight";

export default function Home() {
  const services = [
  {
    icon: Laptop,
    title: "AI-Generated Quizzes",
    description: "Teachers can instantly create smart quizzes tailored to subject, topic, and difficulty using OpenAI."
  },
  {
    icon: Users,
    title: "Compete with Friends",
    description: "Students can join private rooms to challenge friends in real-time coding battles or quizzes."
  },
  {
    icon: BrainCircuit,
    title: "Smart Feedback & Analytics",
    description: "AI provides instant answer explanations and personalized insights to help students improve faster."
  }
];
  return (
    <div className="min-h-screen bg-black text-white w-full relative">
      {/* Navbar */}
      <div className="p-6 px-10 flex items-center justify-between fixed w-full top-0 z-50 ">
        <h1 className="text-3xl font-extrabold text-white"><span className="text-violet-500">Edu</span><span className="text-green-500">Rumble</span></h1>
        <div>
          {/* Add nav links/buttons if needed */}
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-32 px-10 gap-10">
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Level Up Your <span className="text-green-500">Skill</span> with <span className="text-blue-500">AI-Powered</span> Challenges
          </h2>
          <p className="text-lg text-gray-300">
            Compete in quizzes, crack coding challenges, and create private rooms to battle it out with friends. 
            Teachers can generate smart quizzes using AI and track student progress effortlessly.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
              Get Started
            </button>
            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <Image
            src="/hero-image.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>


      {/*card section */}

      <div className="w-full max-w-7xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {services.map((service, index) => (
            <div key={index} className="flex justify-center">
              <CardSpotlightDemo
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="w-full max-w-[350px] md:max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
