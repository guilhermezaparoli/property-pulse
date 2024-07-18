'use client'

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Messages = () => {
const [messages, setMessages] = useState([])
const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages')
                console.log(res)

                if(res.status == 200) {
                    const data = await res.json()
                    setMessages(data)
                }
            } catch (error) {
                console.error("Houve um erro ao buscar mensagens")
                toast.error("Houve um erro ao buscar mensagens")
            }
        }
        fetchMessages()
    }, [])
  return (
    <div>
      teste
    </div>
  )
}

export default Messages
