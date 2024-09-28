import Link from "next/link";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const navigate = [
  "Framework : Next.js/Typescript",
  "Libraries: Trading View Charting Library, Lucide Icons, MUI Charts",
  "Font: Source Code Pro, Circular Std",
  "Deployment: Vercel | API: Mediastack.com",
];

const dashboard1 = [
  "Used Trading View's charting library",
  "Responsive design",
  "Fullscreen Funtionality added",
  "Comprarison of 2 coins",
  "Settings + Statistics + Analysis Design added",
];

const dashboard2 = [
  "Used Svg's path and rect property to create graph",
  "Responsive design",
  "Full screen by default",
  "Comparison of 2 coins",
  "Settings + Statistics + Analysis Design added",
];

export default function Home() {
  return (
    <>
      <div className="bg-background h-screen flex-col   font-sourceCodePro relative flex items-center   justify-center gap-8 px-8 lg:px-24 py-4">
        <h1 className="text-3xl md:text-5xl  flex gap-1 items-center justify-center text-[#ccc] text-center">
          <Image
            src="/icons/catalog.png"
            width={50}
            height={50}
            alt="logo"
            className="inline-block"
          />
          Catalog&nbsp;
          <span className="hidden md:block">Assignment</span>
        </h1>

        <h2 className="text-base md:text-xl text-[#ccc] text-center">
          Hii Sir/Mam!<span className="wave-hand text-2xl">👋 </span>
          <br />
          Let&apos;s navigate and go through the assignment
          <ul className="flex flex-col text-base gap-4 mt-4 text-[#ccc]">
            {navigate.map((item, index) => (
              <li key={index} className="text-start">
                {" "}
                <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  ✦
                </span>{" "}
                {item}
              </li>
            ))}
          </ul>
        </h2>

        <div className="flex items-center justify-center md:flex-row flex-col gap-8 ">
          <div className="px-4 py-2 md:p-4 md:px-8 rounded border border-[#312f2f] flex flex-col items-center justify-center gap-8">
            <ul className="flex flex-col gap-4 mt-4 text-[#ccc]">
              {dashboard1.map((item, index) => (
                <li key={index}>
                  {" "}
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    ✦
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={"/Dashboard1"}
              className="px-6 py-3 bg-gradient-to-r from-teal-400  to-sky-600 rounded"
            >
              Dashboard 1
              <ArrowRight className="w-5 h-5 inline-block ml-2" />
            </Link>
          </div>
          <div className="px-4 py-2 md:p-4 md:px-8 rounded border border-[#312f2f] flex items-center justify-center flex-col gap-8">
            <ul className="flex flex-col gap-4 mt-4 text-[#ccc]">
              {dashboard2.map((item, index) => (
                <li key={index}>
                  {" "}
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    ✦
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={"/Dashboard2"}
              className="px-6 py-3 bg-gradient-to-r from-green-300  to-pink-400 rounded"
            >
              Dashboard 2
              <ArrowRight className="w-5 h-5 inline-block ml-2" />
            </Link>
          </div>
        </div>
        <footer className="text-[#ccc]  min-h-8 text-center flex w-full items-center justify-center text-lg">
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
    </>
  );
}
