import { GenericPageStaticParams } from '@/app/[...slug]/page'
import sanityClient from '@/lib/sanityClient'
import { ResourcePageData } from '@/lib/sanityTypes/resourcePageData'
import { Metadata } from 'next'
import ClientPage from './clientPage'

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<ResourcePageData[]>(
    `*[_type == "resourcePage"]`
  )

  const paths = pages.map((page) => ({
    slug: page.slug,
  }))
  return paths as GenericPageStaticParams<string>[]
}

async function getPageData(slug: string) {
  try {
    const data = await sanityClient.fetch<ResourcePageData[]>(
      `*[_type == "resourcePage" && slug == "${slug}"]`
    )
    return data?.[0] ? data[0] : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: GenericPageStaticParams<string>
}): Promise<Metadata> {
  const data = await getPageData(params.slug)
  return { title: `Livaware - ${data?.title}` }
}

export default async function ResourcePage({
  params,
}: {
  params: GenericPageStaticParams<string>
}) {
  const data = await getPageData(params.slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return <ClientPage data={data} />
}
