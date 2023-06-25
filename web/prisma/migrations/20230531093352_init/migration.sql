-- CreateTable
CREATE TABLE "payout" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "aff_email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "payout_pkey" PRIMARY KEY ("uuid")
);
