import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Experience from '@/app/models/Experience';
import { Experience as ExperienceType } from "@/app/types/experience";

export async function GET() {
  try {
    const mongoose = await connectDB();
    
    // Verify connection state
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB connection not ready. Current state:', mongoose.connection.readyState);
      throw new Error('Database connection not established');
    }

    const experiences = await Experience.find({})
      .sort({ startDate: -1 })
      .lean()
      .exec();

    if (!experiences) {
      console.log('No experiences found');
      return NextResponse.json([], { status: 200 });
    }

    console.log(`Successfully fetched ${experiences.length} experiences`);
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in /api/experiences:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch experiences', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const mongoose = await connectDB();
    
    // Verify connection state
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB connection not ready. Current state:', mongoose.connection.readyState);
      throw new Error('Database connection not established');
    }

    const experienceData: ExperienceType = await request.json();
    const newExperience = new Experience(experienceData);
    await newExperience.save();
    
    console.log('Successfully created new experience:', newExperience._id);
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in /api/experiences POST:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to create experience', details: errorMessage },
      { status: 500 }
    );
  }
} 