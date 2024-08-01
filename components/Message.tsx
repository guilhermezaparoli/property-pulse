'use client';
import { MessageTypes } from '@/@types/MessageTypes';
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface MessageProps {
  message: MessageTypes;
}
const Message = ({ message }: MessageProps) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false)
  const {setUnreadCount} = useGlobalContext()

  async function onHandleClick() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if(res.status === 200) {
        const {read} = await res.json()

        setIsRead(read)
        setUnreadCount((prev: number) => (read ? prev - 1 : prev + 1) )
        if(read) {
        toast.success('Mensagem marcada como lida')

        } else {
            toast.success('Mensagem marcada como não lida')
        }
      }
    } catch (error) {
        console.error(error)
        toast.error('Algo deu errado!')
    }
  }
  
  async function handleDeleteClick() {
    try {
        const res = await fetch(`/api/messages/${message._id}`, {method: "DELETE"})

        if(res.status === 200) {
            toast.success("Mensagem deletada")
            setIsDeleted(true)
            message.read && setUnreadCount((prev) => prev - 1)
        }
    } catch (error) {
        console.error(error)
        toast.error("Algo deu errado")
    }
  }

  if(isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          Nova
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Imóvel:</span>
       {" "}{message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Nome: </strong> {message.name}
        </li>

        <li>
          <strong>Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Telefone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Enviado: </strong>
          {new Date(message.createdAt).toLocaleString('pt-BR')}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }  py-1 px-3 rounded-md`}
        onClick={onHandleClick}
      >
        {isRead ? 'Marcar como não lida' : 'Marcar como lida'}
      </button>
      <button onClick={handleDeleteClick} className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Deletar
      </button>
    </div>
  );
};

export default Message;
