-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "traker" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "advocate_id" TEXT NOT NULL,
    "referral_email" TEXT NOT NULL,
    "discount_code" TEXT NOT NULL,

    CONSTRAINT "traker_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_id_key" ON "customers"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "traker_referral_email_key" ON "traker"("referral_email");

-- CreateIndex
CREATE UNIQUE INDEX "traker_discount_code_key" ON "traker"("discount_code");
