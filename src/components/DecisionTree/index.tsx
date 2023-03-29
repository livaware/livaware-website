import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Link from 'next/link'
import Heading from '../Typography/Heading'
import DecisionTreeButton from './Button'

export default function DecisionTree({
  treeData,
  onTreeChange,
  currentStepNumber,
}: {
  treeData: DecisionTreeItem
  onTreeChange: (newTree: DecisionTreeItem) => void
  currentStepNumber: number
}) {
  return (
    <div>
      <Heading variant="h1" className="text-white text-center">
        {treeData.title}
      </Heading>
      <div className="grid gap-5 px-8 opacity-90">
        {treeData.content && (
          <div className="grid grid-cols-[auto_1fr] gap-4 text-white">
            <div className="border border-white rounded-full w-8 h-8 text-center align-middle leading-7">
              {currentStepNumber}
            </div>
            <span className="leading-7">{treeData.content}</span>
          </div>
        )}
        {treeData.options.map((option) => (
          <div key={option._key}>
            <DecisionTreeButton
              onClick={
                !option.nextStep
                  ? undefined
                  : () => onTreeChange(option.nextStep)
              }
              href={option.link}
              text={option.text}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
