'use client'
import ChatBot, { ChatBotRef } from '@/components/ChatBot'
import ChatBoxInput from '@/components/ChatBot/Input'
import { useRef, useState } from 'react'

export default function ClientPage() {
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
    <div className="grid grid-cols-1 grid-rows-1 justify-items-center bg-brand-taupe">
      <div className="m-10 w-full max-w-3xl">
        <div className="max-h-[80vh] overflow-y-scroll">
          <ChatBot ref={chatBotRef} apiEndpoint="/api/faq" className="h-full" />
        </div>
        <ChatBoxInput
          loading={chatLoading}
          onChange={(evt) => setChatMessage(evt.target.value)}
          className={'sticky'}
          value={chatMessage}
          onSubmit={() => chatSubmit()}
        />{' '}
      </div>
    </div>
  )
}
