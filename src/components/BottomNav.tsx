import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/', label: '首页', icon: '📝' },
  { to: '/stats', label: '统计', icon: '📊' },
  { to: '/errors', label: '错题本', icon: '📋' },
  { to: '/vocabulary', label: '生词本', icon: '📖' },
]

export default function BottomNav() {
  const location = useLocation()
  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center justify-center w-full h-full text-xs gap-0.5 ${
              isActive(tab.to)
                ? 'text-indigo-600'
                : 'text-gray-500'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
