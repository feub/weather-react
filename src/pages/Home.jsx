import { useState } from 'react'
import { CitySearchForm } from '../components/CitySearchForm'
import { Alert } from '../components/Alert'
import { useToggle } from '../hooks/useToggle'
import { CityList } from '../components/CityList'
import { motion } from 'framer-motion'

export function Home() {
    const [error, setError] = useState('')
    const [showSearchForm, toggleSearchForm] = useToggle(true)

    return <>
        {error && <Alert title="Error" content={error} type="danger" />}
        {showSearchForm && <CitySearchForm setError={setError} />}
        <div>
            <CityList />
        </div>
    </>
}