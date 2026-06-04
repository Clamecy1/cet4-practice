export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f3efe7 100%)' }}>
      <div className="text-center px-4">
        <p className="text-8xl font-light text-gray-300 mb-4">404</p>
        <p className="text-gray-500 mb-6 font-light">页面不存在</p>
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium active:bg-gray-900 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  )
}
