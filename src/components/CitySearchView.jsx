import { useFetch } from "../hooks/useFetch"
import { Alert } from './Alert'
import { CityPreview } from "./CityPreview"

export function CitySearchView({ cityData }) {
    const OWMAppId = '2482ff4aa06ad0c1916714a4676f4e5f'
    const units = 'metric'
    const langapi = 'en'

    const { loading, data: weatherData, error, setData } = useFetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityData.coords.lat}&lon=${cityData.coords.lng}&exclude={part}&appid=${OWMAppId}&units=${units}&lang=${langapi}`)

    if (error) {
        return <Alert
            title="Error"
            content={error.toString()}
            type="danger"
        />
    }

    if (weatherData) {
        // Calc current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.current.dt * 1000 + localOffset;
        weatherData.currentTime =
            utc + 1000 * weatherData.timezone_offset;

        // Calc hourly weather offset
        weatherData.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * weatherData.timezone_offset;
        });
    }

    return <>
        {loading && <p>Loading...</p>}
        {weatherData && <CityPreview cityData={cityData} weatherData={weatherData} />}
    </>
}
