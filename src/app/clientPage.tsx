'use client'

import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import {
  Heading,
  ProgressBar,
  QuoteFader,
  VideoBackground,
} from 'livaware-react-components'
import { useState } from 'react'
import LeftColumn from './clientHome/LeftColumn'

export default function ClientHome({
  treeData,
  quotes,
  content,
  headline,
}: {
  treeData?: DecisionTreeItem | null
  quotes: Quote[]
  content: any
  headline: string
}) {
  const [progress, setProgress] = useState(0)

  return (
    <VideoBackground
      url="/video/website-hero-desktop.mp4"
      mobileUrl="/video/website-hero-mobile.mp4"
    >
      <ProgressBar progress={progress} className="bg-brand-taupe" />
      <div className="relative grid min-h-screen-minus-header grid-rows-2 overflow-x-hidden md:grid-cols-2 md:grid-rows-1">
        <LeftColumn
          treeData={treeData}
          onProgress={(newProgress) => setProgress(newProgress)}
        />
        <div className="grid items-center justify-center bg-brand-navy bg-opacity-90">
          <Heading variant="h1" className="text-center text-white">
            {headline}
          </Heading>
        </div>
      </div>
      <div className="pt-[70vh]"></div>
      <div className="bg-white">
        <PortableTextRenderer content={content} />

        <div
          className="grid min-h-screen-minus-header items-center justify-center  text-center text-white"
          style={{
            backgroundImage:
              'linear-gradient(to top right, rgba(30,103,85,1) 0%, rgba(66,148,124,1) 35%, rgba(0,205,154,1) 100%)',
          }}
        >
          <Heading variant="h3">Testimonials</Heading>

          <div className="max-w-3xl px-8">
            <QuoteFader className="text-white" quotes={quotes} />
          </div>
          <Heading variant="h3">
            Read independently verified reviews on{' '}
            <a
              className="underline"
              href="https://www.doctify.com/uk/practice/livaware"
              target="_blank"
              rel="noopener"
            >
              Doctify
            </a>
          </Heading>
        </div>
      </div>
    </VideoBackground>
  )
}
