import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}

interface ContextProps {
  params: Params;
}

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

export const DELETE = async (
  request: NextRequest,
  { params }: ContextProps
) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property)
      return new Response('Property Not Found', {
        status: 404,
      });

    if (property.owner.toString() !== userId) {
      return new Response('Unautorized', { status: 401 });
    }

    await property.deleteOne();

    return new Response('Property Deleted', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something Went Wrong`, {
      status: 500,
    });
  }
};
