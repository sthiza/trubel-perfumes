import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, upline } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill in all fields!' }, { status: 400 });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address!' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: 'Password must be at least 6 characters long!' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered! Please log in.' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // TODO: Hash this later!
        name: email.split('@')[0],
        upline: upline || null,
        sales: 0,
        role: 'User',
      },
    });

    return NextResponse.json({
      message: 'Registered successfully! Welcome to Trubel Perfumes!',
      user: { email: newUser.email, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Registration failed! Try again.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}