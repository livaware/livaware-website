/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import TextInput from '../Forms/TextInput'
import Chevron from '../Icons/Chevron'

interface ChatBoxInputProps {
  onFocus?: () => void
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  loading?: boolean
  onSubmit?: () => void
}

const ChatBoxInput = forwardRef<HTMLInputElement, ChatBoxInputProps>(
  ({ onFocus, onChange, value, loading, onSubmit }, ref) => {
    return (
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.()
        }}
      >
        <TextInput
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            e.preventDefault()
            onFocus?.()
            window.scrollTo(0, 0)
          }}
          disabled={loading}
          placeholder="Ask a question..."
          autoComplete="none"
          appendRight={
            <button
              className="bg-white px-4 text-brand-navy disabled:bg-brand-warm-grey"
              type="submit"
              onClick={onSubmit}
              disabled={loading}
            >
              <Chevron />
            </button>
          }
        />
      </form>
    )
  }
)

export default ChatBoxInput
