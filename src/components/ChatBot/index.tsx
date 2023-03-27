import { useState } from 'react'

export default function ChatBot() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState('')

  const fetchChatbotResponse = async (query: string) => {
    setLoading(true)
    const response = await fetch('/api/askAI', {
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
    <div>
      <input
        type="text"
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
      />
      <button type="submit" onClick={() => fetchChatbotResponse(message)}>
        Ask the Question
      </button>
      {loading && <div>Loading</div>}
      {reply && <div>{reply}</div>}
    </div>
  )
}
