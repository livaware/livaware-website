import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import DecisionTreeColumn from './DecisionTreeColumn'

export default function LeftColumn({
  treeData,
  onProgress,
}: {
  treeData?: DecisionTreeItem | null
  onProgress: (progress: number) => void
}) {
  const dTree = !treeData ? undefined : (
    <DecisionTreeColumn treeData={treeData} onProgress={onProgress} />
  )

  return (
    <div className="row-start-2 grid min-h-screen-minus-header w-full grid-cols-1 grid-rows-[auto_1fr] justify-center bg-brand-taupe bg-opacity-95 p-10 md:row-start-auto">
      {dTree}
    </div>
  )
}
