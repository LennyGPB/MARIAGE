"use client";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from 'react';

type Props = {
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    premium: boolean;
    hasChecklist: boolean;
  } | null;
};

export default function Pricing({user} : Props) {
    const { data: session } = useSession();
    const [textPremium, setTextPremium] = useState("Obtenir l'offre Premium");

    const handleCheckout = async () => {
        if (user?.premium) {
            setTextPremium("Vous êtes déjà Premium !");
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session?.user?.id }),
        });

        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert("Une erreur est survenue lors de la création de la session de paiement.");
        }
    };

    return (
        <>
        <article id="price" className="z-50 font-sans flex flex-col justify-center items-center tracking-wide mt-24 mb-20">

            <h2 className="tracking-widest font-light text-4xl">Tarif - <span className=" font-bold">Premium</span></h2>
            <p className="text-center text-black/50 text-md font-light mt-7 w-[350px] md:w-[1000px]">Accède à ta <span className="font-medium">checklist intelligente</span> et <span className="font-medium">ultra-personnalisée</span> pour organiser ton mariage <span className="font-medium">sereinement.</span> <br />
                Plus de 50 tâches générées par IA, prêtes à l’emploi. Profite de toutes les fonctionnalités en illimité, <span className="font-medium">à vie !</span>
            </p>

            <div className="md:ml-20 flex justify-center items-center gap-4 mt-7">
                
                <article className="py-7 w-[350px] rounded-2xl [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
                    <p className="bg-pinkk text-white rounded-xl w-40 text-center mx-4 font-bold">Offre Premium</p>

                    <div className="mt-7 mx-5 flex items-end ">
                        <p className="font-bold text-3xl line-through text-gray-400">49$</p>
                        <p className="font-bold text-3xl ml-2">29$/</p>
                        <p className=" text-md">à vie</p>
                    </div>

                    {/* <p className="text-sm mt-4 mx-5">BLABLABLABLA</p> */}

                    <div className="flex flex-col gap-2 mx-5 mt-7 text-sm">
                        <p><CheckCircleIcon className="mr-1" /> Checklist personnalisée</p>
                        <p><CheckCircleIcon className="mr-1"/> Nombre de tâches illimitées</p>
                        <p><CheckCircleIcon className="mr-1"/> Vue par catégorie et par mois</p>
                        <p><CheckCircleIcon className="mr-1"/> Mises à jour gratuites à vie</p>
                        <p><CheckCircleIcon className="mr-1"/> Aucune publicité</p>
                        <p><CheckCircleIcon className="mr-1"/> Support prioritaire</p>
                    </div>

                    <div className="flex justify-center mt-7">
                        <button onClick={handleCheckout} className="uppercase bg-pinkk text-white font-bold px-5 py-2 rounded-2xl hover:scale-105 transition duration-300 ease-in-out">
                            {textPremium}
                        </button>
                    </div>
                </article>
                <Image className="hidden md:block" src="/images/lover.png" alt="Offre Premium" width={500} height={500} />
            </div>
            
        </article>
        </>
    )
}