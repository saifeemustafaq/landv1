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
      console.log('Searching for category:', categoryName);
      
      // First get all categories to debug
      const allCategories = await Category.find({});
      console.log('All categories:', allCategories.map(c => ({ id: c._id, name: c.category })));
      
      // Find the category by name
      const category = await Category.findOne({ 
        category: categoryName 
      });
      
      console.log('Found category:', category);
      
      if (category) {
        query = { category: category._id };
        console.log('Query with category:', query);
      } else {
        console.log('No category found for:', categoryName);
        return NextResponse.json([]);
      }
    }

    const projects = await Project.find(query)
      .populate('category')
      .sort({ createdAt: -1 });

    console.log(`Found ${projects.length} projects for category:`, categoryName);
    console.log('Projects:', projects.map(p => ({ id: p._id, title: p.title, category: p.category })));
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 