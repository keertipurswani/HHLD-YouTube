-- CreateTable
CREATE TABLE "VideoData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "VideoData_pkey" PRIMARY KEY ("id")
);
