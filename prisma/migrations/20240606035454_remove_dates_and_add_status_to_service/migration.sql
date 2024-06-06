/*
  Warnings:

  - You are about to drop the column `entryDate` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `services` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "services" DROP COLUMN "entryDate",
DROP COLUMN "exitDate",
ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'PENDING';
