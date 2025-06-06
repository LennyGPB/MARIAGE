import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma"; // adapte si besoin

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  console.log("🔔 Webhook Stripe reçu !");
  const sig = req.headers.get("stripe-signature")!;

  const rawBody = await req.arrayBuffer();
  const buf = Buffer.from(rawBody);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Erreur de vérification Stripe :", error);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // Écoute l'événement de paiement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { premium: true },
      });
      console.log("Premium mis à jour pour l'utilisateur", userId);
    }
  }

  return NextResponse.json({ received: true });
}
