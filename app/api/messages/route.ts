import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';


export const dynamic = 'force-dynamic';
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } = await request.json();
 
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', { status: 401 });
    }

    const { user } = sessionUser;

    if (user.id == recipient) {
      return new Response(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      phone,
      email,
      property,
      name,
      body: message
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return new Response("Algo deu errado", {
        status: 500,
      });
  }
};
