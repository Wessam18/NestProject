/*
  Warnings:

  - Added the required column `image1` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteMovie"
ADD COLUMN "image1" VARCHAR NOT NULL DEFAULT 'default_image_url';
