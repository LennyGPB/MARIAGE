import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export default async function Politique() {
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
    <Navbar user={user} />
    
    <article className="text-sm font-sans flex flex-col text-center justify-center items-center tracking-wide mt-20 mb-20 px-5 sm:px-0">
        <h1 className="text-2xl">POLITIQUE DE CONFIDENTIALITÉ</h1>
        <p className="mt-10">
            1. Données collectées<br />
            Lors de la création de compte et de l&apos;utilisation des services, nous collectons les données suivantes :<br /><br />

            - Email<br />
            - Prénom<br /><br />

            2. Finalité du traitement<br />
            Les données sont collectées pour :<br /><br />

            - Créer et gérer le compte utilisateur<br />
            - Traiter les paiements via Stripe<br />
            - Permettre l&apos;envoi de messages via le formulaire de contact (Formspree)<br /><br />

            3. Destinataires et sous-traitants<br />
            Les données peuvent être partagées avec :<br /><br />

            - Stripe pour la gestion des paiements<br />
            - Formspree pour la réception des messages de contact<br /><br />

            4. Stockage des données<br />
            Les données sont stockées dans la base de données hébergée sur Vercel.<br /><br />

            5. Durée de conservation<br />
            Les données sont conservées jusqu&apos;à la suppression du compte par l&apos;utilisateur.<br /><br />

            6. Droits des utilisateurs<br />
            Conformément à la législation en vigueur (RGPD), les utilisateurs disposent d&apos;un droit d&apos;accès, de rectification et de suppression de leurs données.<br />
            Pour exercer ces droits, envoyez un email à : gleam-pro@proton.me ou via la section &quot;Support&quot; du site.
        </p>
    </article>



     <Footer />
    </>
  );
}
