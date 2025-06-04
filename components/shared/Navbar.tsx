"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";


export default function Navbar() {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { data: session } = useSession();


    return (
        <>
        <nav className="font-inter hidden sm:block mt-5 mx-40 text-sm text-black tracking-widest">
            <div className="flex justify-between items-center h-[52px] rounded-2xl ">
                <Link href="/"><p className="text-4xl font-hatch text-[#DB80FF] px-5">EW</p></Link>
                <div className="flex justify-center items-center lg:space-x-20 ml-2 text-black/70 tracking-[2px]">                    
                    <Link href="/" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Accueil</Link>
                    <Link href="#" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Prix</Link>
                    <Link href="#" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Support</Link>
                    <Link href="/dashboard" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">OnBoarding</Link>
                </div>
               {!session && 
                <Link href="/login" className="font-sans bg-[#DB80FF] text-white px-5 py-1 rounded-lg font-bold uppercase">Se connecter</Link>
               }

                {session && 
                <button onClick={() => signOut()} className="font-sans bg-[#DB80FF] text-white px-5 py-1 rounded-lg font-bold uppercase">Se déconnecter</button>
               }
            </div>
        </nav>

        {/* NAVBAR MOBILE ------------------------------------------------------------------------------------------------ */}
        <nav className="sm:hidden mt-7 font-sans text-xs text-black tracking-widest">
            <div className="flex justify-between items-center h-[52px] px-5 rounded-2xl ">
                <p className="text-4xl font-hatch text-[#DB80FF] ">EW</p>
               
                <button className="text-xs bg-[#DB80FF] text-white px-3 py-1 rounded-lg font-bold uppercase mr-2">Se connecter</button>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7" onClick={() => setIsMobileMenuOpen(true)} aria-expanded={isMobileMenuOpen}>
                    <title>Menu icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                </svg>
            </div>
        </nav>

        <div className={`fixed top-0 left-0 h-screen w-full z-50 text-black ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} onClick={() => setIsMobileMenuOpen(false)}>
              <div className="fixed top-0 left-0 h-screen w-[280px] bg-white p-5" onClick={(event) => event.stopPropagation()}>
                <div className="flex flex-col tracking-widest">
                  <div className="flex items-center gap-3 mb-5">
                    <p className="text-4xl font-hatch text-[#DB80FF] ">EW</p>
                  </div>

                <div className="flex flex-col gap-3 text-black/80">
                    <Link href="#">Accueil</Link>
                    <Link href="#">OnBoarding</Link>
                    <Link href="#">Prix</Link>
                    <Link href="#">Support</Link>
                </div>

                <button className="bg-[#DB80FF] text-white px-5 py-1 rounded-lg font-bold uppercase mt-5">Se connecter</button>

                
                </div>
              </div>
            </div>
        </>
    )
}