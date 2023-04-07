import { AvailabilityEntry } from '@/lib/microsoftTypes'
import { bookingOrgId, staffID } from './config'
import filterTimeSlots from './filterTimeSlots'
import generateTimeSlots from './generateTimeSlots'

export default async function getPossibleTimeSlots(accessToken: string) {
  // startDate begins at 9am tomorrow
  const startDate = new Date()
  startDate.setDate(startDate.getUTCDate() + 1)
  startDate.setUTCHours(9, 0, 0, 0)

  // endDate is 7 days after startDate
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getUTCDate() + 3)

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/${bookingOrgId}/getStaffAvailability`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        staffIds: [staffID],
        startDateTime: {
          dateTime: startDate.toISOString(),
          timeZone: 'UTC',
        },
        endDateTime: {
          dateTime: endDate.toISOString(),
          timeZone: 'UTC',
        },
      }),
    }
  )

  const availability = await response.json()
  const availabilityItems = (
    availability.value[0].availabilityItems as AvailabilityEntry[]
  ).filter((x) => x.status == 'available')

  // Generate all possible time slots
  const slots = generateTimeSlots(startDate, endDate, 20)

  // Filter slots to those that are available
  const filteredSlots = filterTimeSlots(slots, availabilityItems)

  return filteredSlots
}
