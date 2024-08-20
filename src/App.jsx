import { Nav } from './components/Nav'
import { useTranslation } from 'react-i18next'
import { useToggle } from './hooks/useToggle'
import { Outlet } from 'react-router-dom'

function App() {
  const { t } = useTranslation()
  const [showSearchForm, toggleSearchForm] = useToggle(true)

  return (
    <div className='flex flex-col min-h-screen bg-weather-primary'>
      <header className='shadow-lg py-3'>
        <Nav toggleSearch={toggleSearchForm} />
      </header>
      <main className='sm:container text-white'>
        <Outlet />
      </main>
      <footer className='container text-weather-secondary text-xs mt-4'>{t('copyright')}</footer>
    </div>
  )
}

export default App
