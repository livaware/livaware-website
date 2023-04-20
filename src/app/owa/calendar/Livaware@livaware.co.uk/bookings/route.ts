import rebuildHeaders from '@/app/owa/rebuildHeaders'
import { JSDOM } from 'jsdom'

export async function GET() {
  const contentUrl =
    'https://outlook.office365.com/owa/calendar/Livaware@livaware.co.uk/bookings/'

  const response = await fetch(contentUrl)
  const content = await response.text()

  const dom = new JSDOM(content)
  const document = dom.window.document
  const head = document.querySelector('head')
  const style = document.createElement('style')
  style.innerHTML = `
  .mainContent {
    max-width: 100% !important;
  }
  .section.serviceSection {
    margin-top: 0;
  }
  .mainContent .headerSection {
    display: none;
  }
  .footerSection {
    display: none;
  }
  `
  head?.appendChild(style)

  const headers = rebuildHeaders(response.headers)

  return new Response(dom.serialize(), {
    status: 200,
    headers,
  })
}
