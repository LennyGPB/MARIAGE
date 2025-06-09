import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export default async function CGV() {
     const session = await getServerSession(authConfig);
     let user = null;
    
      if (session?.user?.id) {
        user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            premium: true,
            hasChecklist: true,
          },
        });
      }

  return (
    <>
    <Navbar user={user}/>
    
    <article className="text-sm font-sans flex flex-col text-center justify-center items-center tracking-widest mt-20 mb-20 px-10">
        <h1 className="text-2xl">CONDITIONS GÉNÉRALES DE VENTE</h1>
        <p className="mt-10">
            1. Objet <br />
            Ces conditions générales de vente régissent l’utilisation de la plateforme développée par Lenny GOMES PINTO BARRETO, permettant aux utilisateurs de générer une checklist intelligente et personnalisée pour leur mariage, via un assistant IA. <br /> <br />

            2. Accès et inscription <br />
            L’accès à la plateforme nécessite la création d’un compte par l’utilisateur (email et prénom). <br /> <br />

            3. Services proposés <br />
            La plateforme fournit un service de génération de checklist IA pour les mariages, avec des tâches personnalisées et un système de suivi. Le paiement donne accès immédiat à la checklist complète. <br /> <br />

            4. Paiement <br />
            Les paiements sont réalisés via Stripe, en une fois. Aucun abonnement n’est requis. <br /> <br />

            5. Livraison <br />
            L’accès au service est immédiat après paiement. <br /> <br />

            6. Remboursement <br />
            Aucun remboursement n’est possible après l’achat. <br /> <br />

            7. Données personnelles <br />
            Les données collectées sont traitées conformément à la politique de confidentialité. <br /> <br />

            8. Droit applicable <br />
            Les présentes conditions sont soumises au droit français. <br /> <br />
        </p>
    </article>



     <Footer />
    </>
  );
}
