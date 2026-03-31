import React, { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"
import { Copy, Check } from "lucide-react"

const ChatMessages = ({ currentChat }) => {

  const bottomRef = useRef()
  const { isAiTyping } = useSelector(state => state.chat)

  const [copiedIndex, setCopiedIndex] = useState(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentChat?.messages, isAiTyping])

  // ✅ COPY FUNCTION
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)

      setTimeout(() => {
        setCopiedIndex(null)
      }, 2000)
    } catch (err) {
      console.log("Copy failed", err)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-6">

      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {!currentChat && (
          <div className="text-center text-gray-400 mt-20">
            Start a new conversation
          </div>
        )}

        {/* 🔥 MESSAGES */}
        {currentChat?.messages?.map((msg, index) => {

          const isUser = msg.role === "user"

          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >

              {/* ✅ USER */}
              {isUser ? (
                <div className="bg-blue-700 px-4 py-2 rounded-xl rounded-br-none text-md max-w-[85%] md:max-w-[70%]">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (

                /* ✅ AI MESSAGE */
                <div className="w-full flex gap-3 items-start group">

           
                  {/* Message */}
                  <div className="flex-1 rounded-xl px-5 py-4 relative">

                    {/* 🔥 COPY BUTTON */}
                    <button
                      onClick={() => handleCopy(msg.content, index)}
                     className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-white"
                    >
                      {copiedIndex === index ? (
                        <Check size={19} className="text-green-400" />
                      ) : (
                        <Copy size={19} />
                      )}
                    </button>

               

                    {/* Content */}
                    <div className="text-md text-gray-200 space-y-3 leading-relaxed select-text">
                      <ReactMarkdown
                        components={{
                          pre({ children }) {
                            return (
                              <pre className="bg-black/60 p-3 rounded-lg overflow-x-auto text-sm">
                                {children}
                              </pre>
                            )
                          },

                          code({ inline, children }) {
                            return inline ? (
                              <code className="bg-black/40 px-1 py-0.5 rounded text-green-400">
                                {children}
                              </code>
                            ) : (
                              <code className="text-green-400">
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>

                    </div>

                  </div>

                </div>
              )}

            </div>
          )
        })}

        {/* 🔥 AI TYPING */}
        {isAiTyping && (
          <div className="flex gap-3 items-center">


            <div className="bg-[#020617] border border-gray-800 px-4 py-2 rounded-xl flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>
    </div>
  )
}

export default ChatMessages