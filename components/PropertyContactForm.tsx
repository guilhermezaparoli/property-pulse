'use client';
import { Property } from '@/@types/PropertyTypes';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface PropertyContactFormProps {
  property: Property;
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
const {data: session} = useSession()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-type': 'apllication/json',
        },
        body: JSON.stringify(data),
      });

      if (res.status == 200) {
        toast.success('Mensagem enviada com sucesso!');
        setWasSubmitted(true);
      } else if (res.status === 400) {
        toast.error('Não é possível enviar mensagem para si mesmo');
      } else if (res.status === 401) {
        toast.error('Você deve estar logado para enviar uma mensagem');
      } else {
        toast.error("Erro ao enviar mensagem")
      }

    } catch (error) {
      console.error(error)
      toast.error("Erro ao enviar mensagem")
    } finally {
      setName('');
      setEmail('')
      setPhone('')
      setMessage('')
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Fale com o proprietário</h3>
      {!session ? ("Você precisar estar logado para enviar uma mensagem"): ( wasSubmitted ? (
        <p className="text-green-500 mb-4">
          Sua mensagem foi enviada com sucesso!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Digite seu nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Digite seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Telefone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Digite seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Mensagem:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Enviar Mensagem
            </button>
          </div>
        </form>
      ))}
    
    </div>
  );
};

export default PropertyContactForm;
