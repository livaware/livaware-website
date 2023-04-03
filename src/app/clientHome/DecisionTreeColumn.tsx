import ContentToggler from '@/components/ContentToggler'
import DecisionTree from '@/components/DecisionTree'
import DecisionTreeHistory, {
  DecisionTreeHistoryItem,
} from '@/components/DecisionTree/History'
import { getDecisionTreeDepth } from '@/lib/getDecisionTree'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import { useEffect, useState } from 'react'
import FinalStep from './DecisionTreeFinalStep'

export default function DecisionTreeColumn({
  treeData,
  onProgress,
}: {
  treeData: DecisionTreeItem
  onProgress: (progress: number) => void
}) {
  const [currentTree, setCurrentTree] = useState(treeData)
  const [history, setHistory] = useState<DecisionTreeHistoryItem[]>([])
  const [isFinalStep, setIsFinalStep] = useState(false)

  const maximumTreeDepth = getDecisionTreeDepth(treeData)
  const currentTreeDepth = getDecisionTreeDepth(currentTree)
  const progress =
    currentTreeDepth === 1 ? 1 : 1 - currentTreeDepth / maximumTreeDepth

  useEffect(() => {
    onProgress(progress)
  }, [onProgress, progress])

  const selectOption = (currentTree: DecisionTreeItem, selection: number) => {
    const newState = currentTree.options[selection].nextStep
    const label = newState?.title

    return { newState, label }
  }

  const replayDecisions = (decisions: number[]) => {
    setHistory([])

    let current = treeData

    const newHistory: DecisionTreeHistoryItem[] = []

    for (const decision of decisions) {
      const newState = selectOption(current, decision)
      if (newState.newState) {
        newHistory.push({
          option: decision,
          label: current.options[decision].breadcrumb,
        })
        current = newState.newState
      }
    }

    setHistory(newHistory)
    setCurrentTree(current)
  }

  return (
    <>
      <DecisionTreeHistory
        history={history}
        onItemPressed={(index) => {
          setIsFinalStep(false)
          replayDecisions(history.slice(0, index).map((x) => x.option))
        }}
      />
      <ContentToggler
        initialContent={
          <div className="grid grid-rows-[1fr_auto]">
            <DecisionTree
              treeData={currentTree}
              currentStepNumber={history.length + 1}
              onOptionSelected={(index, option) => {
                if (option.finalStep) {
                  setIsFinalStep(true)
                } else {
                  const newState = selectOption(currentTree, index)
                  if (newState.newState) {
                    setCurrentTree(newState.newState)
                  }
                }
                setHistory([
                  ...history,
                  {
                    option: index,
                    label: option.breadcrumb,
                  },
                ])
              }}
            />
          </div>
        }
        activeContent={<FinalStep history={history} />}
        active={isFinalStep}
      />
    </>
  )
}
