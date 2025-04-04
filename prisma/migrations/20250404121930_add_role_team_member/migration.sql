/*
  Warnings:

  - Added the required column `role` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "role" TEXT NOT NULL;
