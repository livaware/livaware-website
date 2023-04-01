import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TextInput from '../Forms/TextInput'
import Chevron from '../Icons/Chevron'
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
      <span className={`${variant} block w-fit whitespace-pre-wrap p-4`}>
        {waiting ? <WaitingAnimation variant="white" /> : message}
      </span>
    </div>
  )
}

export default function ChatBot({
  apiEndpoint,
  collapsed,
  onFocus,
  onClose,
  className,
}: {
  apiEndpoint: string
  collapsed?: boolean
  onFocus?: () => void
  onClose?: () => void
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

  useEffect(() => {
    console.log(collapsed, questionInputBox.current)
    if (collapsed === false) {
      setTimeout(() => {
        questionInputBox.current?.focus()
      }, 400)
    }
  }, [collapsed])

  const inputBox = (
    <motion.form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()
        fetchChatbotResponse(message)
      }}
    >
      <TextInput
        ref={questionInputBox}
        value={message}
        onChange={(evt) => setMessage((evt.target as HTMLInputElement).value)}
        onFocus={() => onFocus?.()}
        disabled={loading}
        placeholder="Ask a question..."
        autoComplete="none"
        appendRight={
          <button
            className="bg-white px-4 text-brand-navy disabled:bg-brand-warm-grey"
            type="submit"
            onClick={() => fetchChatbotResponse(message)}
            disabled={loading}
          >
            <Chevron />
          </button>
        }
      />
    </motion.form>
  )

  if (collapsed) {
    return (
      <motion.div
        className={twMerge('px-8 py-8', className)}
        layoutId="chatbotbox"
        layout="preserve-aspect"
      >
        {inputBox}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={twMerge('grid grid-rows-[auto_1fr_auto] px-8 py-8', className)}
      layoutId="chatbotbox"
      layout="preserve-aspect"
    >
      <div>
        <Heading variant="h1" className="my-0 py-0">
          Ask Livaware
          <button className="float-right text-sm" onClick={() => onClose?.()}>
            Close
          </button>
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
    </motion.div>
  )
}
