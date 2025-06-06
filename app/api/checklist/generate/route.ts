import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authConfig } from "@/lib/auth.config";

// 🔑 Initialise le client OpenAI
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

export async function POST() {
  const session = await getServerSession(authConfig);

  // 🔐 Vérifie que l'utilisateur est connecté
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // 📥 Récupère l'onboarding utilisateur
  const onboarding = await prisma.onboarding.findUnique({
    where: { userId: session.user.id },
  });

  if (!onboarding) {
    return NextResponse.json({ error: "Onboarding manquant" }, { status: 400 });
  }

  const prompt = `
  Tu es un expert en organisation de mariages.

  Voici les informations fournies par le couple :
  - 📅 Date du mariage : ${onboarding.weddingDate}
  - 🕊️ Type de cérémonie : ${onboarding.weddingType}
  - 📍 Lieu déjà défini : ${onboarding.locationKnown}
  - 👥 Nombre d'invités estimé : ${onboarding.guestCount}
  - 💰 Budget global : ${onboarding.budget}
  - 🎨 Thème souhaité : ${onboarding.theme || "non précisé"}
  - ⚡ Priorité(s) : ${onboarding.urgent}
  - 🧑‍🤝‍🧑 Prestataires déjà trouvés : ${onboarding.prestataires}
  - 🧠 Degré d'organisation / accompagnement souhaité : ${onboarding.organisateurs}

  En t’appuyant sur ces éléments, génère une **liste de 30 à 60 tâches** détaillées qui aideront ce couple à organiser leur mariage de façon sereine et personnalisée.

  ### Format attendu pour chaque tâche :
  {
    "title": "Titre de la tâche",
    "description": "Une explication claire et concrète, rédigée en 1 à 3 paragraphes si nécessaire. Elle doit expliquer pourquoi cette tâche est utile, quand et comment la réaliser, et inclure des conseils adaptés au contexte du couple.",
    "category": "Une catégorie pertinente (ex: Lieu, Prestataires, Budget, Logistique...)",
    "offset": -12, // nombre de mois avant le mariage où la tâche doit idéalement être réalisée
    "priority": "haute" // peut être "haute", "moyenne" ou "basse"
  }

  La description doit être complète : 2 à 3 paragraphes si le sujet s’y prête. Donne des conseils pratiques, des étapes concrètes, et justifie pourquoi cette tâche est importante. Ne reste pas générique ou superficiel.
  Renvoie **uniquement** un tableau JSON **valide** avec ces objets. Aucun texte autour, juste le tableau.
  Pas de commentaire, pas de phrase, pas de bloc Markdown.
  ⚠️ Ne coupe jamais la réponse en cours. Réponds uniquement avec un tableau JSON complet, même s’il contient moins de 60 tâches. N’écris jamais un texte non JSON autour.
  Si tu dois couper, termine correctement le tableau avec "]".

  Utilise un ton bienveillant, professionnel, et pertinent.
  `

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    // 🔁 Parse la réponse JSON (brute, non sécurisée ici)
  let checklist = []
  try {
    const content = completion.choices[0].message.content ?? ""
    if (!content.trim().startsWith("[")) throw new Error("Pas un tableau JSON")
    checklist = JSON.parse(content)
  } catch (error) {
    console.error("❌ Erreur de parsing JSON :", error)
    console.log("🧪 Contenu reçu (tronqué) :", completion.choices?.[0]?.message.content?.slice(0, 1000))
    throw new Error("La réponse de l'IA n'était pas un JSON valide.")
  }


    // 📅 Calcule les dates idéales et enregistre chaque tâche
    const tasks = await Promise.all(
      checklist.map((item: ChecklistItemInput) => {
        const idealDate = new Date(onboarding.weddingDate);
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
            prestataires: item.prestataires || "",
            organisateurs: item.organisateurs || "",
          },
        });
      })
    );

    await prisma.user.update({
      where: { id: session.user.id },
      data: { hasChecklist: true },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Erreur OpenAI ou DB :", error);
    return NextResponse.json({ error: "Échec de la génération" }, { status: 500 });
  }
}
