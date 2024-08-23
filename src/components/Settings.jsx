import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMoon, faSun, faLanguage, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next"

export function Settings({ toggleInfo, theme, toggleMode }) {
    const { t, i18n } = useTranslation()

    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <FontAwesomeIcon icon={faGear}
                            className="h-5 w-5 text-slate-700/50 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={toggleMode}
                                        className={`text-slate-700 ${active ? 'bg-weather-primary' : ''
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (theme === 'dark' ? (
                                            <FontAwesomeIcon icon={faSun}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faMoon}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )) : (theme === 'dark' ? (
                                            <FontAwesomeIcon icon={faSun}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faMoon}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ))}
                                        {t('theme')}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button key="en" onClick={() => i18n.changeLanguage('en')} type='submit'
                                        className={`text-slate-700 ${active ? 'bg-weather-primary' : ''
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        English
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button key="frn" onClick={() => i18n.changeLanguage('fr')} type='submit'
                                        className={`text-slate-700 ${active ? 'bg-weather-primary' : ''
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Français
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button key="it" onClick={() => i18n.changeLanguage('it')} type='submit'
                                        className={`text-slate-700 ${active ? 'bg-weather-primary' : ''
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faLanguage}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Italiano
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={toggleInfo}
                                        className={`text-slate-700 ${active ? 'bg-weather-primary' : ''
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <FontAwesomeIcon icon={faCircleInfo}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faCircleInfo}
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Info
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
