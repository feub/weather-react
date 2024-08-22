import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
import { useToggle } from '../hooks/useToggle'
import { InfoModal } from './InfoModal'
import { createPortal } from 'react-dom'
import { Settings } from './Settings'
import { v4 as uuidv4 } from 'uuid';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

export function Nav({ toggleSearch, theme, toggleMode }) {
    const [showInfo, toggleInfo] = useToggle(false)
    const { state, city } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    let savedCities = []
    const navigate = useNavigate()

    const addCity = () => {
        if (localStorage.getItem('savedCities')) {
            savedCities = JSON.parse(localStorage.getItem('savedCities'))
        }

        const locationObj = {
            id: uuidv4(),
            state: state,
            city: city,
            coords: {
                lat: searchParams.get('lat'),
                lng: searchParams.get('lng')
            }
        }

        savedCities.push(locationObj)
        localStorage.setItem('savedCities', JSON.stringify(savedCities))

        searchParams.delete('preview')

        navigate(`/weather/${state}/${city}?id=${locationObj.id}&lat=${locationObj.coords.lat}&lng=${locationObj.coords.lng}`)
    }

    return <nav className="container flex flex-col sm:flex-row items-center text-slate-700 dark:text-slate-200">
        <div className='flex flew-row items-center gap-3'>
            <FontAwesomeIcon icon={faSun} className='text-2xl' />
            <h1 className="text-2xl font-bold">
                <NavLink to="/" > The Burrow Weather</NavLink>
            </h1>
        </div>
        <div className='flex flex-1 items-center justify-end'>
            {searchParams.get('preview') && <Button variant="none" onClick={addCity}><FontAwesomeIcon icon={faPlus} className='text-xl text-slate-700/50 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200' /></Button>}
            <Settings toggleInfo={toggleInfo} theme={theme} toggleMode={toggleMode} />
        </div>

        {showInfo && createPortal(<InfoModal onClose={toggleInfo} />, document.querySelector('main'))}
    </nav>
}