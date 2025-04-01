/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `active` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_productId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Product";
