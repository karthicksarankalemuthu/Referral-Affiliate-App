/*
  Warnings:

  - A unique constraint covering the columns `[aff_email]` on the table `payout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payout_aff_email_key" ON "payout"("aff_email");
