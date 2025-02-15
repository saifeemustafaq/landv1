import { MongoClient, Document } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

async function inspectDatabase() {
  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      console.log(`\nAnalyzing collection: ${collection.name}`);
      const docs = await db.collection(collection.name).find().limit(10).toArray();
      await analyzeCollection(docs);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

function inferSchema(doc: Document): Record<string, string> {
  const getType = (value: unknown): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    return typeof value;
  };

  const schema: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(doc)) {
    if (key === '_id') continue;
    schema[key] = getType(value);
  }

  return schema;
}

async function analyzeCollection(docs: Document[]): Promise<void> {
  if (docs.length === 0) {
    console.log('No documents found');
    return;
  }

  const schema = inferSchema(docs[0]);
  console.log('Sample document schema:');
  console.log(JSON.stringify(schema, null, 2));
}

inspectDatabase(); 
inspectDatabase(); 