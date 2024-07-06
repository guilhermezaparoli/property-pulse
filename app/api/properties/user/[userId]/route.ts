import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';



//GET / properties
export const GET = async (request: NextRequest, {params}: any) => {
  try {
    await connectDB();

    const userId = params.userId

    if(!userId){
      return new Response('User ID is required', {status: 400})
    }

    const properties = await Property.find({owner: userId});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something Went Wrong`, {
      status: 500,
    });
  }
};
