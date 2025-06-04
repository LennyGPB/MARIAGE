/*
  Warnings:

  - The `prestataires` column on the `Onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `urgent` column on the `Onboarding` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "prestataires",
ADD COLUMN     "prestataires" TEXT[],
DROP COLUMN "urgent",
ADD COLUMN     "urgent" TEXT[];
