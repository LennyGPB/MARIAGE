import LandingMain from "@/components/shared/landing/LandingMain";
import Pricing from "@/components/shared/landing/pricing";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <LandingMain />
    <Pricing />
    </>
  );
}
