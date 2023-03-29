import DecisionTreeItem, {
  DecisionTreeOption,
} from '@/lib/sanityTypes/decisionTreeItem'
import { AnimatePresence } from 'framer-motion'
import Heading from '../Typography/Heading'
import DecisionTreeButton from './Button'
import { motion } from 'framer-motion'

export default function DecisionTree({
  treeData,
  onOptionSelected,
  currentStepNumber,
}: {
  treeData: DecisionTreeItem
  onOptionSelected: (index: number) => void
  currentStepNumber: number
}) {
  const handleAdvance = (option: DecisionTreeOption, index: number) => {
    if (option.nextStep) {
      onOptionSelected(index)
    }
  }

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentStepNumber}
          initial={{ x: 64, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -64, opacity: 0 }}
          transition={{
            type: 'tween',
          }}
        >
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
            {treeData.options.map((option, index) => (
              <div key={option._key}>
                <DecisionTreeButton
                  onClick={() => handleAdvance(option, index)}
                  href={option.link}
                  text={option.text}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
