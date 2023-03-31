import sanityClient from '@/lib/sanityClient'
import { AIPromptData } from '@/lib/sanityTypes/aiPromptData'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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',
})

type RequestData = {
  query: string
}
type ResponseData = {
  message: string
}

export async function POST(request: Request) {
  const req = await request.json()
  console.log(req)
  const { query } = req as RequestData
  const promptData = (
    await sanityClient.fetch<AIPromptData[]>(
      `*[_type == "aiPrompt" && name == "FAQ"]`
    )
  )[0]

  const openai = new OpenAIApi(configuration)

  const systemMessage = `
    ${promptData.prompt}
    ${promptData.content}
    `

  const moderation = await openai.createModeration({
    input: query,
  })

  if (moderation.data.results.some((x) => x.flagged)) {
    return NextResponse.json({
      message: `Sorry, I didn't like that question. Please try another.`,
    })
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: query },
    ],
  })

  return NextResponse.json({
    message: response.data.choices[0].message?.content,
  } as ResponseData)
}
