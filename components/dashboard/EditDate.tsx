import { useState } from "react";

type Props = {
  onBack: () => void;
}

export default function EditDate({ onBack }: Props) {
    const [idealDate, setIdealDate] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/checklist/editDate`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newWeddingDate: idealDate
                }),
            });

            if (!response.ok) {
                throw new Error("Échec de la mise à jour de la tâche");
            }

            window.location.href = "/dashboard"; 

        } catch (error) {
            console.error("Erreur lors de la mise à jour de la tâche :", error);
        }
    }

    return (
        <div className="mb-20">

            <div className="flex justify-between items-center px-3 tracking-widest">
                <button onClick={onBack} className="text-xs text-white bg-pinkk px-4 py-1 rounded-xl transition duration-300 ease-in-out hover:scale-105">← Retourner en arrière</button>
            </div>

            <article  className="overflow-hidden tracking-wide mb-10 font-inter mt-3 text-black w-[800px] py-5 rounded-3xl bg-white mx-auto  p-5 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                    <label htmlFor="idealDate" className="text-sm font-bold">Modifier la date du mariage</label>
                    <p className="text-xs">La checklist sera regeneré en prenant en compte la nouvelle date du mariage.</p>
                    <input type="date" id="idealDate" value={idealDate} onChange={(e) => setIdealDate(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>

                <button type="submit" className="mt-4 bg-pinkk text-white px-4 py-2 rounded-lg border hover:border hover:scale-105 transition duration-300 ease-in-out">Enregistrer</button>
            </form>
        </article>
        </div>
    )
}