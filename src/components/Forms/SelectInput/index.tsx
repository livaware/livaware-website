/* eslint-disable react/display-name */
import { forwardRef, HTMLProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectInputProps = HTMLProps<HTMLSelectElement> & {
  className?: string
  children?: ReactNode
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          'grid w-full grid-cols-[1fr_auto] border-2 border-solid border-black p-2 active:rounded-none disabled:bg-brand-warm-grey',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

export default SelectInput
