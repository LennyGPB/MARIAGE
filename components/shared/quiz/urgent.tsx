"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string[]) => void,
   onNext?: () => void
}

export default function Urgent({ onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (value: string) => {
    let updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : selected.length < 3
      ? [...selected, value]
      : selected // limite à 3

    setSelected(updated)
  }

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
    <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20 mb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">🎯 Quelles sont vos priorités ?</h1>
        <p className="text-black/50 text-sm text-center">Facultatif – max 3 choix</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 text-sm text-black mt-7 mb-7 sm:mb-0">
        <button onClick={() => toggle('Gérer le budget')} className={`${base} ${is('Gérer le budget') ? active : inactive}`}>Gérer le budget</button>
        <button onClick={() => toggle('Ne rien oublier')} className={`${base} ${is('Ne rien oublier') ? active : inactive}`}>Ne rien oublier</button>
        <button onClick={() => toggle('Déléguer certaines choses')} className={`${base} ${is('Déléguer certaines choses') ? active : inactive}`}>Déléguer certaines choses</button>
        <button onClick={() => toggle('Gagner du temps')} className={`${base} ${is('Gagner du temps') ? active : inactive}`}>Gagner du temps</button>
        <button onClick={() => toggle('Être guidé(e) pas à pas')} className={`sm:hidden ${base} ${is('Être guidé(e) pas à pas') ? active : inactive}`}>Être guidé(e) pas à pas</button>
        <button onClick={() => toggle('Créer quelque chose d’unique')} className={`sm:hidden ${base} ${is('Créer quelque chose d’unique') ? active : inactive}`}>Créer quelque chose d’unique</button>
        <button onClick={() => toggle('Réduire le stress')} className={`sm:hidden ${base} ${is('Réduire le stress') ? active : inactive}`}>Réduire le stress</button>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-5 text-sm text-black mt-5 mb-7">
        <button onClick={() => toggle('Être guidé(e) pas à pas')} className={`${base} ${is('Être guidé(e) pas à pas') ? active : inactive}`}>Être guidé(e) pas à pas</button>
        <button onClick={() => toggle('Créer quelque chose d’unique')} className={`${base} ${is('Créer quelque chose d’unique') ? active : inactive}`}>Créer quelque chose d’unique</button>
        <button onClick={() => toggle('Réduire le stress')} className={`${base} ${is('Réduire le stress') ? active : inactive}`}>Réduire le stress</button>
      </div>

      <BtnQuiz onNext={handleContinue}/>
    </article>
  )
}