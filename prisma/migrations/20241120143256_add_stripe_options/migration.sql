-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'MONTH', 'BETA', 'PREMIUM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "userPlan" "UserPlan" DEFAULT 'FREE';
