-- CreateTable
CREATE TABLE "affiliate_camp" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "commission_type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "influencer" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "affiliate_camp_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "influencer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "influencer_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_camp_influencer_key" ON "affiliate_camp"("influencer");

-- CreateIndex
CREATE UNIQUE INDEX "influencer_email_key" ON "influencer"("email");
