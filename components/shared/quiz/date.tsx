"use client"

import { DayPicker } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import { useState } from "react"
import BtnQuiz from "../BtnQuiz"

type Props = {
  onAnswer: (value: string) => void,
  onNext?: () => void
}

export default function QuizDate({ onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<Date | undefined>()

  const handleContinue = () => {
    if (!selected) return
    onAnswer(selected.toISOString())
    onNext?.()
  }

  return (
    <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
      <div className="flex flex-col gap-2 mb-5">
        <h1 className="text-3xl md:text-5xl text-center">Date prévue du mariage</h1>
        <p className="text-black/50 text-sm text-center">Vous pourrez la modifier plus tard.</p>
      </div>

      <DayPicker
        mode="single"
        locale={fr}
        captionLayout="dropdown"
        navLayout="around"
        className="mb-5"
        selected={selected}
        onSelect={setSelected}
        classNames={{
          nav_button: 'hover:text-pink-700',
          selected: 'bg-pinkk rounded-full text-white font-bold',
        }}
      />

      <BtnQuiz onNext={handleContinue} />
    </article>
  )
}
