import { useEffect, useState } from "react"
import { CityListCard } from "./CityListCard"
import { CityListCardSkel } from "./CityListCardSkel"

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]')
        const OWMAppId = '2482ff4aa06ad0c1916714a4676f4e5f'
        const units = 'metric'
        const langapi = 'en'

        savedCities.map(async (city, index) => {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&exclude={part}&appid=${OWMAppId}&units=${units}&lang=${langapi}`, {
                headers: {
                    'Accept': 'application/json; charset=UTF-8'
                }
            })
            const data = await response.json()
            savedCities[index].weather = data
        })

        // Flickr delay
        await new Promise((res) => setTimeout(res, 400));

        return savedCities
    }
}

export function CityList() {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCities().then((data) => {
            setCities(data)
            setLoading(false)
        })
    }, [])

    return <div className="flex flex-col gap-4">
        {loading && <CityListCardSkel cards={2} />

        }
        {cities &&
            cities.map(city => <CityListCard key={city.id} city={city} />)
        }
    </div>
}