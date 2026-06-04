import { Outlet, useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && (
        <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-end gap-3">
          <span className="text-xs text-gray-400 truncate max-w-[200px]">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 underline"
          >
            退出
          </button>
        </div>
      )}
      <main className="flex-1 pb-16 safe-bottom">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
