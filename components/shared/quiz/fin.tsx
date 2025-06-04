"use client";

import { DayPicker } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import { useState } from "react";
import BtnQuiz from "../BtnQuiz";

export default function Fin() {
  const [selected, setSelected] = useState<Date | undefined>()

    return (
        <>
        <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-28 ">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-3xl font-bold md:text-5xl px-5 sm:px-0 text-center">🎉 Merci ! Nous avons toutes les infos nécessaires.</h1>
                <p className="text-black/50 text-sm px-5 sm:px-0 text-center">Nous générons maintenant votre checklist IA personnalisée…</p>
            </div>

            {/* <BtnQuiz /> */}
        </article>
        </>
    )
}