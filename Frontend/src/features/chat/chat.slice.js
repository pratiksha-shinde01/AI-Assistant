import { createSlice } from "@reduxjs/toolkit"
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        isAiTyping: false, // ✅ NEW
        error: null,
    },
    reducers: {

        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },

    addNewMessage: (state, action) => {
    const { chatId, content, role } = action.payload

    // ✅ ensure chat exists
    if (!state.chats[chatId]) {
        state.chats[chatId] = {
            id: chatId,
            title: "New Chat",
            messages: [],
            lastUpdated: new Date().toISOString(),
        }
    }

    state.chats[chatId].messages.push({ content, role })
},
addMessages: (state, action) => {
  const { chatId, messages } = action.payload
  state.chats[chatId].messages = messages // ✅ correct
},

        setChats: (state, action) => {
            state.chats = action.payload
        },

        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload
        },

        setAiTyping: (state, action) => {
            state.isAiTyping = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    createNewChat,
    addNewMessage,
    addMessages,
    setAiTyping // ✅ export
} = chatSlice.actions

export default chatSlice.reducer