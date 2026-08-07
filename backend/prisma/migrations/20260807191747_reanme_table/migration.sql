/*
  Warnings:

  - You are about to drop the `DocumentProcessing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentProcessing" DROP CONSTRAINT "DocumentProcessing_documentId_fkey";

-- DropTable
DROP TABLE "DocumentProcessing";

-- CreateTable
CREATE TABLE "DocumentAnalysis" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "content" TEXT,
    "processedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "DocumentAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentAnalysis_documentId_key" ON "DocumentAnalysis"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentAnalysis" ADD CONSTRAINT "DocumentAnalysis_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
