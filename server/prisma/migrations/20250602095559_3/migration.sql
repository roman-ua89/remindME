/*
  Warnings:

  - You are about to drop the column `categoryId` on the `SingleNote` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `SingleNote` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SingleNote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SingleNote` table. All the data in the column will be lost.
  - You are about to drop the column `viwedCoounter` on the `SingleNote` table. All the data in the column will be lost.
  - Added the required column `explanation` to the `SingleNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `SingleNote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SingleNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term" TEXT NOT NULL,
    "explanation" TEXT NOT NULL
);
INSERT INTO "new_SingleNote" ("id") SELECT "id" FROM "SingleNote";
DROP TABLE "SingleNote";
ALTER TABLE "new_SingleNote" RENAME TO "SingleNote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
