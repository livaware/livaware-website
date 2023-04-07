export interface AvailabilityEntry {
  status: 'outOfOffice' | 'available'
  serviceId: string
  startDateTime: {
    dateTime: string
    timeZone: string
  }
  endDateTime: {
    dateTime: string
    timeZone: string
  }
}
