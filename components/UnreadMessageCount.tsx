'use-client';

import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

interface UnreadMessageCountProps {
  session: {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
    expires: string;
  };
}

const UnreadMessageCount = ({ session }: UnreadMessageCountProps) => {
const {unreadCount, setUnreadCount} = useGlobalContext()


  useEffect(() => {
    if(!session){
        return
    }
    
    const fetchUnredMessagesCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count")

        if(res.status === 200){
            const data = await res.json()
            setUnreadCount(data.count)
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchUnredMessagesCount()
  }, [session]);

  console.log(unreadCount)
  return unreadCount > 0 && (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
      {/* <!-- Replace with the actual number of notifications --> */}
    </span>
  );
};

export default UnreadMessageCount;
