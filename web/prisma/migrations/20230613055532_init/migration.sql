/*
  Warnings:

  - You are about to drop the `campagin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "campagin";

-- CreateTable
CREATE TABLE "campaign" (
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

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "mail_template" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "des" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "btn_bg" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,

    CONSTRAINT "mail_template_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "commission" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "pay" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commission_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "commission_email_key" ON "commission"("email");
