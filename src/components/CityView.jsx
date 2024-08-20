import { useTranslation } from 'react-i18next'

export function CityView({ preview, city, weatherData }) {
    const { t } = useTranslation()

    return <>
        {/* <!-- Preview banner --> */}
        {preview && <div className="p-2 bg-weather-secondary">
            {t('currently')}
        </div>}

        {/* <!-- Weather overview --> */}
        <div className="max-w-screen-md w-full py-12 flex flex-col items-center justify-center" style={{
            background: 'url("/images/roma.jpg")'
        }}>
            <h1 className="font-thin text-4xl mb-2">{city}</h1>
            <p className="text-sm mb-12 flex justify-center items-center al">
                <span>
                    {
                        new Date(weatherData.currentTime).toLocaleDateString(
                            'en',
                            {
                                weekday: "short",
                                day: "2-digit",
                                month: "long",
                            }
                        )
                    }
                </span>
                <span>
                    {
                        new Date(weatherData.currentTime).toLocaleTimeString(
                            'en',
                            {
                                timeStyle: "short",
                            }
                        )
                    }
                </span>
            </p>
            <p className="text-8xl mb-8">
                {Math.round(weatherData.current.temp)}&deg;
            </p>
            <p>
                Feels like {Math.round(weatherData.current.feels_like)}&deg;
            </p>
            <p className="capitalize">
                {weatherData.current.weather[0].description}
            </p>
            <img className="w-[150px] h-auto"
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="" />
        </div>

        <hr className="border-white border-opacity-10 border w-full" />

        {/* <!-- Hourly weather --> */}
        <div className="max-w-screen-md w-full py-12">
            <div className="text-white">
                <h2 className="mb-4">Hourly weather</h2>
                <div className="flex gap-10 overflow-x-scroll">
                    {
                        weatherData.hourly.map(hourly => (
                            <div key={hourly.currentTime} className="flex flex-col gap-4 items-center">
                                <p className="whitespace-nowrap text-md">
                                    {
                                        new Date(
                                            hourly.currentTime
                                        ).toLocaleTimeString(
                                            'en', {
                                            hour: "numeric"
                                        })
                                    }
                                </p>
                                <img className="w-[50px] object-cover"
                                    src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`} alt="" />
                                <p className="text-xl">
                                    {Math.round(hourly.temp)}&deg;
                                </p>
                                <p className="whitespace-nowrap text-sm">
                                    Feels like {Math.round(hourly.feels_like)}&deg;
                                </p>
                                <p className="whitespace-nowrap text-sm">
                                    Humidity {hourly.humidity}%
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        <hr className="border-white border-opacity-10 border w-full" />

        {/* <!-- Weekly weather --> */}
        <div className="max-w-screen-md w-full py-12">
            <div className="text-white">
                <h2 className="mb-4">Seven days weather</h2>
                {
                    weatherData.daily.map(day => (
                        <div key={day.dt} className="flex items-center">
                            <p className="flex-1">
                                {
                                    new Date(day.dt * 1000).toLocaleDateString('en',
                                        {
                                            weekday: "long"
                                        }
                                    )
                                }
                            </p>
                            <img className="w-[50px] h-[50px] object-cover"
                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
                            <div className="flex gap-2 flex-1 justify-end">
                                <p>H: {Math.round(day.temp.max)}</p>
                                <p>L: {Math.round(day.temp.min)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        <hr className="border-white border-opacity-10 border w-full" />

        {/* <!-- Precipitation --> */}
        {weatherData.minutely &&
            <div className="max-w-screen-md w-full py-12">
                <div className="text-white">
                    <h2 className="mb-4">Precipitation (mm/h)</h2>
                    <div className="flex justify-center gap-7 overflow-x-auto">
                        {
                            weatherData.minutely.map((preciData, index) => (
                                <div key={preciData.dt} className="flex flex-col gap-4 items-center">
                                    <p className="whitespace-nowrap text-xs">
                                        {index} min
                                    </p>
                                    <p className="text-xs">
                                        {Math.round(preciData.precipitation * 100) / 100}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>}

        <p>
            <button>Remove</button>
        </p>
    </>
}
