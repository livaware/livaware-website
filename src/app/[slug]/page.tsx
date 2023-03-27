import Heading from '@/components/Typography/Heading'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import sanityClient from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPage'

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

async function getPageData(slug: string) {
  try {
    const data = await sanityClient.fetch<GenericPageData[]>(
      `*[slug == "/${slug}"]`
    )
    return data?.[0] ? data[0] : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const GenericPage = async (params: GenericPageStaticParams) => {
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
