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
          'grid w-full grid-cols-[1fr_auto] border-b border-r-[16px] border-solid border-b-black border-r-transparent p-4 active:rounded-none disabled:bg-brand-warm-grey',
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
