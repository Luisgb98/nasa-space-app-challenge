/*
  Warnings:

  - Added the required column `texture` to the `satellites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "satellites" ADD COLUMN     "texture" TEXT NOT NULL;
