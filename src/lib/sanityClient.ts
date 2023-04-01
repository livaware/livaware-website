import { createClient } from 'next-sanity'
import { FooterConfigData } from './sanityTypes/footerConfig'

const sanityClient = createClient({
  projectId: '41p617pr',
  dataset: 'livaware-website',
  apiVersion: '2023-03-25',
  useCdn: false,
})

export interface GlobalConfiguration {
  footer: FooterConfigData
}

export async function getGlobalConfiguration(): Promise<GlobalConfiguration> {
  let footer: FooterConfigData

  try {
    footer = (
      await sanityClient.fetch<FooterConfigData[]>(`*[_type == "footer"]`)
    )[0]
  } catch (err) {
    console.error(err)
    throw new Error('Could not fetch footer data')
  }

  const header = {}

  const globalConfig = {
    footer,
  }

  return globalConfig
}

export default sanityClient
