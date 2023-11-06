"use client";
import { secondsToMinutes } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const WorkOutSuccess = () => {
  const searchParams = useSearchParams();
  const timeVal = searchParams.get("time");

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-green-500 dark:bg-green-700">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-white">
          Workout Successful!
        </h1>
        <p className="mx-auto max-w-[700px] text-2xl text-white dark:text-gray-200">
          Great job! You're one step closer to your fitness goals.
        </p>
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-3xl font-semibold text-white">
            Workout Duration
          </h2>
          <p className="text-4xl font-bold text-white">
            {secondsToMinutes(timeVal)}
          </p>
        </div>
        <div className="animate-bounce">
          <svg
            className=" text-white text-9xl"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <Link
          href="/"
          className="bg-white py-3 px-6 rounded text-green-500 font-bold text-xl"
        >
          Continue
        </Link>
      </div>
    </section>
  );
};

export default WorkOutSuccess;
