import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    await connectDB();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('ID do usuário é obrigatório', { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response('Mensagem não encontrada', {
        status: 404,
      });
    }
    if (message.recipient.toString() !== userId) {
      return new Response('Não autorizado', {
        status: 401,
      });
    }
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Algo deu errado!', { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    await connectDB();
    const { id } = params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('ID do usuário é obrigatório', { status: 401 });
    }

    const { userId } = sessionUser;
    const message = await Message.findById(id);

    if (!message) {
      return new Response('Mensagem não encontrada', {
        status: 404,
      });
    }

    if (message.recipient.toString() !== userId) {
      return new Response('Não autorizado', {
        status: 401,
      });
    }
    await message.deleteOne();

    return new Response('Mensagem deletada', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Algo deu errado', { status: 500 });
  }
};
