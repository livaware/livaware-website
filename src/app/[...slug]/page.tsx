import PortableTextRenderer from '@/lib/PortableTextRenderer'
import sanityClient from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPageData'
import { Metadata } from 'next'
import ClientPage from './clientPage'

export interface GenericPageStaticParams<T> {
  slug: T
}

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<GenericPageData[]>(
    `*[_type == "standardPage"]`
  )

  console.log(pages.map((x) => x.slug))

  const paths = pages.map((page) => ({
    slug: [page.slug],
  }))
  return paths as GenericPageStaticParams<string[]>[]
}

async function getPageData(slug: string | string[]) {
  const newSlug = (Array.isArray(slug) ? slug.join('/') : slug).replaceAll(
    '%2F',
    ''
  )

  try {
    const data = await sanityClient.fetch<GenericPageData[]>(
      `*[slug == "/${newSlug}"]`
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
  params: GenericPageStaticParams<string[]>
}): Promise<Metadata> {
  const data = await getPageData(params.slug)
  return { title: `Livaware - ${data?.title}`, description: data?.description }
}

const GenericPage = async ({
  params,
}: {
  params: GenericPageStaticParams<string[]>
}) => {
  const data = await getPageData(params.slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return (
    <>
      <ClientPage content={data.content} />
    </>
  )
}

export default GenericPage
