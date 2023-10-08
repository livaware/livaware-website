'use client'

import Intro from '@/components/Intro'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import useChatState from '@/lib/useChatState'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChatBot,
  Chevron,
  ContentToggler,
  Heading,
  Quotation,
  QuoteFader,
} from 'livaware-react-components'
import { useState } from 'react'
import DecisionTreeColumn from './clientHome/DecisionTreeColumn'

export default function ClientHome({
  treeData,
  quotes,
  content,
  headline,
}: {
  treeData?: DecisionTreeItem | null
  quotes: Quote[]
  content: any
  headline: string
}) {
  const [chatActive, setChatActive] = useState(false)
  const chatState = useChatState(() => setChatActive(true))

  return (
    <>
      <Intro />
      <div className="relative grid grid-cols-1 justify-items-center bg-brand-navy bg-opacity-90 p-10 text-white">
        <div className="grid min-h-[80svh] w-full max-w-copy grid-rows-[1fr_auto] items-start">
          <ContentToggler
            initialContent={
              <>
                <Heading
                  variant="h2"
                  className="m-0 mt-8 mb-4 whitespace-pre-wrap p-0"
                >
                  {headline}
                </Heading>
              </>
            }
            activeContent={
              <div className="w-full text-white">
                <button
                  type="button"
                  onClick={() => setChatActive(false)}
                  className="mb-10"
                >
                  <Chevron reverse /> Go back
                </button>
                <ChatBot
                  ref={chatState.chatBotRef}
                  apiEndpoint="/api/faq"
                  className="h-full"
                  headingText="Ask our AI assistant anything"
                />
              </div>
            }
            active={chatActive}
          />
          <AnimatePresence mode="popLayout">
            {!chatActive && (
              <motion.div
                key="heading"
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 32, opacity: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
                className="w-full"
              >
                <Heading variant="h2" className="mt-20 text-white">
                  Questions? You can ask our AI assistant anything
                </Heading>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-full text-brand-navy">{chatState.inputElement}</div>
        </div>
      </div>
      <div className="bg-white">
        <PortableTextRenderer content={content} />
        <div
          className="grid min-h-screen-minus-header grid-rows-[auto_1fr_auto] items-center justify-center py-20 text-center text-white"
          style={{
            backgroundImage:
              'linear-gradient(to top right, rgba(30,103,85,1) 0%, rgba(66,148,124,1) 35%, rgba(0,205,154,1) 100%)',
          }}
        >
          <Heading variant="h3">Testimonials</Heading>
          <div className="max-w-copy px-8">
            <QuoteFader className="text-white" quotes={quotes} />
          </div>
          <Heading variant="h3">
            Read independently verified reviews on{' '}
            <a
              className="underline"
              href="https://www.doctify.com/uk/practice/livaware"
              target="_blank"
              rel="noopener"
            >
              Doctify
            </a>
          </Heading>
        </div>
      </div>
      {treeData && (
        <div className="grid min-h-screen-minus-header w-full grid-cols-1 justify-items-center bg-brand-taupe bg-opacity-95">
          <div className="w-full max-w-copy">
            <DecisionTreeColumn treeData={treeData} />
          </div>
        </div>
      )}
    </>
  )
}
