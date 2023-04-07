import {
  AuthProvider,
  AuthProviderCallback,
  Client,
  Options,
} from '@microsoft/microsoft-graph-client'
import getAccessToken from './getAccessToken'

const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
  getAccessToken()
    .then((token) => {
      callback(null, token)
    })
    .catch((error) => {
      callback(error, null)
    })
}
let options: Options = {
  authProvider,
}
const graphClient = Client.init(options)

export default graphClient
