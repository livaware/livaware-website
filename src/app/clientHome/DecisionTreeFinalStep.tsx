import DecisionTreeButton from '@/components/DecisionTree/Button'
import { DecisionTreeHistoryItem } from '@/components/DecisionTree/History'
import FormError from '@/components/Forms/FormError'
import FormLabel from '@/components/Forms/FormLabel'
import TextInput from '@/components/Forms/TextInput'
import Heading from '@/components/Typography/Heading'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { horizontalSlideFade } from '@/lib/animations'
import Script from 'next/script'

const reCaptchaSiteKey = '6Lch1FYlAAAAAHXm-71fJcKil2M0WVVPX7iGbcbo'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
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
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const historyStr = history.map((x) => x.label).join(', ')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const captchaToken = await getCaptchaToken()
    await fetch('/contactForm', {
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
      <Heading variant="h1" className="my-14">
        Thank you, we know what you need.
      </Heading>
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
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </fieldset>
            <fieldset>
              <FormLabel>Phone number</FormLabel>
              <TextInput
                {...register('phone', { required: true })}
                label="Phone number"
              />
              {errors.phone && (
                <FormError>Please enter your phone number</FormError>
              )}
            </fieldset>
            <DecisionTreeButton
              onClick={handleSubmit(onSubmit)}
              text="Submit"
            />
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
