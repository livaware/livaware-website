import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/Layout/ContentContainer'
import Header from '@/components/Layout/Header'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="bg-red-200">a</div>
      <div className="bg-green-200">b</div>
    </div>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
