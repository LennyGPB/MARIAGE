/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { softLimiter } from "@/lib/rateLimiter";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const tasks = await prisma.checklistItem.findMany({
      where: {
        userId: session.user.id,
        //visible: true,
      },
      orderBy: {
        idealDate: "asc",
      },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Erreur GET /checklist :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  const session = await getServerSession(authConfig);

  const ip = req.headers.get("x-forwarded-for") || "";
  const key = session?.user?.id ?? ip;

  const { success } = await softLimiter.limit(key);
  if (!success) {
    return NextResponse.json({ message: "Trop de requêtes. Réessaie plus tard." }, { status: 429 });
  }

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const taskId = params.id;

  try {
    const task = await prisma.checklistItem.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Tâche introuvable ou interdite" },
        { status: 404 }
      );
    }

    // if (!task.isCustom) {
    //   return NextResponse.json(
    //     { error: "Impossible de supprimer une tâche IA" },
    //     { status: 400 }
    //   );
    // }

    await prisma.checklistItem.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /checklist/:id :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
