import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('ID do usuário é obrigatório', { status: 401 });
    }

    const { userId } = sessionUser;
    const messages = await Message.find({ recipient: userId })
    .populate('sender', 'name')
    .populate('property', 'title');
    console.log(messages)
   
      return new Response(JSON.stringify(messages), {status: 200})
  } catch (error) {
    console.log(error)
    return new Response('Algo deu errado', {
      status: 500,
    });
  }
};
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('Id do usuário é obrigatório', { status: 401 });
    }

    const { user } = sessionUser;

    if (user.id == recipient) {
      return new Response(
        JSON.stringify({
          message: 'Não é possível mandar mensagem para si mesmo',
        }),
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
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Mensagem enviada' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Algo deu errado', {
      status: 500,
    });
  }
};
