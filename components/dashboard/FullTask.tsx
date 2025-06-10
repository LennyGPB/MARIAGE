"use client";

import { useState } from "react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type TaskType = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  idealDate: string; // Date ISO
  offset: number; 
  status: "À faire" | "En cours" | "Terminée"
  priority: string; 
  isCustom: boolean;
  visible: boolean;
}

type Props = {
  task: TaskType;
  onBack: () => void;
  onEdit: () => void;
  onQuestion: () => void;
}

export default function FullTask({ task, onBack, onEdit, onQuestion }: Props) {
    const [isChecked, setIsChecked] = useState(task.status !== "À faire");
    const [isMasked, setIsMasked] = useState(!task.visible);
    const [isMaskLoading, setIsMaskLoading] = useState(false);

    const handleToggle = async () => {
        const newStatus = isChecked ? "À faire" : "Terminée";
        setIsChecked(!isChecked); // MAJ optimiste

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist/${task.id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) {
            throw new Error("Échec de la mise à jour");
            }
            
        } catch (error) {
            console.error("Erreur lors du changement de statut :", error);
            setIsChecked(isChecked); // rollback
        }
    };

    const handleMask = async () => {
        setIsMaskLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist/${task.id}/hide`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ visible: !task.visible })
            });

            if (!res.ok) {
                throw new Error("Échec de la mise à jour");
            }

            setIsMaskLoading(false);
            setIsMasked(!isMasked); 
        } catch (error) {
            console.error("Erreur lors du masquage de la tâche :", error);
        }
    }

    // const handleDelete = async () => {
    //     try {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist/`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ id: task.id })
    //         });

    //         if (!res.ok) {
    //             throw new Error("Échec de la suppression");
    //         }
                
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de la tâche :", error);
    //     }
    // }

    const indexConseil = task.description.indexOf("Mon conseil :");

    let before = task.description;
    let conseil = "";

    if (indexConseil !== -1) {
    before = task.description.slice(0, indexConseil).trim();
    conseil = task.description.slice(indexConseil).trim();
    }

    return (
        <>
        <div className="hidden sm:block mb-20 tracking-widest">
            
            <div className="flex justify-between items-center px-3">
                <button onClick={onBack} className="text-xs text-white bg-pinkk px-4 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">← Retourner en arrière</button>
            </div>

            <article className="border relative overflow-hidden tracking-wide mb-10 font-inter mt-3 text-black w-[800px] py-5 rounded-3xl bg-white mx-auto p-5 transition duration-300 ease-in-out [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
                 {/* <GridPattern width={20} height={20} x={-1} y={-1} className={"[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"}/> */}
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center">
                        <input checked={isChecked} onChange={handleToggle} type="checkbox" className="w-6 h-6 mr-3 accent-pinkk" />
                        <p className="tracking-widest opacity-60 font-bold uppercase">{isChecked ? "Tâche Terminée" : "DEADLINE : 14/02/2025"} </p>
                         
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="flex items-center gap-1">
                            <p className="">Catégorie : </p>
                            <p className="text-xs text-white bg-pinkk rounded-2xl px-5 py-1">Lieu</p>

                            {/* <ClearIcon className="cursor-pointer transition duration-300 ease-in-out hover:scale-105 ml-2"  /> */}
                        </div>                       
                    </div>
                </div>
                <div className="flex flex-col h-full mt-5 gap-5">
                    <p className="tracking-[2px] font-bold text-xl text-center">{task.title}</p>
                    <p className="font-sans text-sm opacity-60 leading-5 text-left">{before}  {conseil && ( <><br /><br /> <strong>{conseil}</strong></> )}</p>
                    

                    {/* <button className="ml-[-30] text-center px-5 py-1 text-xs bg-pinkk rounded-2xl text-white w-36 tracking-widest">Conseil de l'IA </button> */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2 items-center">
                            {isMasked ? 
                            <button disabled={isMaskLoading} title="Afficher la tâche" className="transition duration-300 ease-in-out hover:scale-105" onClick={handleMask}><VisibilityIcon/></button> : 
                            <button disabled={isMaskLoading} title="Afficher la tâche" className="transition duration-300 ease-in-out hover:scale-105" onClick={handleMask}><VisibilityOffIcon/></button>
                            }
                        <button onClick={onEdit} className="text-xs text-black border border-black px-5 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:text-white hover:bg-black">Modifier cette tâche</button>
                        </div>
                        <div className="flex gap-2">
                        <button onClick={onQuestion} className="text-xs text-white border border-pinkk bg-pinkk px-5 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">Poser une question à l&lsquo;IA</button>
                        <SmartToyIcon className="transition duration-300 ease-in-out hover:scale-105 text-pinkk mr-2 " />
                        </div>
                    </div>
                </div>
                    
            </article>
        </div>

        <div className="md:hidden mb-20 tracking-widest">
            
            <div className="flex justify-start items-center px-3">
                <button onClick={onBack} className="text-xs text-white bg-pinkk px-4 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">← Retourner en arrière</button>
            </div>

            <article className="border relative overflow-hidden tracking-wide mb-10 font-inter mt-3 text-black w-[350px] py-5 rounded-3xl bg-white mx-auto p-5 transition duration-300 ease-in-out [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
                <div className="flex justify-between items-center text-[9px]">
                    <div className="flex items-center">
                        <input checked={isChecked} onChange={handleToggle} type="checkbox" className="w-6 h-6 mr-3 accent-pinkk" />
                        <p className="tracking-widest opacity-60 font-bold uppercase">{isChecked ? "Tâche Terminée" : "DEADLINE : 14/02/2025"} </p>
                         
                    </div>
                    <div className="flex gap-5 items-center text-[9px]">
                        <div className="flex items-center gap-1">                          
                            <p className=" text-white bg-pinkk rounded-2xl px-5 py-1">Lieu</p>
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col h-full mt-5 gap-5">
                    <p className="tracking-[2px] font-bold text-lg text-center">{task.title}</p>
                    <p className="font-sans text-xs opacity-60 leading-5 text-left">{before}  {conseil && ( <><br /><br /> <strong>{conseil}</strong></> )}</p>
                    

                    {/* <button className="ml-[-30] text-center px-5 py-1 text-xs bg-pinkk rounded-2xl text-white w-36 tracking-widest">Conseil de l'IA </button> */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2 items-center">
                            {isMasked ? 
                            <button disabled={isMaskLoading} title="Afficher la tâche" className="transition duration-300 ease-in-out hover:scale-105" onClick={handleMask}><VisibilityIcon/></button> : 
                            <button disabled={isMaskLoading} title="Afficher la tâche" className="transition duration-300 ease-in-out hover:scale-105" onClick={handleMask}><VisibilityOffIcon/></button>
                            }
                        </div>
                        <div className="flex gap-2">
                            <button onClick={onEdit} className="text-[9px] text-black border border-black px-2 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105 hover:text-white hover:bg-black">Modifier cette tâche</button>
                            <button onClick={onQuestion} className="text-[9px] text-white border border-pinkk bg-pinkk px-2 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">Poser une question à l&lsquo;IA</button>
                        </div>
                    </div>
                </div>
                    
            </article>
        </div>
        </>
    )
}