import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  try {
    // Récupère les infos nécessaires (ex: email utilisateur si besoin)
    const body = await req.json();

    // Crée la Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Accès Premium à la checklist",
              description: "Checklist illimitée et fonctionnalités premium",
            },
            unit_amount: 2900, // 29€ en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // URL de succès et d'annulation (adapte les routes à ton projet)
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: body.userId || "", // si tu passes l'email pour t’y retrouver
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
}
