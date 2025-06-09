import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export default async function Mentions() {
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
    
    <article className="font-sans flex flex-col text-center justify-center items-center tracking-widest mt-20 mb-20 px-5 sm:px-0">
        <h1 className="text-2xl">Mentions Légales</h1>
        <p className="mt-10">
           <strong>Propriétaire du site</strong> <br />
            Nom : Lenny GOMES PINTO BARRETO <br />
            Adresse : 5 rue Auguste Bernard, 78320<br />
            Email : gleam-pro@proton.me<br />
            SIRET : 938 832 987 00011<br /><br />

           <strong>Hébergement</strong>  <br />
            Nom de l’hébergeur : Vercel Inc.<br />
            Site : https://vercel.com/<br /><br />

            <strong>Propriété intellectuelle</strong><br />
            Le contenu de ce site (textes, images, etc.) est protégé par les lois en vigueur sur la propriété intellectuelle.
        </p>
    </article>



     <Footer />
    </>
  );
}
