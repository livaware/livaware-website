/* eslint-disable react/display-name */
import { forwardRef, HTMLProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TextInputProps = HTMLProps<HTMLInputElement> & {
  appendRight?: ReactNode
  className?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ appendRight, className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          'grid grid-cols-[1fr_auto] border-2 border-solid border-black',
          className
        )}
      >
        <input
          ref={ref}
          type="text"
          className="p-2 active:rounded-none disabled:bg-brand-warm-grey"
          {...props}
        />
        {appendRight}
      </div>
    )
  }
)

export default TextInput
