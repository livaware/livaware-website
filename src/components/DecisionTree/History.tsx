import { AnimatePresence, motion } from 'framer-motion'
import Chevron from '../Icons/Chevron'

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
    <div className="absolute top-0 w-full py-5 text-brand-navy">
      {history.length === 0 && <div className="inline-block">&nbsp;</div>}
      <AnimatePresence initial={false} mode="popLayout">
        {history.length > 0 && (
          <motion.button
            className="inline-block"
            onClick={() => onItemPressed(history.length - 1)}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -32, opacity: 0 }}
            transition={{
              type: 'tween',
            }}
          >
            <Chevron reverse />
          </motion.button>
        )}
        {history.slice(-3).map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-block',
            }}
          >
            {index > 0 && <span className="pl-4">›</span>}
            <span className="inline-block pl-4" key={index}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
