import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import BasicInfo from '@/app/models/BasicInfo';

// Define the BasicInfo interface
interface BasicInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  yearsOfExperience: string;
  profilePicture: {
    relativePath: string;
    original: string;
    thumbnail: string;
  };
  updatedAt: Date;
}

export async function GET() {
  try {
    // Step 1: Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    const mongoose = await connectDB();
    console.log('MongoDB connection state:', mongoose.connection.readyState);

    // Step 2: Query the database
    console.log('Attempting to fetch basic info...');
    const basicInfo = await BasicInfo.findOne({}).lean().exec();
    console.log('Basic info query result:', basicInfo ? 'Found' : 'Not found');

    if (!basicInfo) {
      console.log('No basic info found in database');
      return NextResponse.json(
        { error: 'Basic info not found in database' },
        { status: 404 }
      );
    }

    // Step 3: Return the data
    return NextResponse.json(basicInfo, { status: 200 });
  } catch (error) {
    // Detailed error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error('Error in /api/basic-info:');
    console.error('Message:', errorMessage);
    console.error('Stack:', errorStack);
    console.error('Full error object:', error);

    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch basic info',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 