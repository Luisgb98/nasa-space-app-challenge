/*
  Warnings:

  - Added the required column `texture` to the `stars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stars" ADD COLUMN     "texture" TEXT NOT NULL;
