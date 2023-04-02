/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import TextInput from '../Forms/TextInput'
import Chevron from '../Icons/Chevron'

interface ChatBoxInputProps {
  onFocus?: () => void
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  value?: string
  loading?: boolean
  onSubmit?: () => void
  className?: string
}

const ChatBoxInput = forwardRef<HTMLInputElement, ChatBoxInputProps>(
  ({ onFocus, onChange, onBlur, className, value, loading, onSubmit }, ref) => {
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
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loading}
          className={className}
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
