import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { Menu } from "lucide-react"
import Sidebar from '../components/Sidebar'
import ChatMessages from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'
import DeleteModal from '../components/DeleteModal'
import Toast from '../components/Toast'
import Profile from './ProfilePage'

const Dashboard = () => {

  const chat = useChat()

  const { chats, currentChatId } = useSelector(state => state.chat)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [deleteChatId, setDeleteChatId] = useState(null)
  const [toast, setToast] = useState(null)
  const [openProfile, setOpenProfile] = useState(false)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const currentChat = chats?.[currentChatId]

  return (
    <main className="w-screen h-screen flex bg-[#0f172a] text-white overflow-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setDeleteChatId={setDeleteChatId}
        setOpenProfile={setOpenProfile}
      />
      <section className="flex-1 flex flex-col overflow-hidden">

        {/* 🔥 HEADER (ADD THIS) */}
        <div className="h-[60px] md:h-[70px] border-b border-gray-800 flex items-center px-4 md:px-6 gap-3">

          {/* ✅ MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="text-base md:text-lg font-medium">
            AI Assistant
          </h1>

        </div>

        {/* 🔥 CHAT */}
        <ChatMessages currentChat={currentChat} />

        <ChatInput />

      </section>

      {/* Delete Modal */}
      <DeleteModal
        deleteChatId={deleteChatId}
        setDeleteChatId={setDeleteChatId}
        setToast={setToast}
      />
{openProfile && (
  <Profile
    openProfile={openProfile}
    setOpenProfile={setOpenProfile}
  />
)}
      {/* Toast */}
      <Toast toast={toast} setToast={setToast} />


    </main>
  )
}

export default Dashboard