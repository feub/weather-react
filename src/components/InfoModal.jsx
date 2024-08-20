import { useEffect, useRef } from "react"
import { Button } from "./Button"
import { useTranslation } from "react-i18next"

export function InfoModal({ onClose }) {
    const { t } = useTranslation()
    const dialogRef = useRef(null)

    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    const handleClose = () => {
        onClose()
    }

    return <dialog className='p-4 bg-white rounded-md sm:w-1/2' ref={dialogRef}>
        <h2 className="font-bold text-xl mb-2">About</h2>
        <p>
            The Local Weather allows you to track the current and future weather of cities of your choosing.
        </p>
        <h2 className="font-bold text-xl my-2">How it works</h2>
        <ul className="list-inside list-disc">
            <li>
                Search for your city by entering the name into the search bar.
            </li>
            <li>
                Select a city within the results, this will take you to the current weather for your selection.
            </li>
            <li>
                Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.
            </li>
        </ul>
        <h2 className="font-bold text-xl my-2">Removing a city</h2>
        <p className="mb-3">
            If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be am option to delete the city.
        </p>
        <Button onClick={handleClose}>{t('close')}</Button>
    </dialog>
}