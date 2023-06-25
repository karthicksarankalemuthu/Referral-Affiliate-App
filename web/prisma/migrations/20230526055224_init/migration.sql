/*
  Warnings:

  - The primary key for the `members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `referral_camp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `referral_camp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The required column `uuid` was added to the `members` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `referral_camp` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "members" DROP CONSTRAINT "members_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "members_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "referral_camp" DROP CONSTRAINT "referral_camp_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "referral_camp_pkey" PRIMARY KEY ("uuid");

-- CreateTable
CREATE TABLE "popup_template" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "des" TEXT NOT NULL,
    "popup_bg" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "btn_bg" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,

    CONSTRAINT "popup_template_pkey" PRIMARY KEY ("uuid")
);
