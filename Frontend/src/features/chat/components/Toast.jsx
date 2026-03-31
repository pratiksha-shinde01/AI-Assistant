import React, { useEffect } from "react"

const Toast = ({ toast, setToast }) => {

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      setToast(null) // ✅ auto hide
    }, 2500) // 2.5 sec

    return () => clearTimeout(timer)
  }, [toast])

  if (!toast) return null

  return (
    <div className="fixed bottom-5 right-5 z-[999]">
      <div className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
        {toast}
      </div>
    </div>
  )
}

export default Toast