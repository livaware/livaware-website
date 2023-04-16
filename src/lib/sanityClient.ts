import { createClient } from 'next-sanity'
import { FooterConfigData } from './sanityTypes/footerConfig'
import { HeaderConfigData } from './sanityTypes/headerConfig'

const sanityClient = createClient({
  projectId: '41p617pr',
  dataset: 'livaware-website',
  apiVersion: '2023-03-25',
  useCdn: false,
})

export interface GlobalConfiguration {
  footer: FooterConfigData
  header: HeaderConfigData
}

export async function getGlobalConfiguration(): Promise<GlobalConfiguration> {
  let footer: FooterConfigData
  let header: HeaderConfigData

  try {
    footer = (
      await sanityClient.fetch<FooterConfigData[]>(`*[_type == "footer"]`)
    )[0]
    header = (
      await sanityClient.fetch<HeaderConfigData[]>(`*[_type == "header"]`)
    )[0]
  } catch (err) {
    console.error(err)
    throw new Error('Could not fetch footer data')
  }

  const globalConfig = {
    footer,
    header,
  }

  return globalConfig
}

export default sanityClient
