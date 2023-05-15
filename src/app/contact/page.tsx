'use client'

import {
  ContentContainer,
  Heading,
  HeroHeader,
} from 'livaware-react-components'
import { useEffect, useRef, useState } from 'react'

export default function ContactPage() {
  const [height, setHeight] = useState(0)
  const iFrame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const iHeight =
        iFrame.current?.contentWindow!.document.body.scrollHeight ?? 0
      setHeight(iHeight)
      return () => clearInterval(interval)
    }, 333)
  }, [])

  return (
    <>
      <HeroHeader
        topText="Contact Livaware"
        mainText="Your journey to better healthcare starts now."
        subTitleText="Simply fill in the form below and we will call you at a convenient time. Alternatively, email us at hello@livaware.co.uk"
        imageUrl="https://cdn.sanity.io/images/41p617pr/livaware-website/90ba9e8be269b3e2f47f1788d7824f8eaff9c305-8256x5504.jpg?w=1920&fit=max&auto=format"
      />
      <p></p>
      <iframe
        ref={iFrame}
        // src="/owa/calendar/Livaware@livaware.co.uk/bookings/"
        src="https://outlook.office365.com/owa/calendar/Livaware@livaware.co.uk/bookings/"
        className="min-h-screen-minus-header w-full overflow-scroll"
        scrolling="yes"
        seamless
        style={{
          height,
        }}
      />
      <p className="m-auto my-10 max-w-copy text-center text-xs">
        Your data will be transmitted over an encrypted connection and held
        securely on Livaware systems. We collect this data for the sole purpose
        of contacting you about our services. We take information security
        seriously, and this data will be erased immediately upon your stating
        disinterest in our services following contact, or at your request,
        whichever is sooner.
      </p>
    </>
  )
}
