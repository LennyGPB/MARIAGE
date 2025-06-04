// app/api/checklist/editDate/route.ts
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authConfig } from "@/lib/auth.config";

// Initialisation OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function PATCH(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { newWeddingDate } = await req.json();
  if (!newWeddingDate) {
    return NextResponse.json({ error: "Nouvelle date manquante" }, { status: 400 });
  }

  try {
    // 🔄 1) Met à jour la date dans Onboarding
    const onboarding = await prisma.onboarding.update({
      where: { userId: session.user.id },
      data: { weddingDate: new Date(newWeddingDate) },
    });

    // 🗑️ 2) Supprime les anciennes tâches
    await prisma.checklistItem.deleteMany({
      where: { userId: session.user.id },
    });

    // 🧠 3) Regénère les tâches IA avec la nouvelle date
    const prompt = `
    Tu es un expert en organisation de mariages.

    Voici les infos mises à jour :
    - Date du mariage : ${new Date(newWeddingDate).toISOString().split("T")[0]}
    - Type : ${onboarding.weddingType}
    - Lieu connu : ${onboarding.locationKnown ? "oui" : "non"}
    - Nombre d'invités : ${onboarding.guestCount}
    - Budget : ${onboarding.budget} €
    - Thème : ${onboarding.theme ?? "non précisé"}

    Génère une liste de 30 à 60 tâches au format :
    {
    "title": "...",
    "description": "...",
    "category": "...",
    "offset": -12,
    "priority": "haute"
    }

    Renvoie uniquement un tableau JSON valide.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const checklist = JSON.parse(completion.choices[0].message.content || "[]");

    const tasks = await Promise.all(
      checklist.map((item: any) => {
        const idealDate = new Date(newWeddingDate);
        idealDate.setMonth(idealDate.getMonth() + item.offset);

        return prisma.checklistItem.create({
          data: {
            userId: session.user.id,
            title: item.title,
            description: item.description,
            category: item.category,
            offset: item.offset,
            idealDate,
            priority: item.priority,
            status: "todo",
            visible: true,
            isCustom: false,
            organisateurs: item.organisateurs || "",
            prestataires: item.prestataires || "",
          },
        });
      })
    );

    return NextResponse.json({
      message: "Date de mariage mise à jour et checklist régénérée",
      onboarding,
      tasks,
    });
  } catch (error) {
    console.error("Erreur PATCH /checklist/editDate :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
