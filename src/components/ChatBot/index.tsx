import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Heading from '../Typography/Heading'
import { motion } from 'framer-motion'

interface ChatEntry {
  isQuestion: boolean
  message: string
}

function ChatEntry({ isUser, message }: { isUser: boolean; message: string }) {
  const variant = isUser
    ? 'bg-brand-green text-white'
    : 'bg-brand-navy text-white'
  const containerVariant = isUser ? 'justify-end' : 'justify-start'
  return (
    <div className={`${containerVariant} grid`}>
      <span className={`${variant} p-4 w-fit block`}>{message}</span>
    </div>
  )
}

export default function ChatBot() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ChatEntry[]>([])
  const responseContainer = useRef<HTMLDivElement>(null)

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
    const response = await fetch('/faq/api', {
      method: 'POST',
      body: JSON.stringify({
        query,
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
    setTimeout(
      () =>
        responseContainer.current?.scrollTo({
          top: responseContainer.current.scrollHeight,
          behavior: 'smooth',
        }),
      400
    )
  }

  return (
    <div className="mx-2 md:mx-8">
      <Heading variant="h1">Ask Livaware</Heading>
      <div
        className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-[50vh]"
        ref={responseContainer}
      >
        <AnimatePresence>
          {history.reverse().map((entry, index) => (
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
        </AnimatePresence>
      </div>
      <form
        className="grid grid-cols-[1fr_6em] mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          fetchChatbotResponse(message)
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="border-black border-2 border-solid p-2"
          disabled={loading}
        />
        <button
          className="border-black border-2 border-solid border-l-0 bg-brand-green text-white px-4"
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
