"use client";

import { useEffect, useState } from "react";
import { formatFrenchDate } from "@/lib/date";

type TaskType = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  idealDate: string; // Date ISO
  offset: number; 
  status: "todo" | "in_progress" | "done"
  priority: string; 
  isCustom: boolean;
  visible: boolean;
}

type Props = {
  task: TaskType
  onSelect: (task: TaskType) => void
}

export default function Task({ task, onSelect }: Props) {
      const [isOpen, setIsOpen] = useState(false);
      const [taches, setTaches] = useState<TaskType[]>([]);

    return (
        <>

        <button onClick={() => onSelect(task)} className="hidden md:block relative font-inter text-black w-[1000px] h-[120px] rounded-3xl bg-white mx-auto p-5 transition duration-300 ease-in-out hover:border hover:scale-105 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
            <div className="flex justify-between text-sm tracking-widest">
                <div className="flex justify-center items-center">
                    <input type="checkbox" onClick={(e) => e.stopPropagation()} className="w-5 h-5 mr-3 accent-pinkk" />
                    <p className="font-semibold tracking-[2px] font-sans">{task.title}</p>
                </div>
                <p className="text-xs opacity-50">À faire avant le {formatFrenchDate(task.idealDate)}</p>
            </div>

            <p className="font-sans text-xs opacity-50 mt-3 text-left">{task.description.slice(0, 62)}...</p>

            <div className="flex justify-between items-center gap-3 mt-4 text-black text-sm  tracking-widest">
                <p className="font-bold text-xs text-black/70 bg-black/10 rounded-2xl px-5 py-1">{task.category}</p>
                <p className="font-bold text-xs text-black/80  rounded-2xl px-0 py-1">{task.status}</p>
            </div> 
        </button>

        <button onClick={() => onSelect(task)} className="md:hidden relative font-inter text-black w-[350px] h-[150px] rounded-3xl bg-white mx-auto p-5 transition duration-300 ease-in-out hover:border hover:scale-105 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
              <input type="checkbox" onClick={(e) => e.stopPropagation()} className="absolute top-[-4px] left-[-4px] w-5 h-5 accent-pinkk"/>
            <div className="flex flex-col mb-8 text-sm tracking-widest ">
                <p className="text-xs font-semibold tracking-widest font-sans">{task.title}</p>
                <p className="text-[9px] opacity-50">À faire avant le {formatFrenchDate(task.idealDate)}</p>
                <p className="font-sans text-[9px] opacity-50 mt-3 text-center">{task.description.slice(0, 30)}...</p>
            </div> 
            <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center gap-3 text-black text-sm tracking-widest">
                <p className="font-bold text-[9px] text-black/70 bg-black/10 rounded-2xl px-3 py-1">{task.category}</p>
                <p className="font-bold text-[9px] text-black/80 rounded-2xl px-0 py-1">{task.status}</p>
            </div>
        </button>


        </>
    )
}