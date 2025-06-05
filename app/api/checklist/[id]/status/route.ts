/* eslint-disable @typescript-eslint/no-explicit-any */


import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

export async function PATCH(req: Request, { params }: { params: any }) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const taskId = params.id;
  const { status } = await req.json();

  // ✅ Vérifie que le statut est valide
  const validStatuses = ["todo", "in_progress", "done"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  try {
    // 🔐 Vérifie que la tâche appartient bien à l'utilisateur
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
      data: { status },
    });

    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error("Erreur PATCH /checklist/:id/status :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
