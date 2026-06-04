import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('请填写邮箱和密码')
      return
    }
    if (password.length < 6) {
      setError('密码至少 6 位')
      return
    }
    setError('')
    setLoading(true)

    const result = isRegister ? await signUp(email, password) : await signIn(email, password)

    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else if (isRegister) {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f3efe7 100%)' }}>
      <div className="max-w-lg mx-auto px-5 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-wider text-gray-800" style={{ letterSpacing: '0.08em' }}>
            CET-4
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-light tracking-wide">听力 · 翻译</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {sent ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-3">📧</p>
              <p className="text-gray-700 font-medium mb-1">验证邮件已发送</p>
              <p className="text-gray-400 text-sm">请检查邮箱 {email} 中的验证链接</p>
              <button
                onClick={() => { setSent(false); setIsRegister(false); }}
                className="mt-4 text-indigo-600 text-sm underline"
              >
                返回登录
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                {isRegister ? '注册账号' : '登录'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="邮箱地址"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="密码（至少 6 位）"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm active:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? '处理中...' : isRegister ? '注册' : '登录'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-4">
                {isRegister ? '已有账号？' : '没有账号？'}
                <button
                  onClick={() => { setIsRegister(!isRegister); setError(''); }}
                  className="text-indigo-600 ml-1 underline"
                >
                  {isRegister ? '去登录' : '去注册'}
                </button>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          登录后可云端同步学习数据
        </p>
      </div>
    </div>
  )
}
