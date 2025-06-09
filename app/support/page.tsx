"use client";

import Navbar from "@/components/shared/Navbar";
import { useSession } from "next-auth/react";

export default function Support() {
  const { data: session } = useSession();
  const user = session?.user || null;

  return (
    <>
    <Navbar
      user={
        user
          ? {
              id: user.id,
              name: user.name ?? null,
              email: user.email ?? "",
              image: user.image ?? null,
              premium: user.premium ?? false,
              hasChecklist: user.haschecklist ?? false,
            }
          : null
      }
    />
    
    <article className="font-sans flex flex-col justify-center items-center tracking-widest mt-24 mb-20 px-5 sm:px-0">
      <h2 className="tracking-widest font-light text-xl md:text-4xl text-center">
          Besoin d’aide ? <span className="font-bold">Écris-nous !</span>
      </h2>

      <form className="flex flex-col gap-6 mt-10 w-full max-w-md" action="https://formspree.io/f/mqabpelv" method="POST">
          <label className="flex flex-col text-xs sm:text-sm font-medium text-gray-700">
          Ton email :
          <input
              type="email"
              name="email"
              required
              className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="you@example.com"
          />
          </label>

          <label className="flex flex-col text-xs sm:text-sm font-medium text-gray-700">
          Ton message :
          <textarea
              name="message"
              required
              className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black resize-none"
              placeholder="Écris ton message ici..."
          ></textarea>
          </label>

          <button type="submit" className="bg-pinkk font-bold text-white py-2 px-4 rounded-md hover:scale-105 transition duration-300 ease-in-out">Envoyer</button>
      </form>
    </article>



   
    </>
  );
}
