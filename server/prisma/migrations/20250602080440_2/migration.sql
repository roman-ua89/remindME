-- CreateTable
CREATE TABLE "SingleNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "viwedCoounter" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);
