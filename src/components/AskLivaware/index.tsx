import useChatState from '@/lib/useChatState'
import { ChatBot, ChatBoxInput } from 'livaware-react-components'
import { twMerge } from 'tailwind-merge'

export default function AskLivaware({
  headingText,
  className,
  onFocus,
}: {
  headingText?: string
  className?: string
  onFocus?: () => void
}) {
  const state = useChatState()

  return (
    <div
      className={twMerge(
        'grid grid-cols-1 grid-rows-1 justify-items-center px-4',
        className
      )}
    >
      <div className="m-10 grid w-full max-w-copy grid-rows-[1fr_auto]">
        <div className="max-h-[80svh] overflow-y-scroll">
          <ChatBot
            ref={state.chatBotRef}
            apiEndpoint="/api/faq"
            className="h-full"
            headingText={headingText}
          />
        </div>
        {state.inputElement}
      </div>
    </div>
  )
}
