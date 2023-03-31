import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Heading from '../Typography/Heading'
import WaitingAnimation from './WaitingAnimation'

interface ChatEntry {
  isQuestion: boolean
  message: string
}

function ChatEntry({
  isUser,
  message,
  waiting,
}: {
  isUser: boolean
  message: string
  waiting?: boolean
}) {
  const variant = isUser
    ? 'bg-brand-green text-white'
    : 'bg-brand-navy text-white'
  const containerVariant = isUser ? 'justify-end' : 'justify-start'
  return (
    <div className={`${containerVariant} grid`}>
      <span className={`${variant} block w-fit p-4`}>
        {waiting ? <WaitingAnimation variant="white" /> : message}
      </span>
    </div>
  )
}

export default function ChatBot({ apiEndpoint }: { apiEndpoint: string }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ChatEntry[]>([])
  const responseContainer = useRef<HTMLDivElement>(null)
  const questionInputBox = useRef<HTMLInputElement>(null)

  const fetchChatbotResponse = async (query: string) => {
    const newHistory = [
      ...history,
      {
        isQuestion: true,
        message: query,
      },
    ]
    setHistory(newHistory)
    setLoading(true)
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        query,
        history,
      }),
    })
    const json = await response.json()
    setHistory([
      ...newHistory,
      {
        isQuestion: false,
        message: json.message,
      },
    ])
    setMessage('')
    setLoading(false)
    setTimeout(() => {
      questionInputBox.current?.focus()
    }, 400)
  }

  useEffect(() => {
    responseContainer.current?.scrollTo({
      top: responseContainer.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [loading])

  return (
    <div className=" bg-brand-warm-grey px-8 py-8">
      <Heading variant="h1" className="my-0 py-0">
        Ask Livaware
      </Heading>
      <p className="text-sm font-thin">
        This is an AI-powered tool which has the potential to produce incorrect
        or misleading information.
        <br />
        Its primary purpose is to provide information about us, our products,
        and our services.
        <br />
        Use caution when asking medical questions, and always consult a medical
        professional before taking any action.
      </p>
      <div
        className="mt-4 grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-scroll"
        ref={responseContainer}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
              }}
            >
              <ChatEntry isUser={entry.isQuestion} message={entry.message} />
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key={history.length + 1}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
              }}
            >
              <ChatEntry isUser={false} message={''} waiting />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form
        className="mt-4 grid grid-cols-[1fr_6em]"
        onSubmit={(e) => {
          e.preventDefault()
          fetchChatbotResponse(message)
        }}
      >
        <input
          ref={questionInputBox}
          type="text"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="border-2 border-solid border-black p-2 active:rounded-none"
          disabled={loading}
          placeholder="Ask a question..."
          autoComplete="none"
        />
        <button
          className="border-2 border-l-0 border-solid border-black bg-brand-navy px-4 text-white"
          type="submit"
          onClick={() => fetchChatbotResponse(message)}
          disabled={loading}
        >
          {loading ? 'Loading' : 'Send'}
        </button>
      </form>
    </div>
  )
}
