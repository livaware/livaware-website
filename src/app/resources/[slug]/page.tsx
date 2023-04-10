import { GenericPageStaticParams } from '@/app/[...slug]/page'
import Chevron from '@/components/Icons/Chevron'
import ContentContainer from '@/components/Layout/ContentContainer'
import Heading from '@/components/Typography/Heading'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import sanityClient from '@/lib/sanityClient'
import SanityImage from '@/lib/SanityImage'
import { GenericPageData } from '@/lib/sanityTypes/genericPageData'
import { ResourcePageData } from '@/lib/sanityTypes/resourcePageData'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<ResourcePageData[]>(
    `*[_type == "resourcePage"]`
  )

  const paths = pages.map((page) => ({
    slug: page.slug,
  }))
  return paths as GenericPageStaticParams[]
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
  params: GenericPageStaticParams
}): Promise<Metadata> {
  const data = await getPageData(params.slug)
  return { title: `Livaware - ${data?.title}` }
}

export default async function ResourcePage({
  params,
}: {
  params: GenericPageStaticParams
}) {
  const data = await getPageData(params.slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return (
    <ContentContainer>
      <div className="mb-4">
        <Link href="/resources">
          <Chevron reverse /> Back to Resources
        </Link>
      </div>
      {data.coverImage && (
        <SanityImage value={data.coverImage} className="max-h-[50vh]" />
      )}
      <Heading variant="h1">{data.title}</Heading>
      {data.subTitle && <Heading variant="h2">{data.subTitle}</Heading>}
      <PortableTextRenderer content={data.content} />
    </ContentContainer>
  )
}
