import { useState } from "react"
import { CitySearchItem } from "./CitySearchItem"
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function CitySearchForm({ setError }) {
    const { t } = useTranslation()
    const mapboxAPIKey = "pk.eyJ1IjoiZmFiaWVuZmV1YiIsImEiOiJjaXM4cDN0YzQwMDQ5MnVzNHJ3M3M1ZmdqIn0.O2Pl7UglJNrcO-H3EEffqg"
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(null)
    const navigate = useNavigate()

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setTimeout(() => {
            if (e.target.value !== '') {
                setLoading(true)
                setSearch(e.target.value)
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${mapboxAPIKey}&types=place`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json; charset=UTF-8'
                    }
                }).then(response => response.json())
                    .then(data => {
                        setSearchResults(data)
                    })
                    .catch(error => {
                        setError(error.toString())
                    })
                    .finally(setLoading(false))
            }
            setSearchResults(null)
        }, 300)
    }

    const previewCity = (location) => {
        const [city, state] = location.place_name.split(",")
        navigate(`/weather/${state.trim()}/${city.trim()}?lat=${location.geometry.coordinates[1]}&lng=${location.geometry.coordinates[0]}&preview=true`)
    }

    return <div className='pt-4 mb-8'>
        <input value={search} onChange={handleSearch} type="text" placeholder={t('search-city')} className='py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]' />
        {loading && <p>{t('loading')}</p>}
        {searchResults && <ul className="bg-weather-secondary p-2">
            {searchResults.features !== 0 &&
                searchResults.features.map(searchResult => (
                    <CitySearchItem key={searchResult.id} searchResult={searchResult} previewCity={previewCity} />
                ))
            }
            {searchResults.features.length === 0 && <li>{t('no-results')}</li>}
        </ul>}
    </div>
}