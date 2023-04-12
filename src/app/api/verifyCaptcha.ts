const reCaptchaKey = process.env.RECAPTCHA_KEY

export default async function verifyCaptcha(token: string) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaKey}&response=${token}`,
    {
      method: 'POST',
    }
  )
  const responseJson = await response.json()

  return responseJson as {
    success: boolean
    challenge_ts: string
    hostname: string
  }
}
