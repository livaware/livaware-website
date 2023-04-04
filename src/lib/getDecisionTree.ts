import sanityClient from './sanityClient'
import DecisionTreeItem from './sanityTypes/decisionTreeItem'

// This function takes a DecisionTreeItem and returns the depth of the tree.
// A depth of 0 means the tree is empty or has only a root.
// A depth of 1 means the tree has a root and a single level of options.
// A depth of 2 means the tree has a root and two levels of options.
// And so on.
export function getDecisionTreeDepth(
  items: DecisionTreeItem | undefined
): number {
  if (!items) return 0
  return (
    1 +
    Math.max(
      0,
      ...(items.options ?? []).map((option) => {
        try {
          return getDecisionTreeDepth(option.nextStep)
        } catch (error) {
          // log error
          return 0
        }
      })
    )
  )
}

// This function is used to fetch a decision tree from Sanity
// It takes an ID and fetches the tree from Sanity
// The tree is returned as a decisionTreeItem, which is a custom type
// It also expands the options to include the nextStep, which is the next step in the tree
export default async function getDecisionTree(id: string) {
  if (!id) {
    return null
  }

  const tree = (
    await sanityClient.fetch<DecisionTreeItem[]>(`
        *[_type == "decisionTreeItem" && _id == "${id}"]
        {
            _id,
            title,
            content,
            options[] {
                _key,
                text,
                breadcrumb,
                finalStep,
                nextStep,
                link
            }
        }
    `)
  )[0]

  if (!tree) {
    return null
  }

  for (const option of tree?.options ?? []) {
    if (option?.nextStep?._ref) {
      const expanded = await getDecisionTree(option.nextStep._ref)

      if (!expanded) {
        return null
      }

      option.nextStep = expanded
    }
  }

  return tree
}
