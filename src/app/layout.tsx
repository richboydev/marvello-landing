import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marvello Mebel",
  description: "Premium furniture brand in Uzbekistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
