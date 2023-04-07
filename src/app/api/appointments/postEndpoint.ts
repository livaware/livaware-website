import { NextResponse } from 'next/server'
import { bookingOrgId } from './config'
import graphClient from './graphClient'

type RequestData = {
  email: string
  name: string
  phone: string
  message: string
  time: string
  captchaToken: string
}

export default async function POST(req: Request) {
  const request = (await req.json()) as RequestData

  //   const captchaVerified = await verifyCaptcha(request.captchaToken)

  //   if (!captchaVerified.success) {
  //     return NextResponse.error()
  //   }

  const startTime = new Date(request.time)
  // endTime is one hour after startTime
  const endTime = new Date(request.time)
  endTime.setHours(endTime.getHours() + 1)

  console.log(startTime, endTime)

  //   const customerResponse = await graphClient
  //     .api(`/solutions/bookingBusinesses/${bookingOrgId}/customers`)
  //     .post({
  //       '@odata.type': '#microsoft.graph.bookingCustomer',
  //       displayName: request.name,
  //       emailAddress: request.email,
  //       addresses: [],
  //       phones: [
  //         {
  //           number: request.phone,
  //           type: 'home',
  //         },
  //       ],
  //     })

  //   const customerId = '1eb60f31-5adf-4443-b74f-79fd0ecfe713' //customerResponse.id

  const bookingAppointment = {
    '@odata.type': '#microsoft.graph.bookingAppointment',
    customerTimeZone: 'Europe/London',
    smsNotificationsEnabled: false,
    isLocationOnline: true,
    optOutOfCustomerEmail: false,
    anonymousJoinWebUrl: null,
    postBuffer: 'PT0M',
    preBuffer: 'PT0M',
    price: 0,
    'priceType@odata.type': '#microsoft.graph.bookingPriceType',
    priceType: 'notSet',
    'reminders@odata.type': '#Collection(microsoft.graph.bookingReminder)',
    reminders: [
      {
        '@odata.type': '#microsoft.graph.bookingReminder',
        message: 'Your Livaware appointment is tomorrow.',
        offset: 'P1D',
        'recipients@odata.type': '#microsoft.graph.bookingReminderRecipients',
        recipients: 'allAttendees',
      },
      {
        '@odata.type': '#microsoft.graph.bookingReminder',
        message: 'Your Livaware appointment is in one hour.',
        offset: 'PT1H',
        'recipients@odata.type': '#microsoft.graph.bookingReminderRecipients',
        recipients: 'customer',
      },
    ],
    serviceId: '079abe69-3239-4740-bed5-41bcf0f7795d',
    serviceLocation: {
      '@odata.type': '#microsoft.graph.location',
      address: {
        '@odata.type': '#microsoft.graph.physicalAddress',
        city: '',
        countryOrRegion: '',
        postalCode: null,
        postOfficeBox: null,
        state: '',
        street: '',
        'type@odata.type': '#microsoft.graph.physicalAddressType',
        type: null,
      },
      coordinates: null,
      displayName: 'Customer location',
      locationEmailAddress: null,
      'locationType@odata.type': '#microsoft.graph.locationType',
      locationType: null,
      locationUri: null,
      uniqueId: null,
      'uniqueIdType@odata.type': '#microsoft.graph.locationUniqueIdType',
      uniqueIdType: null,
    },
    serviceName: 'Virtual Consultation',
    serviceNotes:
      "My health, Advice, Existing issue, I don't know what I need, Not Urgent",
    startDateTime: {
      '@odata.type': '#microsoft.graph.dateTimeTimeZone',
      dateTime: '2023-04-11T11:00:00.000Z',
      timeZone: 'UTC',
    },
    endDateTime: {
      '@odata.type': '#microsoft.graph.dateTimeTimeZone',
      dateTime: '2023-04-11T12:00:00.000Z',
      timeZone: 'UTC',
    },
    maximumAttendeesCount: 1,
    filledAttendeesCount: 1,
    'customers@odata.type':
      '#Collection(microsoft.graph.bookingCustomerInformation)',
    customers: [
      {
        '@odata.type': '#microsoft.graph.bookingCustomerInformation',
        customerId: '1eb60f31-5adf-4443-b74f-79fd0ecfe713',
        name: request.name,
        emailAddress: request.email,
        phone: request.phone,
        notes: request.message,
        location: {
          '@odata.type': '#microsoft.graph.location',
          displayName: 'Customer',
          locationEmailAddress: null,
          locationUri: '',
          locationType: null,
          uniqueId: null,
          uniqueIdType: null,
          address: {
            '@odata.type': '#microsoft.graph.physicalAddress',
            street: '',
            city: '',
            state: '',
            countryOrRegion: '',
            postalCode: '',
          },
          coordinates: {
            altitude: null,
            latitude: null,
            longitude: null,
            accuracy: null,
            altitudeAccuracy: null,
          },
        },
        timeZone: 'Europe/London',
        customQuestionAnswers: [],
      },
    ],
  }

  const result = await graphClient
    .api(`/solutions/bookingBusinesses/${bookingOrgId}/appointments`)
    .post(bookingAppointment)

  return NextResponse.json({
    result: 'success',
  })
}
