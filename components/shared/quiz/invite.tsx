"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
  onNext?: () => void
}

export default function Invite({ onAnswer, onNext }: Props) {
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
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-16 md:mt-24">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center">Nombre approximatif d’invités ?</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7">
                <button onClick={() => setSelected('- 30')} className={`${base} ${is('- 30') ? active : inactive}`}>moins de 30</button>
                <button onClick={() => setSelected('30 - 70')} className={`${base} ${is('30 - 70') ? active : inactive}`}>30 - 70</button>
                <button onClick={() => setSelected('70 - 120')} className={`${base} ${is('70 - 120') ? active : inactive}`}>70 - 120</button>
                <button onClick={() => setSelected('120 +')} className={`${base} ${is('120 +') ? active : inactive}`}>120+</button>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}