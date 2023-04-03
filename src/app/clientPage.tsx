'use client'

import ContentContainer from '@/components/Layout/ContentContainer'
import ProgressBar from '@/components/ProgressBar'
import QuoteFader from '@/components/QuoteFader'
import Heading from '@/components/Typography/Heading'
import VideoBackground from '@/components/VideoBackground'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import DecisionTreeItem from '@/lib/sanityTypes/decisionTreeItem'
import Quote from '@/lib/sanityTypes/quote'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import LeftColumn from './clientHome/LeftColumn'

export default function ClientHome({
  treeData,
  quotes,
  content,
}: {
  treeData?: DecisionTreeItem | null
  quotes: Quote[]
  content: any
}) {
  const [progress, setProgress] = useState(0)
  const mainContent = useRef<HTMLDivElement>(null)
  const { scrollYProgress: mainContentScrollProgress } = useScroll({
    target: mainContent,
    offset: ['25vh', '0'],
  })
  const contentOpacity = useTransform(mainContentScrollProgress, [0, 1], [1, 0])

  return (
    <VideoBackground url="/video/hero-video.mp4">
      <ProgressBar progress={progress} className="bg-brand-taupe" />
      <div className="relative grid min-h-screen-minus-header grid-rows-2 overflow-x-hidden md:grid-cols-2 md:grid-rows-1">
        <LeftColumn
          treeData={treeData}
          onProgress={(newProgress) => setProgress(newProgress)}
        />
        <div className="grid items-center justify-center bg-brand-navy bg-opacity-80">
          <Heading variant="h1" className="text-center text-white">
            Who we are
          </Heading>
        </div>
      </div>
      <div ref={mainContent} className="pt-[70vh]"></div>
      <motion.div
        style={{
          opacity: contentOpacity,
        }}
        className="bg-white"
      >
        <ContentContainer>
          <PortableTextRenderer content={content} />
        </ContentContainer>

        <div className="grid min-h-screen-minus-header items-center justify-center bg-brand-green">
          <div className="max-w-[320px]">
            <QuoteFader className="text-white" quotes={quotes} />
            <a
              className="text-white"
              href="https://www.doctify.com/uk/practice/livaware"
              target="_blank"
              rel="noopener"
            >
              See more on <span className="text-brand-navy">Doctify</span>
            </a>
          </div>
        </div>
      </motion.div>
    </VideoBackground>
  )
}
