/*
  Warnings:

  - You are about to drop the `affiliate_camp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referral_camp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "affiliate_camp";

-- DropTable
DROP TABLE "referral_camp";

-- CreateTable
CREATE TABLE "campagin" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "pricerule_name" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "camp_type" TEXT NOT NULL,
    "min_val" TEXT NOT NULL,
    "order_currency" TEXT NOT NULL,
    "order_date" TEXT NOT NULL,
    "order_emaildomain" TEXT NOT NULL,
    "activate" BOOLEAN NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "campagin_pkey" PRIMARY KEY ("uuid")
);
