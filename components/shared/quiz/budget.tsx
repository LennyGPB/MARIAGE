"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
onNext?: () => void

}

export default function Budget({ onAnswer, onNext }: Props) {
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
                <h1 className="text-3xl md:text-5xl text-center">Votre budget estimé (en €)</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7">
                <button onClick={() => setSelected('- 5000€')} className='border border-black/50 px-10 rounded-lg py-2'>moins de 5000€</button>
                <button onClick={() => setSelected('5000€ - 10 000€')} className='border border-black/50 px-10 rounded-lg py-2'>5 000 - 10 000€</button>
                <button onClick={() => setSelected('10 000€ - 20 000€')} className='border border-black/50 px-10 rounded-lg py-2'>10 000 - 20 000€</button>
                <button onClick={() => setSelected('+40 000€')} className='border border-black/50 px-10 rounded-lg py-2'>+40 000€</button>
            </div>
            <BtnQuiz onNext={handleContinue}/>
        </article>
        </>
    )
}