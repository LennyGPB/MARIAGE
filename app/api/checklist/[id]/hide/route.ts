/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { softLimiter } from "@/lib/rateLimiter";

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const ip = req.headers.get("x-forwarded-for") || "";
  const key = session?.user?.id ?? ip;
  
  const { success } = await softLimiter.limit(key);
  if (!success) {
    return NextResponse.json({ message: "Trop de requêtes. Réessaie plus tard." }, { status: 429 });
  }

  const taskId = params.id;
  if (!taskId) {
    return NextResponse.json({ error: "ID de tâche manquant" }, { status: 400 });
  }

  const { visible } = await req.json();

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

    const updated = await prisma.checklistItem.update({
      where: { id: taskId },
      data: { visible },
    });

    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error("Erreur PATCH /checklist/:id/hide :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
