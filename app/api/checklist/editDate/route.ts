import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authConfig } from "@/lib/auth.config";

// Initialisation OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

interface ChecklistItemInput {
  title: string;
  description: string;
  category: string;
  offset: number;
  priority: string;
  organisateurs?: string;
  prestataires?: string;
}

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

    Voici les informations fournies par le couple :
    - 📅 Date du mariage : \${onboarding.weddingDate}
    - 🕊️ Type de cérémonie : \${onboarding.weddingType}
    - 📍 Lieu déjà défini : \${onboarding.locationKnown}
    - 👥 Nombre d'invités estimé : \${onboarding.guestCount}
    - 💰 Budget global : \${onboarding.budget}
    - 🎨 Thème souhaité : \${onboarding.theme || "non précisé"}
    - ⚡ Priorité(s) : \${onboarding.urgent || "aucune"}
    - 🧑‍🤝‍🧑 Prestataires déjà trouvés : \${onboarding.prestataires}
    - 🧠 Degré d'organisation / accompagnement souhaité : \${onboarding.organisateurs}

    En t’appuyant sur ces éléments, génère une **liste de 30 à 60 tâches** détaillées qui aideront ce couple à organiser leur mariage de façon sereine et personnalisée.

    ### Format attendu pour chaque tâche :
    {
      "title": "Titre de la tâche",
      "description": "Une explication claire et concrète, rédigée en 3 à 4 paragraphes si nécessaire. Elle doit expliquer pourquoi cette tâche est utile, quand et comment la réaliser, et inclure un **conseil pratique** commençant explicitement par « Mon conseil : » directement dans la description. Donne des conseils adaptés au contexte du couple.",
      "category": "Une catégorie pertinente (ex: Lieu, Prestataires, Budget, Logistique...)",
      "offset": -12, // nombre de mois avant le mariage où la tâche doit idéalement être réalisée
      "priority": "haute" // peut être "haute", "moyenne" ou "basse"
    }

    ⚠️ La description doit être riche, concrète, et aller en profondeur. Évite toute formulation générique ou superficielle. Raconte chaque tâche comme une mini-histoire : explique son importance, ses bénéfices, ses impacts potentiels, et intègre un « Mon conseil : … » à la fin pour aider le couple à la mettre en œuvre facilement (sans markdown "**" etc.).

    Renvoie **uniquement** un tableau JSON **valide** avec ces objets. Aucun texte autour, juste le tableau. Pas de commentaire, pas de phrase, pas de bloc Markdown.

    ⚠️ Ne coupe jamais la réponse en cours. Réponds uniquement avec un tableau JSON complet, même s’il contient moins de 60 tâches. N’écris jamais un texte non JSON autour.
    Si tu dois couper, termine correctement le tableau avec "]".

    Utilise un ton bienveillant, professionnel, et pertinent.
    `;


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const checklist = JSON.parse(completion.choices[0].message.content || "[]");


    const tasks = await Promise.all(
      checklist.map((item: ChecklistItemInput) => {
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
            status: "À faire",
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
