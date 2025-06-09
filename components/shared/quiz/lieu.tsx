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

    const is = (value: string) => selected.includes(value)
    const base = 'border border-black/50 px-10 rounded-lg py-2 transition'
    const active = 'bg-pinkk text-white font-semibold'
    const inactive = 'bg-white text-black'

    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">Avez-vous déjà réservé un lieu ?</h1>
            </div>

            <div className="flex justify-center items center gap-5 flex-wrap text-sm text-black mt-7 mb-7 ">
                <button onClick={() => setSelected('Oui')} className={`${base} ${is('Oui') ? active : inactive}`}>Oui</button>
                <button onClick={() => setSelected('Non')} className={`${base} ${is('Non') ? active : inactive}`}>Non</button>
                <button onClick={() => setSelected('En cours')} className={`${base} ${is('En cours') ? active : inactive}`}>En cours</button>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}