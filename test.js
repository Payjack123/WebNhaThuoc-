const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.appointment.findMany({ take: 5, orderBy: { id: 'desc' } })
  .then(a => console.log(a))
  .finally(() => prisma.$disconnect());
