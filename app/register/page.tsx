"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import Navbar from "@/components/shared/Navbar";
import { useState } from "react";

export default function register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const formData = new URLSearchParams();
            formData.append("email", email);
            formData.append("password", password);

            const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData.toString(),
            });

            if (response.ok) {
            window.location.href = "/";
            } else {
            setError(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };


    return (
        <>
        <Navbar />
        <section className="font-inter tracking-widest flex flex-col items-center justify-center mt-24 ">
            <div className="relative bg-white p-8 rounded-lg shadow-md w-96 overflow-hidden">
                <BorderBeam size={100} colorFrom="#DB80FF" colorTo="#DB80FF" />
                <h2 className="text-xl  text-center tracking-[2px]">Inscrivez-vous !</h2>
                <p className="text-xs mb-6 text-center opacity-50">Débloquer complètement votre checklist</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-sm">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-6 text-sm">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <button type="submit" className="uppercase font-sans w-full bg-[#DB80FF] text-white font-bold py-2 px-4 rounded-xl hover:bg-purple-600 transition duration-200">S'inscrire</button>
                </form>
            </div>
            {/* <p className="mt-4 text-sm text-gray-600/50">Pas encore de compte ? <a href="/register" className="text-[#DB80FF] hover:underline">S'inscrire</a></p> */}
        </section>
        </>
    )


}