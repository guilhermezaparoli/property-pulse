import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';
import cloudinary from '@/config/cloudinary';

interface PropertyData {
  type: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  location: {
    street: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    state: FormDataEntryValue | null;
    zipcode: FormDataEntryValue | null;
  };
  beds: FormDataEntryValue | null;
  baths: FormDataEntryValue | null;
  square_feet: FormDataEntryValue | null;
  amenities: FormDataEntryValue[];
  rates: {
    weekly: FormDataEntryValue | null;
    monthly: FormDataEntryValue | null;
    nightly: FormDataEntryValue | null;
  };
  seller_info: {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
  };
  owner: string;
  images: string[];

}
//GET / properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 6;

    const skip = (page - 1) * pageSize;
console.log(skip)
    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Algo deu errado`, {
      status: 500,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('Unathorized', {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();
    console.log(formData);
    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image: any) => image.name !== '');

    const propertyData: PropertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      images: []
    };

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'propertypulse',
        }
      );

      imageUploadPromises.push(result.secure_url);

    }
    const uploadedImages = await Promise.all(imageUploadPromises);
    propertyData.images = uploadedImages;
    console.log(uploadedImages)
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new Response(JSON.stringify({ message: 'success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error(error);
    return new Response('Failed to add property', { status: 500 });
  }
};
