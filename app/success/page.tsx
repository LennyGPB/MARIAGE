"use client";

import Navbar from "@/components/shared/Navbar";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SuccessPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    const checkUserAndGenerateChecklist = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`);
        if (!res.ok) {
          console.error("Utilisateur non autorisé");
          window.location.href = `/`;
          return;
        }

        const { user } = await res.json();
        setUser(user);

        if (!user.premium) {
          window.location.href = `/`;
          return;
        }

        if (user.haschecklist === true) {
          window.location.href = `/dashboard`;
          return;
        }

        // 2️⃣ Vérifie s'il y a déjà les réponses dans le localStorage
        let parsedAnswers;
        const storedAnswers = localStorage.getItem("quizAnswers");
        if (storedAnswers) {
          parsedAnswers = JSON.parse(storedAnswers);
        } else {
          // 3️⃣ Sinon, récupère l'onboarding depuis l'API
          const onboardingRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`);

          if (!onboardingRes.ok) {
            console.error("Impossible de récupérer l'onboarding en base");
            return;
          }

          parsedAnswers = await onboardingRes.json();
        }

        // 4️⃣ Envoie les réponses pour générer la checklist IA
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checklist/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedAnswers),
        });

        if (!response.ok) {
          throw new Error("Failed to submit quiz");
        }

        window.location.href = `/dashboard`;
      } catch (error) {
        console.error("Erreur lors du processus complet:", error);
      }
    };

    checkUserAndGenerateChecklist();
  }, []);

 
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
    
    <div className="flex flex-col items-center justify-center tracking-widest mt-16 md:mt-20">
      <SparklesText className="font-sans text-2xl md:text-5xl font-light"><span className="text-[#DB80FF] font-bold">Merci</span> pour ta confiance !</SparklesText>
      <p className="text-black/50 text-center md:text-left text-sm md:text-lg font-sans font-light mt-7 md:mt-4 w-[350px] md:w-[1000px] px-2"><span className="font-medium">Ta checklist</span> personnalisée va être générée par notre IA...</p>
      <p className="text-black/50 text-center md:text-left text-sm md:text-lg font-sans font-light mt-4 md:mt-0 w-[350px] md:w-[1000px] px-2"><span className="font-medium">Pas besoin de rafraîchir</span> la page – nous nous occupons de tout !</p>
      <p className="text-black/50 text-xs font-sans font-light mt-4">Cela prend quelques secondes…</p>
      <div className="flex items-center justify-center mt-10">

        <div className="relative">
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
      </div>


    </div>
    </>
  );
}
