import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/Layout/ContentContainer'
import ChatBot from '@/components/ChatBot'

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions</title>
      </Head>

      <ChatBot />
    </>
  )
}
