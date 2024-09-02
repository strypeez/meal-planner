'use client'

import type { Metadata } from "next";
import Header from "./components/header";
import { Inter } from "next/font/google";
import "./globals.css";
import RecipeSideDash from "./components/recipeSideDash";

import { PlannerStoreProvider } from "../providers/planner-store-provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export const ItemTypes = {
  RECIPE: 'recipe'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
        <Header />
        <PlannerStoreProvider>
          <DndProvider backend={HTML5Backend}>
            <RecipeSideDash />
            {children} 
          </DndProvider>
        </PlannerStoreProvider>
        </div>
      </body>
    </html>
  );
}
