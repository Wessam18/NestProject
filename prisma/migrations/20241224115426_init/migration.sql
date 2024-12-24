-- CreateTable
CREATE TABLE "FavoriteMovie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteMovie_imdbID_key" ON "FavoriteMovie"("imdbID");
