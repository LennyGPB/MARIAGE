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

  const is = (value: string) => selected.includes(value)
  const base = 'border border-black/50 px-10 rounded-lg py-2 transition'
  const active = 'bg-pinkk text-white font-semibold'
  const inactive = 'bg-white text-black'

  return (
    <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl text-center">Type de cérémonie</h1>
      </div>

      <div className="flex flex-wrap flex-col sm:flex-row justify-center items-center sm:px-0 gap-5 text-sm mt-7 mb-7 sm:mb-0 text-black px-5">
        <button onClick={() => setSelected('Mariage Civil')} className={`${base} ${is('Mariage Civil') ? active : inactive}`}>Mariage Civil</button>
        <button onClick={() => setSelected('Mariage religieux')} className={`${base} ${is('Mariage religieux') ? active : inactive}`}>Mariage religieux</button>
        <button onClick={() => setSelected('Cérémonie laïque')} className={`${base} ${is('Cérémonie laïque') ? active : inactive} `}>Cérémonie laïque</button>
        <button onClick={() => setSelected('Destination wedding')} className={`${base} ${is('Destination wedding') ? active : inactive} sm:hidden`}>Destination wedding (à l’étranger)</button>
        <button onClick={() => setSelected('Autre')} className={`${base} ${is('Autre') ? active : inactive} sm:hidden`}>Autre</button>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-5 text-sm text-black mt-5 mb-7">
        <button onClick={() => setSelected('Destination wedding')} className={`${base} ${is('Destination wedding') ? active : inactive}`}>Destination wedding (à l’étranger)</button>
        <button onClick={() => setSelected('Autre')} className={`${base} ${is('Autre') ? active : inactive}`}>Autre</button>
      </div>

      <BtnQuiz onNext={handleContinue}/>
    </article>
  )
}
