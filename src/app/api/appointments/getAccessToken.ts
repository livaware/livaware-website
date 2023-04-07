const msal = require('@azure/msal-node')

const msalConfig = {
  auth: {
    clientId: 'e80ccce1-758b-4a34-8378-b8f302db590e',
    authority:
      'https://login.microsoftonline.com/9cfee145-5ed6-4c9a-aa8e-0d0365a27984',
    clientSecret: '8J~8Q~-nIDoGtYIyKx6XG-surM1HQNCeJ4AOiaCD',
  },
}

const cca = new msal.ConfidentialClientApplication(msalConfig)

export default async function getAccessToken() {
  const tokenRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  }

  const tokenResponse = await cca.acquireTokenByClientCredential(tokenRequest)

  return tokenResponse.accessToken
}
