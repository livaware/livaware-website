import { SanityImageAssetDocument } from '@sanity/client'
import { SanityReference } from './sanityReference'

export interface ResourcePageData {
  name: string
  description: string
  slug: string
  title: string
  subTitle: string
  content: any
  coverImage?: {
    asset: {
      _ref: string
    }
  }
}
