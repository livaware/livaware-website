import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/Layout/ContentContainer'
import Header from '@/components/Layout/Header'
import getDecisionTree from '@/lib/getDecisionTree'
import ClientHome from './clientPage'

export default async function Home() {
  const decisionTree = await getDecisionTree(
    '666769b6-060e-4d55-a8ad-154a5b3e7619'
  )

  return <ClientHome treeData={decisionTree} />
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
