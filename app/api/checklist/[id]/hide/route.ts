import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { authConfig } from "@/lib/auth.config";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const taskId = params.id;
  if (!taskId) {
    return NextResponse.json({ error: "ID de tâche manquant" }, { status: 400 });
  }

  const { visible } = await req.json();

  try {
    // 🔐 Vérifie la propriété de la tâche
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
      data: {
        visible: visible,
      },
    });

    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error("Erreur PATCH /checklist/:id/hide :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
