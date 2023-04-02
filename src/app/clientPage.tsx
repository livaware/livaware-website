'use client'

import ChatBot, { ChatBotRef } from '@/components/ChatBot'
import ChatBoxInput from '@/components/ChatBot/Input'
import ContentToggler from '@/components/ContentToggler'
import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import Chevron from '@/components/Icons/Chevron'
import ContentContainer from '@/components/Layout/ContentContainer'
import ProgressBar from '@/components/ProgressBar'
import QuoteFader from '@/components/QuoteFader'
import Heading from '@/components/Typography/Heading'
import VideoBackground from '@/components/VideoBackground'
import { getDecisionTreeDepth } from '@/lib/getDecisionTree'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import { useEffect, useRef, useState } from 'react'

function DecisionTreeColumn({
  treeData,
  onProgress,
}: {
  treeData: DecisionTreeItem
  onProgress: (progress: number) => void
}) {
  const [currentTree, setCurrentTree] = useState(treeData)
  const [history, setHistory] = useState<DecisionTreeHistoryItem[]>([])

  const maximumTreeDepth = getDecisionTreeDepth(treeData)
  const currentTreeDepth = getDecisionTreeDepth(currentTree)
  const progress =
    currentTreeDepth === 1 ? 1 : 1 - currentTreeDepth / maximumTreeDepth

  useEffect(() => {
    onProgress(progress)
  }, [onProgress, progress])

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

  return (
    <div className="grid grid-rows-[1fr_auto]">
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
  )
}

function LeftColumn({
  treeData,
  onProgress,
}: {
  treeData?: DecisionTreeItem | null
  onProgress: (progress: number) => void
}) {
  const [chatFocused, setChatFocused] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const chatBotRef = useRef<ChatBotRef>(null)
  const chatTextRef = useRef<HTMLInputElement>(null)

  const chatSubmit = async () => {
    setChatLoading(true)
    await chatBotRef.current?.sendMessage(chatMessage)
    setChatMessage('')
    setTimeout(() => chatTextRef.current?.focus(), 400)
    setChatLoading(false)
  }

  const dTree = !treeData ? undefined : (
    <DecisionTreeColumn treeData={treeData} onProgress={onProgress} />
  )
  const chatBot = (
    <div>
      <button
        type="button"
        className="my-5"
        onClick={() => setChatFocused(false)}
      >
        <Chevron reverse /> Go back
      </button>
      <ChatBot ref={chatBotRef} apiEndpoint="/faq/api" className="h-full" />
    </div>
  )

  return (
    <div className="grid min-h-screen-minus-header w-full grid-cols-1 grid-rows-[1fr_auto] justify-center bg-brand-taupe bg-opacity-80 px-5 pb-10">
      <ContentToggler
        initialContent={dTree}
        activeContent={chatBot}
        active={chatFocused}
      />
      <ChatBoxInput
        ref={chatTextRef}
        loading={chatLoading}
        onChange={(evt) => setChatMessage(evt.target.value)}
        onFocus={() => setChatFocused(true)}
        value={chatMessage}
        onSubmit={() => chatSubmit()}
      />
    </div>
  )
}

export default function ClientHome({
  treeData,
  quotes,
  content,
}: {
  treeData?: DecisionTreeItem | null
  quotes: Quote[]
  content: any
}) {
  const [progress, setProgress] = useState(0)

  return (
    <VideoBackground url="/video/hero-video.mp4">
      <ProgressBar progress={progress} className="bg-brand-taupe" />
      <div className="relative grid min-h-screen-minus-header grid-rows-2 overflow-x-hidden md:grid-cols-2 md:grid-rows-1">
        <LeftColumn
          treeData={treeData}
          onProgress={(newProgress) => setProgress(newProgress)}
        />
        <div className="grid items-center justify-center bg-brand-navy bg-opacity-80">
          <Heading variant="h1" className="text-center text-white">
            Who we are
          </Heading>
        </div>
      </div>
      <div className="h-[70vh]"></div>
      <div className="bg-white">
        <ContentContainer>
          <PortableTextRenderer content={content} />
        </ContentContainer>
        <div className="grid min-h-screen-minus-header items-center justify-center bg-brand-green">
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
