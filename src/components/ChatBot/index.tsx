/* eslint-disable react/display-name */
import { AnimatePresence, motion } from 'framer-motion'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import Heading from '../Typography/Heading'
import ChatEntry from './ChatEntry'

interface ChatEntry {
  isQuestion: boolean
  message: string
}

export interface ChatBotRef {
  sendMessage: (message: string) => Promise<void>
}

export interface ChatBotProps {
  apiEndpoint: string
  className?: string
}

const ChatBot = forwardRef<ChatBotRef, ChatBotProps>(
  ({ apiEndpoint, className }, ref) => {
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState<ChatEntry[]>([])
    const responseContainer = useRef<HTMLDivElement>(null)

    const fetchChatbotResponse = useCallback(
      async (query: string) => {
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
        setLoading(false)
      },
      [apiEndpoint, history]
    )

    useEffect(() => {
      responseContainer.current?.scrollTo({
        top: responseContainer.current.scrollHeight,
        behavior: 'smooth',
      })
    }, [loading])

    useImperativeHandle(
      ref,
      () => {
        return {
          sendMessage: fetchChatbotResponse,
        }
      },
      [fetchChatbotResponse]
    )

    return (
      <div
        key="expanded"
        className={twMerge('grid grid-rows-[auto_1fr]', className)}
      >
        <div>
          <Heading variant="h1" className="my-0 py-0">
            Ask Livaware
          </Heading>
        </div>
        <div
          className="grid max-h-[65vh] grid-cols-1 content-start gap-4 overflow-y-scroll"
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
            {history.length === 0 && (
              <motion.div
                key={history.length + 1}
                initial={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
              >
                <p className="mt-4 text-sm font-thin">
                  This is an AI-powered tool which has the potential to produce
                  incorrect or misleading information.
                  <br />
                  Its primary purpose is to provide information about us, our
                  products, and our services, but it can also provide general
                  advice.
                  <br />
                  Use caution when asking medical questions, and always consult
                  a medical professional before taking any action.
                </p>
                <p className="mt-4 text-lg">
                  Try asking about our services, or how we can help you with a
                  specific healthcare condition.
                </p>
              </motion.div>
            )}
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
      </div>
    )
  }
)

export default ChatBot
