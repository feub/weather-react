import { useState } from "react"
import { CityListItem } from "./CityListItem"

export function CitySearchForm({ setCityData, setError, toggleSearchForm }) {
    const mapboxAPIKey = "pk.eyJ1IjoiZmFiaWVuZmV1YiIsImEiOiJjaXM4cDN0YzQwMDQ5MnVzNHJ3M3M1ZmdqIn0.O2Pl7UglJNrcO-H3EEffqg";
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(null)

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
                        setSearchResults(data.features)
                    })
                    .catch(error => {
                        setError(error.toString())
                    })
                    .finally(setLoading(false))
            }
            setSearchResults(null)
        }, 300)
    }

    const previewCity = (place) => {
        toggleSearchForm()
        setSearchResults(null)
        setSearch('')
        setCityData({
            name: place.place_name,
            coords: {
                lat: place.geometry.coordinates[1],
                lng: place.geometry.coordinates[0]
            }
        })
    }

    return <div className='pt-4 mb-8'>
        <input value={search} onChange={handleSearch} type="text" placeholder="Search for a city..." className='py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]' />
        {loading && <p>Loading...</p>}
        {searchResults &&
            <ul className="bg-weather-secondary p-2">
                {searchResults.map(searchResult => (
                    <CityListItem key={searchResult.id} searchResult={searchResult} previewCity={previewCity} />
                ))}
            </ul>}
    </div>
}