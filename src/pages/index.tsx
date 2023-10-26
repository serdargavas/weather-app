import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/components/app-layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <AppLayout></AppLayout>;
}
