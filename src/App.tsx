import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Listening from './pages/Listening'
import Translation from './pages/Translation'
import Result from './pages/Result'
import Errors from './pages/Errors'
import Vocabulary from './pages/Vocabulary'
import Stats from './pages/Stats'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="max-w-lg mx-auto px-4 py-12 text-center"><p className="text-gray-500">加载中...</p></div>
  }
  if (user) return <Navigate to="/" replace />
  return <>{children}</>
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="max-w-lg mx-auto px-4 py-12 text-center"><p className="text-gray-500">加载中...</p></div>
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter basename="/cet4-practice">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/listening/:year/:month/:set" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
            <Route path="/translation/:year/:month" element={<ProtectedRoute><Translation /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/errors" element={<ProtectedRoute><Errors /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            <Route path="/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
