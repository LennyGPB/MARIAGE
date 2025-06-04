import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

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

export async function DELETE() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const deleted = await prisma.checklistItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: `${deleted.count} tâche(s) supprimée(s)`,
    });
  } catch (error) {
    console.error("Erreur DELETE /checklist :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
