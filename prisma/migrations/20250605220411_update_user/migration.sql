-- AlterTable
ALTER TABLE "ChecklistItem" ALTER COLUMN "status" SET DEFAULT 'Todo';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasChecklist" BOOLEAN NOT NULL DEFAULT false;
