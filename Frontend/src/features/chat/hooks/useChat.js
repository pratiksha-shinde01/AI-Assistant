import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  setAiTyping
} from "../chat.slice";
import { useDispatch } from "react-redux";
import { store } from "../../../app/app.store"
import { useSelector } from "react-redux"


export const useChat = () => {

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chat.chats)


async function handleSendMessage({ message, chatId }) {
    try {
        dispatch(setAiTyping(true)) // ✅ start typing

        const data = await sendMessage({ message, chatId })

        const { chat, aiMessage } = data

        // ✅ create chat only if new
        if (!chatId) {
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        }

        const activeChatId = chatId || chat._id

        // ✅ USER MESSAGE
        dispatch(addNewMessage({
            chatId: activeChatId,
            content: message,
            role: "user",
        }))

        // ✅ AI MESSAGE
        dispatch(addNewMessage({
            chatId: activeChatId,
            content: aiMessage.content,
            role: aiMessage.role,
        }))

        dispatch(setCurrentChatId(activeChatId))

    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAiTyping(false)) // ✅ stop typing
    }
}

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId) {

        const data = await getMessages(chatId)
        const { messages } = data

        const formattedMessages = messages.map(msg => ({
            content: msg.content,
            role: msg.role,
        }))
        dispatch(addMessages({
            chatId,
            messages: formattedMessages,
        }))
        dispatch(setCurrentChatId(chatId))
    }
    async function handleCreateEmptyChat() {
        dispatch(setCurrentChatId(null))
    }
async function handleDeleteChat(chatId) {
    try {
        // ✅ create new object (safe copy)
        const updatedChats = { ...chats }

        delete updatedChats[chatId]

        // ✅ instant UI update
        dispatch(setChats(updatedChats))

        // ✅ if current chat deleted → reset
        if (chatId === store.getState().chat.currentChatId) {
            dispatch(setCurrentChatId(null))
        }

        // ✅ API call in background
        await deleteChat(chatId)

    } catch (err) {
        console.log(err)
    }
}
    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleCreateEmptyChat,
        handleDeleteChat
    }

}