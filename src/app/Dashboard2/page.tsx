import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Component from "../components/Dashboard2";

const Page = () => {
  return (
    <div className="bg-background !bg-gray-200 flex items-center justify-center min-h-screen flex-col ">
      <div className="rounded-md shadow-xl my-4">
        <Component />
      </div>

      <div className="my-8 flex gap-8 items-center justify-center font-sourceCodePro">
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
  );
};

export default Page;
