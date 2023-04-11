import sanityClient from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPageData'
import { Metadata } from 'next'
import ClientPage from './clientPage'

async function getPageData() {
  try {
    const data = await sanityClient.fetch<GenericPageData[]>(
      `*[_type == "resourcePage"]`
    )
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function ResourcesPage() {
  const pages = await getPageData()
  if (!pages) return null

  return <ClientPage pages={pages} />
}

export const metadata: Metadata = {
  title: 'Livaware - Resources',
  description:
    'Helpful resources created by Livaware to help you on your journey to a healthier lifestyle.',
}
