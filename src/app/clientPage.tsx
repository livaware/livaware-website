'use client'

import DecisionTree from '@/components/DecisionTree'
import Heading from '@/components/Typography/Heading'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import { useRef, useState } from 'react'

export default function ClientHome({
  treeData,
}: {
  treeData: DecisionTreeItem
}) {
  const [currentTree, setCurrentTree] = useState(treeData)
  const [stepNumber, setStepNumber] = useState(1)
  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="bg-bg-dark">
        <DecisionTree
          treeData={currentTree}
          currentStepNumber={stepNumber}
          onTreeChange={(newTree) => {
            setCurrentTree(newTree)
            setStepNumber(stepNumber + 1)
          }}
        />
      </div>
      <div className="bg-green-200">b</div>
    </div>
  )
}
