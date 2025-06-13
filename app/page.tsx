import LandingMain from "@/components/shared/landing/LandingMain";
//import Pricing from "@/components/shared/landing/pricing";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import AccordionComponent from "@/components/shared/landing/Accordion";
import Velocity from "@/components/shared/landing/Velocity";
import Footer from "@/components/shared/Footer";
import Head from "next/head";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Link from "next/link";
export default async function Home() {
  const session = await getServerSession(authConfig);
  let user = null;

  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        premium: true,
        hasChecklist: true,
      },
    });
  }

  return (
    <>

    <Head>
      <title>EasyWed - Accueil</title>
      <meta name="description" content="Générez une checklist intelligente et personnalisée pour organiser votre mariage, en quelques clics !"/>
      <meta name="og:title" content="EasyWed - Planificateur de mariage IA"/>
      <meta name="og:description" content="Générez une checklist intelligente et personnalisée pour organiser votre mariage, en quelques clics !"/>
    </Head>

      <Navbar user={user} />
      <LandingMain user={user} />
      <Velocity />
      <AccordionComponent />
      {/* <Pricing user={user} /> */}
      <div className="flex justify-center font-sans">
        <Link href={user?.hasChecklist ? "/dashboard" : "/quiz"}><ShimmerButton background="#DB80FF" borderRadius="20px" shimmerColor="white" className="text-md w-[350px] md:text-md md:w-[550px] text-white tracking-widest uppercase hover:scale-105 transition duration-300 ease-in-out"><span className="font-bold md:text-xl">Commencer gratuitement</span></ShimmerButton></Link>
      </div>
      <Footer />


    </>
  );
}
