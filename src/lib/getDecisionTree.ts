import sanityClient from './sanityClient'
import DecisionTreeItem from './sanityTypes/decisionTreeItem'

export interface DecisionTreeData {
  tree: DecisionTreeItem
  depth: number
}

export default async function getDecisionTree(
  id: string,
  currentDepth?: number
) {
  let depth = (currentDepth ?? 1) + 1

  const tree = (
    await sanityClient.fetch<DecisionTreeItem[]>(`
        *[_type == "decisionTreeItem" && _id == "${id}"]
        {
            _id,
            title,
            historyTitle,
            content,
            options[] {
                _key,
                text,
                helpText,
                nextStep,
                link
            }
        }
    `)
  )[0]

  for (const option of tree.options) {
    if (option?.nextStep?._ref) {
      const expanded = await getDecisionTree(option.nextStep._ref)
      option.nextStep = expanded.tree
      depth = depth + expanded.depth
    }
  }

  return { tree: tree, depth } as DecisionTreeData
}
