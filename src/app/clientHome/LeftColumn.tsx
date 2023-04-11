import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import useIsMobile from '@/lib/useIsMobile'
import {
  ChatBot,
  ChatBotRef,
  ChatBoxInput,
  Chevron,
  ContentToggler,
} from 'livaware-react-components'
import { useEffect, useRef, useState } from 'react'
import DecisionTreeColumn from './DecisionTreeColumn'

export default function LeftColumn({
  treeData,
  onProgress,
}: {
  treeData?: DecisionTreeItem | null
  onProgress: (progress: number) => void
}) {
  const [chatFocused, setChatFocused] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [viewportHeight, setViewportHeight] = useState(0)
  const isMobile = useIsMobile()
  const chatBotRef = useRef<ChatBotRef>(null)
  const chatTextRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fn = () => {
      setViewportHeight(window.visualViewport?.height ?? 0)
    }
    window.visualViewport?.addEventListener('resize', fn)
    return () => window.visualViewport?.removeEventListener('resize', fn)
  }, [])

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
      <ChatBot ref={chatBotRef} apiEndpoint="/api/faq" className="h-full" />
    </div>
  )

  var computedHeight = `calc(${viewportHeight} - var(--headerHeight))`

  return (
    <div
      className="grid min-h-screen-minus-header w-full grid-cols-1 grid-rows-[1fr_auto] justify-center bg-brand-taupe bg-opacity-80 px-5 pb-10"
      style={
        inputFocused && viewportHeight && isMobile
          ? {
              minHeight: computedHeight,
              height: computedHeight,
              maxHeight: computedHeight,
            }
          : {}
      }
    >
      <ContentToggler
        initialContent={dTree}
        activeContent={chatBot}
        active={chatFocused}
      />
      <ChatBoxInput
        ref={chatTextRef}
        loading={chatLoading}
        onChange={(evt) => setChatMessage(evt.target.value)}
        className={'sticky'}
        onFocus={() => {
          setChatFocused(true)
          setInputFocused(true)
          setTimeout(
            () =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              }),
            100
          )
        }}
        onBlur={() => {
          setInputFocused(false)
        }}
        value={chatMessage}
        onSubmit={() => chatSubmit()}
      />
    </div>
  )
}
