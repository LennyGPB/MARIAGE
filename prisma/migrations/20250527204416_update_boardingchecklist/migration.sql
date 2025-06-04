/*
  Warnings:

  - Added the required column `organisateurs` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestataires` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `weddingDate` on the `Onboarding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "organisateurs" TEXT NOT NULL,
ADD COLUMN     "prestataires" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "weddingDate",
ADD COLUMN     "weddingDate" TIMESTAMP(3) NOT NULL;
