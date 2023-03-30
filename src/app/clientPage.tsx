'use client'

import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import { DecisionTreeData } from '@/lib/getDecisionTree'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroAnimation from '@/components/IntroAnimation'

export default function ClientHome({
  treeData,
}: {
  treeData: DecisionTreeData
}) {
  const [currentTree, setCurrentTree] = useState(treeData.tree)
  const [history, setHistory] = useState<DecisionTreeHistoryItem[]>([])

  const progress = history.length / treeData.depth

  const selectOption = (currentTree: DecisionTreeItem, selection: number) => {
    const newState = currentTree.options[selection].nextStep
    const label = newState?.title

    return { newState, label }
  }

  const replayDecisions = (decisions: number[]) => {
    setHistory([])

    let current = treeData.tree

    const newHistory: DecisionTreeHistoryItem[] = []

    for (const decision of decisions) {
      const newState = selectOption(current, decision)
      if (newState.newState) {
        newHistory.push({
          option: decision,
          label: current.historyTitle ?? current.title,
        })
        current = newState.newState
      }
    }

    setHistory(newHistory)
    setCurrentTree(current)
  }

  return (
    <>
      <IntroAnimation />
      <div className="flex flex-col md:flex-row h-[80vh] overflow-x-hidden relative">
        <div className="bg-bg-dark flex-1 pb-20 flex justify-center">
          <div className="max-w-lg w-full">
            <DecisionTreeHistory
              history={history}
              onItemPressed={(index) =>
                replayDecisions(history.slice(0, index).map((x) => x.option))
              }
            />
            <DecisionTree
              treeData={currentTree}
              currentStepNumber={history.length + 1}
              onOptionSelected={(index) => {
                const newState = selectOption(currentTree, index)
                if (newState.newState) {
                  setCurrentTree(newState.newState)
                }
                setHistory([
                  ...history,
                  {
                    option: index,
                    label: currentTree.historyTitle ?? currentTree.title,
                  },
                ])
              }}
            />
          </div>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {history.length === 0 ? (
            <motion.div
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 1,
              }}
              className="bg-green-200 flex-1"
            >
              b
            </motion.div>
          ) : (
            <motion.div
              key={2}
              style={{
                originX: 0,
              }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 1 }}
              transition={{
                ease: 'easeOut',
                duration: 1,
              }}
              className="bg-bg-dark flex-1"
            >
              b
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
