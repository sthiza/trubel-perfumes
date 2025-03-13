import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill in all fields!' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Email not found! Register first.' }, { status: 404 });
    }
    if (password !== user.password) {
      return NextResponse.json({ message: 'Wrong password!' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Logged in successfully!',
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Login failed! Try again.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}