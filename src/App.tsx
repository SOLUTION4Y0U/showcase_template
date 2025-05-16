import { useEffect } from 'react'
// Удаляем неиспользуемые импорты
// import reactLogo from './assets/react.svg'
// import twaLogo from './assets/tapps.png'
// import viteLogo from '/vite.svg'
import './App.css'
import './theme/global.css'

import WebApp from '@twa-dev/sdk'
import { AppProvider } from './context/AppContext'
import { Router } from './router'

function App() {
  useEffect(() => {
    // Инициализация Telegram Mini App
    WebApp.ready()

    // Отключаем индикатор загрузки, если он есть
    if (WebApp.isVersionAtLeast('6.2')) {
      WebApp.disableClosingConfirmation()
    }

    // Принудительно применяем наши стили, игнорируя тему Telegram
    if (WebApp?.ready) {
      // Принудительно устанавливаем светлый цвет фона
      document.body.classList.add('force-light')
      document.documentElement.style.colorScheme = 'light'

      // Меняем цвет сенсорной панели (если в TMA)
      try {
        WebApp.setHeaderColor('#ffffff')
        WebApp.setBackgroundColor('#ffffff')
      } catch (e) {
        console.log('Not in Telegram Mini App environment')
      }
    }

    // Отключаем любые слушатели событий темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const originalListener = mediaQuery.onchange
    mediaQuery.onchange = null

    return () => {
      // Восстанавливаем слушатель при размонтировании (хотя это не должно происходить)
      mediaQuery.onchange = originalListener
    }
  }, [])

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App
