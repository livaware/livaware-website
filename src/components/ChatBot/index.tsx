import { useState } from 'react'
import Heading from '../Typography/Heading'

export default function ChatBot() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState('')

  const fetchChatbotResponse = async (query: string) => {
    setLoading(true)
    const response = await fetch('/faq/api', {
      method: 'POST',
      body: JSON.stringify({
        query,
      }),
    })
    const json = await response.json()
    setReply(json.message)
    setLoading(false)
  }

  return (
    <div className="w-full md:mx-8">
      <Heading variant="h1">Ask Livaware</Heading>
      <div className="grid grid-cols-[auto_4em] mt-4">
        <input
          type="text"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          className="border-black border-2 border-solid p-2"
        />
        <button
          className="border-black border-2 border-solid border-l-0 bg-brand-green text-white"
          type="submit"
          onClick={() => fetchChatbotResponse(message)}
        >
          Send
        </button>
      </div>
      {loading && <div>Loading</div>}
      {reply && <div className="p-4">{reply}</div>}
    </div>
  )
}
