/*
  Warnings:

  - You are about to drop the column `balance` on the `commission` table. All the data in the column will be lost.
  - Added the required column `type_of` to the `mail_template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commission" DROP COLUMN "balance";

-- AlterTable
ALTER TABLE "mail_template" ADD COLUMN     "type_of" TEXT NOT NULL;
