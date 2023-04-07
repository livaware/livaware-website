import { NextResponse } from 'next/server'
import getAccessToken from './getAccessToken'
import getPossibleTimeSlots from './getPossibleTimeSlots'

export default async function GET() {
  const accessToken = await getAccessToken()
  const slots = await getPossibleTimeSlots(accessToken)

  return NextResponse.json({
    result: 'success',
    availability: slots,
  })
}
