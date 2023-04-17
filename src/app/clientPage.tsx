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

      <div className="relative grid grid-rows-2 overflow-x-hidden bg-brand-navy bg-opacity-90 md:min-h-screen-minus-header md:grid-cols-2 md:grid-rows-1">
        <div className="grid grid-rows-[1fr_auto] items-start p-10">
          <ContentToggler
            initialContent={
              <>
                <Heading variant="h1" className="m-0 mt-8 mb-4 p-0 text-white">
                  Livaware
                </Heading>
                <Heading
                  variant="h2"
                  className="whitespace-pre-wrap text-white"
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
                <Heading variant="h2" className="text-white">
                  Questions? You can ask our AI assistant anything
                </Heading>
              </motion.div>
            )}
          </AnimatePresence>
          {chatState.inputElement}
        </div>
      </div>
      <div className="bg-white">
        <PortableTextRenderer content={content} />
        <div
          className="grid min-h-screen-minus-header items-center justify-center  text-center text-white"
          style={{
            backgroundImage:
              'linear-gradient(to top right, rgba(30,103,85,1) 0%, rgba(66,148,124,1) 35%, rgba(0,205,154,1) 100%)',
          }}
        >
          <Heading variant="h3">Testimonials</Heading>

          <div className="max-w-3xl px-8">
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
        <div className="grid min-h-screen-minus-header w-full grid-cols-1 justify-center bg-brand-taupe bg-opacity-95 p-10 md:grid-cols-2">
          <div>
            <DecisionTreeColumn treeData={treeData} />
          </div>
          <div></div>
        </div>
      )}
    </>
  )
}
