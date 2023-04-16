import { ChatBot, ChatBotRef, ChatBoxInput } from 'livaware-react-components'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function AskLivaware({
  headingText,
  className,
}: {
  headingText?: string
  className?: string
}) {
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
    <div
      className={twMerge(
        'grid grid-cols-1 grid-rows-1 justify-items-center px-4',
        className
      )}
    >
      <div className="m-10 w-full max-w-3xl">
        <div className="max-h-[80vh] overflow-y-scroll">
          <ChatBot
            ref={chatBotRef}
            apiEndpoint="/api/faq"
            className="h-full"
            headingText={headingText}
          />
        </div>
        <ChatBoxInput
          loading={chatLoading}
          onChange={(evt) => setChatMessage(evt.target.value)}
          className={'sticky'}
          value={chatMessage}
          onSubmit={() => chatSubmit()}
        />
      </div>
    </div>
  )
}
