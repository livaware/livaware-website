'use client'

import ChatBot from '@/components/ChatBot'
import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import ContentContainer from '@/components/Layout/ContentContainer'
import ProgressBar from '@/components/ProgressBar'
import QuoteFader from '@/components/QuoteFader'
import Heading from '@/components/Typography/Heading'
import Quotation from '@/components/Typography/Quotation'
import VideoBackground from '@/components/VideoBackground'
import { getDecisionTreeDepth } from '@/lib/getDecisionTree'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import useIsMobile from '@/lib/useIsMobile'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function ClientHome({
  treeData,
  quotes,
  content,
}: {
  treeData?: DecisionTreeItem | null
  quotes: Quote[]
  content: any
}) {
  const [currentTree, setCurrentTree] = useState(treeData)
  const [history, setHistory] = useState<DecisionTreeHistoryItem[]>([])
  const [chatFocused, setChatFocused] = useState(false)
  const isMobile = useIsMobile()

  if (!treeData || !currentTree) return null

  const maximumTreeDepth = getDecisionTreeDepth(treeData)
  const currentTreeDepth = getDecisionTreeDepth(currentTree)
  const progress =
    currentTreeDepth === 1 ? 1 : 1 - currentTreeDepth / maximumTreeDepth

  const selectOption = (currentTree: DecisionTreeItem, selection: number) => {
    const newState = currentTree.options[selection].nextStep
    const label = newState?.title

    return { newState, label }
  }

  const replayDecisions = (decisions: number[]) => {
    setHistory([])

    let current = treeData

    const newHistory: DecisionTreeHistoryItem[] = []

    for (const decision of decisions) {
      const newState = selectOption(current, decision)
      if (newState.newState) {
        newHistory.push({
          option: decision,
          label: current.historyTitle ?? current.title,
        })
        current = newState.newState
      }
    }

    setHistory(newHistory)
    setCurrentTree(current)
  }

  const dTreeOpacity = history.length > 0 ? 'bg-opacity-100' : 'bg-opacity-80'

  return (
    <VideoBackground url="/video/hero-video.mp4">
      <ProgressBar progress={progress} className="bg-brand-taupe" />
      <div className="relative flex min-h-[90vh] flex-col overflow-x-hidden bg-brand-taupe bg-opacity-0 md:flex-row">
        <div
          className={`flex flex-1 justify-center bg-brand-taupe pb-20 ${dTreeOpacity}`}
        >
          <div className="grid min-h-[60vh] w-full max-w-lg grid-rows-[1fr_auto] px-4 md:min-h-[90vh]">
            {!chatFocused && (
              <div>
                <DecisionTreeHistory
                  history={history}
                  onItemPressed={(index) =>
                    replayDecisions(
                      history.slice(0, index).map((x) => x.option)
                    )
                  }
                />
                <DecisionTree
                  treeData={currentTree}
                  currentStepNumber={history.length + 1}
                  onOptionSelected={(index) => {
                    const newState = selectOption(currentTree, index)
                    if (newState.newState) {
                      setCurrentTree(newState.newState)
                    }
                    setHistory([
                      ...history,
                      {
                        option: index,
                        label: currentTree.historyTitle ?? currentTree.title,
                      },
                    ])
                  }}
                />
              </div>
            )}
            <div className={chatFocused ? 'h-full' : ''}>
              <ChatBot
                apiEndpoint="/faq/api"
                collapsed={!chatFocused}
                onFocus={() => setChatFocused(true)}
                onClose={() => setChatFocused(false)}
                className="h-full"
              />
            </div>
          </div>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {history.length === 0 || isMobile ? (
            <motion.div
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 1,
              }}
              className={`bg-brand-navy ${dTreeOpacity} flex-1`}
            >
              <Heading
                variant="h1"
                className="text-center align-text-top text-white md:my-14 md:min-h-[3em]"
              >
                Who we are
              </Heading>
              <div className="p-4 text-white">
                <Quotation
                  text={`Priding ourselves on anticipating and filling the gaps in
                  people's healthcare; we combine clinical excellence, precision
                  organisation and compassion into an unrivalled service.`}
                  cite="Hemmen Jutla, Founding Clinician"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={2}
              style={{
                originX: 0,
              }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 1, opacity: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 1,
              }}
              className="flex-1 bg-brand-navy"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[70vh]"></div>
      <div className="bg-white">
        <ContentContainer>
          <PortableTextRenderer content={content} />
        </ContentContainer>
        <div className="grid min-h-screen items-center justify-center bg-brand-green">
          <div className="max-w-[320px]">
            <QuoteFader className="text-white" quotes={quotes} />
            <a
              className="text-white"
              href="https://www.doctify.com/uk/practice/livaware"
              target="_blank"
              rel="noopener"
            >
              See more on <span className="text-brand-navy">Doctify</span>
            </a>
          </div>
        </div>
      </div>
    </VideoBackground>
  )
}
