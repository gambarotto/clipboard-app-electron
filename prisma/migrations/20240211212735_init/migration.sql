-- CreateTable
CREATE TABLE "Annotation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnnotationToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AnnotationToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Annotation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AnnotationToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnnotationToCategory_AB_unique" ON "_AnnotationToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AnnotationToCategory_B_index" ON "_AnnotationToCategory"("B");
