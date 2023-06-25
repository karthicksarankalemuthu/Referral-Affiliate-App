/*
  Warnings:

  - Added the required column `camp_type` to the `referral_camp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_val` to the `referral_camp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "referral_camp" ADD COLUMN     "camp_type" TEXT NOT NULL,
ADD COLUMN     "min_val" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "settings" TEXT[]
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_id_key" ON "shop"("id");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
