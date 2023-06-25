/*
  Warnings:

  - Added the required column `priority` to the `referral_camp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "referral_camp" ADD COLUMN     "priority" BOOLEAN NOT NULL;
