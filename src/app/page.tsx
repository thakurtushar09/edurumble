import { Laptop, Users, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-screen w-full bg-[#2A1458] pl-[5%] pr-[5%] pt-[3%] overflow-hidden">
        
        {/* White spotlight background */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[90%] h-[70%] bg-[#725CAD]/20 blur-3xl rounded-full mt-20"></div>
        </div>

        {/* Navbar */}
        <div className="relative z-10 flex items-center justify-between mx-24">
          <div>
            <h1 className="text-3xl text-white font-extrabold">EduRumble</h1>
          </div>
          <div className="flex items-center gap-7 mr-20">
            <Link href={"/"}>
              <h1 className="text-md font-bold text-white">How it work</h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-md font-bold text-white">Prices</h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-md font-bold text-white">Services</h1>
            </Link>
            <Link href={"/"}>
              <h1 className="text-md font-bold text-white">About us</h1>
            </Link>
            <Link
              href={"/"}
              className="bg-white text-[#7F27FF] px-10 py-3 rounded-lg"
            >
              Login
            </Link>
            <Link
              href={"/"}
              className="bg-[#E4004B] text-white px-10 py-3 rounded-lg"
            >
              Start a new AI journey
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-36 flex items-center justify-between">
          <div className="ml-24">
            <h1 className="text-6xl font-bold leading-tight text-white">
              <span className="text-[#7965C1]">Challenge</span>,
              <span className="text-[#7965C1]"> Compete</span>, and <br />
              Conquer with <span className="text-[#7965C1]">AI-powered</span>{" "}
              <br />
              quizzes & coding battles.
            </h1>
            <h1 className="text-xl mt-3 ml-2 text-white">
              Overwhelmed by too many resources?
            </h1>
            <h1 className="text-xl ml-2 text-white">
              Let AI curate a clear{" "}
              <span className="text-[#7965C1]">learning path for you.</span>
            </h1>
            <Link
              href={"/"}
              className="mt-10 inline-block bg-[#E4004B] text-white px-10 py-3 rounded-lg"
            >
              Start a new AI journey
            </Link>
          </div>

          <div>
            <Image
              src={"/hero-gif.gif"}
              alt="gif"
              height={500}
              width={500}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
