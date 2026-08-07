/*
  Warnings:

  - You are about to drop the `DocumentAnalysis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentAnalysis" DROP CONSTRAINT "DocumentAnalysis_documentId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "content" TEXT,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "processedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "DocumentAnalysis";
