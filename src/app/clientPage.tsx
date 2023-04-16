'use client'

import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import {
  ChatBot,
  Chevron,
  ContentToggler,
  Heading,
  ProgressBar,
  QuoteFader,
  VideoBackground,
} from 'livaware-react-components'
import { useState } from 'react'
import LeftColumn from './clientHome/LeftColumn'
import AskLivaware from '@/components/AskLivaware'
import useChatState from '@/lib/useChatState'
import { AnimatePresence, motion } from 'framer-motion'

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
  const [progress, setProgress] = useState(0)
  const [chatActive, setChatActive] = useState(false)
  const chatState = useChatState(() => setChatActive(true))

  return (
    <VideoBackground
      url="/video/website-hero-desktop.mp4"
      mobileUrl="/video/website-hero-mobile.mp4"
    >
      <ProgressBar progress={progress} className="bg-brand-taupe" />
      <div className="relative grid grid-rows-2 overflow-x-hidden md:min-h-screen-minus-header md:grid-cols-2 md:grid-rows-1">
        <div className="grid grid-rows-[1fr_auto] items-start justify-center bg-brand-navy bg-opacity-90 p-10">
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
              <div className=" text-white">
                <button type="button" onClick={() => setChatActive(false)}>
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
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
                className="w-full"
              >
                <Heading variant="h2" className="text-white">
                  Or you can ask our AI assistant anything
                </Heading>
              </motion.div>
            )}
          </AnimatePresence>
          {chatState.inputElement}
        </div>
        <LeftColumn
          treeData={treeData}
          onProgress={(newProgress) => setProgress(newProgress)}
        />
      </div>

      <div className="pt-[70vh]"></div>
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
    </VideoBackground>
  )
}
