"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterModal() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       

        try {
            // 1. Enregistrement de l'utilisateur
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                name: formData.name,
            }),
            });

            if (response.ok) {
            // 2. Connexion automatique
            await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            // 3. Récupération des réponses du quiz depuis le localStorage
            const storedAnswers = localStorage.getItem("quizAnswers");
            if (!storedAnswers) throw new Error("Aucune réponse trouvée dans le localStorage");

            const parsedAnswers = JSON.parse(storedAnswers);

            // 4. Envoi à /api/onboarding
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedAnswers),
            });

            // 5. Nettoyage du localStorage
            localStorage.removeItem("quizAnswers");
            } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error("Erreur pendant l'inscription :", error);
        }
    };

    return (
        <>
        <section className="font-inter tracking-widest flex flex-col items-center justify-center ">
            <div className="relative bg-white p-8 rounded-lg shadow-md w-96 overflow-hidden">
                <BorderBeam size={100} colorFrom="#DB80FF" colorTo="#DB80FF" />
                <h2 className="text-xl  text-center tracking-[2px]">Inscrivez-vous !</h2>
                <p className="text-xs mb-6 text-center opacity-50">Débloquer complètement votre checklist</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-sm">
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="prenom" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4 text-sm">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-6 text-sm">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <button type="submit" className="uppercase font-sans w-full bg-[#DB80FF] text-white font-bold py-2 px-4 rounded-xl hover:scale-105 transition duration-300 ease-in-out">S&apos;inscrire</button>
                </form>
            </div>
            {/* <p className="mt-4 text-sm text-gray-600/50">Pas encore de compte ? <a href="/register" className="text-[#DB80FF] hover:underline">S'inscrire</a></p> */}
        </section>
        </>
    )


}