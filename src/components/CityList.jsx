import { useEffect, useState } from "react";
import { CityListCard } from "./CityListCard";
import { CityListCardSkel } from "./CityListCardSkel";
import { useTranslation } from "react-i18next";

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
        const OWMAppId = import.meta.env.VITE_API_OWM_ID;
        const units = 'metric';
        const langapi = 'en';

        savedCities.map(async (city, index) => {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&exclude={part}&appid=${OWMAppId}&units=${units}&lang=${langapi}`, {
                headers: {
                    'Accept': 'application/json; charset=UTF-8'
                }
            });
            const data = await response.json();
            savedCities[index].weather = data;
        });

        // Flickr delay
        await new Promise((res) => setTimeout(res, 400));

        return savedCities;
    }
};

export function CityList({ theme }) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        getCities().then((data) => {
            setCities(data);
            setLoading(false);
        });
    }, []);

    return <div className="flex flex-col gap-4">
        {loading && <CityListCardSkel theme={theme} cards={1} />}
        {cities &&
            cities?.length === 0 && <p className="text-sm">{t('no-city-saved')}</p>}
        {cities &&
            cities.map(city => <CityListCard key={city.id} city={city} />)
        }
    </div>;
}