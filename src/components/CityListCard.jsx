import { useNavigate } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export function CityListCard({ city }) {
    const navigate = useNavigate()

    const gotToCityView = (city) => {
        navigate(`/weather/${city.state}/${city.city}?id=${city.id}&lat=${city.coords.lat}&lng=${city.coords.lng}`)
    }

    return <>
        <div onClick={() => gotToCityView(city)}
            className="flex py-3 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer dark:bg-weather-secondary-dark">
            <div className="flex flex-col flex-1">
                <h2 className="text-3xl">{city.city}</h2>
                <h3 className="text-white/50">{city.state}</h3>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-3xl self-end">
                    {Math.round(city.weather?.current.temp)}&deg;
                </p>
                <div className="flex gap-2">
                    <img className="w-[50px] h-auto"
                        src={`http://openweathermap.org/img/wn/${city.weather?.current.weather[0].icon}@2x.png`} alt="" />
                </div>
            </div>
        </div>
    </>
}