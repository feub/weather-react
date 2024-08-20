import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    return <div className="container flex flex-col items-center justify-center gap-3 mt-4">
        <h1 className="font-bold text-3xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-300">
            <i>{error.statusText || error.message}</i>
        </p>
    </div>
}