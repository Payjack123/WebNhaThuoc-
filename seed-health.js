import { PrismaClient } from './lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  const patients = await prisma.user.findMany({
    where: { role: 'PATIENT' }
  });

  for (const p of patients) {
    const existing = await prisma.healthMetric.findUnique({
      where: { patientId: p.id }
    });
    
    if (existing) {
      await prisma.healthMetric.update({
        where: { id: existing.id },
        data: {
          weight: 65.5,
          height: 172.0,
          bmi: 22.1,
          bloodPressure: '118/75',
          heartRate: 72,
          temperature: 36.6,
          bloodType: 'O+',
          allergies: 'Hải sản, Phấn hoa',
          healthStatus: 'Bình thường',
          aiScore: 92,
          aiMessage: 'Sức khỏe tốt. Hãy tiếp tục duy trì chế độ sinh hoạt như hiện tại.'
        }
      });
      console.log(`Updated health metric for patient ${p.fullName}`);
    } else {
      await prisma.healthMetric.create({
        data: {
          patientId: p.id,
          weight: 65.5,
          height: 172.0,
          bmi: 22.1,
          bloodPressure: '118/75',
          heartRate: 72,
          temperature: 36.6,
          bloodType: 'O+',
          allergies: 'Hải sản, Phấn hoa',
          healthStatus: 'Bình thường',
          aiScore: 92,
          aiMessage: 'Sức khỏe tốt. Hãy tiếp tục duy trì chế độ sinh hoạt như hiện tại.'
        }
      });
      console.log(`Created health metric for patient ${p.fullName}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
