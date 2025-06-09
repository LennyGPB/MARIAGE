"use client";

import Navbar from "@/components/shared/Navbar";
import Budget from "@/components/shared/quiz/budget";
import Ceremonie from "@/components/shared/quiz/ceremonie";
import QuizDate from "@/components/shared/quiz/date";
import Invite from "@/components/shared/quiz/invite";
import Lieu from "@/components/shared/quiz/lieu";
import Organisateurs from "@/components/shared/quiz/organisateurs";
import Prestataires from "@/components/shared/quiz/prestataires";
import Theme from "@/components/shared/quiz/theme";
import Urgent from "@/components/shared/quiz/urgent";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RegisterModal from "@/components/shared/RegisterModal";
import Pricing from "@/components/shared/landing/pricing";

type QuizAnswers = {
  weddingDate?: string
  weddingType?: string
  locationKnown?: string
  guestCount?: string
  budget?: string
  theme?: string
  urgent?: string[]
  prestataires?: string[]
  organisateurs?: string
}

export default function Quiz() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<QuizAnswers>({})
    // const [isLoading, setIsLoading] = useState(false)
    // const [isOnBoarding, setIsOnBoarding] = useState(false)
    const { data: session } = useSession();
    const goNext = () => setStep((prev) => prev + 1)

  const handleAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    const updated = {
      ...answers,
      [key]: value,
    };

    setAnswers(updated);
    localStorage.setItem("quizAnswers", JSON.stringify(updated));
    goNext();
  };


  useEffect(() => {
    const saved = localStorage.getItem("quizAnswers")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAnswers(parsed)
      } catch (e) {
        console.error("❌ QuizAnswers corrompu :", e)
      }
    }

    const fetchOnBoarding = async () => { 
      if (!session) { return; }
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch onboarding status");
        }

        //setIsOnBoarding(true);
        setStep(9);
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      }
    } 

    fetchOnBoarding();
  }, [])

  useEffect(() => {
    
    const sendOnboarding = async () => {
      if (!session || step !== 9) return;

      const storedAnswers = localStorage.getItem("quizAnswers");
      if (!storedAnswers) return; 

      try {
        const parsedAnswers = JSON.parse(storedAnswers);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedAnswers),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi de l'onboarding");
        }

        console.log("Onboarding envoyé avec succès !");
        localStorage.removeItem("quizAnswers");
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'onboarding :", error);
      }
    };

    sendOnboarding();
  }, [session, step]);


  //  const handleSubmit = async () => {
  //   //setIsLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:3000/api/checklist/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(answers),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to submit quiz");
  //     }
  //     window.location.href = `/dashboard`;
  //   } catch (error) {
  //     console.error("Error submitting quiz:", error);
  //   }
  //  }
   
    return (
        <>
        <Navbar />
        {step === 0 && <QuizDate onAnswer={(val) => handleAnswer("weddingDate", val)} />}
        {step === 1 && <Ceremonie onAnswer={(val) => handleAnswer("weddingType", val)} />}
        {step === 2 && <Lieu onAnswer={(val) => handleAnswer("locationKnown", val)} />}
        {step === 3 && <Invite onAnswer={(val) => handleAnswer("guestCount", val)} />}
        {step === 4 && <Budget onAnswer={(val) => handleAnswer("budget", val)} />}
        {step === 5 && <Theme onAnswer={(val) => handleAnswer("theme", val)} />}
        {step === 6 && <Urgent onAnswer={(val) => handleAnswer("urgent", val)} />}
        {step === 7 && <Prestataires onAnswer={(val) => handleAnswer("prestataires", val)} />}
        {step === 8 && <Organisateurs onAnswer={(val) => handleAnswer("organisateurs", val)} answers={answers} />}
        {step === 9 && (
          !session ? (
            <article className="flex flex-col justify-center items-center tracking-widest font-sans font-light mt-12 md:mt-20 ">
              <h1 className="text-center text-lg md:text-xl mb-10 font-light">Débloquer votre <span className="font-medium">checklist personnalisée !</span></h1>
              <RegisterModal />
            </article>
          ) : 
          <Pricing />
        )}
        </>
    )
}