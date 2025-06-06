"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
  onNext?: () => void
}

export default function Theme({ onAnswer,onNext }: Props) {
  const [selected, setSelected] = useState("");

    const handleContinue = () => {
    if (!selected) return
    onAnswer(selected)
    onNext?.()
  }

    const is = (value: string) => selected.includes(value)
    const base = 'border border-black/50 px-10 rounded-lg py-2 transition'
    const active = 'bg-pinkk text-white font-semibold'
    const inactive = 'bg-white text-black'


    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20 mb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">🎨 Avez-vous un thème ou un style en tête ?</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7 sm:mb-0">
                <button onClick={() => setSelected('Bohème')} className={`${base} ${is('Bohème') ? active : inactive}`}>Bohème</button>
                <button onClick={() => setSelected('Chic')} className={`${base} ${is('Chic') ? active : inactive}`}>Chic / Élégant</button>
                <button onClick={() => setSelected('Minimaliste')} className={`${base} ${is('Minimaliste') ? active : inactive}`}>Minimaliste</button>
                <button onClick={() => setSelected('Romantique')} className={`${base} ${is('Romantique') ? active : inactive}`}>Romantique</button>
                <button onClick={() => setSelected('Oriental')} className={`${base} ${is('Oriental') ? active : inactive} sm:hidden`}>Oriental</button>
                <button onClick={() => setSelected('Vintage')} className={`${base} ${is('Vintage') ? active : inactive} sm:hidden`}>Vintage</button>
                <button onClick={() => setSelected('Bord de mer')} className={`${base} ${is('Bord de mer') ? active : inactive} sm:hidden`}>Bord de mer</button>
                <input type="text" placeholder="Autre..." className={`${base} ${is('Autres') ? active : inactive} sm:hidden`}/>            
                </div>
            <div className="hidden sm:flex justify-center items center gap-5 text-sm text-black mt-5 mb-7">
                <button onClick={() => setSelected('Oriental')} className={`${base} ${is('Oriental') ? active : inactive}`}>Oriental</button>
                <button onClick={() => setSelected('Vintage')} className={`${base} ${is('Vintage') ? active : inactive}`}>Vintage</button>
                <button onClick={() => setSelected('Bord de mer')} className={`${base} ${is('Bord de mer') ? active : inactive}`}>Bord de mer</button>
                <input type="text" placeholder="Autre..." className="border border-black/50 px-5 rounded-lg py-2 focus:outline-none"/>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}