/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { authConfig } from "@/lib/auth.config";

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!params?.id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  const taskId = params.id;
  const body = await req.json();

  try {
    const existing = await prisma.checklistItem.findUnique({
      where: { id: taskId },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Tâche introuvable ou interdite" },
        { status: 404 }
      );
    }

    const updated = await prisma.checklistItem.update({
      where: { id: taskId },
      data: {
        title: body.title ?? existing.title,
        description: body.description ?? existing.description,
        category: body.category ?? existing.category,
        priority: body.priority ?? existing.priority,
        idealDate: body.idealDate
          ? new Date(body.idealDate)
          : existing.idealDate,
        status: body.status ?? existing.status,
      },
    });

    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error("Erreur PATCH /checklist/:id :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  const session = await getServerSession(authConfig);

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

    if (!task.isCustom) {
      return NextResponse.json(
        { error: "Impossible de supprimer une tâche IA" },
        { status: 400 }
      );
    }

    await prisma.checklistItem.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /checklist/:id :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
