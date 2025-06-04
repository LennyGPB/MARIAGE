// app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Méthode POST : pour enregistrer l'onboarding d'un utilisateur
export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  // 🔐 Vérifie que l'utilisateur est connecté
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const {
      weddingDate,
      weddingType,
      locationKnown,
      guestCount,
      budget,
      theme,
      prestataires,
      organisateurs
    } = await req.json();

    // 🛡️ Optionnel : vérification rapide des champs requis
    if (!weddingDate || !weddingType || guestCount == null || budget == null) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // 🧠 Vérifie si un onboarding existe déjà
    const existing = await prisma.onboarding.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      return NextResponse.json({ error: "Onboarding déjà rempli" }, { status: 409 });
    }

    // ✅ Crée l'onboarding
    const onboarding = await prisma.onboarding.create({
      data: {
        userId: session.user.id,
        weddingDate: new Date(weddingDate),
        weddingType,
        locationKnown,
        guestCount,
        budget,
        theme,
        prestataires: prestataires || [],
        organisateurs,
      },
    });

    return NextResponse.json(onboarding);
  } catch (error) {
    console.error("Erreur onboarding:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  // 🔐 Vérifie si la session est active
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // 🔍 Cherche l'onboarding lié à l'utilisateur
    const onboarding = await prisma.onboarding.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!onboarding) {
      return NextResponse.json({ error: "Aucun onboarding trouvé" }, { status: 404 });
    }

    return NextResponse.json(onboarding);
  } catch (error) {
    console.error("Erreur GET /onboarding :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
