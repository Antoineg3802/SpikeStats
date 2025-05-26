-- CreateTable
CREATE TABLE "WaitingList" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmToken" TEXT,
    "tokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_email_key" ON "WaitingList"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaitingList_confirmToken_key" ON "WaitingList"("confirmToken");
