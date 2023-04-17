import { horizontalSlideFade } from '@/lib/animations'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CTAButton,
  DecisionTreeHistoryItem,
  FormError,
  FormLabel,
  Heading,
  SelectInput,
  TextInput,
} from 'livaware-react-components'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const reCaptchaSiteKey = '6Lch1FYlAAAAAHXm-71fJcKil2M0WVVPX7iGbcbo'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  time: string
}

function getCaptchaToken() {
  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(reCaptchaSiteKey, { action: 'form_submit' })
        .then((token: string) => {
          resolve(token)
        })
    })
  })
}

export default function FinalStep({
  history,
}: {
  history: DecisionTreeHistoryItem[]
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [appointments, setAppointments] = useState<
    {
      start: Date
      end: Date
    }[]
  >([])

  const historyStr = history.map((x) => x.label).join(', ')

  const loadAppointments = async () => {
    const response = await fetch('/api/appointments')
    const data = await response.json()
    setAppointments(data.availability ?? [])
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const captchaToken = await getCaptchaToken()
    await fetch('/api/contactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, message: historyStr, captchaToken }),
    })
    setLoading(false)
    setComplete(true)
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${reCaptchaSiteKey}`}
      />
      <Heading variant="h1">Thank you, we know what you need.</Heading>
      <p className="mb-10">
        Let us know how to contact you, select a conveinent time, and we will be
        in touch.
      </p>
      <AnimatePresence mode="wait">
        {!loading && !complete && (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
            {...horizontalSlideFade}
          >
            <fieldset>
              <FormLabel>Your name</FormLabel>
              <TextInput
                {...register('name', { required: true, minLength: 3 })}
                label="Name"
                placeholder="Your name"
              />
              {errors.name && <FormError>Please enter your name</FormError>}
            </fieldset>
            <fieldset>
              <FormLabel>Email</FormLabel>
              <TextInput
                {...register('email', {
                  required: 'required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address',
                  },
                })}
                label="Email"
                placeholder="abc@example.com"
              />
              {errors.email && (
                <FormError>Please enter a valid email address</FormError>
              )}
            </fieldset>
            <fieldset>
              <FormLabel>Phone number</FormLabel>
              <TextInput
                {...register('phone', { required: true })}
                label="Phone number"
                placeholder="07123456789"
              />
              {errors.phone && (
                <FormError>Please enter your phone number</FormError>
              )}
            </fieldset>
            <fieldset>
              <FormLabel>Appointment Time</FormLabel>
              <SelectInput {...register('time', { required: true })}>
                {appointments.map((x) => (
                  <option
                    key={new Date(x.start).toISOString()}
                    value={new Date(x.start).toISOString()}
                  >
                    {format(new Date(x.start), 'PPPPp')}
                  </option>
                ))}
              </SelectInput>
              {errors.time && (
                <FormError>Please select a convenient time</FormError>
              )}
            </fieldset>
            <CTAButton onClick={handleSubmit(onSubmit)} text="Submit" />
            <p className="text-sm">
              Your data will be transmitted over an encrypted connection and
              held securely on Livaware systems. We collect this data for the
              sole purpose of contacting you about our services. We take
              information security seriously, and this data will be erased
              immediately upon your stating disinterest in our services
              following contact, or at your request, whichever is sooner.
            </p>
          </motion.form>
        )}
        {loading && (
          <motion.div key="loading" {...horizontalSlideFade}>
            <Heading variant="h1">Loading...</Heading>
          </motion.div>
        )}
        {complete && (
          <motion.div key="complete" {...horizontalSlideFade}>
            <Heading variant="h1">Thank you for your submission!</Heading>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
