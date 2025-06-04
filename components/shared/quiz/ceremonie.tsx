"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
  onNext?: () => void
}

export default function Ceremonie({ onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState("")
  
   const handleContinue = () => {
    if (!selected) return
    onAnswer(selected)
    onNext?.()
  }

  return (
    <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl text-center">Type de cérémonie</h1>
      </div>

      <div className="flex flex-wrap flex-col sm:flex-row justify-center items-center sm:px-0 gap-5 text-sm mt-7 mb-7 sm:mb-0 text-black px-5">
        <button onClick={() => setSelected('Mariage Civil')} className='border border-black/50 px-10 rounded-lg py-2'>Mariage Civil</button>
        <button onClick={() => setSelected('Mariage religieux')} className='border border-black/50 px-10 rounded-lg py-2'>Mariage religieux</button>
        <button onClick={() => setSelected('Cérémonie laïque')} className='border border-black/50 px-10 rounded-lg py-2'>Cérémonie laïque</button>
        <button onClick={() => setSelected('Destination wedding')} className='sm:hidden border border-black/50 px-10 rounded-lg py-2'>Destination wedding (à l’étranger)</button>
        <button onClick={() => setSelected('Autre')} className='sm:hidden border border-black/50 px-10 rounded-lg py-2'>Autre</button>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-5 text-sm text-black mt-5 mb-7">
        <button onClick={() => setSelected('Destination wedding')} className='border border-black/50 px-10 rounded-lg py-2'>Destination wedding (à l’étranger)</button>
        <button onClick={() => setSelected('Autre')} className='border border-black/50 px-10 rounded-lg py-2'>Autre</button>
      </div>

      <BtnQuiz onNext={handleContinue}/>
    </article>
  )
}
