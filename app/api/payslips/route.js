import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email required!' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

    const payslips = await prisma.payslip.findMany({ where: { userId: user.id } });
    return NextResponse.json({ payslips });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching payslips!' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}