// app/api/ai/question/route.ts
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { authConfig } from "@/lib/auth.config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { taskId, question } = await req.json();

  // ⚠️ Validation minimale
  if (!taskId || !question || question.trim().length < 5) {
    return NextResponse.json({ error: "Tâche et question requises (minimum 5 caractères)" }, { status: 400 });
  }

  // Vérifie la longueur maximale de la question
  if (question.length > 500) {
    return NextResponse.json({ error: "La question est trop longue (500 caractères max)" }, { status: 400 });
  }

  try {
    // 🔎 Vérifie que la tâche existe et appartient à l’utilisateur
    const task = await prisma.checklistItem.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== session.user.id) {
      return NextResponse.json({ error: "Tâche introuvable ou interdite" }, { status: 404 });
    }

    const prompt = `
    Tu es un expert en organisation de mariages.

    Voici la tâche concernée :
    - 🎯 Titre : \${task.title}
    - 📝 Description : \${task.description}
    - 📂 Catégorie : \${task.category}
    - 📅 Date idéale : \${new Date(task.idealDate).toLocaleDateString("fr-FR")}
    - 🔥 Priorité : \${task.priority}

    L’utilisateur te pose cette question en lien avec cette tâche :
    "\${question}"

    Réponds de manière claire, concise et professionnelle. Ne donne aucun texte autour, aucun commentaire ou explication supplémentaire. Contente-toi de la réponse à la question.`;


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({
      taskId,
      question,
      answer: aiResponse,
    });
  } catch (error) {
    console.error("Erreur IA /ai/question :", error);
    return NextResponse.json({ error: "Erreur serveur IA" }, { status: 500 });
  }
}
