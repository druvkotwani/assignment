import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { TabProvider } from "./context/tabContext";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  weight: ["400", "700"],
});

const circulatStdBook = localFont({
  src: "./fonts/CircularStd-Book.woff",
  variable: "--font-cir-std-book",
  weight: "100 400 800",
});

export const metadata: Metadata = {
  title: "Catalog Assigmnet- By Dhruv Kotwani",
  description: "Catalog Assigmnet- By Dhruv Kotwani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${sourceCodePro.variable} ${circulatStdBook.variable} antialiased`}
      >
        <TabProvider>{children}</TabProvider>
      </body>
    </html>
  );
}
