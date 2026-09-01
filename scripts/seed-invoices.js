const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Invoices...');

  // Get all completed appointments to seed historical invoices
  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: ['HOÀN THÀNH', 'CHỜ XÁC NHẬN']
      }
    },
    include: {
      patient: {
        include: { patientProfile: true, labTests: true, prescriptions: { include: { items: true } } }
      },
      doctor: {
        include: { doctorProfile: true }
      }
    }
  });

  console.log(`Found ${appointments.length} appointments to process for invoices.`);

  for (const apt of appointments) {
    // Check if invoice already exists
    const existing = await prisma.invoice.findUnique({
      where: { appointmentId: apt.id }
    });
    if (existing) continue;

    const basePrice = apt.doctor?.doctorProfile?.price || 150000;
    
    // Simulate some logic to calculate costs
    const labCost = (apt.patient?.labTests?.length > 0) ? apt.patient.labTests.length * 200000 : 0;
    const medCost = (apt.patient?.prescriptions?.[0]?.items?.length || 0) * 50000;

    const rawTotal = basePrice + labCost + medCost;
    const insuranceDiscount = apt.patient?.patientProfile?.bhyt ? Math.round(basePrice * 0.2) : 0;
    const finalAmount = rawTotal - insuranceDiscount;

    const isCompleted = apt.status === 'HOÀN THÀNH';

    const randomMethods = ['Thẻ tín dụng', 'MoMo', 'Chuyển khoản', 'VNPay', 'Tiền mặt'];
    const paymentMethod = isCompleted ? randomMethods[apt.id % randomMethods.length] : null;
    
    // Generate Invoice code
    const invoiceCode = `HD${apt.id.toString().padStart(5, '0')}`;

    console.log(`Creating invoice ${invoiceCode} for Appointment ${apt.id}`);

    await prisma.invoice.create({
      data: {
        invoiceCode: invoiceCode,
        appointmentId: apt.id,
        patientId: apt.patientId,
        doctorId: apt.doctorId,
        totalAmount: rawTotal,
        insuranceAmount: insuranceDiscount,
        finalAmount: finalAmount,
        status: isCompleted ? 'Đã thanh toán' : 'Chờ thanh toán',
        paymentMethod: paymentMethod,
        paymentDate: isCompleted ? apt.createdAt : null, // Mock date
        paymentRef: isCompleted ? `VNPay-TXN${apt.id}9823` : null,
        items: {
          create: [
            { name: `Khám chuyên khoa (${apt.specialty || 'Nội tổng quát'})`, price: basePrice, quantity: 1, total: basePrice },
            ...(labCost > 0 ? [{ name: 'Xét nghiệm cận lâm sàng', price: labCost, quantity: 1, total: labCost }] : []),
            ...(medCost > 0 ? [{ name: 'Tiền thuốc theo đơn', price: medCost, quantity: 1, total: medCost }] : [])
          ]
        }
      }
    });
  }

  console.log('Seeding Invoices finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
