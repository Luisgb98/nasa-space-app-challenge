/*
  Warnings:

  - Added the required column `texture` to the `planets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "planets" ADD COLUMN     "texture" TEXT NOT NULL;
