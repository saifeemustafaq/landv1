import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Project from '@/app/models/Project';
import Category from '@/app/models/Category';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('category');

    await connectDB();

    let query = {};
    
    if (categoryName) {
      // Find the category by name
      const category = await Category.findOne({ category: categoryName });
      if (category) {
        query = { category: category._id };
      }
    }

    const projects = await Project.find(query)
      .populate('category')
      .sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 