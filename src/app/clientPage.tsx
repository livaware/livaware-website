'use client'

import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import { DecisionTreeData } from '@/lib/getDecisionTree'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
          label: current.title,
        })
        current = newState.newState
      }
    }

    setHistory(newHistory)
    setCurrentTree(current)
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <motion.div
        layout
        className="bg-bg-dark flex-1"
        transition={{ duration: 0.3 }}
      >
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
                label: currentTree.title,
              },
            ])
          }}
        />
      </motion.div>
      {history.length === 0 && (
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="bg-green-200 flex-1"
        >
          b
        </motion.div>
      )}
    </div>
  )
}
