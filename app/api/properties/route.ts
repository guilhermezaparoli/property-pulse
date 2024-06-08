import connectDB from '@/config/database';
import Property from '@/models/Property';

//GET / properties
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({});

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
