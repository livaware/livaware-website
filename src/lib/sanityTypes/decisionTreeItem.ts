import { SanityReference } from '@sanity/client'

export interface DecisionTreeOption {
  _key: string
  text: string
  helpText?: string
  nextStep?: DecisionTreeItem
  link?: string
}

export default interface DecisionTreeItem {
  _ref?: string
  _id: string
  title: string
  content?: string
  options: DecisionTreeOption[]
}
