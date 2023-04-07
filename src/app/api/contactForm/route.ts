import { NextResponse } from 'next/server'

const zapUrl = 'https://hooks.zapier.com/hooks/catch/14780983/32dkgny/'
const reCaptchaKey = '6Lch1FYlAAAAABhJggSEMS3K1l0kQlb4o18zpMMq'

type RequestData = {
  email: string
  name: string
  phone: string
  message: string
  captchaToken: string
}

async function publishZap(data: RequestData) {
  const response = await fetch(zapUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}

async function verifyCaptcha(token: string) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaKey}&response=${token}`,
    {
      method: 'POST',
    }
  )
  const responseJson = await response.json()
  console.log(responseJson)
  return responseJson as {
    success: boolean
    challenge_ts: string
    hostname: string
  }
}

export async function POST(request: Request) {
  const req = (await request.json()) as RequestData

  const captchaVerified = await verifyCaptcha(req.captchaToken)

  console.log(captchaVerified.success)

  if (!captchaVerified.success) {
    return NextResponse.error()
  }

  await publishZap(req)

  return NextResponse.json({
    result: 'success',
  })
}
