import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { title, description, category, priority, idealDate } = await req.json();

  // Vérification minimale
  if (!title || !description || !category || !priority || !idealDate) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  try {
    const task = await prisma.checklistItem.create({
      data: {
        userId: session.user.id,
        title,
        description,
        category,
        priority,
        idealDate: new Date(idealDate),
        offset: 0, // offset non utilisé ici
        isCustom: true,
        visible: true,
        status: "todo",
        organisateurs: "", // Ajout des champs requis
        prestataires: "",  // Ajout des champs requis
      },
    });

    return NextResponse.json({ task });
  } catch (error) {
    console.error("Erreur POST /checklist/custom :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
