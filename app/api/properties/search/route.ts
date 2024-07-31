import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest } from 'next/server';

// GET /api/properties/search
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    // Initialize query object
    let query: any = {};

    // Handle location pattern
    if (location) {
      const locationPattern = new RegExp(location, 'i');
      query.$or = [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ];
    }

    // Handle property type
    if (propertyType && propertyType !== 'Todos') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
