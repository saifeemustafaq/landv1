import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Experience from '@/app/models/Experience';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find({}).sort({ startDate: -1 });
    return NextResponse.json(experiences, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
} 