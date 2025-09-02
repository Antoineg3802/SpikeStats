/*
  Warnings:

  - You are about to drop the column `license` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Position" AS ENUM ('OUTSIDEHITTER', 'MIDDLEBLOCKER', 'OPPOSITEHITTER', 'LIBERO', 'SETTER');

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropIndex
DROP INDEX "TeamMember_teamId_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "license";

-- CreateTable
CREATE TABLE "PlayerProfile" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "license" TEXT,
    "jerseyNumber" INTEGER,
    "teamMemberId" TEXT NOT NULL,

    CONSTRAINT "PlayerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerProfile_teamMemberId_key" ON "PlayerProfile"("teamMemberId");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerProfile" ADD CONSTRAINT "PlayerProfile_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
