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


    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20 mb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">🎨 Avez-vous un thème ou un style en tête ?</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7 sm:mb-0">
                <button onClick={() => setSelected('Bohème')} className='border border-black/50 px-10 rounded-lg py-2'>Bohème</button>
                <button onClick={() => setSelected('Chic')} className='border border-black/50 px-10 rounded-lg py-2'>Chic / Élégant</button>
                <button onClick={() => setSelected('Minimaliste')} className='border border-black/50 px-10 rounded-lg py-2'>Minimaliste</button>
                <button onClick={() => setSelected('Romantique')} className='border border-black/50 px-10 rounded-lg py-2'>Romantique</button>
                <button onClick={() => setSelected('Oriental')} className='sm:hidden border border-black/50 px-10 rounded-lg py-2'>Oriental</button>
                <button onClick={() => setSelected('Vintage')} className='sm:hidden border border-black/50 px-10 rounded-lg py-2'>Vintage</button>
                <button onClick={() => setSelected('Bord de mer')} className='sm:hidden border border-black/50 px-10 rounded-lg py-2'>Bord de mer</button>
                <input type="text" placeholder="Autre..." className="border border-black/50 px-5 rounded-lg py-2 focus:outline-none"/>            
                </div>
            <div className="hidden sm:flex justify-center items center gap-5 text-sm text-black mt-5 mb-7">
                <button onClick={() => setSelected('Oriental')} className='border border-black/50 px-10 rounded-lg py-2'>Oriental</button>
                <button onClick={() => setSelected('Vintage')} className='border border-black/50 px-10 rounded-lg py-2'>Vintage</button>
                <button onClick={() => setSelected('Bord de mer')} className='border border-black/50 px-10 rounded-lg py-2'>Bord de mer</button>
                <input type="text" placeholder="Autre..." className="border border-black/50 px-5 rounded-lg py-2 focus:outline-none"/>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}