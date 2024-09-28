import Link from "next/link";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="bg-background min-h-screen font-sourceCodePro relative flex items-center justify-center">
      <Dashboard />

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
