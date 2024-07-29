import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

const properties = await Property.find({
    is_featured: true
})
   
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Algo deu errado`, {
      status: 500,
    });
  }
};