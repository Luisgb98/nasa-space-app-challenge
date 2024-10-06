-- CreateTable
CREATE TABLE "widget-configs" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "velocity" DOUBLE PRECISION NOT NULL,
    "orbits" BOOLEAN NOT NULL,
    "planets" BOOLEAN NOT NULL,
    "satellites" BOOLEAN NOT NULL,
    "dwarfs" BOOLEAN NOT NULL,

    CONSTRAINT "widget-configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "widget-configs_user_id_key" ON "widget-configs"("user_id");

-- AddForeignKey
ALTER TABLE "widget-configs" ADD CONSTRAINT "widget-configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
