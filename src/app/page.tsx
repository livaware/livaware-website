import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/Layout/ContentContainer'
import Header from '@/components/Layout/Header'

export default function Home() {
  return (
    <>
      <Header />
    </>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
