import { Nav } from './components/Nav';
import { useTranslation } from 'react-i18next';
import { useToggle } from './hooks/useToggle';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const { t } = useTranslation();
  const [showSearchForm, toggleSearchForm] = useToggle(true);
  const [theme, setTheme] = useState('light');

  const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className='flex flex-col min-h-screen bg-weather-primary dark:bg-weather-primary-dark'>
      <header className='shadow-lg py-3'>
        <Nav theme={theme} toggleMode={toggleMode} />
      </header>
      <main className='container text-slate-700 dark:text-slate-200'>
        <Outlet context={[theme, setTheme]} />
      </main>
      <footer className='container text-slate-700/50 dark:text-slate-200/30 text-xs'>
        <div className='p-2 my-4'>{t('copyright')}</div>
      </footer>
    </div>
  );
}

export default App;
