import Heading from '@/components/Typography/Heading'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import sanityClient from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPage'
import { Metadata } from 'next'

interface GenericPageStaticParams {
  slug: string
}

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<GenericPageData[]>(
    `*[_type == "standardPage"]`
  )

  const paths = pages.map((page) => ({
    slug: page.slug,
  }))
  return paths as GenericPageStaticParams[]
}

async function getPageData(slug: string | string[]) {
  const newSlug = Array.isArray(slug) ? slug.join('/') : slug
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
  params: GenericPageStaticParams
}): Promise<Metadata> {
  const data = await getPageData(params.slug)
  return { title: data?.title, description: data?.description }
}

const GenericPage = async ({ params }: { params: GenericPageStaticParams }) => {
  const data = await getPageData(params.slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return (
    <>
      <Heading variant="h1">{data.title}</Heading>
      {data.subTitle && <Heading variant="h2">{data.subTitle}</Heading>}
      <PortableTextRenderer content={data.content} />
    </>
  )
}

export default GenericPage
