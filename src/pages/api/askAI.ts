// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatGPTAPI } from 'chatgpt'
import sanityClient from '@/lib/sanityClient'
import { AIPromptData } from '@/lib/sanityTypes/aiPromptData'

type RequestData = {
  query: string
}
type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query } = req.body as RequestData
  const promptData = (
    await sanityClient.fetch<AIPromptData[]>(
      `*[_type == "aiPrompt" && name == "FAQ"]`
    )
  )[0]
  const gpt = new ChatGPTAPI({
    apiKey: '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',
  })
  const systemMessage = `
  ${promptData.prompt}
  ${promptData.content}
  `
  const response = await gpt.sendMessage(query, {
    systemMessage,
  })
  console.log(response)

  res.status(200).json({ message: response.text })
}
