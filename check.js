const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

async function main() { 
  const users = await prisma.user.findMany({ select: { dob: true } }); 
  console.log(users.map(u => u.dob)); 
} 

main().finally(() => prisma.$disconnect());
