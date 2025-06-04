"use client";

import { useEffect, useState } from "react";
import BtnQuiz from "../BtnQuiz";

type Props = {
  onAnswer: (value: string) => void,
  onNext?: () => void,
  answers: QuizAnswers
}

type QuizAnswers = {
  weddingDate?: string
  weddingType?: string
  locationKnown?: string
  guestCount?: string
  budget?: string
  theme?: string
  urgent?: string[]
  prestataires?: string[]
  organisateurs?: string
}

export default function Organisateurs({ onAnswer, onNext, answers }: Props) {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
      if (!selected) return
      onAnswer(selected)
      onNext?.()
    }

    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl text-center px-5 sm:px-0">👤 Souhaitez-vous organiser seul(e) ou à deux ?</h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items center gap-5 text-sm text-black mt-7 mb-7">
                <button onClick={() => setSelected('solo')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>Seul(e)</button>
                <button onClick={() => setSelected('en couple')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>En couple</button>
                <button onClick={() => setSelected('aide extérieure')} className='border border-black/50 px-5 sm:px-10 rounded-lg py-2'>Avec aide extérieure</button>
            </div>
            <BtnQuiz onNext={handleContinue} text="Terminer mon onBoarding"/>
        </article>
        </>
    )
}

function onNext() {
    throw new Error("Function not implemented.");
}
