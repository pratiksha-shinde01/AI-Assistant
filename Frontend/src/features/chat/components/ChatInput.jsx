import React, { useState, useRef } from "react"
import { Send } from "lucide-react"
import { useSelector } from "react-redux"
import { useChat } from "../hooks/useChat"

const ChatInput = () => {

  const chat = useChat()
  const { currentChatId } = useSelector(state => state.chat)

  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  // ✅ AUTO RESIZE (FIXED)
  const handleInput = (e) => {
    const value = e.target.value
    setMessage(value)

    const textarea = textareaRef.current
    if (!textarea) return

    // reset height
    textarea.style.height = "auto"

    // set new height
    textarea.style.height = textarea.scrollHeight + "px"

    // max height limit
    if (textarea.scrollHeight > 150) {
      textarea.style.height = "150px"
      textarea.style.overflowY = "auto"
    } else {
      textarea.style.overflowY = "hidden"
    }
  }

  // ✅ SEND MESSAGE
  const handleSend = () => {
    if (!message.trim()) return

    chat.handleSendMessage({ message, chatId: currentChatId })
    setMessage("")

    // reset height after send
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  return (
    <div className="p-3 border-t border-gray-800">

      <div className="max-w-3xl mx-auto">

        <div className="flex items-end bg-[#1e293b] rounded-2xl px-4 py-3 border border-gray-700">

          <textarea
            ref={textareaRef}
            rows="1"
            value={message}
            onChange={handleInput}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent outline-none text-md resize-none overflow-hidden"
            style={{ maxHeight: "150px" }} // ✅ IMPORTANT
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />

          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 p-2 rounded-xl hover:bg-blue-500 transition"
          >
            <Send size={18} />
          </button>

        </div>

      </div>
    </div>
  )
}

export default ChatInput