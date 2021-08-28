/*
  Warnings:

  - Added the required column `userId` to the `to_do` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "to_do" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "to_do" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
