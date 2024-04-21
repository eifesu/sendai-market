-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_Token" ("color", "createdAt", "id", "name", "token", "updatedAt", "value") SELECT "color", "createdAt", "id", "name", "token", "updatedAt", "value" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
