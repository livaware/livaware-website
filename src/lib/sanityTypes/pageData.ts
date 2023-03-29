import { GlobalConfiguration } from '../sanityClient'

export interface PageData<T> {
  globalConfig: GlobalConfiguration
  data: T
}
