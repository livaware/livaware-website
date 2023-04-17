import { AvailabilityEntry } from '@/lib/microsoftTypes'
import { TimeSlot } from './generateTimeSlots'

export default function filterTimeSlots(
  timeSlots: TimeSlot[],
  availability: AvailabilityEntry[]
) {
  const availableTimeSlots: TimeSlot[] = []

  for (const timeSlot of timeSlots) {
    const available = availability.some((entry) => {
      const start = new Date(entry.startDateTime.dateTime + 'Z')
      const end = new Date(entry.endDateTime.dateTime + 'Z')
      return timeSlot.start >= start && timeSlot.end <= end
    })
    if (available) {
      availableTimeSlots.push(timeSlot)
    }
  }

  return availableTimeSlots
}
