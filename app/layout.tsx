
import Header from "./components/header";
import { Inter } from "next/font/google";
import "./globals.css";

import { WrappedComponents } from "./components/wrappedComponents";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex w-screen`}>
        <div className="flex flex-col grow">
        <Header />
        <div className="flex justify-center">
          <WrappedComponents>{children}</WrappedComponents>
        </div>
        </div>
      </body>
    </html>
  );
}
