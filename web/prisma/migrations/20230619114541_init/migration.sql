-- CreateTable
CREATE TABLE "member_discount" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discounts" TEXT[],

    CONSTRAINT "member_discount_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_discount_email_key" ON "member_discount"("email");
