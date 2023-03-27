import { createClient } from 'next-sanity'
import { FooterConfigData } from './sanityTypes/footerConfig'

const sanityClient = createClient({
  projectId: '42ps0jy0',
  dataset: 'livaware-website',
  apiVersion: '2023-03-25',
  useCdn: false,
})

export interface GlobalConfiguration {
  footer: FooterConfigData
}

export async function getGlobalConfiguration(): Promise<GlobalConfiguration> {
  const footer = (
    await sanityClient.fetch<FooterConfigData[]>(`*[_type == "footer"]`)
  )[0]
  const header = {}

  const globalConfig = {
    footer,
  }

  return globalConfig
}

export default sanityClient
