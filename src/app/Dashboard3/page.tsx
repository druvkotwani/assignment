import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CryptoChart from "../components/Chart3";

const Page = () => {
  return (
    <div className="bg-background-black md:!bg-gray-200 bg-white flex items-center justify-center md:min-h-screen flex-col">
      <div className="rounded-md md:shadow-xl md:my-4 ">
        <CryptoChart />
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
          href="/Dashboard2"
          className="px-6 py-3 bg-gradient-to-r from-orange-300  to-pink-300 rounded flex items-center justify-center"
        >
          Dashboard 2
          <ArrowRight className="w-5 h-5 inline-block ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Page;
