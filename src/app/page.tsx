import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen font-sourceCodePro relative flex items-center flex-col md:flex-row justify-center gap-8 px-8 lg:px-24">
      <div className="p-4 px-8 rounded border border-[#312f2f] flex flex-col items-center justify-center gap-8">
        <ul className="flex flex-col gap-4 mt-4 text-[#ccc]">
          <li>
            {" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              ✦
            </span>{" "}
            Used Trading View&apos;s charting library
          </li>
          <li>
            {" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              ✦
            </span>{" "}
            Used Tailwind CSS for styling
          </li>
        </ul>

        <Link
          href={"/Dashboard1"}
          className="px-6 py-3 bg-gradient-to-r from-teal-400  to-sky-600 rounded"
        >
          Dashboard 1
          <ArrowRight className="w-5 h-5 inline-block ml-2" />
        </Link>
      </div>
      <div className="p-4 px-8 rounded border border-[#312f2f] flex items-center justify-center flex-col gap-8">
        <ul className="flex flex-col gap-4 mt-4 text-[#ccc]">
          <li>
            {" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              ✦
            </span>{" "}
            Used Trading View&apos;s charting library
          </li>
          <li>
            {" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              ✦
            </span>{" "}
            Used Tailwind CSS for styling
          </li>
        </ul>

        <Link
          href={"/Dashboard2"}
          className="px-6 py-3 bg-gradient-to-r from-green-300  to-pink-400 rounded"
        >
          Dashboard 2
          <ArrowRight className="w-5 h-5 inline-block ml-2" />
        </Link>
      </div>
      <footer className="text-[#ccc] absolute bottom-4 text-center flex w-full items-center justify-center text-lg">
        Assignment made with&nbsp;
        <span className="hover:scale-125 duration-300 transition-all ease-in-out transform">
          ❤️
        </span>
        &nbsp;by&nbsp;
        <Link
          target="_blank"
          href="https://www.dhruvkotwani.xyz"
          className=" text-[#1C7ED6]"
        >
          Dhruv
        </Link>
      </footer>
    </div>
  );
}
