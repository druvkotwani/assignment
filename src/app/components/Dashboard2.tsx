"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Price from "./Price";

import Link from "next/link";
import Chart2 from "./Chart2";

export default function Component(): JSX.Element {
  return (
    <div className="w-full font-cic-std bg-white overflow-hidden ">
      <div className="flex items-center justify-between w-full">
        <Price />
        <div className="my-8 hidden self-start mt-24 mr-4   md:flex gap-8 items-center justify-center font-sourceCodePro">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-slate-300  to-yellow-300 rounded flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 inline-block mr-2" />
            Home
          </Link>
          <Link
            href="/Dashboard1"
            className="px-6 py-3 bg-gradient-to-r from-orange-300  to-pink-300 rounded flex items-center justify-center"
          >
            Dashboard 1
            <ArrowRight className="w-5 h-5 inline-block ml-2" />
          </Link>
        </div>
      </div>
      <Chart2 />
    </div>
  );
}
