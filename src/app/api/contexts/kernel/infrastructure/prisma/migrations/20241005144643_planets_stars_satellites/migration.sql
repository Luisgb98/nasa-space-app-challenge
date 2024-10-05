-- CreateTable
CREATE TABLE "planets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "actualRadius" DOUBLE PRECISION NOT NULL,
    "scaledRadius" DOUBLE PRECISION NOT NULL,
    "actualDistanceFromSun" DOUBLE PRECISION NOT NULL,
    "scaledDistance" DOUBLE PRECISION NOT NULL,
    "circumference" DOUBLE PRECISION NOT NULL,
    "rotationPeriod" DOUBLE PRECISION NOT NULL,
    "rotationSpeed" DOUBLE PRECISION NOT NULL,
    "mayorAxis" DOUBLE PRECISION NOT NULL,
    "eccentricity" DOUBLE PRECISION NOT NULL,
    "dwarf" BOOLEAN NOT NULL,

    CONSTRAINT "planets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "actualRadius" DOUBLE PRECISION NOT NULL,
    "scaledRadius" DOUBLE PRECISION NOT NULL,
    "actualDistanceFromPlanet" DOUBLE PRECISION NOT NULL,
    "scaledDistance" DOUBLE PRECISION NOT NULL,
    "circumference" DOUBLE PRECISION NOT NULL,
    "rotationPeriod" DOUBLE PRECISION NOT NULL,
    "rotationSpeed" DOUBLE PRECISION NOT NULL,
    "planet_name" TEXT NOT NULL,

    CONSTRAINT "satellites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stars" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "actualRadius" DOUBLE PRECISION NOT NULL,
    "scaledRadius" DOUBLE PRECISION NOT NULL,
    "actualDistance" DOUBLE PRECISION NOT NULL,
    "scaledDistance" DOUBLE PRECISION NOT NULL,
    "circumference" DOUBLE PRECISION NOT NULL,
    "rotationPeriod" DOUBLE PRECISION NOT NULL,
    "rotationSpeed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planets_name_key" ON "planets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "satellites_name_key" ON "satellites"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stars_name_key" ON "stars"("name");

-- AddForeignKey
ALTER TABLE "satellites" ADD CONSTRAINT "satellites_planet_name_fkey" FOREIGN KEY ("planet_name") REFERENCES "planets"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
