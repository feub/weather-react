import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCircleInfo, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'
import { useToggle } from '../hooks/useToggle'
import { InfoModal } from './InfoModal'
import { createPortal } from 'react-dom'
import { Settings } from './Settings'

export function Nav({ toggleSearch }) {
    const [showInfo, toggleInfo] = useToggle(false)

    return <nav className='container flex flex-col sm:flex-row items-center text-white'>
        <div className='flex flew-row items-center gap-3'>
            <FontAwesomeIcon icon={faSun} className='text-2xl' />
            <h1 className="text-2xl font-bold">
                <a href="/">The Burrow Weather</a>
            </h1>
        </div>
        <div className='flex flex-1 items-center justify-end gap-3'>
            <Button variant="none" onClick={toggleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl' /></Button>
            <Settings toggleInfo={toggleInfo} />
        </div>

        {showInfo && createPortal(<InfoModal onClose={toggleInfo} />, document.querySelector('main'))}
    </nav>
}