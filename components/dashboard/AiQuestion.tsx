import { useState } from "react";

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
}

export default function AiQuestion({ onBack, task }: Props) {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (question.trim().length < 5) {
            return;
        }

       try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/question`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ taskId: task.id, question: question })
            });

            if (!res.ok) {
                throw new Error("Échec de la mise à jour");
                setIsLoading(false);
            }

            const data = await res.json();
            setAnswer(data.answer);
            setQuestion("");
            setIsLoading(false);

        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    return (
        <div className="mb-20">

            <div className="flex justify-between items-center px-3 tracking-widest">
                <button onClick={onBack} className="text-xs text-white bg-pinkk px-4 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">← Retourner en arrière</button>
            </div>

        <article  className="overflow-hidden tracking-wide mb-10 font-inter mt-3 text-black w-[350px] md:w-[800px] py-5 rounded-3xl bg-white mx-auto  p-5 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Une idée, une question ?</label>
                    <p className="text-xs text-black/70 mb-2">Besoin d’un conseil sur cette tâche ? Demandez à l’IA !</p>
                    <input required type="text" id="title" value={question} onChange={(e) => setQuestion(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                {answer && 
                <div className="flex flex-col gap-2">
                    <p>Réponse : </p>
                    <p className="text-black/70">{answer}</p> 
                </div>
                }

                {isLoading && 
                <div className="relative flex justify-center mt-4">
                    <div className="relative w-32 h-32">
                        <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-pinkk border-b-pinkk animate-spin" style={{ animationDuration: "3s" }}></div>
                        <div
                        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-pinkk animate-spin"
                        style={{ animationDuration: "2s", animationDirection: "reverse" }}
                        ></div>
                    </div>
                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-pinkk/10 via-transparent to-pinkk/5 animate-pulse rounded-full blur-sm"
                    ></div>
                </div>
                 } 

                <button disabled={isLoading} type="submit" className="mt-2 bg-pinkk text-white px-4 py-2 rounded-lg border hover:border hover:scale-105 transition duration-300 ease-in-out">Poser ma question</button>
            </form>
        </article>
        </div>
    )
}