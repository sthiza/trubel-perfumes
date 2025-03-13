const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'lsangweni@gmail.com' },
    update: {},
    create: { email: 'lsangweni@gmail.com', name: 'Lwakhe Sangweni', password: 'king123', role: 'SuperAdmin', sales: 0 },
  });

  await prisma.payslip.create({
    data: {
      userId: (await prisma.user.findUnique({ where: { email: 'lsangweni@gmail.com' } })).id,
      periodStart: new Date('2025-03-01'),
      periodEnd: new Date('2025-03-31'),
      sales: 1000,
      earnings: 200, // 20% commission for test
    },
  });

  await prisma.payslip.create({
    data: {
      userId: (await prisma.user.findUnique({ where: { email: 'testuser@test.com' } })).id,
      periodStart: new Date('2025-03-01'),
      periodEnd: new Date('2025-03-31'),
      sales: 500,
      earnings: 100, // 20% commission for test
    },
  });
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());