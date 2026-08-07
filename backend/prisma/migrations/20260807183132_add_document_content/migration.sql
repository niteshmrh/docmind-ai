-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "content" TEXT,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "processedAt" TIMESTAMP(3);
