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

    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-16 md:mt-24">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center">Nombre approximatif d’invités ?</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7">
                <button onClick={() => setSelected('- 30')} className='border border-black/50 px-10 rounded-lg py-2'>moins de 30</button>
                <button onClick={() => setSelected('30 - 70')} className='border border-black/50 px-10 rounded-lg py-2'>30 - 70</button>
                <button onClick={() => setSelected('70 - 120')} className='border border-black/50 px-10 rounded-lg py-2'>70 - 120</button>
                <button onClick={() => setSelected('120 +')} className='border border-black/50 px-10 rounded-lg py-2'>120+</button>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}