import { AnimatePresence, motion } from 'framer-motion'

export interface DecisionTreeHistoryItem {
  option: number
  label: string
}

export default function DecisionTreeHistory({
  history,
  onItemPressed,
}: {
  history: DecisionTreeHistoryItem[]
  onItemPressed: (itemIndex: number) => void
}) {
  return (
    <ol className="w-full text-white p-5 h-5">
      <AnimatePresence initial={false}>
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -32, opacity: 0 }}
            transition={{
              type: 'tween',
            }}
            style={{
              display: 'inline-block',
            }}
          >
            {index > 0 && <span className="pl-4">›</span>}
            <button
              className="inline-block pl-4"
              key={index}
              onClick={() => onItemPressed(index)}
            >
              {item.label}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </ol>
  )
}
