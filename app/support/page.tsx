import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";

export default async function Support() {
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
