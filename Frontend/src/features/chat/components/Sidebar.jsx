import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useChat } from "../hooks/useChat"
import { Plus, MessageSquare } from "lucide-react"
import 'remixicon/fonts/remixicon.css'
import { logoutUser } from "../../auth/auth.slice"
import { useNavigate } from "react-router-dom"

const Sidebar = ({ sidebarOpen, setSidebarOpen, setDeleteChatId, setOpenProfile }) => {

    const chat = useChat()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { chats, currentChatId } = useSelector(state => state.chat)

    const [openMenu, setOpenMenu] = useState(false)
    const menuRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <>
            {/* 🔥 MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* 🔥 SIDEBAR */}
            <aside className={`
        fixed md:static z-50
        w-[260px] h-full
        bg-[#020617] border-r border-gray-800 flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>

                {/* Logo */}
                <div className="p-5 border-b border-gray-800 flex justify-between items-center">
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        AI Assistant
                    </h1>

                    <button
                        className="md:hidden text-gray-400"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* New Chat */}
                <div className="p-4">
                    <button
                        onClick={() => {
                            chat.handleCreateEmptyChat()
                            setSidebarOpen(false)
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
                    >
                        <Plus size={16} />
                        New Chat
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-3 space-y-1">

                    {Object.values(chats || {}).map(chatItem => (
                        <div
                            key={chatItem.id}
                            className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition
              ${currentChatId === chatItem.id
                                    ? "bg-gray-800"
                                    : "hover:bg-gray-800"
                                }`}
                        >

                            <div
                                onClick={() => {
                                    chat.handleOpenChat(chatItem.id)
                                    setSidebarOpen(false)
                                }}
                                className="flex items-center gap-3 flex-1 min-w-0"
                            >
                                <MessageSquare size={16} className="text-gray-400" />
                                <span className="text-sm truncate">
                                    {chatItem.title || "New Chat"}
                                </span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setDeleteChatId(chatItem.id)
                                }}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs transition"
                            >
                                <i className="ri-delete-bin-6-line text-[17px]"></i>
                            </button>

                        </div>
                    ))}

                </div>

                {/* USER */}
                <div className="p-4 border-t border-gray-800 relative" ref={menuRef}>

                    <div
                        onClick={() => setOpenMenu(!openMenu)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-white shadow">
                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">
                                {user?.username || "User"}
                            </span>
                            <span className="text-xs text-gray-400 truncate">
                                {user?.email}
                            </span>
                        </div>
                    </div>

                    {openMenu && (
                        <div className="absolute bottom-16 left-2 w-[230px] bg-[#020617] border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">

                            <div className="px-4 py-3 border-b border-gray-800">
                                <p className="text-sm font-medium">{user?.username}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setOpenProfile(true)
                                    setOpenMenu(false)
                                    setSidebarOpen(false)
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition"
                            >
                                Profile
                            </button>

                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition">
                                Settings
                            </button>

                            <button
                                onClick={() => {
                                    dispatch(logoutUser())
                                    setOpenMenu(false)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </aside>
        </>
    )
}

export default Sidebar