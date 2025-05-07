/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinCode` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "joinCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_joinCode_key" ON "Team"("joinCode");
