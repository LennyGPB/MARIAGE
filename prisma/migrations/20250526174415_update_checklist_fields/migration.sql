-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'todo',
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
