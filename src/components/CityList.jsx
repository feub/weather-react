import { CityListCard } from "./CityListCard";

let savedCities

async function getCities() {
    if (localStorage.getItem('savedCities')) {
        savedCities = JSON.parse(localStorage.getItem('savedCities'))
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

        // Flickr Delay
        await new Promise((res) => setTimeout(res, 500));
    }
}

await getCities()

export function CityList() {
    return <div className="flex flex-col gap-4">
        {savedCities &&
            savedCities.map(city => (
                <CityListCard key={city.id} city={city} />
            ))
        }
    </div>
}