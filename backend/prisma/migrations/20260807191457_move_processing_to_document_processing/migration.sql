/*
  Warnings:

  - You are about to drop the column `content` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `processedAt` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "content",
DROP COLUMN "errorMessage",
DROP COLUMN "processedAt";

-- CreateTable
CREATE TABLE "DocumentProcessing" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "content" TEXT,
    "processedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "DocumentProcessing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentProcessing_documentId_key" ON "DocumentProcessing"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentProcessing" ADD CONSTRAINT "DocumentProcessing_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
