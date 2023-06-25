-- CreateTable
CREATE TABLE "referral_camp" (
    "id" TEXT NOT NULL,
    "pricerule_name" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "activate" BOOLEAN NOT NULL,

    CONSTRAINT "referral_camp_pkey" PRIMARY KEY ("id")
);
