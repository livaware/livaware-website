import { NextResponse } from 'next/server'
import verifyCaptcha from '../verifyCaptcha'

const zapUrl = 'https://hooks.zapier.com/hooks/catch/14780983/32dkgny/'

type RequestData = {
  email: string
  name: string
  phone: string
  message: string
  time: string
  captchaToken: string
}

async function publishZap(data: RequestData) {
  const startTime = new Date(data.time)
  // endTime is 20 minutes after startTime
  const endTime = new Date(data.time)
  endTime.setMinutes(endTime.getMinutes() + 20)

  const response = await fetch(zapUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }),
  })
  return response
}

export async function POST(request: Request) {
  const req = (await request.json()) as RequestData

  const captchaVerified = await verifyCaptcha(req.captchaToken)

  if (!captchaVerified.success) {
    return NextResponse.error()
  }

  await publishZap(req)

  return NextResponse.json({
    result: 'success',
  })
}
