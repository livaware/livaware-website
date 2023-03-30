'use client'

import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import IntroAnimation from '@/components/IntroAnimation'
import ContentContainer from '@/components/Layout/ContentContainer'
import ProgressBar from '@/components/ProgressBar'
import QuoteFader from '@/components/QuoteFader'
import Heading from '@/components/Typography/Heading'
import Quotation from '@/components/Typography/Quotation'
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
  treeData: DecisionTreeItem
  quotes: Quote[]
  content: any
}) {
  const [currentTree, setCurrentTree] = useState(treeData)
  const [history, setHistory] = useState<DecisionTreeHistoryItem[]>([])
  const isMobile = useIsMobile()

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
    <>
      <IntroAnimation />
      <ProgressBar progress={progress} className="bg-brand-navy" />
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full absolute top-0 left-0 object-cover"
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="flex flex-col md:flex-row min-h-[80vh] overflow-x-hidden relative bg-brand-navy bg-opacity-0">
          <div
            className={`bg-brand-navy flex-1 pb-20 flex justify-center ${dTreeOpacity}`}
          >
            <div className="max-w-lg w-full min-h-[60vh] md:min-h-[80vh]">
              <DecisionTreeHistory
                history={history}
                onItemPressed={(index) =>
                  replayDecisions(history.slice(0, index).map((x) => x.option))
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
                  className="text-white md:mt-16 text-center"
                >
                  Who we are
                </Heading>
                <div className="p-4 text-white mt-14">
                  <Quotation
                    text={`Priding ourselves on anticipating and filling the gaps in
                  people's healthcare; we combine clinical excellence, precision
                  organisation and compassion into an unrivalled service.`}
                    cite="Hemmen Jutla, Founding Clinician"
                  />
                </div>
                <div className="p-4 mt-8">
                  <QuoteFader className="text-white" quotes={quotes} />
                  <a
                    className="text-white"
                    href="https://www.doctify.com/uk/practice/livaware"
                    target="_blank"
                    rel="noopener"
                  >
                    See more on{' '}
                    <span className="text-brand-green">Doctify</span>
                  </a>
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
                className="bg-brand-navy flex-1"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ContentContainer>
        <PortableTextRenderer content={content} />
      </ContentContainer>
    </>
  )
}
