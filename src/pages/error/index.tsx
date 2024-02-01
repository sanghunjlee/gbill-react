import { useRouteError, isRouteErrorResponse } from "react-router-dom";

interface RouterError extends Error {}

function isRouterError(object: any): object is RouterError {
    return 'message' in object;
}

export default function Error() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText;
    } else if (error !== undefined && isRouterError(error)) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div id="error" className="h-screen w-screen flex flex-col justify-center items-center gap-y-4">
            <h1 className="font-bold text-3xl">Oops!</h1>
            <p className="text-xl">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{errorMessage}</i>
            </p>
        </div>
    )
}