export interface TimeSlot {
  start: Date
  end: Date
}

export default function generateTimeSlots(
  start: Date,
  end: Date,
  intervalMinutes: number
): TimeSlot[] {
  const timeSlots: TimeSlot[] = []

  let current = new Date(start)
  while (current < end) {
    const endSlot = new Date(current)
    endSlot.setUTCMinutes(current.getUTCMinutes() + intervalMinutes)
    timeSlots.push({
      start: current,
      end: endSlot,
    })
    current = endSlot
  }

  return timeSlots
}
