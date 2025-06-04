"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

export default function NavbarDashboard({onAddTask, onStatusChange, onVisibleChange, onCategoryChange, onEditDate} : { 
        onAddTask?: () => void;
        onStatusChange?: (status: string) => void; 
        onEditDate?: () => void;
        onVisibleChange?: (visible: string) => void; 
        onCategoryChange?: (category: string) => void;
    }) {     

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
        <div className="hidden md:block font-inter z-50 fixed top-5 left-5">
            <AnimatedCircularProgressBar
            max={100}
            value={30}
            min={0}
            gaugePrimaryColor="#DB80FF"
            gaugeSecondaryColor="#E5E7EB"
            className="w-[50px] h-[50px] text-md"
            />
        </div>

        <div className="z-50 fixed top-5 left-1/2 transform -translate-x-1/2 text-sm font-inter flex justify-center md:justify-between px-3 items-center text-white bg-pinkk w-[350px] md:w-[1000px] rounded-3xl py-2 tracking-widest">
            <Link href="/">
            <p className="text-2xl md:text-4xl ml-3 px-2 md:px-5 font-hatch text-white">EW</p>
            </Link>

            <div className="text-xs flex justify-center items-center space-x-3 lg:space-x-5 mr-6 tracking-[2px]">
                <select onChange={(e) => onStatusChange && onStatusChange(e.target.value)} className="bg-transparent">
                    <option className="text-black" value="">Status (tous)</option>
                    <option className="text-black" value="todo">À faire</option>
                    <option className="text-black" value="in_progress">En cours</option>
                    <option className="text-black" value="done">Terminé</option>
                </select>
                <select className="hidden md:block bg-transparent" onChange={(e) => onVisibleChange && onVisibleChange(e.target.value)}>
                    <option className="text-black" value="">Visibilité (Tous) </option>
                    <option className="text-black"value="true">Visible</option>
                    <option className="text-black" value="false">Caché</option>
                </select>
                <select className="bg-transparent" onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}>
                    <option className=" text-black" value="">Catégorie (Tous) </option>
                    <option className="text-black" value="Invités">Invités</option>
                    <option className="text-black" value="Budget">Budget</option>
                    <option className="text-black" value="Lieu">Lieu</option>
                    <option className="text-black" value="Décoration">Décoration</option>
                    <option className="text-black" value="Tenues">Tenues</option>
                    <option className="text-black" value="Invitations">Invitations</option>
                    <option className="text-black" value="Traiteur">Traiteur</option>
                    <option className="text-black" value="Prestataires">Prestataires</option>
                    <option className="text-black" value="Musique">Musique</option>
                    <option className="text-black" value="Logistique">Logistique</option>
                    <option className="text-black" value="Jour J">Jour J</option>
                </select>
            </div>

            <div className="hidden md:flex gap-6">
                <button onClick={onAddTask} className="bg-white text-black px-5 py-1 rounded-2xl hover:scale-105 transition duration-300 ease-in-out">+ Ajouter une tâche</button>
                <button onClick={onEditDate} className="bg-white text-black px-5 py-1 rounded-2xl hover:scale-105 transition duration-300 ease-in-out">Modifier la date</button>
            </div>
        </div>


        </>
    )
}