import mongoose from "mongoose";

let connected = false;

const connectDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (connected) {
        console.log("MongoDB is already connected...");
        return;
    }

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    try {
        await mongoose.connect(mongoUri);
        connected = true;
        console.log('MongoDB connected...');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
};
 
export default connectDB;
