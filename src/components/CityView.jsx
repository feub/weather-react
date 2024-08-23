import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function CityView({ theme, preview, city, weatherData }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const removeCity = () => {
        const savedCities = JSON.parse(localStorage.getItem('savedCities'));
        const updatedCities = savedCities.filter(city => city.id !== searchParams.get('id'));
        localStorage.setItem('savedCities', JSON.stringify(updatedCities));
        navigate('/');
    };

    return <>
        {/* <!-- Preview banner --> */}
        {preview && <div className="p-2 bg-weather-secondary dark:bg-weather-secondary-dark">
            {t('currently')}
        </div>}

        {/* <!-- Weather overview --> */}
        <div className="max-w-screen-md w-full py-12 flex flex-col items-center justify-center" style={{
            // background: 'url("/images/roma.jpg")'
        }}>
            <h1 className="font-thin text-4xl mb-2">{city}</h1>
            <p className="text-sm mb-12 flex justify-center items-center al">
                <span>
                    {
                        new Date(weatherData.currentTime).toLocaleDateString(
                            i18n.language,
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
                            i18n.language,
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
                {t('feels-like')} {Math.round(weatherData.current.feels_like)}&deg;
            </p>
            <p className="capitalize">
                {weatherData.current.weather[0].description}
            </p>
            <img className="w-[150px] h-auto"
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="" />
        </div>

        <hr className="border-slate-200 dark:border-slate-700/50 border w-full" />

        {/* <!-- Hourly weather --> */}
        <div className="max-w-screen-md w-full py-12">
            <h2 className="mb-4 font-bold">{t('hourly-title')}</h2>
            <div className="flex gap-10 overflow-x-scroll">
                {
                    weatherData.hourly.map(hourly => (
                        <div key={hourly.currentTime} className="flex flex-col gap-4 items-center">
                            <p className="whitespace-nowrap text-md">
                                {
                                    new Date(
                                        hourly.currentTime
                                    ).toLocaleTimeString(
                                        i18n.language, {
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
                                {t('feels-like')} {Math.round(hourly.feels_like)}&deg;
                            </p>
                            <p className="whitespace-nowrap text-sm">
                                {t('humidity')} {hourly.humidity}%
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700/50 border w-full" />

        {/* <!-- Weekly weather --> */}
        <div className="max-w-screen-md w-full py-12">
            <h2 className="font-bold mb-4">{t('seven-days')}</h2>
            {
                weatherData.daily.map(day => (
                    <div key={day.dt} className="flex items-center">
                        <p className="flex-1">
                            {
                                new Date(day.dt * 1000).toLocaleDateString(i18n.language,
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

        <hr className="border-slate-200 dark:border-slate-700/50 border w-full" />

        {/* <!-- Precipitation --> */}
        {weatherData.minutely &&
            <div className="max-w-screen-md w-full py-12">
                <h2 className="mb-4 font-bold">{t('precipitation')} (mm/h)</h2>
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
            </div>}

        {!preview &&
            <div>
                <hr className="border-slate-200 dark:border-slate-700/50 border w-full" />

                <p className='flex flex-row justify-center hover:text-red-500 text-slate-500/50 text-xs mt-4'>
                    <button onClick={removeCity}>
                        <FontAwesomeIcon icon={faTrash}
                            className="mr-2"
                        />
                        <span>{t('remove-city')}</span>
                    </button>
                </p>
            </div>}
    </>;
}
