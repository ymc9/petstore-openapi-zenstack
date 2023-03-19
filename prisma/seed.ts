import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const petData: Prisma.PetCreateInput[] = [
    {
        id: 'luna',
        name: 'Luna',
        category: 'kitten',
    },
    {
        id: 'max',
        name: 'Max',
        category: 'doggie',
    },
    {
        id: 'cooper',
        name: 'Cooper',
        category: 'reptile',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const p of petData) {
        const pet = await prisma.pet.create({
            data: p,
        });
        console.log(`Created Pet with id: ${pet.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
