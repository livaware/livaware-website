import { ChatBot, ChatBotRef, ChatBoxInput } from 'livaware-react-components'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import analyticsEvent from './analyticsEvent'

export default function useChatState(onFocus?: () => void) {
  const chatBotRef = useRef<ChatBotRef>(null)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  const chatSubmit = async () => {
    analyticsEvent('ai-chat', 'message-sent', chatMessage)
    setChatLoading(true)
    await chatBotRef.current?.sendMessage(chatMessage)
    setChatMessage('')
    setChatLoading(false)
  }

  const inputElement = (
    <ChatBoxInput
      loading={chatLoading}
      onChange={(evt) => setChatMessage(evt.target.value)}
      className={'sticky'}
      value={chatMessage}
      onSubmit={() => chatSubmit()}
      onFocus={() => {
        analyticsEvent('ai-chat', 'focus')
        onFocus?.()
      }}
    />
  )

  return {
    chatBotRef,
    chatLoading,
    setChatLoading,
    chatMessage,
    setChatMessage,
    chatSubmit,
    inputElement,
  }
}
