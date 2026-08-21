const { PrismaClient } = require('./lib/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Syncing all old Examination records to use the latest HealthMetric medical history...');
  
  const metrics = await prisma.healthMetric.findMany();
  for (const metric of metrics) {
    if (metric.medicalHistory) {
      await prisma.examination.updateMany({
        where: { patientId: metric.patientId },
        data: { medicalHistory: metric.medicalHistory }
      });
    }
  }

  // Also clean up any junk data (like "q") if necessary, but we'll leave it unless it causes errors.
  
  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
