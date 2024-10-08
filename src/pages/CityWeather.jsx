import { Alert } from '../components/Alert';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { CityView } from "../components/CityView";
import { CityViewSkel } from '../components/CityViewSkel';

export function CityWeather() {
    const { state, city } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [theme, setTheme] = useOutletContext();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const preview = searchParams.get('preview');

    const OWMAppId = import.meta.env.VITE_API_OWM_ID;
    const units = 'metric';
    const langapi = 'en';

    const { loading, data: weatherData, error, setData } = useFetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${OWMAppId}&units=${units}&lang=${langapi}`);

    if (error) {
        return <Alert
            title="Error"
            content={error.toString()}
            type="danger"
        />;
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

    return <div className="fade-in">
        {loading && <CityViewSkel theme={theme} />}
        {weatherData && <CityView preview={preview} city={city} weatherData={weatherData} />}
    </div>;
}