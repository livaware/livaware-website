export default function rebuildHeaders(input: Headers) {
  const ignoreHeaders = ['cache-control', 'content-encoding', 'content-length']
  const headers: HeadersInit = {}

  Array.from(input.keys())
    .filter((key) => !ignoreHeaders.includes(key))
    .forEach((key) => (headers[key] = input.get(key) ?? ''))

  headers.origin = 'https://outlook.office365.com'
  headers.host = 'outlook.office365.com'

  return headers
}
