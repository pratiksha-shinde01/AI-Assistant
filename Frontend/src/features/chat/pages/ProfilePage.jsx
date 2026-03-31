import React from "react"
import { useSelector } from "react-redux"
import { X } from "lucide-react"

const Profile = ({ openProfile, setOpenProfile }) => {

  const { user } = useSelector(state => state.auth)

  // ✅ Don't render if not open
  if (!openProfile) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 Overlay */}
      <div
        onClick={() => setOpenProfile(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* 🔥 Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#020617] border border-gray-800 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl"
      >

        {/* 🔥 Header with Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profile</h2>

          <button
            onClick={() => setOpenProfile(false)}
            className="p-2 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2 className="text-lg font-semibold">
            {user?.username || "User"}
          </h2>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Username</span>
            <span>{user?.username}</span>
          </div>

          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Email</span>
            <span>{user?.email}</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Profile