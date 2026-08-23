const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const exams = await prisma.examination.findMany({
    orderBy: { id: 'desc' },
    take: 5,
    include: { appointment: true }
  });
  console.log("EXAMINATIONS:");
  console.log(JSON.stringify(exams, null, 2));

  const appts = await prisma.appointment.findMany({
    orderBy: { id: 'desc' },
    take: 5
  });
  console.log("APPOINTMENTS:");
  console.log(JSON.stringify(appts, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
