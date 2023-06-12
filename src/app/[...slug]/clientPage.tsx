'use client'
import AskLivaware from '@/components/AskLivaware'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { ChatBot, ChatBotRef, ChatBoxInput } from 'livaware-react-components'
import { useRef, useState } from 'react'

export default function ClientPage({ content }: { content: any }) {
  const chatBotRef = useRef<ChatBotRef>(null)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  const chatSubmit = async () => {
    setChatLoading(true)
    await chatBotRef.current?.sendMessage(chatMessage)
    setChatMessage('')
    setChatLoading(false)
  }

  return (
    <>
      <div className="bg-white">
        <PortableTextRenderer content={content} />
        <AskLivaware headingText="Ask Livaware" />
      </div>
    </>
  )
}
