import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env file');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

const connectDB = async (retries = 3) => {
  try {
    // If the connection is already established and ready, reuse it
    if (mongoose.connection.readyState === 1) {
      console.log('Reusing existing MongoDB connection');
      return mongoose;
    }

    // If there's a connection in progress, wait for it
    if (mongoose.connection.readyState === 2) {
      console.log('Connection in progress, waiting...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return connectDB(retries);
    }

    const opts = {
      bufferCommands: false,
      dbName: 'portfolio',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const connection = await mongoose.connect(MONGODB_URI, opts);
    
    // Log connection state
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully to:', connection.connection.name);
    }

    // Handle connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    return mongoose;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error instanceof Error ? error.message : 'Unknown error');
    
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return connectDB(retries - 1);
    }
    
    throw error;
  }
};

export default connectDB; 