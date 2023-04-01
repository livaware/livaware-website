import WaitingAnimation from './WaitingAnimation'

export default function ChatEntry({
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
