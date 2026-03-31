import React from "react"
import { useChat } from "../hooks/useChat"

const DeleteModal = ({ deleteChatId, setDeleteChatId, setToast }) => {

  const chat = useChat()

  if (!deleteChatId) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* 🔥 Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setDeleteChatId(null)}
      />

      {/* 🔥 Modal */}
      <div className="relative w-[90%] max-w-md bg-[#020617] border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fadeIn">

        {/* Title */}
        <h2 className="text-lg font-semibold text-white mb-2">
          Delete chat?
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          This will permanently delete this conversation.
          <br />
          <span className="text-gray-500">
            You won’t be able to recover it.
          </span>
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={() => setDeleteChatId(null)}
            className="px-4 py-2 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              chat.handleDeleteChat(deleteChatId)
              setDeleteChatId(null)
              setToast("Chat deleted successfully")
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white transition shadow-md"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default DeleteModal