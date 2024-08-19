import { useState } from 'react'
import { Nav } from './components/Nav'
import { CitySearchForm } from './components/CitySearchForm'
import { CitySearchView } from './components/CitySearchView'
import { Alert } from './components/Alert'
import { useToggle } from './hooks/useToggle'

function App() {
  const [cityData, setCityData] = useState(null)
  const [error, setError] = useState('')
  const [showSearchForm, toggleSearchForm] = useToggle(true)

  return (
    <div className='flex flex-col min-h-screen bg-weather-primary'>
      <header className='shadow-lg py-3'>
        <Nav toggleSearch={toggleSearchForm} />
      </header>
      <main className='sm:container text-white'>
        {error && <Alert title="Error" content={error} type="danger" />}
        {showSearchForm && <CitySearchForm setCityData={setCityData} setError={setError} toggleSearchForm={toggleSearchForm} />}
        {cityData && <CitySearchView cityData={cityData} setErrorUp={setError} />}
      </main>
      <footer className='container text-weather-secondary text-xs mt-4'>The Burrow Weather 2024</footer>
    </div>
  )
}

export default App
