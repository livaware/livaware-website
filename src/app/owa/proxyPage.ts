import rebuildHeaders from './rebuildHeaders'

export async function ProxyPage(req: Request) {
  const reqBase = req.url.split('/owa/')[1]
  const reqUrl = `https://outlook.office365.com/owa/${reqBase}`

  const reqHeaders = rebuildHeaders(req.headers)

  const response = await fetch(reqUrl, {
    headers: reqHeaders,
    method: req.method,
    body: req.body,
  })
  const content = await response.text()

  return new Response(content, {
    status: 200,
    headers: rebuildHeaders(response.headers),
  })
}
