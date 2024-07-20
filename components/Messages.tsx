'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Message from './Message';
import { MessageTypes } from '@/@types/MessageTypes';
import Spinner from './Spinner';

const Messages = () => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if (res.status == 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Houve um erro ao buscar mensagens');
        toast.error('Houve um erro ao buscar mensagens');
      } finally {
        setLoading(false)
      }
    };
    fetchMessages();
  }, []);
  console.log(messages);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Suas Mensagens</h1>

          <div className="space-y-4">
            {messages.length == 0 ? (
              <p>Você não possui nenhuma mensagem</p>
            ) : (
              messages.map((message) => <Message key={message._id} message={message} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
