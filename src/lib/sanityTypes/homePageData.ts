import Quote from './quote'
import { SanityReference } from './sanityReference'

export interface HomePageData {
  title: string
  description: string
  decisionTreeRoot: SanityReference
  quotes: Quote[]
  content: any
}
