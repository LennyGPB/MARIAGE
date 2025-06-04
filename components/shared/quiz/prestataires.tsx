"use client";

import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string[]) => void,
  onNext?: () => void
}

export default function Prestataires({ onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
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
        <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">
          🔎 Avez-vous déjà trouvé certains prestataires ?
        </h1>
        <p className="text-black/50 text-sm text-center">Facultatif – cases à cocher</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 text-sm text-black mt-7 mb-7 sm:mb-0">
        <button onClick={() => toggle('Lieu')} className={`${base} ${is('Lieu') ? active : inactive}`}>Lieu</button>
        <button onClick={() => toggle('Traiteur')} className={`${base} ${is('Traiteur') ? active : inactive}`}>Traiteur</button>
        <button onClick={() => toggle('DJ / Musiciens')} className={`${base} ${is('DJ / Musiciens') ? active : inactive}`}>DJ / Musiciens</button>
        <button onClick={() => toggle('Photographe / Vidéaste')} className={`${base} ${is('Photographe / Vidéaste') ? active : inactive}`}>Photographe / Vidéaste</button>
        <button onClick={() => toggle('Fleuriste / Déco')} className={`sm:hidden ${base} ${is('Fleuriste / Déco') ? active : inactive}`}>Fleuriste / Déco</button>
        <button onClick={() => toggle('Robe / Costume')} className={`sm:hidden ${base} ${is('Robe / Costume') ? active : inactive}`}>Robe / Costume</button>
        <button onClick={() => toggle('Wedding planner')} className={`sm:hidden ${base} ${is('Wedding planner') ? active : inactive}`}>Wedding planner</button>
        <button onClick={() => toggle('Aucun pour l’instant')} className={`sm:hidden ${base} ${is('Aucun pour l’instant') ? active : inactive}`}>Aucun pour l’instant</button>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-5 text-sm text-black mt-5 mb-7">
        <button onClick={() => toggle('Fleuriste / Déco')} className={`${base} ${is('Fleuriste / Déco') ? active : inactive}`}>Fleuriste / Déco</button>
        <button onClick={() => toggle('Robe / Costume')} className={`${base} ${is('Robe / Costume') ? active : inactive}`}>Robe / Costume</button>
        <button onClick={() => toggle('Wedding planner')} className={`${base} ${is('Wedding planner') ? active : inactive}`}>Wedding planner</button>
        <button onClick={() => toggle('Aucun pour l’instant')} className={`${base} ${is('Aucun pour l’instant') ? active : inactive}`}>Aucun pour l’instant</button>
      </div>

      <BtnQuiz onNext={handleContinue} />
    </article>
  )
}