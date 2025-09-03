import { Laptop, Users, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative min-h-screen w-full bg-[#160647] pl-[5%] pr-[5%] pt-[3%] rounded-b-[150px]">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[50%] h-[90%] bg-[#725CAD]/20 blur-3xl rounded-full mb-[70%]"></div>
        </div>

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
              href={"/login"}
              className="bg-white text-[#7F27FF] px-10 py-3 rounded-lg"
            >
              Login
            </Link>
            <Link
              href={"/sign-up"}
              className="bg-[#E4004B] text-white px-10 py-3 rounded-lg"
            >
              Start a new AI journey
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-24 flex items-center justify-between">
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

        <div className="w-full mt-15 mx-auto text-center relative z-10">
          <h1 className="text-4xl text-white font-bold">
            Struggling to stay consistent? Let AI guide you with <br /><span className="text-[#7965C1]">quizzes, roadmaps, </span>and <span className="text-[#7965C1]">live coding challenges.</span>
          </h1>
        </div>


        <div className="h-[150vh] mx-12 flex">
          <div className="flex-1  border-x-2 border-dashed border-white/10">
            <div className="bg-red h-[30%] w-[40%] mx-auto mt-15 flex items-center flex-col">
              <div className="h-[50%] w-[80%] rounded-full bg-[#23115D] flex items-center justify-center">
                <Laptop className="w-1/3 h-1/3 text-white" />
              </div>
              <h1 className="text-md text-center mt-3">This is the sample text and more sample are there</h1>
            </div>
          </div>
          <div className="flex-1 border-r-2 border-dashed border-white/10">
            <div className="bg-red h-[30%] w-[40%] mx-auto mt-15 flex items-center flex-col">
              <div className="h-[50%] w-[80%] rounded-full bg-[#23115D] flex items-center justify-center">
                <Laptop className="w-1/3 h-1/3 text-white" />
              </div>
              <h1 className="text-md text-center mt-3">This is the sample text and more sample are there</h1>
            </div>
          </div>
          <div className="flex-1 border-r-2 border-dashed border-white/10">
            <div className="bg-red h-[30%] w-[40%] mx-auto mt-15 flex items-center flex-col">
              <div className="h-[50%] w-[80%] rounded-full bg-[#23115D] flex items-center justify-center">
                <Laptop className="w-1/3 h-1/3 text-white" />
              </div>
              <h1 className="text-md text-center mt-3">This is the sample text and more sample are there</h1>
            </div>
          </div>
        </div>





      </div>
    </div>
  );
}
