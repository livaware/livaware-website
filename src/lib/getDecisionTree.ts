import sanityClient from './sanityClient'
import DecisionTreeItem from './sanityTypes/decisionTreeItem'

export default async function getDecisionTree(id: string) {
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
                helpText,
                nextStep,
                link
            }
        }
    `)
  )[0]

  console.log(tree)

  for (const option of tree.options) {
    if (option?.nextStep?._ref) {
      const expanded = await getDecisionTree(option.nextStep._ref)
      option.nextStep = expanded
    }
  }

  console.log(tree)

  return tree
}
