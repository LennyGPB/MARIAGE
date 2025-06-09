import LandingMain from "@/components/shared/landing/LandingMain";
import Pricing from "@/components/shared/landing/pricing";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import AccordionComponent from "@/components/shared/landing/Accordion";
import Velocity from "@/components/shared/landing/Velocity";

export default async  function Home() {
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
      <LandingMain user={user} />
      <Velocity />
      <AccordionComponent />
      <Pricing user={user} />
    </>
  );
}
