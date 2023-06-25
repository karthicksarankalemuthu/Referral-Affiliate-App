/*
  Warnings:

  - Added the required column `enable` to the `popup_template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "popup_template" ADD COLUMN     "enable" BOOLEAN NOT NULL;
