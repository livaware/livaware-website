import getDecisionTree from '@/lib/getDecisionTree'
import sanityClient from '@/lib/sanityClient'
import { HomePageData } from '@/lib/sanityTypes/homePageData'
import { Metadata } from 'next'
import ClientHome from './clientPage'

async function getPageData() {
  try {
    const data = await sanityClient.fetch<HomePageData[]>(
      `*[_type == "homePage"]`
    )
    return data?.[0] ? data[0] : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageData()
  return { title: data?.title, description: data?.description }
}

export default async function Home() {
  const pageData = await getPageData()
  if (!pageData) return null

  const decisionTree = await getDecisionTree(
    pageData?.decisionTreeRoot?._ref ?? ''
  )

  return (
    <ClientHome
      treeData={decisionTree}
      quotes={pageData.quotes}
      content={pageData.content}
    />
  )
}
