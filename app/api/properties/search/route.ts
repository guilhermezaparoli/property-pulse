import connectDB from '@/config/database';
import Property from '@/models/Property';

interface queryProps {}

export const GET = async (request: Request) => {
  try {
    connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    let locationPattern;
    if (location) {
      locationPattern = new RegExp(location, 'i');
    }

    let query: { $or?: any[], type?: RegExp } = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };
    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
};
