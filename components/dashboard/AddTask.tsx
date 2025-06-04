import { useState } from "react";

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
  onBack: () => void;
}

export default function AddTask({ onBack }: Props) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("Lieu");
    const [priority, setPriority] = useState<string>("Haute");
    const [idealDate, setIdealDate] = useState<string>("");

    const formData = {
        title: title,
        description: description,
        category: category,
        priority: priority,
        idealDate: idealDate,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/checklist/customTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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
                    <label htmlFor="title" className="text-sm font-medium">Titre de la tâche</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg p-2 h-36 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>

                 <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                    <select id="category" defaultValue={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="Lieu">Lieu</option>
                        <option value="Budget">Budget</option>
                        <option value="Décoration">Décoration</option>
                        <option value="Invités">Invités</option>
                        <option value="Logistique">Logistique</option>
                        <option value="Traiteur">Traiteur</option>
                        <option value="Prestataires">Prestataires</option>
                        <option value="Tenues">Tenues</option>
                        <option value="Cérémonie">Cérémonie</option>
                        <option value="Jour J">Jour J</option>
                        <option value="Autres">Autres</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="priority" className="text-sm font-medium">Priorité</label>
                    <select id="priority" defaultValue={priority}onChange={(e) => setPriority(e.target.value)}  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="idealDate" className="text-sm font-medium">Date idéale (DEADLINE)</label>
                    <input type="date" id="idealDate" value={idealDate} onChange={(e) => setIdealDate(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                </div>

                <button type="submit" className="mt-4 bg-pinkk text-white px-4 py-2 rounded-lg border hover:border hover:scale-105 transition duration-300 ease-in-out">Enregistrer</button>
            </form>
        </article>
        </div>
    )
}