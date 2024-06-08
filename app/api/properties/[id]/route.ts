import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

interface ContextProps {
  params: Params;
}
//GET / properties
export const GET = async (request: NextRequest, { params }: ContextProps) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if (!property)
      return new Response('Property Not Found', {
        status: 404,
      });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something Went Wrong`, {
      status: 500,
    });
  }
};
