import { push } from '@socialgouv/matomo-next'

export default function analyticsEvent(
  category: string,
  event: string,
  extra?: string
) {
  push(['trackEvent', category, event, extra])
}
