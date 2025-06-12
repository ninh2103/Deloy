import { GoogleGenerativeAI } from '@google/generative-ai'
import MDEditor from '@uiw/react-md-editor'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import InputBox from 'src/input'

const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY as string
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

interface Message {
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  isCode?: boolean
}

const ChatWindow: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages])

  const sendMessage = async (inputText: string) => {
    if (!inputText) {
      return
    }

    setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user', timestamp: new Date() }])

    setLoading(true)

    try {
      const result = await model.generateContent(inputText)
      const text = await result.response.text()

      const isCode = text.includes(' ')

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: 'ai',
          timestamp: new Date(),
          isCode
        }
      ])

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('generateContent error: ', error)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      {/* Chat Box */}
      <div className='w-1/2 h-3/4 border-2 border-black rounded-lg shadow-lg flex flex-col bg-white'>
        {/* Header */}
        <div className='p-4 bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500 text-white text-center rounded-t-lg'>
          <h2 className='text-xl font-bold'>Chat Box AI</h2>
        </div>

        {/* Nội dung chat */}
        <div className='flex-1 p-4 overflow-auto chat-container' ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-md max-w-[40%] ${
                message.sender === 'user' ? 'ml-auto bg-blue-300 text-white' : 'mr-auto bg-gray-200 text-black'
              }`}
            >
              {message.isCode ? (
                <MDEditor.Markdown
                  source={message.text}
                  style={{ whiteSpace: 'pre-wrap' }}
                  className='p-2 rounded-md bg-gray-800 text-white'
                />
              ) : (
                <>
                  <p className='message-text'>{message.text}</p>
                  <span className='block text-xs text-gray-500 mt-1'>
                    {dayjs(message.timestamp).format('DD.MM.YYYY HH:mm:ss')}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='p-4 '>
          <InputBox sendMessage={sendMessage} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
