import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

function inferSchema(obj: any, depth = 0, maxDepth = 3): string {
  if (depth >= maxDepth) return typeof obj;
  
  if (obj === null) return 'null';
  if (Array.isArray(obj)) {
    const sample = obj[0];
    return sample ? `Array<${inferSchema(sample, depth + 1, maxDepth)}>` : 'Array<unknown>';
  }
  if (typeof obj === 'object') {
    const schema: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      schema[key] = inferSchema(value, depth + 1, maxDepth);
    }
    return JSON.stringify(schema, null, 2);
  }
  return typeof obj;
}

async function discoverProjectsSchema() {
  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const db = client.db();
    const projectsCollection = db.collection('projects');
    
    // Fetch all projects
    const projects = await projectsCollection.find({}).toArray();

    if (projects.length === 0) {
      console.log('No projects found in the database');
      return;
    }

    // Discover and display schema
    console.log('Discovered Schema:');
    console.log('------------------');
    const schema = inferSchema(projects[0]);
    console.log(schema);

    // Display sample data
    console.log('\nSample Project Data:');
    console.log('-------------------');
    console.log(JSON.stringify(projects[0], null, 2));

    console.log(`\nTotal Projects Found: ${projects.length}`);

    // Show all unique fields across all projects
    const allFields = new Set<string>();
    projects.forEach(project => {
      Object.keys(project).forEach(key => allFields.add(key));
    });

    console.log('\nAll Possible Fields:');
    console.log('-------------------');
    allFields.forEach(field => {
      // Find all unique types for this field
      const types = new Set(projects
        .filter(p => p[field] !== undefined)
        .map(p => Array.isArray(p[field]) ? 'array' : typeof p[field]));
      console.log(`${field}: ${[...types].join(' | ')}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

discoverProjectsSchema(); 