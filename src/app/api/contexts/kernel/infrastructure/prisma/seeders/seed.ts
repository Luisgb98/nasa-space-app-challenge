import { PrismaClient } from "@prisma/client";
import planets from "./planets.json";
import satellites from "./satellites.json";

const prisma = new PrismaClient();
async function main() {
  for (const planet of planets) {
    await prisma.planets.create({
      data: planet,
    });
  }
  console.log("Planets seeded");

  for (const satellite of satellites) {
    await prisma.satellites.create({
      data: satellite,
    });
  }
  console.log("Satellites seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    return;
  });
