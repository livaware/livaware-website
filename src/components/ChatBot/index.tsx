/* eslint-disable react/display-name */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Heading from '../Typography/Heading'
import ChatEntry from './ChatEntry'
import ChatBoxInput from './Input'

interface ChatEntry {
  isQuestion: boolean
  message: string
}
export default function ChatBot({
  apiEndpoint,
  className,
}: {
  apiEndpoint: string
  className?: string
}) {
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
    try {
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
    } catch {
      setHistory([
        ...newHistory,
        {
          isQuestion: false,
          message:
            'Sorry, something went wrong. Please try asking a different question.',
        },
      ])
    }
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

  const inputBox = (
    <ChatBoxInput
      ref={questionInputBox}
      value={message}
      onChange={(evt) => setMessage((evt.target as HTMLInputElement).value)}
      onSubmit={() => {
        fetchChatbotResponse(message)
      }}
      loading={loading}
    />
  )

  return (
    <div
      key="expanded"
      className={twMerge('grid grid-rows-[auto_1fr_auto] px-8 py-8', className)}
    >
      <div>
        <Heading variant="h1" className="my-0 py-0">
          Ask Livaware
        </Heading>
        <p className="text-sm font-thin">
          This is an AI-powered tool which has the potential to produce
          incorrect or misleading information.
          <br />
          Its primary purpose is to provide information about us, our products,
          and our services.
          <br />
          Use caution when asking medical questions, and always consult a
          medical professional before taking any action.
        </p>
      </div>
      <div
        className="mt-4 grid max-h-[50vh] grid-cols-1 content-start gap-4 overflow-y-scroll"
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
      {inputBox}
    </div>
  )
}

ChatBot.Input = ChatBoxInput
