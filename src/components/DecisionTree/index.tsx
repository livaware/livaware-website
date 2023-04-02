import DecisionTreeItem, {
  DecisionTreeOption,
} from '@/lib/sanityTypes/decisionTreeItem'
import { AnimatePresence, motion } from 'framer-motion'
import Heading from '../Typography/Heading'
import DecisionTreeButton from './Button'

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
    <div className="w-full overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStepNumber}
          initial={{ x: 64, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -64, opacity: 0 }}
          transition={{
            type: 'tween',
          }}
        >
          <Heading variant="h1" className="my-14">
            {treeData.title}
          </Heading>
          <div className="grid gap-5 opacity-90">
            {treeData.content && <div className="">{treeData.content}</div>}
            {treeData.options.map((option, index) => (
              <div key={option._key}>
                <DecisionTreeButton
                  onClick={
                    option.link ? undefined : () => handleAdvance(option, index)
                  }
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
