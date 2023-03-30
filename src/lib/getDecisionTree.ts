import sanityClient from './sanityClient'
import DecisionTreeItem from './sanityTypes/decisionTreeItem'

export function getDecisionTreeDepth(
  items: DecisionTreeItem | undefined
): number {
  if (!items) return 0
  return (
    1 +
    Math.max(
      0,
      ...items.options.map((option) => getDecisionTreeDepth(option.nextStep))
    )
  )
}

export default async function getDecisionTree(id: string) {
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
      option.nextStep = expanded
    }
  }

  return tree
}
