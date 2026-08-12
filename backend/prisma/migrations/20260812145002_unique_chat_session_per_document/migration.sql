/*
  Warnings:

  - A unique constraint covering the columns `[userId,documentId]` on the table `ChatSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatSession_userId_documentId_key" ON "ChatSession"("userId", "documentId");
