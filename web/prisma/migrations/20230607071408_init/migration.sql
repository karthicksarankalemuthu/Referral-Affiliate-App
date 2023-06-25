/*
  Warnings:

  - Added the required column `order_currency` to the `referral_camp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_date` to the `referral_camp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_emaildomain` to the `referral_camp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "referral_camp" ADD COLUMN     "order_currency" TEXT NOT NULL,
ADD COLUMN     "order_date" TEXT NOT NULL,
ADD COLUMN     "order_emaildomain" TEXT NOT NULL;
