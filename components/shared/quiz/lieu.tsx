"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
   onNext?: () => void
}

export default function Lieu({ onAnswer,onNext }: Props) {
  const [selected, setSelected] = useState("");

   const handleContinue = () => {
    if (!selected) return
    onAnswer(selected)
    onNext?.()
  }

    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">Avez-vous déjà réservé un lieu ?</h1>
            </div>

            <div className="flex  justify-center items center gap-5 text-sm text-black mt-7 mb-7">
                <button onClick={() => setSelected('Oui')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>Oui</button>
                <button onClick={() => setSelected('Non')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>Non</button>
                <button onClick={() => setSelected('En cours')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>En cours</button>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}