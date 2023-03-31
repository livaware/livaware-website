import { AnimatePresence } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
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
      <span className={`${variant} block w-fit p-4`}>{message}</span>
    </div>
  )
}

export default function ChatBot() {
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
    setTimeout(() => {
      questionInputBox.current?.focus()
      responseContainer.current?.scrollTo({
        top: responseContainer.current.scrollHeight,
        behavior: 'smooth',
      })
    }, 400)
  }

  return (
    <div className=" bg-brand-warm-grey px-8 py-8">
      <Heading variant="h1" className="my-0 py-0">
        Ask Livaware
      </Heading>
      <div
        className="grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-scroll"
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
        />
        <button
          className="border-2 border-l-0 border-solid border-black bg-brand-green px-4 text-white"
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
