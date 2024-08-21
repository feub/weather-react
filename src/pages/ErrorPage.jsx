import { useRouteError } from "react-router-dom"
import { useTranslation } from "react-i18next";

export function ErrorPage() {
    const error = useRouteError();
    const { t } = useTranslation()

    return <div className="container flex flex-col items-center justify-center gap-3 mt-4">
        <h1 className="font-bold text-3xl">Oops!</h1>
        <p>{t('sorry-error')}</p>
        <p className="text-gray-300">
            <i>{error.statusText || error.message}</i>
        </p>
        <a className="bg-slate-700 text-white rounded px-2 py-1" href="/">{t('back-home')}</a>
    </div>
}