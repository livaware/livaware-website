import PageLayout from '@/components/Layout/PageLayout'
import Heading from '@/components/Typography/Heading'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import sanityClient, { getGlobalConfiguration } from '@/lib/sanityClient'
import { GenericPageData } from '@/lib/sanityTypes/genericPage'
import { PageData } from '@/lib/sanityTypes/pageData'
import { PortableText } from '@portabletext/react'
import { useRouter } from 'next/router'

const GenericPage = ({ data }: PageData<GenericPageData>) => {
  return (
    <>
      <Heading variant="h1">{data.title}</Heading>
      {data.subTitle && <Heading variant="h2">{data.subTitle}</Heading>}
      <PortableTextRenderer content={data.content} />
    </>
  )
}

export async function getStaticPaths() {
  const pages = await sanityClient.fetch<GenericPageData[]>(
    `*[_type == "standardPage"]`
  )

  const paths = pages.map((page) => page.slug)

  return { paths, fallback: true }
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = params.slug.join('/')

  try {
    const data = await sanityClient.fetch<GenericPageData[]>(
      `*[slug == "/${slug}"]`
    )
    return data?.[0] ? { props: { data: data[0] } } : { notFound: true }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export default GenericPage
