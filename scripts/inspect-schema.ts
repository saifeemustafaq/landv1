import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

function inferSchema(obj: any, depth = 0, maxDepth = 3): any {
  if (depth >= maxDepth) return typeof obj;
  
  if (obj === null) return 'null';
  if (obj instanceof Date) return 'Date';
  if (obj && obj._bsontype === 'ObjectID') return 'ObjectId';
  
  if (Array.isArray(obj)) {
    const sample = obj[0];
    return sample ? `Array<${inferSchema(sample, depth + 1, maxDepth)}>` : 'Array<unknown>';
  }
  
  if (typeof obj === 'object') {
    const schema: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      schema[key] = inferSchema(value, depth + 1, maxDepth);
    }
    return schema;
  }
  
  return typeof obj;
}

async function generateSchemaDocumentation() {
  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);
  let markdown = '# MongoDB Portfolio Database Schema\n\n';

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const db = client.db('portfolio'); // Explicitly specify the database name
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`Analyzing collection: ${collectionName}`);
      
      markdown += `## Collection: ${collectionName}\n\n`;

      const documents = await db.collection(collectionName).find({}).limit(1).toArray();
      
      if (documents.length === 0) {
        markdown += 'No documents found in this collection.\n\n';
        continue;
      }

      const schema = inferSchema(documents[0]);
      
      markdown += '### Schema Structure\n\n```typescript\n';
      markdown += `interface ${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} {\n`;
      
      // Convert schema to TypeScript interface
      const formatSchema = (schema: any, indent = '  '): string => {
        let result = '';
        for (const [key, value] of Object.entries(schema)) {
          if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            result += `${indent}${key}: {\n${formatSchema(value, indent + '  ')}${indent}}\n`;
          } else {
            result += `${indent}${key}: ${value};\n`;
          }
        }
        return result;
      };

      markdown += formatSchema(schema);
      markdown += '}\n```\n\n';

      // Add sample document
      markdown += '### Sample Document\n\n```json\n';
      markdown += JSON.stringify(documents[0], null, 2);
      markdown += '\n```\n\n';

      // Get total count of documents
      const count = await db.collection(collectionName).countDocuments();
      markdown += `Total documents in collection: ${count}\n\n`;
      markdown += '---\n\n';
    }

    // Write to file
    const docsPath = join(__dirname, '..', 'docs');
    try {
      await fs.mkdir(docsPath, { recursive: true });
    } catch (err) {
      // Ignore if directory already exists
    }
    
    await fs.writeFile(
      join(docsPath, 'database-schema.md'),
      markdown
    );

    console.log('\nSchema documentation has been generated in docs/database-schema.md');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

generateSchemaDocumentation(); 