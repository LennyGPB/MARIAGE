"use client";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    premium: boolean;
    hasChecklist: boolean;
  } | null;
};


export default function LandingMain({user} : Props) {
    return (
        <>
        <article id="landing" className="z-50 font-sans flex flex-col justify-center items-center tracking-wide md:mt-20">
            <SparklesText className="hidden md:block w-[1000px] text-center text-5xl font-light leading-[67px] md:mt-16 mt-10 tracking-wide">Organisez <span className="text-[#DB80FF] font-bold">votre mariage</span> sans stress, avec une checklist intelligente.</SparklesText>
            <SparklesText className="md:hidden w-[400px] text-center text-3xl font-light leading-[50px] mt-10 tracking-wide">Organisez <span className="text-[#DB80FF] font-bold">votre mariage</span> sans stress, avec une checklist intelligente.</SparklesText>
            <p className="text-black/50 text-md md:text-lg text-center w-[350px] md:w-[795px] mt-5 font-light">Créez un plan clair, personnalisé et évolutif selon votre date, votre style, et vos envies. Enfin un outil qui <span className="font-medium">pense comme vous</span>.</p>

            <div className="flex flex-col md:flex gap-3 md:gap-5 justify-center items-center mt-16 md:mt-20">  
            <Link href={user?.hasChecklist ? "/dashboard" : "/quiz"}><ShimmerButton background="#DB80FF" borderRadius="20px" shimmerColor="white" className="text-md w-[350px] md:text-md md:w-[550px] text-white tracking-widest uppercase hover:scale-105 transition duration-300 ease-in-out"><span className="font-bold md:text-xl">Commencer gratuitement</span></ShimmerButton></Link>
            <Link href="/#faq"><ShimmerButton background="white" borderRadius="20px" shimmerColor="white" className="px-2 w-[350px] md:w-[550px] text-black/70 tracking-widest border border-black/30 hover:scale-105 transition duration-300 ease-in-out"><span className="text-md">Quel est le fonctionnement ?</span></ShimmerButton></Link>
            </div>
            
        </article>
        </>
    )
}