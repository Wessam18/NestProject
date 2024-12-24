/*
  Warnings:

  - Added the required column `director` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteMovie" ADD COLUMN     "director" TEXT NOT NULL;
