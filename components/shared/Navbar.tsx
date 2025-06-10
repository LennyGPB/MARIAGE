"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    premium: boolean;
    hasChecklist: boolean;
  } | null;
};

export default function Navbar({user} : Props) {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const { data: session } = useSession();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
        <nav className="font-inter hidden sm:block mt-5 mx-40 text-sm text-black tracking-widest">
            <div className="flex justify-between items-center h-[52px] rounded-2xl ">
                <Link href="/"><p className="text-4xl font-hatch text-[#DB80FF] px-5">EW</p></Link>
                <div className="flex justify-center items-center lg:space-x-20 ml-10 text-black/70 tracking-[2px]">                    
                    <Link href="/" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Accueil</Link>
                    <Link href="/#price" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Prix</Link>
                    <Link href="/support" className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Support</Link>
                    <Link href={user?.hasChecklist ? "/dashboard" : "/quiz"} className=" hover:text-gray-900 hover:scale-105 transition duration-300 ease-in-out">Ma checklist</Link>
                </div>
               {!session && 
                <Link href="/login" className="font-sans bg-[#DB80FF] text-white px-5 py-1 rounded-lg font-bold uppercase hover:scale-105 transition duration-300 ease-in-out">Se connecter</Link>
               }

                {session && 
                <div className="flex items-center gap-1">
                    <p className="bg-pinkk text-white font-bold px-5 rounded-xl py-1">Bonjour, {session?.user?.name} !</p>
                    <button id="menu-button" onClick={toggleMenu} className="hover:scale-105 transition duration-300 ease-in-out"><MoreVertIcon className="opacity-60" /></button>
                    {isOpen && (
                    <div aria-orientation="vertical" aria-labelledby="menu-button" className="absolute right-12 top-16 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu">
                        <div className="py-1" role="none">
                        <button onClick={() => signOut()} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:text-black" role="menuitem"  id="menu-item-3">Se déconnecter</button>
                        </div>
                    </div>
                    )}
                    
                    {/* <button onClick={() => signOut()} className="font-sans bg-[#DB80FF] text-white px-5 py-1 rounded-lg font-bold uppercase hover:scale-105 transition duration-300 ease-in-out">Se déconnecter</button> */}
                </div>
               }
            </div>
        </nav>

        {/* NAVBAR MOBILE ------------------------------------------------------------------------------------------------ */}
        <nav className="sm:hidden mt-7 font-sans text-xs text-black tracking-widest">
            <div className="flex justify-between items-center h-[52px] px-5 rounded-2xl ">
                <Link href="/" className="text-4xl font-hatch text-[#DB80FF] ">EW</Link>
               
               {session ?
                <Link href={user?.hasChecklist ? "/dashboard" : "/quiz"}className="text-xs bg-[#DB80FF] text-white px-8 py-1 rounded-lg font-bold uppercase mr-3">
                  Bonjour{" "}{user?.name? user.name.length > 8? user.name.slice(0, 8) + "...": user.name: ""}{" "}!
                </Link>
                  :
                 <Link href="/login" className="text-xs bg-[#DB80FF] text-white px-8 py-1 rounded-lg font-bold uppercase mr-3">
                  Se connecter
                </Link>
                }

                  
                

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
                    <Link href="/" className="text-4xl font-hatch text-[#DB80FF]">EW</Link>
                  </div>

                <div className="flex flex-col gap-3 text-black/80">
                    <Link href="/">Accueil</Link>
                    <Link href={user?.hasChecklist ? "/dashboard" : "/quiz"}>Ma checklist</Link>
                    <Link href="#/#price">Prix</Link>
                    <Link href="/support">Support</Link>
                </div>

                <Link href="/login" className="bg-[#DB80FF] text-center text-white px-5 py-1 rounded-lg font-bold uppercase mt-5">Se connecter</Link>

                
                </div>
              </div>
            </div>
        </>
    )
}