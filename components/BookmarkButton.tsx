'use client';
import { Property } from '@/@types/PropertyTypes';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface BookMarkButtonProps {
  property: Property;
}
const BookmarkButton = ({ property }: BookMarkButtonProps) => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const [isBookmarked, setIsBoookmarked] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleClick = async () => {
    if (!userId) {
      toast.error('Você precisa estar logado para salvar um imóvel');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status == 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBoookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado');
    }
  };

  useEffect(() => {
    if(!userId) {
        setLoading(false)
        return
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });
        if (res.status == 200) {
          const data = await res.json();
          setIsBoookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  if(loading) {
    return <p className='text-center'>Carregando...</p>
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remover dos favoritos
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Salvar imóvel
    </button>
  );
};

export default BookmarkButton;
