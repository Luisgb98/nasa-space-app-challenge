/*
  Warnings:

  - Added the required column `translationSpeed` to the `planets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translationSpeed` to the `satellites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "planets" ADD COLUMN     "translationSpeed" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "satellites" ADD COLUMN     "translationSpeed" DOUBLE PRECISION NOT NULL;
