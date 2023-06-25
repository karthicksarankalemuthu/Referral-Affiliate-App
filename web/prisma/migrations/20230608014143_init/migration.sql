/*
  Warnings:

  - Added the required column `enable` to the `influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `influencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "influencer" ADD COLUMN     "enable" BOOLEAN NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
