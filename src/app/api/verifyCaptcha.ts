const reCaptchaKey = '6Lch1FYlAAAAABhJggSEMS3K1l0kQlb4o18zpMMq'

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
