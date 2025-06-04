/*
  Warnings:

  - Added the required column `organisateurs` to the `Onboarding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestataires` to the `Onboarding` table without a default value. This is not possible if the table is not empty.
  - Made the column `theme` on table `Onboarding` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_userId_fkey";

-- AlterTable
ALTER TABLE "Onboarding" ADD COLUMN     "organisateurs" TEXT NOT NULL,
ADD COLUMN     "prestataires" TEXT NOT NULL,
ADD COLUMN     "urgent" TEXT,
ALTER COLUMN "weddingDate" SET DATA TYPE TEXT,
ALTER COLUMN "locationKnown" SET DATA TYPE TEXT,
ALTER COLUMN "guestCount" SET DATA TYPE TEXT,
ALTER COLUMN "budget" SET DATA TYPE TEXT,
ALTER COLUMN "theme" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
