-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "advocate_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "referral_email" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("uuid")
);
